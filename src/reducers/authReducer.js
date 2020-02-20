import {
  LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
  LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
  REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
  RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL
} from '../actions/types';

const initialState = {
  user: null,
  error: null,
  loading: false,
  loadingAction: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {...state, loadingAction: true }
    case LOGIN_USER_SUCCESS:
      return {...state, loadingAction: false, user: action.payload, error: null }
    case LOGIN_USER_FAIL:
      return {...state, loadingAction: false, error: action.payload }
    case LOGOUT_USER_START:
      return {...state, loading: true }
    case LOGOUT_USER_SUCCESS:
      return {...state, loading: false }
    case LOGOUT_USER_FAIL:
      return {...state, loading: false, error: action.payload }
    case REGISTER_USER_START:
      return {...state, loadingAction: true}
    case REGISTER_USER_SUCCESS:
      return {...state, loadingAction: false}
    case REGISTER_USER_FAIL:
      return {...state, loadingAction: false, error: action.payload }
    case RESET_PASSWORD_START:
      return {...state, loadingAction: true, }
    case RESET_PASSWORD_SUCCESS:
      return {...state, loadingAction: false }
    case RESET_PASSWORD_FAIL:
      return {...state, loadingAction: false, error: action.payload }
    default:
      return state;
  }
}
