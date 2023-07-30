import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import { createRepositorySuccess, getRepositoriesSuccess, setLoading } from '../actions/RepositoryActions';
import { getCommits } from './CommitAPI';

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(setLoading(true));

    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
  }).catch((error) => {
    const err = error.response;

    console.log(err);
  }).finally(() => {
    getRepositories();
    getCommits();
  });

export const getRepositories = () => axios.get('/api/repositories')
  .then((response) => {
    store.dispatch(setLoading(true));

    store.dispatch(getRepositoriesSuccess({...response.data}));
  }).catch((error) => {
    const err = error.response;

    console.log(err)
  }).finally(() => {
    store.dispatch(setLoading(false));
  });
