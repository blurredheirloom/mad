import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import shareReducer from './shareReducer';
import friendReducer from './friendReducer';
import voteReducer from './voteReducer';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const appReducer = combineReducers({
  survey: surveyReducer,
  auth: authReducer,
  friend: friendReducer,
  vote: voteReducer,
  share: shareReducer,
});

const initialState = {};

const store = createStore(
  appReducer,
  initialState,
  applyMiddleware(ReduxThunk)
);

export default store;
