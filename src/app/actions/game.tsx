import { createAction } from 'redux-actions';

export const setGameTime = createAction('set game time');
export const initSnack = createAction('init snake');
export const setSnack = createAction('set snake');
export const setFood = createAction('set food');
export const setSnackCurrentDirection = createAction(
  'set snake current direction'
);
export const setSnackNextDirection = createAction('set snake next direction');
export const setGameInit = createAction('set game init');
export const getCode = createAction('get code');
export const clearCode = createAction('clear code');
export const setModal = createAction('set modal');
export const pauseGame = createAction('pause game');
export const setVolume = createAction('set volume');
