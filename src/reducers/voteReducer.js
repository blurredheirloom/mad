import {
  GET_AUTHOR_START, GET_AUTHOR_SUCCESS,
  GET_VOTE_START, GET_VOTE_SUCCESS,
  GET_REACTIONS_START, GET_REACTIONS_SUCCESS,
  VOTING_START, VOTING_SUCCESS
} from '../actions/types';

const initialState = {
    author: {},
    loading: false,
    yourVotes: false,
    yourReaction: false,
    reactions: []
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
      return {...state, loading: false, yourVotes: action.payload.votes, yourReaction: action.payload.reaction}
    case VOTING_START:
      return {...state, loading: true}
    case GET_REACTIONS_START:
      return {...state, loading: true}
    case GET_REACTIONS_SUCCESS:
      return {...state, loading: false, reactions: action.payload}
    case VOTING_SUCCESS:
      return {...state, loading: false}
    default:
      return state;
  }
};
