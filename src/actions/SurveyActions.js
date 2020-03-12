// Azioni per la creazione, rimozione e visualizzazione dei sondaggi

import {
  SURVEYLIST_FETCH_START, SURVEYLIST_FETCH_SUCCESS,
  CREATE_SURVEY_START, CREATE_SURVEY_SUCCESS, 
  UPDATE_SURVEY_START, UPDATE_SURVEY_SUCCESS, 
  DELETE_SURVEY, DELETE_USER_SURVEYS_START, DELETE_USER_SURVEYS_SUCCESS,
  ITEMS_FETCH_START, ITEMS_FETCH_SUCCESS
} from './types';
import firebase from 'firebase';
import registerForPushNotificationsAsync from '../api/notifications';


/* Carica i sondaggi creati dall'utente corrente */
const surveysFetch = () => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: SURVEYLIST_FETCH_START });
    firebase.database().ref('surveys/').orderByChild('owner').equalTo(currentUser).on('value', snapshot => {
      var data = snapshot.val();
      if(!data)
      {
        return dispatch({ type: SURVEYLIST_FETCH_SUCCESS, payload: []})
      }
      var keys = Object.keys(data);
      var newItems = [];
      keys.forEach(key => {
          newItems.push({
              "surveyTitle": data[key].surveyTitle,
              "noVotes": data[key].numMembers === data[key].hasToVote,
              "key": key,
          });
      });
      dispatch({ type: SURVEYLIST_FETCH_SUCCESS, payload: newItems.reverse()})
    })
  }
}


/* Carica domande di un sondaggio */
const questionsFetch = (survey) => {
  return (dispatch) => {
    dispatch({ type: ITEMS_FETCH_START });
    firebase.database().ref('surveys/'+survey).on('value', snapshot => {
      var data = snapshot.val();
      if(!data)
      {
        return dispatch({ type: ITEMS_FETCH_SUCCESS, payload: []});
      }    
      dispatch({ type: ITEMS_FETCH_SUCCESS, payload: {questions: data.questions, numMembers: data.numMembers, hasToVote: data.hasToVote}});
    });
  }
}

/* Crea sondaggio*/
const createSurvey = (value, questions, friends) => {
  return (dispatch) => {
    dispatch({ type: CREATE_SURVEY_START})
    const currentUser =  firebase.auth().currentUser;
    let members = [...friends, {id: currentUser.uid, votes: false}];
    const survey = firebase.database().ref('surveys/').push({"surveyTitle": value, "owner" : currentUser.uid, "hasToVote" : members.length, "numMembers" : members.length, "members": members, "questions": questions}).getKey();
    const name = currentUser.displayName ? currentUser.displayName.toUpperCase() : currentUser.email.substring(0, currentUser.email.indexOf("@")).toUpperCase();
    friends.forEach(friend => {
      firebase.database().ref('users/'+friend.id).once('value', (snapshot) => {
        var data = snapshot.val();
        if (!data){
            return;
        }
        registerForPushNotificationsAsync(data.token, "Nuovo sondaggio", name+" ti ha invitato a partecipare ad un sondaggio", {"vote": true, "key": survey, "surveyTitle": value, "owner": currentUser.uid});
      });
    });
    dispatch({ type: CREATE_SURVEY_SUCCESS, payload: survey});
  }
}

/*Aggiorna sondaggio */
const updateSurvey = (survey, questions, friends) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SURVEY_START})
    const currentUser =  firebase.auth().currentUser.uid;
    firebase.database().ref('surveys/'+survey).update({"questions": questions}).then(() =>
      {
        firebase.database().ref("surveys/"+survey+'/members').transaction(function(members){
          return [...friends, {id: currentUser, votes: false}];
        })
        firebase.database().ref("surveys/"+survey).update({
          "hasToVote": friends.length+1,
          "numMembers": friends.length+1
        })
        dispatch({ type: UPDATE_SURVEY_SUCCESS})
      }
    )
  }
}

/* Elimina sondaggio */
const deleteSurvey = (key) => {
  return (dispatch) => {
    firebase.database().ref('surveys/'+ key).remove().then(() =>
      dispatch({ type: DELETE_SURVEY}))
  }
}

/* Elimina tutti i sondaggi dell'utente corrente*/
const deleteUserSurveys = () => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: DELETE_USER_SURVEYS_START })
    firebase.database().ref('surveys/').orderByChild('owner').equalTo(currentUser).once('value', snapshot => {
      snapshot.forEach(function(child) {
        child.ref.remove();
      });
   });
   dispatch({ type: DELETE_USER_SURVEYS_SUCCESS })
  }
}




export {surveysFetch, deleteSurvey, createSurvey, updateSurvey, deleteUserSurveys, questionsFetch}
