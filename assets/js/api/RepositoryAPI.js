import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import { createRepositorySuccess, getRepositoriesSuccess } from '../actions/RepositoryActions';

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
  }).catch((error) => {
    const err = error.response;
    console.log(err);
  });

export const getRepositories = () => axios.get('/api/repositories')
  .then((response) => {
    console.log({ response })
    store.dispatch(getRepositoriesSuccess({...response.data}));
  });
