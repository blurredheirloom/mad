import {
  SHARE_SURVEY_START, SHARE_SURVEY_SUCCESS,
  SHARED_SURVEYLIST_FETCH_START, SHARED_SURVEYLIST_FETCH_SUCCESS
} from '../actions/types';

const initialState = {
  error: '',
  loading: false,
  sharedsurveys: [],
  pendingSurveys: 0
}

export default function shareReducer(state = initialState, action) {
  switch (action.type) {
    case SHARE_SURVEY_START:
      return {...state, loading: true}
    case SHARE_SURVEY_SUCCESS:
      return {...state, loading: false}
    case SHARED_SURVEYLIST_FETCH_START:
      return {...state, loading: true, sharedsurveys: []}
    case SHARED_SURVEYLIST_FETCH_SUCCESS:
      return {...state, loading: false, sharedsurveys: action.payload, pendingSurveys: action.pending }
    default:
      return state;
  }
};
