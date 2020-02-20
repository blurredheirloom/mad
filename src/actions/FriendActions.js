//Azioni per gestione degli amici

import {
  FRIENDS_FETCH_START, FRIENDS_FETCH_SUCCESS,
  USER_SEARCH_START, USER_SEARCH_SUCCESS,
  SENDING_REQUEST, SENT_REQUEST,
} from './types';
import registerForPushNotificationsAsync from '../api/notifications';
import firebase from 'firebase';

/* Carica la lista degli amici */
const friendsFetch = () => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: FRIENDS_FETCH_START });
    firebase.database().ref('friends/'+currentUser).on('value', snapshot => {
      var data = snapshot.val();
      if (!data){
        return dispatch({ type: FRIENDS_FETCH_SUCCESS, payload: []})
      }
      var keys = Object.keys(data);
      var newItems = [];
      keys.forEach(key => {
        newItems.push({
            "key" : key,
            "name": data[key].name,
            "image" : data[key].image,
            "state" : data[key].state,
        });
      })
      dispatch({ type: FRIENDS_FETCH_SUCCESS, payload: newItems})
    })
  }
}


/* Trova utenti contenenti il nome specificato*/
const searchUser = (value) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: USER_SEARCH_START });
    firebase.database().ref('users/').orderByChild('name').startAt(value).endAt(value+'\uf8ff').once('value', (snapshot) => {
      var data = snapshot.val();
      if (!data){
          return dispatch({ type: USER_SEARCH_SUCCESS, payload: []})
      }
      var keys = Object.keys(data);
      var newItems = [];
      keys.forEach(key => {
        if(key!=currentUser)
        {
          newItems.push({
              "key" : key,
              "name": data[key].name,
              "image" : data[key].image,
              "token" : data[key].token
          })
        }
      });
      dispatch({ type: USER_SEARCH_SUCCESS, payload: newItems})
    });
  }
}

/* Invia una notifica agli utenti aggiunti */
const NotifyNewFriend = (user) => {
  const currentUser =  firebase.auth().currentUser;
  const name = currentUser.displayName ? currentUser.displayName.toUpperCase() : currentUser.email.substring(0, currentUser.email.indexOf("@")).toUpperCase();
  firebase.database().ref('users/'+user).once('value', (snapshot) => {
    var data = snapshot.val();
    if (!data){
        return;
    }
    registerForPushNotificationsAsync(data.token, "Nuova richiesta di amicizia",name+" ti ha inviato una richiesta di amicizia");
  });
}

/* Aggiungi amico*/
const addFriend = (key, name, image) => {
  const currentUser =  firebase.auth().currentUser;
  return (dispatch) => {
    dispatch({ type: SENDING_REQUEST })
    firebase.database().ref('friends/'+currentUser.uid+"/"+key).transaction(function(currentData) {
        if(!currentData)
        {
          return {
            "name": name,
            "image": image,
            "state": "sent"
          }
        }
        return;
    });
    firebase.database().ref('friends/'+key+'/'+currentUser.uid).transaction(function(currentData) {
        if(!currentData)
        {
          return {
            "name": currentUser.displayName ? currentUser.displayName.toUpperCase() : currentUser.email.substring(0, currentUser.email.indexOf("@")).toUpperCase(),
            "image": currentUser.photoURL ? currentUser.photoURL : false,
            "state": "received"
          }
        }
        return;
    });
    NotifyNewFriend(key);
    dispatch({ type: SENT_REQUEST })
  }
}

/* Accetta amicizia */
const acceptFriend = (value) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    firebase.database().ref('friends/'+currentUser+'/'+value).update({"state":true});
    firebase.database().ref('friends/'+value+'/'+currentUser).update({"state":true});
    NotifyAcceptFriend(value);
  }
}

/* Invia notifica in caso di amicizia accettata */
const NotifyAcceptFriend = (user) => {
  const currentUser =  firebase.auth().currentUser;
  const name = currentUser.displayName ? currentUser.displayName.toUpperCase() : currentUser.email.substring(0, currentUser.email.indexOf("@")).toUpperCase();
  firebase.database().ref('users/'+user).once('value', (snapshot) => {
    var data = snapshot.val();
    if (!data){
        return;
    }
    registerForPushNotificationsAsync(data.token, "Richiesta di amicizia accettata", name+" ha accettato la tua richiesta di amicizia");
  });
}

/* Elimina amico o rifiuta amicizia*/
const deleteFriend = (value) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    firebase.database().ref('friends/'+currentUser+'/'+value).remove();
    firebase.database().ref('friends/'+value+'/'+currentUser).remove();
  }
}

export {friendsFetch, searchUser, addFriend, acceptFriend, deleteFriend}
