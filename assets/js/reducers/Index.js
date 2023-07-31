import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import commitReducer from './CommitReducer';
import repositoryReducer from './RepositoryReducer';
import pageReducer from './PageReducer';

// Combine Reducers
const reducers = combineReducers({
  form: formReducer,
  commitState: commitReducer,
  repositoryState: repositoryReducer,
  selectedPageState: pageReducer,
});

export default reducers;
