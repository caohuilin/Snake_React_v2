import * as React from 'react';
import './style.less';

interface ILogoProps {}

interface ILogoState {
  display?: string;
  style?: string;
}

export default class Logo extends React.Component<ILogoProps, ILogoState> {
  timeout = null;
  constructor() {
    super();
    this.state = {
      style: 'r1',
      display: 'none'
    };
  }
  componentWillMount() {
    this.animate();
  }
  animate = () => {
    clearTimeout(this.timeout);
    this.setState({
      style: 'r1',
      display: 'none'
    });

    let m = 'r'; // 方向
    let count = 0;

    const set = (func, delay) => {
      if (!func) {
        return;
      }
      this.timeout = setTimeout(func, delay);
    };

    const show = func => {
      // 显示
      set(() => {
        this.setState({
          display: 'block'
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = func => {
      // 隐藏
      set(() => {
        this.setState({
          display: 'none'
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func, delay1, delay2) => {
      // 龙在眨眼睛
      set(() => {
        this.setState({ style: m + 2 });
        set(() => {
          this.setState({ style: m + 1 });
          if (func) {
            func();
          }
        }, delay2);
      }, delay1);
    };

    const run = func => {
      // 开始跑步啦！
      set(() => {
        this.setState({ style: m + 4 });
        set(() => {
          this.setState({ style: m + 3 });
          count++;
          if (count === 10 || count === 20 || count === 30) {
            m = m === 'r' ? 'l' : 'r';
          }
          if (count < 40) {
            run(func);
            return;
          }
          this.setState({ style: m + 1 });
          if (func) {
            set(func, 4000);
          }
        }, 100);
      }, 100);
    };

    const dra = () => {
      count = 0;
      eyes(
        () => {
          eyes(
            () => {
              eyes(
                () => {
                  this.setState({ style: m + 2 });
                  run(dra);
                },
                150,
                150
              );
            },
            150,
            150
          );
        },
        1000,
        1500
      );
    };

    show(() => {
      // 忽隐忽现
      hide(() => {
        show(() => {
          hide(() => {
            show(() => {
              dra(); // 开始运动
            });
          });
        });
      });
    });
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    return (
      <div className='logo' style={{ display: this.state.display }}>
        <div className={`bg dragon ${this.state.style}`} />
        <p>贪吃蛇</p>
      </div>
    );
  }
}
