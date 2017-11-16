import * as React from 'react';
import './style.less';

interface IMusicProps {
  data: boolean;
}
interface IMusicState {}
export default class Music extends React.Component<IMusicProps, IMusicState> {
  shouldComponentUpdate({ data }: IMusicProps): boolean {
    return data !== this.props.data;
  }
  render() {
    return <div className={`bg music ${this.props.data ? 'c' : ''} `} />;
  }
}
