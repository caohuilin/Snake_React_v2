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
  food?: any;
  direction?: any;
}

interface IGameMainState {
  showFood: boolean;
}

@connect(
  state => ({
    column: state.column.get('cnt'),
    snake: state.snake.get('snake'),
    food: state.food.get('food'),
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
  foodTimer = null;
  constructor(props: IGameMainProps) {
    super(props);
    this.state = {
      showFood: true
    };
  }
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
    if (this.foodTimer ) { clearInterval(this.foodTimer); }
    this.timer = setInterval(this.goNext, 500);
    this.foodTimer = setInterval(this.setFoodShowOrHide, 200);
  }
  goNext = () => {
    const { snake, direction, food } = this.props;
    const currentSnake = snake.toJS();
    let next = this.getNext(currentSnake[0], direction.get('snake'));
    currentSnake.unshift(next);
    if (next.x !== food.toJS().x || next.y !== food.toJS().y) {
      currentSnake.pop();
    } else {
      this.props.actions.setFood();
    }
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
  setFoodShowOrHide = () => {
    this.setState({ showFood: !this.state.showFood});
  }
  keyDown = (event: any) => {
    let direction = this.props.direction.get('snake');
    const code = event.nativeEvent.keyCode;
    if (code === 38 && direction !== 1) {
      direction = 0;
    } else if (code === 40 && direction !== 0) {
      direction = 1;
    } else if (code === 37 && direction !== 3) {
      direction = 2;
    } else if (code === 39 && direction !== 2) {
      direction = 3;
    }
    this.props.actions.setSnackDirection(direction);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    this.startGame();
  }
  render() {
    const { column, snake, food } = this.props;
    const { showFood } = this.state;
    return (
      <div className='left' onKeyDown={this.keyDown} tabIndex={0}>
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
            return <div key={i} style={this.getSnakePosition(item.toJS())} className='cell snake-cell'></div>;
          })
        }
        <div style={this.getSnakePosition(food.toJS())} className={`cell ${showFood ? 'food-o-cell' : 'food-cell'}`}></div>
      </div>
    );
  }
}
