import {
    GET_AVATARS_START, GET_AVATARS_SUCCESS,
    SET_AVATAR_START, SET_AVATAR_SUCCESS
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    avatars: []
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_AVATARS_START:
        return {...state, loading: true}
      case GET_AVATARS_SUCCESS:
        return {...state, loading: false, avatars: action.payload}
      case SET_AVATAR_START:
        return {...state, loading: true}
      case SET_AVATAR_SUCCESS:
        return {...state, loading: false}
      default:
        return state;
    }
  }
  