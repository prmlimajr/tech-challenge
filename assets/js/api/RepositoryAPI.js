import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess,
  getRepositoriesSuccess,
  setErrorMessage,
  setLoading
} from '../actions/RepositoryActions';
import { getCommits } from './CommitAPI';

export const createRepository =
  (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
    .then((response) => {
      store.dispatch(setLoading(true));

      store.dispatch(createRepositorySuccess(response.data.message));

      formDispatch(reset('repoCreate'));
    }).catch((error) => {
      const err = error.response;

      store.dispatch(setErrorMessage(err.data.error));
    }).finally(() => {
      getRepositories();
      getCommits(1);
    });

export const getRepositories = () => axios.get(`/api/repositories`)
  .then((response) => {
    store.dispatch(setLoading(true));

    store.dispatch(getRepositoriesSuccess({...response.data}));
  }).catch((error) => {
    const err = error.response;

    store.dispatch(setErrorMessage(err.data.error));
  }).finally(() => {
    store.dispatch(setLoading(false));
  });
