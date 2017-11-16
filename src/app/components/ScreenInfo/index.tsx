import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Number from '../Number';
import Music from '../Music';
import Pause from '../Pause';
import { IGame } from '../../type/ReducerType';
const snakeImg = require('../../resources/images/snack.png');
const robotImg = require('../../resources/images/robot.png');

interface IScreenInfoProps {
  game?: IGame;
}
interface IScreenInfoState {}

@connect(
  state => ({
    game: state.game
  }),
  dispatch => ({
    actions: bindActionCreators({}, dispatch)
  })
)
export default class ScreenInfo extends React.Component<
  IScreenInfoProps,
  IScreenInfoState
> {
  render() {
    const { game } = this.props;
    return (
      <div className='right'>
        <div className='record'>
          <label>分数：</label>
          <Number number={game.get('code')} />
          <img src={snakeImg} />
        </div>
        <div className='level'>
          <label>模式</label>
          <Number number={game.get('modal')} />
        </div>
        <div className='set'>
          <Music data={!game.get('volume')} />
          <Pause data={game.get('pause')} />
        </div>
        <div className='time'>
          <img src={robotImg} />
          <Number time={true} />
        </div>
      </div>
    );
  }
}
