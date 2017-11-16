import * as React from 'react';
import './style.less';

interface INumberProps {
  time?: boolean;
  number?: number;
  length?: number;
}

interface INumberState {
  time_count: boolean | number;
  time: Date;
}

const formate = num => (num < 10 ? `0${num}`.split('') : `${num}`.split(''));

export default class Number extends React.Component<
  INumberProps,
  INumberState
> {
  timeInterval = null;
  time_count = null;
  constructor() {
    super();
    this.state = {
      time_count: false,
      time: new Date()
    };
  }
  componentWillMount() {
    if (!this.props.time) {
      return;
    }
    const clock = () => {
      const count = +this.timeInterval;
      this.timeInterval = setTimeout(() => {
        this.setState({
          time: new Date(),
          time_count: count
        });
        clock();
      }, 1000);
    };
    clock();
  }
  shouldComponentUpdate({ number }: INumberProps): boolean {
    if (this.props.time) {
      if (this.state.time_count !== this.time_count) {
        if (this.state.time_count !== false) {
          this.time_count = this.state.time_count;
        }
        return true;
      }
      return false;
    }
    return this.props.number !== number;
  }
  componentWillUnmount() {
    if (!this.props.time) {
      return;
    }
    clearTimeout(this.timeInterval);
  }
  render() {
    if (this.props.time) {
      const now = this.state.time;
      const hour = formate(now.getHours());
      const min = formate(now.getMinutes());
      const sec = now.getSeconds() % 2;
      const t = hour.concat(sec ? 'd' : 'd_c', min);
      return (
        <div className='number'>
          {t.map((e, k) => <span className={`bg s_${e}`} key={k} />)}
        </div>
      );
    }

    const num = `${this.props.number}`.split('');
    const length = this.props.length ? this.props.length : 6;
    for (let i = 0, len = length - num.length; i < len; i++) {
      num.unshift('n');
    }
    return (
      <div className='number'>
        {num.map((e, k) => <span className={`bg s_${e}`} key={k} />)}
      </div>
    );
  }
}
