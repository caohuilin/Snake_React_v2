import * as React from 'react';
import './style.less';

interface IPauseProps {
  data: boolean;
}
interface IPauseState {
  showPause: boolean;
}

export default class Pause extends React.Component<IPauseProps, IPauseState> {
  timeout = null;
  constructor() {
    super();
    this.state = {
      // 控制显示状态
      showPause: false
    };
  }
  componentDidMount() {
    this.setShake(this.props.data);
  }
  componentWillReceiveProps({ data }: IPauseProps) {
    this.setShake(data);
  }
  shouldComponentUpdate({ data }: IPauseProps): boolean {
    if (data) {
      // 如果暂停了, 不会有太多的dispatch, 考虑到闪烁效果, 直接返回true
      return true;
    }
    return data !== this.props.data;
  }
  setShake(bool: boolean) {
    // 根据props显示闪烁或停止闪烁
    if (bool && !this.timeout) {
      this.timeout = setInterval(() => {
        this.setState({
          showPause: !this.state.showPause
        });
      }, 250);
    }
    if (!bool && this.timeout) {
      clearInterval(this.timeout);
      this.setState({
        showPause: false
      });
      this.timeout = null;
    }
  }
  render() {
    return <div className={`bg pause ${this.state.showPause ? 'c' : ''}`} />;
  }
}
