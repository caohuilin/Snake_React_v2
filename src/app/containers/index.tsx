import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import KeyBoard from '../components/KeyBoard';
import ScreenInfo from '../components/ScreenInfo';
import GameMain from '../components/GameMain';

import * as GameActions from '../actions/game';
import { IDirection, IGame } from '../type/ReducerType';
import './style.less';

interface IAppProps {
  actions: any;
  direction: IDirection;
  game: IGame;
}
interface IAppState {}

@connect(
  state => ({
    direction: state.direction,
    game: state.game
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        ...GameActions
      },
      dispatch
    )
  })
)
class App extends React.Component<IAppProps, IAppState> {
  timer = null;
  componentDidMount() {
    this.timer = setInterval(this.props.actions.setGameTime, 10);
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  handleKeyDown = code => {
    if (code === 1) {
      this.props.actions.setVolume();
      return;
    }
    const init = this.props.game.get('init');
    switch (init) {
      case 0: // 状态：初始动画加载完毕
        if (code === 2 || code === 0) {
          // 开始游戏
          // 开始游戏按钮 code = 2
          this.props.actions.setGameInit(1);
          this.props.actions.clearCode();
        } else if (code === 3) {
          // 设置游戏模式
          this.props.actions.setGameInit(-2);
        }
        break;
      case 1: // 游戏中
        let direction = this.props.direction.get('snake');
        if (code === 38) {
          direction = 0;
        } else if (code === 40) {
          direction = 1;
        } else if (code === 37) {
          direction = 2;
        } else if (code === 39) {
          direction = 3;
        } else if (code === 32) {
          this.props.actions.pauseGame();
        } else if (code === 4) {
          this.props.actions.pauseGame({ pause: true });
        } else if (code === 2) {
          this.props.actions.pauseGame({ pause: false });
        } else if (code === 0 && !this.props.game.get('pause')) {
          // 重新开始 code = 0
          this.props.actions.setGameInit(-1);
          this.props.actions.initSnack();
        }
        if (direction !== this.props.direction.get('snake')) {
          this.props.actions.setSnackNextDirection(direction);
        }
        break;
      case -2: // 设置游戏模式
        if (code === 37 || code === 39) {
          this.props.actions.setModal();
        } else if (code === 2) {
          this.props.actions.setGameInit(1);
        }
        break;
    }
  };
  keyDown = (event: any) => {
    const code = event.nativeEvent.keyCode;
    this.handleKeyDown(code);
  };
  render() {
    return (
      <div className='app' onKeyDown={this.keyDown} tabIndex={0}>
        <div className='layout'>
          <div className='layout-top'>
            <Header />
            <div className='content'>
              <div className='main'>
                <div className='screen'>
                  <GameMain />
                  <ScreenInfo />
                </div>
              </div>
            </div>
          </div>
          <KeyBoard handleKeyDown={this.handleKeyDown} />
        </div>
      </div>
    );
  }
}

export default App;
