//Azioni per i sondaggi a cui si partecipa

import {
  SHARE_SURVEY_START,
  SHARE_SURVEY_SUCCESS,
  SHARED_SURVEYLIST_FETCH_START,  
  SHARED_SURVEYLIST_FETCH_SUCCESS,
  GET_PENDING_SURVEYS 
} from './types';
import registerForPushNotificationsAsync from '../api/notifications';
import firebase from 'firebase';

const sharedSurveysFetch = () => {
  const currentUser =  firebase.auth().currentUser ? firebase.auth().currentUser.uid : null ;
  return (dispatch) => {
    dispatch({ type:  SHARED_SURVEYLIST_FETCH_START });
    firebase.database().ref('surveys').on('value', snapshot => {
      var data = snapshot.val();
      if (!data){
        return dispatch({ type:  SHARED_SURVEYLIST_FETCH_SUCCESS, payload: ''})
      }
      var keys = Object.keys(data);  
      var newItems = [];
      var pending = 0;
      keys.forEach(key => {
        firebase.database().ref('surveys/'+key+'/members').orderByChild("id").equalTo(currentUser).on('value', snap => {
          var data2 = snap.val();
          if (!data2){
            return dispatch({ type:  SHARED_SURVEYLIST_FETCH_SUCCESS, payload: ''})
          }
          var found = Object.keys(data2);  
          found.forEach(o => {
            if(!data2[o].votes)
              pending++;
            newItems.push({
              "key" : key,
              "surveyTitle": data[key].surveyTitle,
              "numMembers": data[key].numMembers,
              "hasToVote": data[key].hasToVote,
              "owner": data[key].owner,
            });
          });
        });
      });
      dispatch({ type: SHARED_SURVEYLIST_FETCH_SUCCESS, payload: newItems, pending: pending})
   })
  }
}


/* Condividi sondaggio con utenti*/
const shareWith = (friends, survey) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: SHARE_SURVEY_START });
    firebase.database().ref('surveys/'+survey).update({
        "members" : [...friends, { "id" : currentUser, "votes": false}]
    }).then(() => NotifyShareWith(friends))
    firebase.database().ref("surveys/"+survey+'/hasToVote').transaction(function(hasToVote){
      return hasToVote+friends.length;
    })
    firebase.database().ref("surveys/"+survey+'/numMembers').transaction(function(numMembers){
      return numMembers+friends.length;
    })
    dispatch({ type: SHARE_SURVEY_SUCCESS })
  }
}


/* Invia notifica agli utenti con cui è stato condiviso il sondaggio */
const NotifyShareWith = (friends) => {
  const currentUser =  firebase.auth().currentUser;
  const name = currentUser.displayName ? currentUser.displayName.toUpperCase() : currentUser.email.substring(0, currentUser.email.indexOf("@")).toUpperCase();
  friends.forEach(friend => {
    firebase.database().ref('users/'+friend.id).once('value', (snapshot) => {
      var data = snapshot.val();
      if (!data){
          return;
      }
      registerForPushNotificationsAsync(data.token, "Nuovo sondaggio", name+" ti ha invitato a partecipare ad un sondaggio");
    });
  });
}

export { shareWith, sharedSurveysFetch, NotifyShareWith }
