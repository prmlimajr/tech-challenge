import axios from 'axios';
import store from '../store';
import {
  getCommitsSuccess, setLoading,
} from '../actions/CommitActions';
import { setPage } from '../actions/PageActions';

export const getCommits = (page, filters) => axios.get(`/api/commits/?page=${page}${filters && filters.repository ? `&repository=${filters.repository}`: ''}${filters && filters.author ? `&author=${filters.author}` : ''}`)
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
