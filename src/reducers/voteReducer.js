import {
  GET_AUTHOR_START, GET_AUTHOR_SUCCESS,
  GET_VOTE_START, GET_VOTE_SUCCESS,
  HAS_TO_VOTE_START, HAS_TO_VOTE_SUCCESS,
  VOTING_START, VOTING_SUCCESS
} from '../actions/types';

const initialState = {
    author: {},
    loading: false,
    yourVotes: false,
    remainingVotes: 0
}

export default function voteReducer(state = initialState, action) {
	switch(action.type) {
    case GET_AUTHOR_START:
      return {...state, loading: true}
    case GET_AUTHOR_SUCCESS:
      return {...state, loading: false, author: action.payload }
    case GET_VOTE_START:
      return {...state, loading: true}
    case GET_VOTE_SUCCESS:
      return {...state, loading: false, yourVotes: action.payload}
    case HAS_TO_VOTE_START:
      return {...state, loading: true}
    case HAS_TO_VOTE_SUCCESS:
      return {...state, loading: false, remainingVotes: action.payload}
    case VOTING_START:
      return {...state, loading: true}
    case VOTING_SUCCESS:
      return {...state, loading: false}
    default:
      return state;
  }
};
