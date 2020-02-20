// Azioni per la creazione, rimozione e visualizzazione dei sondaggi

import {
  SURVEYLIST_FETCH_START, SURVEYLIST_FETCH_SUCCESS,
  CREATE_SURVEY_START, CREATE_SURVEY_SUCCESS, 
  UPDATE_SURVEY_START, UPDATE_SURVEY_SUCCESS, 
  DELETE_SURVEY, DELETE_USER_SURVEYS_START, DELETE_USER_SURVEYS_SUCCESS,
  ITEMS_FETCH_START, ITEMS_FETCH_SUCCESS
} from './types';
import firebase from 'firebase';

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
      dispatch({ type: SURVEYLIST_FETCH_SUCCESS, payload: newItems})
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
      dispatch({ type: ITEMS_FETCH_SUCCESS, payload: data.questions});
    });
  }
}

/* Crea sondaggio*/
const createSurvey = (value, questions) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: CREATE_SURVEY_START})
    let members = [{id: currentUser, votes: false}];
    const survey = firebase.database().ref('surveys/').push({"surveyTitle": value, "owner" : currentUser, "hasToVote" : 1, "numMembers" : 1, "members": members, "questions": questions}).getKey();
    dispatch({ type: CREATE_SURVEY_SUCCESS, payload: survey});
  }
}

/*Aggiorna sondaggio */
const updateSurvey = (survey, questions) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SURVEY_START})
    firebase.database().ref('surveys/'+survey).update({"questions": questions}).then(() =>
        dispatch({ type: UPDATE_SURVEY_SUCCESS})
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
