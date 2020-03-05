//Azioni per gestione degli amici

import {
  FRIENDS_FETCH_START, FRIENDS_FETCH_SUCCESS,
  USER_SEARCH_START, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL,
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
        firebase.database().ref('users/'+key).on('value', snap => {
          var data2 = snap.val();
          newItems.push({
            "key" : key,
            "name": (data2.name+" "+data2.surname).trim(),
            "image" : data2.image,
            "state" : data[key].state,
          });
          if(newItems.length==keys.length)
            dispatch({ type: FRIENDS_FETCH_SUCCESS, payload: newItems})
        })
      })
    })
  }
}


/* Trova utenti contenenti il nome specificato*/
const searchUser = (value) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: USER_SEARCH_START });
    if(value.length<3)
      return dispatch({ type: USER_SEARCH_FAIL, payload: "Inserire almeno 3 caratteri" });
    firebase.database().ref('users/').orderByChild('name').startAt(value).endAt(value+'\uf8ff').on('value', (snapshot) => {
      var data = snapshot.val();
      var keys = data ? Object.keys(data) : [];
      var newItems = [];
      keys.forEach(key => {
        if(key!=currentUser)
        {
          newItems.push({
              "key" : key,
              "name": (data[key].name+" "+data[key].surname).trim(),
              "image" : data[key].image,
              "token" : data[key].token
          })
        }
      });
      firebase.database().ref('users/').orderByChild('surname').startAt(value).endAt(value+'\uf8ff').on('value', (snap) => {
        var data2 = snap.val();
        var keys = data2 ? Object.keys(data2) : [];
        keys.forEach(key => {
          if(key!=currentUser)
          {
            newItems.push({
                "key" : key,
                "name": data2[key].name+" "+data2[key].surname,
                "image" : data2[key].image,
                "token" : data2[key].token
            })
          }
        });
        newItems.length==0 ? dispatch({ type: USER_SEARCH_FAIL, payload: "Nessun utente trovato"}) :
        dispatch({ type: USER_SEARCH_SUCCESS, payload: newItems})
      });
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
            "state": "sent"
          }
        }
        return;
    });
    firebase.database().ref('friends/'+key+'/'+currentUser.uid).transaction(function(currentData) {
        if(!currentData)
        {
          return {
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
