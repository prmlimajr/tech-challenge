import * as types from './ActionTypes';

export const getRepositoriesSuccess = repositories => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const createRepositorySuccess = (successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {successMessage},
});

export const closeMessage = () => ({
  type: types.CLOSE_MESSAGE
})

export const setLoading = (loading) => ({
  type: types.REPOSITORIES_PENDING,
  payload: {loading},
})

export const setErrorMessage = (errorMessage) => ({
  type: types.ERROR_MESSAGE,
  payload: { errorMessage },
});
