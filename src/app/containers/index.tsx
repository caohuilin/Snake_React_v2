import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Header';
import KeyBoard from '../components/KeyBoard';
import ScreenInfo from '../components/ScreenInfo';
import GameMain from '../components/GameMain';
import './style.less';

interface IAppProps {
  music: boolean;
  pause: boolean;
}
interface IAppState {
}

@connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
      },
      dispatch
    )
  })
)
class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
  }
  render() {
    return (
      <div className='app'>
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
          <KeyBoard />
        </div>
      </div>
    );
  }
}

export default App;
