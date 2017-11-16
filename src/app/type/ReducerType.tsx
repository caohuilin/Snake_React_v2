import { IDirection } from '../reducers/direction';
import { IFood } from '../reducers/food';
import { IGame } from '../reducers/game';
import { ISize } from '../reducers/size';
import { ISnake } from '../reducers/snake';

export interface IRouting {
  locationBeforeTransitions: {
    pathname: string;
  };
}

export interface IAllState {
  routing: IRouting;
  direction: IDirection;
  food: IFood;
  game: IGame;
  size: ISize;
  snake: ISnake;
}
export { IDirection, IFood, IGame, ISize, ISnake };
