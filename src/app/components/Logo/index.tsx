import * as React from 'react';
import './style.less';

interface ILogoProps {
  cur: boolean;
  reset: boolean;
}

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
      display: 'none',
    };
  }
  componentWillMount() {
    this.animate(this.props);
  }
  componentWillReceiveProps(nextProps: ILogoProps) {
    if ( // 只有在游戏进入开始, 或结束时 触发改变
      (
        [this.props.cur, nextProps.cur].indexOf(false) !== -1 &&
        (this.props.cur !== nextProps.cur)
      ) ||
      (this.props.reset !== nextProps.reset)
    ) {
      this.animate(nextProps);
    }
  }
  shouldComponentUpdate({ cur, reset }: ILogoProps): boolean {
    return cur !== this.props.cur || reset !== this.props.reset || !cur;
  }
  animate({ cur, reset }: ILogoProps) {
    clearTimeout(this.timeout);
    this.setState({
      style: 'r1',
      display: 'none',
    });
    if (cur || reset) {
      this.setState({ display: 'none' });
      return;
    }

    let m = 'r'; // 方向
    let count = 0;

    const set = (func, delay) => {
      if (!func) {
        return;
      }
      this.timeout = setTimeout(func, delay);
    };

    const show = (func) => { // 显示
      set(() => {
        this.setState({
          display: 'block',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const hide = (func) => { // 隐藏
      set(() => {
        this.setState({
          display: 'none',
        });
        if (func) {
          func();
        }
      }, 150);
    };

    const eyes = (func, delay1, delay2) => { // 龙在眨眼睛
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

    const run = (func) => { // 开始跑步啦！
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
      eyes(() => {
        eyes(() => {
          eyes(() => {
            this.setState({ style: m + 2 });
            run(dra);
          }, 150, 150);
        }, 150, 150);
      }, 1000, 1500);
    };

    show(() => { // 忽隐忽现
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
  }
  render() {
    if (this.props.cur) {
      return null;
    }
    return (
      <div className='logo' style={{ display: this.state.display }}>
        <div className={`bg dragon ${this.state.style}`} />
        <p>贪吃蛇</p>
      </div>
    );
  }
}
