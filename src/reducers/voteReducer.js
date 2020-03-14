import {
  GET_AUTHOR_START, GET_AUTHOR_SUCCESS,
  GET_VOTE_START, GET_VOTE_SUCCESS,
  GET_REACTIONS_START, GET_REACTIONS_SUCCESS,
  HAS_TO_VOTE_START, HAS_TO_VOTE_SUCCESS,
  VOTING_START, VOTING_SUCCESS,
  QUESTIONS_FETCH_START, QUESTIONS_FETCH_SUCCESS
} from '../actions/types';

const initialState = {
    author: {},
    questions: [],
    loading: false,
    yourVotes: false,
    yourReaction: false,
    hasToVote: 0,
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
    case HAS_TO_VOTE_START:
      return {...state, loading: true}
    case HAS_TO_VOTE_SUCCESS:
      return {...state, loading: false, hasToVote: action.payload}
    case QUESTIONS_FETCH_START:
        return {...state, loading: true, questions: []}
    case QUESTIONS_FETCH_SUCCESS:
        return {...state, loading: false, questions: action.payload}
    default:
      return state;
  }
};
