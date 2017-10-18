import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ExceptHeight, Row } from '../../constants';
import Logo from '../Logo';
import * as WindowActions from '../../actions/window';

interface IGameMainProps {
  actions: any;
  column: number;
}

interface IGameMainState {
}

@connect(
  state => ({
    column: state.column.get('cnt')
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        ...WindowActions
      },
      dispatch
    )
  })
)

export default class GameMain extends React.Component<
  IGameMainProps,
  IGameMainState
> {
  handleResize = () => {
    const windowHeight = window.innerHeight;
    const gameHeight = windowHeight - ExceptHeight; // 500为当前界面出去屏幕外的高度和
    const column = Math.floor(gameHeight / Row);
    this.props.actions.resetColumn(column);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }
  render() {
    const { column } = this.props;
    return (
      <div className='left'>
        <Logo cur={false} reset={false} />
        {
          [].fill.call(new Array(column), 0).map((item, i) => {
            return [].fill.call(new Array(Row), 0).map((item, j) => {
              return <div className='cell' key={i * Row + j}></div>;
            });
          })
        }
      </div>
    );
  }
}
