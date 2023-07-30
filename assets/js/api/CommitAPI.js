import axios from 'axios';
import store from '../store';
import {
  getCommitsSuccess, setLoading,
} from '../actions/CommitActions';

export const getCommits = () => axios.get(`/api/commits/`)
  .then((response) => {
    store.dispatch(setLoading(true));

    store.dispatch(getCommitsSuccess({...response.data}));
  }).catch((error) => {
    const err = error.message;

    console.log(err);
  }).finally(() => {
    store.dispatch(setLoading(false));
  });
