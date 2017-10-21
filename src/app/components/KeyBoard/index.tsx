import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './style.less';

interface IKeyBoardProps {
  handleKeyDown: any;
}

interface IKeyBoardState {
}

export default class KeyBoard extends React.Component<
  IKeyBoardProps,
  IKeyBoardState
> {
  handleClick = (type) => {
    this.props.handleKeyDown(type);
  }
  render() {
    return (
      <div className='keyboard'>
      <div className='left'>
        <div className='top'>
          <ul>
            <li>
              <button onClick={this.handleClick.bind(null, 1)}></button>
              <FontAwesome name='volume-off' />
            </li>
            <li>
              <button onClick={this.handleClick.bind(null, 3)}></button>
              <FontAwesome name='cog' />
            </li>
            <li>
              <button onClick={this.handleClick.bind(null, 4)}></button>
              <FontAwesome name='pause' />
            </li>
            <li>
              <button onClick={this.handleClick.bind(null, 0)}></button>
              <FontAwesome name='undo' />
            </li>
          </ul>
        </div>
        <div className='bottom'>
          <ul>
            <li>
              <button onClick={this.handleClick.bind(null, 2)}></button>
              <FontAwesome name='play' />
            </li>
          </ul>
        </div>
      </div>
      <div className='right'>
        <div className='direction'>
          <div className='top'>
            <button onClick={this.handleClick.bind(null, 38)}><FontAwesome name='angle-double-up' /></button>
          </div>
          <div className='center'>
            <button onClick={this.handleClick.bind(null, 37)}><FontAwesome name='angle-double-left' /></button>
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
            <button onClick={this.handleClick.bind(null, 39)}><FontAwesome name='angle-double-right' /></button>
          </div>
          <div className='bottom'>
            <button onClick={this.handleClick.bind(null, 40)}><FontAwesome name='angle-double-down' /></button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
