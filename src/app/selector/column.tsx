export const getSize = (state): { column: number; row: number } => {
  return { column: state.size.get('column'), row: state.size.get('row') };
};
