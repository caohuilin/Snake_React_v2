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
  game?: any;
}

interface IGameMainState {
  showFood?: boolean;
  start?: any;
}

@connect(
  state => ({
    column: state.column.get('cnt'),
    snake: state.snake.get('snake'),
    food: state.food.get('food'),
    direction: state.direction,
    game: state.game
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
  startTimer = null;
  constructor(props: IGameMainProps) {
    super(props);
    this.state = {
      showFood: true,
      start: [{x: this.props.column - 1, y: 0, de: 0, pm: 1, index: 1}],
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
  isDead(node: {x: number, y: number}) {
    const snake = this.props.snake.toJS();
    return snake.filter(item => item.x === node.x && item.y === node.y).length !== 0;
  }
  goNext = () => {
    const { snake, direction, food } = this.props;
    const currentSnake = snake.toJS();
    const currentFood = food.toJS();
    let next = this.getNext(currentSnake[0], direction.get('snake'));
    if (this.isDead(next)) {
      clearInterval(this.timer);
      clearInterval(this.foodTimer);
      this.props.actions.setGameInit(-1);
      this.props.actions.initSnack();
      this.startTimer = setInterval(this.renderStart, 10);
      return;
    }
    currentSnake.unshift(next);
    if (next.x !== currentFood.x || next.y !== currentFood.y) {
      currentSnake.pop();
    } else {
      this.props.actions.getCode();
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
    if (code === 38 && this.props.game.get('init') === 0) {
      this.props.actions.setGameInit(1);
      this.props.actions.clearCode();
      this.setState({ start: [{x: this.props.column - 1, y: 0, de: 0, pm: 1, index: 1}] });
      this.startGame();
    } else if (code === 38 && direction !== 1) {
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
  getNewXY = (start) => {
    const column = this.props.column;
    let next: {x?: number, y?: number, de?: number, pm?: number, index?: number} = {};
    const {x, y, de, pm, index} = start;
    next.x = de === 1 ? x + pm : x;
    next.y = de === 0 ? y + pm : y;
    next.de = de;
    next.pm = pm;
    next.index = index;
    if (next.x === column - index - 1 && next.y === index - 1 && next.x !== Math.floor(column / 2) && next.y !== Math.floor(Row / 2)) {
      next.index += 1;
    }
    if (de === 0 && (next.y === Row - next.index || (next.y === next.index - 1 && next.x === index - 1))) {
      next.de = 1;
    }
    if (de === 1 && (next.x === column - next.index || next.x === next.index - 1)) {
      next.de = 0;
    }
    if (next.y === Row - next.index && next.x === column - next.index) {
      next.pm = -1;
    }
    if (next.y === next.index - 1 && next.x === next.index - 1) {
      next.pm = 1;
    }

    if (next.x ===  Math.floor(Row / 2) && next.y === Math.floor(Row / 2)) {
      this.props.actions.setGameInit(0);
      if (this.startTimer) { clearInterval(this.startTimer); };
    }
    return next;
  }
  renderStart = () => {
    let start = this.state.start;
    const length = start.length;
    const nextXY = this.getNewXY(start[length - 1]);
    start.push(nextXY);
    this.setState({start: start});
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.startTimer = setInterval(this.renderStart, 10);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.foodTimer);
    clearTimeout(this.startTimer);
  }
  render() {
    const { column, snake, food, game } = this.props;
    const { showFood, start } = this.state;
    return (
      <div className='left' onKeyDown={this.keyDown} tabIndex={0}>
        {game.get('init') === 0 && <Logo />}
        {
          [].fill.call(new Array(column), 0).map((item, i) => {
            return [].fill.call(new Array(Row), 0).map((item, j) => {
              return <div className='cell' key={i * Row + j}></div>;
            });
          })
        }
        {
          game.get('init') === 1 && snake.map((item, i) => {
            return <div key={i} style={this.getSnakePosition(item.toJS())} className='cell snake-cell'></div>;
          })
        }
        { game.get('init') === 1 &&  <div style={this.getSnakePosition(food.toJS())} className={`cell ${showFood ? 'food-o-cell' : 'food-cell'}`}></div>}
        {
          game.get('init') === -1 && start.map((item, i) => {
            return <div key={i} style={this.getSnakePosition(item)} className='cell snake-cell'></div>;
          })
        }
      </div>
    );
  }
}
