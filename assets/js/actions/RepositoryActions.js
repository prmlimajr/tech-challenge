import * as types from './ActionTypes';

export const getRepositoriesSuccess = repositories => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});
