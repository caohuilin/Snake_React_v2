import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './style.less';

interface IKeyBoardProps {
}

interface IKeyBoardState {
}

export default class KeyBoard extends React.Component<
  IKeyBoardProps,
  IKeyBoardState
> {
  render() {
    return (
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
              <FontAwesome name='pause' />
            </li>
            <li>
              <button></button>
              <FontAwesome name='undo' />
            </li>
          </ul>
        </div>
        <div className='bottom'>
          <ul>
            <li>
              <button></button>
              <FontAwesome name='bolt' />
            </li>
          </ul>
        </div>
      </div>
      <div className='right'>
        <div className='direction'>
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
    )
  }
}
