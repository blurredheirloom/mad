import {
  FRIENDS_FETCH_START, FRIENDS_FETCH_SUCCESS,
  USER_SEARCH_START, USER_SEARCH_SUCCESS,
  SENDING_REQUEST, SENT_REQUEST, USER_SEARCH_FAIL, GET_PENDING_REQUESTS
} from '../actions/types';

const initialState = {
    friends: [],
    foundItems: [],
    error: '',
    loading: false,
    pendingRequests: 0
}

export default function friendReducer(state = initialState, action) {
	switch(action.type) {
    case FRIENDS_FETCH_START:
      return {...state, loading: true}
    case FRIENDS_FETCH_SUCCESS:
      return {...state, loading: false, friends: action.payload }
    case USER_SEARCH_START:
      return {...state, loading: true}
    case USER_SEARCH_SUCCESS:
      return {...state, loading: false, foundItems: action.payload, error: '' }
    case USER_SEARCH_FAIL:
      return {...state, loading: false, error: action.payload }
    case GET_PENDING_REQUESTS: 
      return {...state, loading: false, pendingRequests: action.payload }
    case SENDING_REQUEST:
      return {...state, loading: true}
    case SENT_REQUEST:
      return {...state, loading: false}
    default:
      return state;
  }
};
