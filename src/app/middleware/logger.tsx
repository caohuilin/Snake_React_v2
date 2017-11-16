export default store => next => action => {
  if (action.type !== 'set game time') {
    console.log(action);
  }
  return next(action);
};
