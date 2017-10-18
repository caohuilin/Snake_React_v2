import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ExceptHeight, Row, deX, deY } from '../../constants';
import Logo from '../Logo';
import * as WindowActions from '../../actions/window';
import * as GameActions from '../../actions/game';
import './style.less';

interface IGameMainProps {
  actions?: any;
  column?: number;
  snake?: any;
  direction: any;
}

interface IGameMainState {
}

@connect(
  state => ({
    column: state.column.get('cnt'),
    snake: state.snake.get('snake'),
    direction: state.direction
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        ...WindowActions,
        ...GameActions
      },
      dispatch
    )
  })
)

export default class GameMain extends React.Component<
  IGameMainProps,
  IGameMainState
> {
  timer = null;
  handleResize = () => {
    const windowHeight = window.innerHeight;
    const gameHeight = windowHeight - ExceptHeight;
    const column = Math.floor(gameHeight / Row);
    this.props.actions.resetColumn(column);
  }
  getSnakePosition = ({x, y}: {x: number, y: number}) => {
    return { transform: `translate(${y * 15 + y}px, ${x * 15 + x}px)` };
  }
  startGame = () => {
    if (this.timer ) { clearInterval(this.timer); }
    this.timer = setInterval(this.goNext, 1000);
  }
  goNext = () => {
    const { snake, direction } = this.props;
    const currentSnake = snake.toJS();
    let next = this.getNext(currentSnake[0], direction.get('snake'));
    currentSnake.unshift(next);
    currentSnake.pop();
    this.props.actions.setSnack(currentSnake);
  }
  getNext = (node: {x: number, y: number}, direction) => {
    const { column } = this.props;
    let x = node.x + deX[direction];
    let y = node.y + deY[direction];
    if (x >= column) { x = 0; }
    if (y >= Row) { y = 0; }
    if (x < 0) { x = column - 1; }
    if (y < 0) { y = Row - 1; }
    return {x, y};
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.startGame();
  }
  render() {
    const { column, snake } = this.props;
    return (
      <div className='left'>
        <Logo cur={true} reset={false} />
        {
          [].fill.call(new Array(column), 0).map((item, i) => {
            return [].fill.call(new Array(Row), 0).map((item, j) => {
              return <div className='cell' key={i * Row + j}></div>;
            });
          })
        }
        {
          snake.map((item, i) => {
            return <div key={i} style={this.getSnakePosition(item)} className='cell snake-cell'></div>;
          })
        }
      </div>
    );
  }
}
