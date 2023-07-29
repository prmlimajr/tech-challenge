import axios from 'axios';
import store from '../store';
import {
  getCommitsSuccess,
} from '../actions/CommitActions';

export const getCommits = () => axios.get(`/api/commits/`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });
