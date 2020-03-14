//Azioni per i sondaggi a cui si partecipa

import {
  SHARED_SURVEYLIST_FETCH_START,  
  SHARED_SURVEYLIST_FETCH_SUCCESS,
} from './types';

import firebase from '../api/firebase';


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
        firebase.database().ref('surveys/'+key+'/members').orderByChild("id").equalTo(currentUser).once('value', snap => {
          var data2 = snap.val();
          if (!data2){
            return dispatch({ type:  SHARED_SURVEYLIST_FETCH_SUCCESS, payload: []})
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
      dispatch({ type: SHARED_SURVEYLIST_FETCH_SUCCESS, payload: newItems.reverse(), pending: pending})
   })
  }
}


export { sharedSurveysFetch }
