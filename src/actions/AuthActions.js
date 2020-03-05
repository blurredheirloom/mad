//Azioni per l'autenticazione utenti

import {
  LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
  LOGOUT_USER_START, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
  REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
  RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
} from './types';
import firebase from 'firebase';
import { Toast } from 'native-base';
import { Notifications } from 'expo';

const printErrorByCode = (code) => {
  if(code)
    code = code.split('/')[1];
  switch (code) {
    case 'invalid-email' :
      return "Indirizzo email non valido";
    case 'user-not-found' :
      return "Account non trovato";
    case 'wrong-password' :
      return "Password errata";
    case 'weak-password' :
      return "Password troppo debole";
    case 'email-already-in-use' :
      return "Indirizzo email già esistente";
    case 'too-many-requests' :
      return "Troppi tentativi falliti. Attendi un attimo e riprova";
    default:
      return "Errore: "+code;
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
            "uid" : user.uid,
            "displayName" : (data.name+" "+data.surname).trim(),
            "image": data.image
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
            textStyle: { fontFamily: "Quicksand", fontSize: 12, textAlign:'center' }
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
        firebase.database().ref('users/'+user.uid).on('value', snapshot => {
          var data = snapshot.val();
          var out = {
            "uid" : user.uid,
            "displayName" : (data.name+" "+data.surname).trim(),
            "image": data.image
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
        text: "E' stato inviato un link per reimpostare la password",
        position: 'bottom',
        type: 'success',
        duration: 2000,
        style: { backgroundColor: "#1abc9c" },
        textStyle: { fontFamily: "Quicksand", fontSize: 12, textAlign:'center' }
      });
      dispatch({type: RESET_PASSWORD_SUCCESS });
    }).catch(function(error) {
      Toast.show({
        text: printErrorByCode(error.code),
        position: 'bottom',
        type: 'danger',
        duration: 2000,
        style: { backgroundColor: "#e74c3c" },
        textStyle: { fontFamily: "Quicksand", fontSize: 12, textAlign:'center' }
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
        textStyle: { fontFamily: "Quicksand", fontSize: 12, textAlign:'center' }
      })
      dispatch({ type: REGISTER_USER_FAIL, payload: error })
    })
  }
}



export {login, signInWithFacebook, logout, signInWithGoogle, register, loadingUser, addUser, resetPassword}
