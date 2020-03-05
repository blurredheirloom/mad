//Azioni per l'autenticazione utenti

import {
  GET_AVATARS_START, GET_AVATARS_SUCCESS,
  SET_AVATAR_START, SET_AVATAR_SUCCESS
} from './types';
import firebase from 'firebase';
//import * as FileSystem from 'expo-file-system';

/*const addAvatars = () => {
  return async (dispatch) => {
    dispatch({type: GET_AVATARS_START });
    var storageRef = firebase.storage().ref('avatars');
    const fileUri = FileSystem.cacheDirectory+"avatars/";
    storageRef.listAll().then(result => {
      result.items.forEach(ref => {
        ref.getDownloadURL().then((url) => {
            let name = url.replace(/\?.*$/,"").replace(/.*\//,"").replace("avatars%2F","")
            firebase.database().ref('avatars/').push({name: name, url: url});
        })
      })
    })
    dispatch({ type: GET_AVATARS_START})
  }
}*/

const getAvatars = () => {
  return async (dispatch) => {
    dispatch({type: GET_AVATARS_START });
    firebase.database().ref('avatars/').on('value', snapshot => {
      var data = snapshot.val();
      if(!data)
      {
        return dispatch({ type: GET_AVATARS_SUCCESS, payload: []})
      }
      var keys = Object.keys(data);
      var newItems = [];
      keys.forEach(key => {
          newItems.push({
              "name": data[key].name,
              "url": data[key].url,
              "key": key,
          });
      });
     dispatch({ type: GET_AVATARS_SUCCESS, payload: newItems})
   })
  }
}

const setAvatar = (user, image, personal) => {
  if(personal===false)
  return (dispatch) => {
    dispatch({type: SET_AVATAR_START });
      firebase.storage().ref('avatars').child(image).getDownloadURL().then(url => {
        firebase.database().ref('users/'+user).update({"image": url})
        dispatch({type: SET_AVATAR_SUCCESS });
      })
  }
  else
    return (dispatch) => {
      dispatch({type: SET_AVATAR_START });
      firebase.storage().ref('avatars/'+user+"/"+user+".png").getDownloadURL().then(url => {
        firebase.database().ref('users/'+user).update({"image": url})
        dispatch({type: SET_AVATAR_SUCCESS });
      })
  }
}

const defaultAvatar = () => {
  return (dispatch) => {
    dispatch({type: SET_AVATAR_START });
    const currentUser =  firebase.auth().currentUser;
    const image = currentUser.photoURL ? currentUser.photoURL+"?type=large" : false;
    firebase.database().ref('users/'+currentUser.uid).update({
      "image" : image,
    })
    dispatch({type: SET_AVATAR_SUCCESS });
  }
}


export {getAvatars, setAvatar, defaultAvatar}
