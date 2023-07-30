import * as types from '../actions/ActionTypes';

const initialState = {
  repositories: [],
  successMessage: false,
  loading: false
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REPOSITORIES_PENDING: {
      return {
        ...state,
        loading: action.payload.loading,
      }
    }

    case types.CREATE_REPOSITORY_SUCCESS: {
      return {
        ...state,
        successMessage: action.payload.successMessage,
      };
    }

    case types.GET_REPOSITORIES_SUCCESS: {
      return {
        ...state,
        repositories: action.payload.results,
      }
    }

    case types.CLOSE_MESSAGE: {
      return {
        ...state,
        successMessage: false
      }
    }

    default:
      return state;
  }
}

export default repositoryReducer;
