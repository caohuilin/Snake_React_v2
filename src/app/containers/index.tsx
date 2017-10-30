import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Header';
import KeyBoard from '../components/KeyBoard';
import ScreenInfo from '../components/ScreenInfo';
import GameMain from '../components/GameMain';

import * as GameActions from '../actions/game';
import './style.less';

interface IAppProps {
  actions: any;
  direction: any;
  game: any;
  column: any;
}
interface IAppState {
}

@connect(
  state => ({
    direction: state.direction,
    game: state.game,
    column: state.column.get('column')
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
  handling: boolean = false;
  constructor(props: IAppProps) {
    super(props);
  }
  handleKeyDown = (code) => {
    if (this.handling) {
      return;
    }
    this.handling = true;
    const init = this.props.game.get('init');
    if (code === 1) {
      this.props.actions.setVolume();
    } else if (init === 0) {// 初始化完毕
      if (code === 2 || code === 0 ) {// 开始游戏
        this.props.actions.setGameInit(1);
        this.props.actions.clearCode();
        this.props.actions.startGame();
      } else if (code === 3) {// 设置游戏模式
        this.props.actions.setGameInit(-2);
      }
    } else if (init === 1) {// 游戏中
      let direction = this.props.direction.get('snake');
      if (code === 38 && direction !== 1) {
        direction = 0;
      } else if (code === 40 && direction !== 0) {
        direction = 1;
      } else if (code === 37 && direction !== 3) {
        direction = 2;
      } else if (code === 39 && direction !== 2) {
        direction = 3;
      } else if (code === 32) {
        this.props.actions.pauseGame();
      } else if (code === 4) {
        this.props.actions.pauseGame({pause: true});
      } else if (code === 2) {
        this.props.actions.pauseGame({pause: false});
        this.props.actions.startGame();
      } else if (code === 0 && !this.props.game.get('pause')) {
        this.props.actions.endGame();
        this.props.actions.setGameInit(-1);
        this.props.actions.initSnack();
        setTimeout(this.handleKeyDown.bind(null, 2), 0);
      }
      this.props.actions.setSnackDirection(direction);
    } else if (init === -2) {// 设置游戏模式
      if (code === 37 || code === 39) {
        this.props.actions.setModal();
      } else if (code === 2) {
        this.props.actions.setGameInit(1);
        this.props.actions.startGame();
      }
    } else if (init === -1 && code === 2) {// 初始化中
      setTimeout(this.handleKeyDown.bind(null, 2), 0);
    }
    setTimeout(this.resetHandle, 250);
  }
  resetHandle = () => {
    this.handling = false;
  }
  keyDown = (event: any) => {
    const code = event.nativeEvent.keyCode;
    this.handleKeyDown(code);
  }
  render() {
    return (
      <div className='app' onKeyDown={this.keyDown} tabIndex={0}>
        <div className='layout'>
          <Header />
          <div className='content'>
            <div className='main'>
              <div className='screen'>
                <GameMain />
                <ScreenInfo />
              </div>
            </div>
          </div>
          <KeyBoard handleKeyDown={this.handleKeyDown}/>
        </div>
      </div>
    );
  }
}

export default App;
