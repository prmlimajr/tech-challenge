import * as types from './ActionTypes';

export const setPage = page => ({
  type: types.SELECT_PAGE,
  payload: page,
});
