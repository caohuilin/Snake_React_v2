import { createAction } from 'redux-actions';

export const initSnack = createAction('init snake');
export const setSnack = createAction('set snake');
export const setFood = createAction('set food');
export const setSnackDirection = createAction('set snake direction');
export const setGameInit = createAction('set game init');
export const getCode = createAction('get code');
export const clearCode = createAction('clear code');
