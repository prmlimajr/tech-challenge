import axios from 'axios';
import store from '../store';
import {
  getCommitsSuccess, setLoading,
} from '../actions/CommitActions';
import { setPage } from '../actions/PageActions';

export const getCommits = (page) => axios.get(`/api/commits/?page=${page}`)
  .then((response) => {
    store.dispatch(setLoading(true));

    store.dispatch(setPage(page));

    store.dispatch(getCommitsSuccess({...response.data}));
  }).catch((error) => {
    const err = error.message;

    console.log(err);
  }).finally(() => {
    store.dispatch(setLoading(false));
  });
