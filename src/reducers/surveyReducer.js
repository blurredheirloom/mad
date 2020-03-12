import {
  SURVEYLIST_FETCH_START, SURVEYLIST_FETCH_SUCCESS,
  CREATE_SURVEY_START, CREATE_SURVEY_SUCCESS, 
  UPDATE_SURVEY_START, UPDATE_SURVEY_SUCCESS, 
  ITEMS_FETCH_START, ITEMS_FETCH_SUCCESS,
  DELETE_USER_SURVEYS_START, DELETE_USER_SURVEYS_SUCCESS,
} from '../actions/types';

const initialState = {
    surveys: [],
    questions: [],
    numMembers: 0,
    hasToVote: 0,
    id: null,
    loading: false,
}

export default function surveyReducer(state = initialState, action) {
	switch(action.type) {
    case SURVEYLIST_FETCH_START:
      return {...state, loading: true}
    case SURVEYLIST_FETCH_SUCCESS:
      return {...state, loading: false, surveys: action.payload }
    case CREATE_SURVEY_START:
        return {...state, loading: true}
    case CREATE_SURVEY_SUCCESS:
        return {...state, loading: false, id: action.payload}
    case UPDATE_SURVEY_START:
        return {...state, loading: true}
    case UPDATE_SURVEY_SUCCESS:
        return {...state, loading: false}
    case ITEMS_FETCH_START:
        return {...state, loading: true}
    case ITEMS_FETCH_SUCCESS:
        return {...state, loading: false, questions: action.payload.questions, hasToVote: action.payload.hasToVote, numMembers: action.payload.numMembers }
    case DELETE_USER_SURVEYS_START:
        return {...state, loading: true}
    case DELETE_USER_SURVEYS_SUCCESS:
        return {...state, loading: false, surveys: [], questions: []}
    default:
      return state;
  }
};
