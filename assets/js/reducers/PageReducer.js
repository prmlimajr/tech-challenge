import * as types from '../actions/ActionTypes';

const initialState = {
  page: 1
};

const pageReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SELECT_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }

    default:
      return state;
  }
}

export default pageReducer;
