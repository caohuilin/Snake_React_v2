import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FontAwesome from 'react-fontawesome';
import './style.less';
const backgroundImg = require('../resources/images/snack.png');

interface IAppProps {
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
class App extends React.Component<IAppProps, any> {
  constructor(props: IAppProps) {
    super(props);
  }
  render() {
    return (
      <div className='app'>
        <div className='layout'>
          <div className='header'>
            <div className='left'>
              <span></span>
              <div className='cell'></div>
              <div className='cell'></div>
            </div>
            <span>SNAKE</span>
            <div className='right'>
              <div className='top'>
                <div className='cell'></div>
                <div className='cell'></div>
                <div className='cell'></div>
              </div>
              <div className='bottom'>
                <div className='cell'></div>
                <div className='cell'></div>
              </div>
              <span></span>
            </div>
          </div>
          <div className='content'>
            <div className='main'>
              <div className='screen'>
                <div className='left'>
                  {
                    [].fill.call(new Array(247),0).map((item, i) => {
                      return <div className='cell'></div>;
                    })
                  }
                </div>
                <div className='right'></div>
              </div>
            </div>
          </div>
          <div className='keyboard'>
            <div className='left'>
              <div className='top'>
                <ul>
                  <li>
                    <button></button>
                    <FontAwesome name='volume-off' />
                  </li>
                  <li>
                    <button></button>
                    <FontAwesome name='gamepad' />
                  </li>
                  <li>
                    <button></button>
                    <FontAwesome name='play' />
                  </li>
                  <li>
                    <button></button>
                    <FontAwesome name='cog' />
                  </li>
                </ul>
              </div>
              <div className='bottom'>
                <ul>
                  <li>
                    <button></button>
                    <FontAwesome name='bolt' />
                  </li>
                  <li>
                    <button></button>
                    <FontAwesome name='pause' />
                  </li>
                </ul>
              </div>
            </div>
            <div className='right'>
              <div className='top'>
                <button><FontAwesome name='angle-double-up' /></button>
              </div>
              <div className='center'>
                <button><FontAwesome name='angle-double-left' /></button>
                <div className='icon'>
                  <div className='top'>
                    <FontAwesome name='caret-up' />
                  </div>
                  <div className='center'>
                    <FontAwesome name='caret-left' />
                    <FontAwesome name='caret-right' />
                  </div>
                  <div className='bottom'>
                    <FontAwesome name='caret-down' />
                  </div>
                </div>
                <button><FontAwesome name='angle-double-right' /></button>
              </div>
              <div className='bottom'>
                <button><FontAwesome name='angle-double-down' /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
