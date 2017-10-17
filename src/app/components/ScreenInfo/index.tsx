import * as React from 'react';
import Number from '../Number';
import Music from '../Music';
import Pause from '../Pause';

const snakeImg = require('../../resources/images/snack.png');
const robotImg = require('../../resources/images/robot.png');

interface IScreenInfoProps {
}
interface IScreenInfoState {
}

export default class ScreenInfo extends React.Component<IScreenInfoProps, IScreenInfoState> {
  render() {
    return (
      <div className='right'>
      <div className='record'>
        <label>分数：</label>
        <Number number={2} />
        <img src={snakeImg} />
      </div>
      <div className='level'>
        <label>难度：</label>
        <Number number={2} />
      </div>
      <div className='set'>
        <Music data={false} />
        <Pause data={false} />
      </div>
      <div className='time'>
        <img src={robotImg} />
        <Number time={true} />
      </div>
    </div>
    )
  }
}
