import {
  FRIENDS_FETCH_START, FRIENDS_FETCH_SUCCESS,
  USER_SEARCH_START, USER_SEARCH_SUCCESS,
  SENDING_REQUEST, SENT_REQUEST
} from '../actions/types';

const initialState = {
    friends: [],
    foundItems: [],
    selected: [],
    loading: false
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
      return {...state, loading: false, foundItems: action.payload }
    case SENDING_REQUEST:
        return {...state, loading: true}
    case SENT_REQUEST:
        return {...state, loading: false}
    default:
      return state;
  }
};
