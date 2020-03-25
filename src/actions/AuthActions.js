//Azioni per l'autenticazione utenti

import {
  LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
  LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
  REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
  RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
} from './types';
import firebase from '../api/firebase';
import { Toast } from 'native-base';
import { Notifications } from 'expo';
import { localize } from '../locales/i18n';

const printErrorByCode = (code) => {
  if(code)
    code = code.split('/')[1];
  switch (code) {
    case 'invalid-email' :
      return localize("auth.invalidEmail");
    case 'user-not-found' :
      return localize("auth.accountNotFound");
    case 'wrong-password' :
      return localize("auth.wrongPassword");
    case 'weak-password' :
      return localize("auth.weakPassword");
    case 'email-already-in-use' :
      return localize("auth.alreadyEmail");
    case 'too-many-requests' :
      return localize("auth.tooMany");
    default:
      return localize("auth.error", {code: code});
  }
}

/* Login alla pressione del bottone */
const login = ({ email, password }) => {
   return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    firebase.auth().signInWithEmailAndPassword(email.trim(), password)
      .then(user => {
        firebase.database().ref('users/'+user.user.uid).once('value', snapshot => {
          var data = snapshot.val();
          var out = {
            "uid" : user.user.uid,
            "displayName" : (data.name+" "+data.surname).trim(),
            "image": data.image,
            "tutorial": data.tutorial,
          }
          dispatch({ type: LOGIN_USER_SUCCESS, payload: out });
        });
      })
      .catch(error => 
        {
          Toast.show({
            text: printErrorByCode(error.code),
            position: 'bottom',
            type: 'danger',
            duration: 2000,
            style: { backgroundColor: "#e74c3c" },
            textStyle: { fontFamily: "Blogger", fontSize: 16, textAlign:'center' }
          });
          dispatch({ type: LOGIN_USER_FAIL, payload: error });
        });
  }
}

/*Crea o aggiorna utente nel database di firebase aggiungendo alcuni dati come immagine, token per notifiche, ...*/

const updateToken = async(user) => {
  const token = await Notifications.getExpoPushTokenAsync();
  const uid = user.uid;
  firebase.database().ref('users/'+uid).update({
    "token" : token
  })
}

const addUser = async(user) => {
  const uid = user.uid;
  const displayName = user.displayName ? user.displayName.toUpperCase() :
  user.email.substring(0, user.email.indexOf("@")).toUpperCase();
  const array = displayName.split(" ");
  const name = array[0];
  const surname = array.length>1 ? array[array.length-1] : "";
  const image = user.photoURL ? user.photoURL+"?type=large" : false;
  firebase.database().ref('users/'+uid).update({
    "name": name,
    "surname": surname,
    "image" : image,
    "tutorial": true
  })
}


/* Verifica se l'utente è loggato o no */
const loadingUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    firebase.auth().onAuthStateChanged((user) => 
    {
      if(user)
      {
        updateToken(user);
        firebase.database().ref('users/'+user.uid).on('value', snapshot => {
          var data = snapshot.val();
          var out = {
            "uid" : user.uid,
            "displayName" : (data.name+" "+data.surname).trim(),
            "image": data.image,
            "tutorial": data.tutorial
          }
          dispatch({ type: LOGIN_USER_SUCCESS, payload: out });
        });
      }
      else
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    })
  }
}



/* Accesso con Facebook */
const signInWithFacebook = (facebookToken) => {
    return (dispatch) => {
      dispatch({ type: LOGIN_USER_START });
      const credential = firebase.auth.FacebookAuthProvider.credential(facebookToken);
      firebase.auth().signInWithCredential(credential)
      .then((user) =>  user.additionalUserInfo.isNewUser ? addUser(user.user) : updateToken(user.user) )
      .catch((error) =>  dispatch({ type: LOGIN_USER_FAIL, payload: error }));
    }
}

/* Accesso con Google */
const signInWithGoogle = (googleToken) => {
    return (dispatch) => {
      dispatch({ type: LOGIN_USER_START });
      const credential = firebase.auth.GoogleAuthProvider.credential(null, googleToken);
      firebase.auth().signInWithCredential(credential)
      .then((user) =>  user.additionalUserInfo.isNewUser ? addUser(user.user) : updateToken(user.user))
      .catch((error) => dispatch({ type: LOGIN_USER_FAIL, payload: error }));
    }
}


/* Disconnette l'utente */
const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER_START });
    firebase.auth().signOut()
    .then(() => dispatch({ type: LOGOUT_USER_SUCCESS }))
    .catch((error) => dispatch({ type: LOGOUT_USER_FAIL, payload: error }));
  }
}


/* Usa la funzione di firebase per ripristinare la password all'indirizzo mail specificato*/
const resetPassword = (email) => {
  return(dispatch) => {
    dispatch({type: RESET_PASSWORD_START });
    firebase.auth().sendPasswordResetEmail(email.trim()).then(() => {
      Toast.show({
        text: localize("auth.sentLink"),
        position: 'bottom',
        type: 'success',
        duration: 2000,
        style: { backgroundColor: "#1abc9c" },
        textStyle: { fontFamily: "Blogger", fontSize: 16, textAlign:'center' }
      });
      dispatch({type: RESET_PASSWORD_SUCCESS });
    }).catch(function(error) {
      Toast.show({
        text: printErrorByCode(error.code),
        position: 'bottom',
        type: 'danger',
        duration: 2000,
        style: { backgroundColor: "#e74c3c" },
        textStyle: { fontFamily: "Blogger", fontSize: 16, textAlign:'center' }
      });
      dispatch({type: RESET_PASSWORD_FAIL, payload: error });
    });
  }
}

/* Crea un nuovo utente (con email e password) in firebase */
const register = ({ email, password }) => {
  return (dispatch) => {
    dispatch({type: REGISTER_USER_START });
    firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
    .then((user) => {
      addUser(user.user)
      dispatch({ type: REGISTER_USER_SUCCESS })
    })
    .catch((error) =>  {
      Toast.show({
        text: printErrorByCode(error.code),
        position: 'bottom',
        type: 'danger',
        duration: 2000,
        style: { backgroundColor: "#e74c3c" },
        textStyle: { fontFamily: "Blogger", fontSize: 16, textAlign:'center' }
      })
      dispatch({ type: REGISTER_USER_FAIL, payload: error })
    })
  }
}



export {login, signInWithFacebook, logout, signInWithGoogle, register, loadingUser, addUser, resetPassword}
