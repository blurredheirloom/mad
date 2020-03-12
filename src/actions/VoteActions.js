// Azioni per il voto dei sondaggi creati

import {
  GET_AUTHOR_START, GET_AUTHOR_SUCCESS,
  GET_VOTE_START, GET_VOTE_SUCCESS,
  GET_REACTIONS_START, GET_REACTIONS_SUCCESS,
  SET_REACTION_START, SET_REACTION_SUCCESS,
  VOTING_START, VOTING_SUCCESS
} from './types';

import firebase from 'firebase';
import registerForPushNotificationsAsync from '../api/notifications';

const getVote = (survey) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: GET_VOTE_START });
    firebase.database().ref("surveys/"+survey+'/members').orderByChild('id').equalTo(currentUser).limitToFirst(1).on('value', snapshot => {
        var data = snapshot.val();
        if(!data)
        {
          return dispatch({ type: GET_VOTE_SUCCESS, payload: []})
        }
        var votes = Object.values(data)[0].votes;
        var reaction = Object.values(data)[0].reaction;
        dispatch({ type: GET_VOTE_SUCCESS, payload: {"votes": votes, "reaction": reaction}});
    });
  }
}


const getReactions = (survey) => {
  return (dispatch) => {
    dispatch({ type: GET_REACTIONS_START });
    firebase.database().ref("surveys/"+survey+"/reactions").on('value', snapshot => {
        var data = snapshot.val();
        if(!data)
        {
          return dispatch({ type: GET_REACTIONS_SUCCESS, payload: []})
        }
        dispatch({ type: GET_REACTIONS_SUCCESS, payload: data});
    });
  }
}

const setReactions = (survey, index) => {
  return(dispatch) => {
    dispatch({ type: SET_REACTION_START});
    const currentUser =  firebase.auth().currentUser.uid;
    let ref = firebase.database().ref("surveys/"+survey+'/members');
    ref.orderByChild('id').equalTo(currentUser).limitToFirst(1).once('value', snapshot => {
      if (snapshot.exists()){
        ref.child(Object.keys(snapshot.val())[0]).update({
          reaction: true,
        });
      }
    });
    firebase.database().ref("surveys/"+survey+"/reactions").child(index).transaction(function(currentData){
      return currentData+1;
    });
    dispatch({ type: SET_REACTION_SUCCESS});
  }
}


const getAuthor = (author) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: GET_AUTHOR_START });
    firebase.database().ref('users/'+author).on('value', snap => {
      var data = snap.val();
      if(author==currentUser)
        data.name="Te"
      else
        data.name=(data.name+" "+data.surname).trim();
      dispatch({ type: GET_AUTHOR_SUCCESS, payload: data});
    })
  }
}


const vote = (survey, title, answers) => {
  return (dispatch) => {
    dispatch({type: VOTING_START});
    for (let i=0; i<answers.length; i++)
    {
      firebase.database().ref("surveys/"+survey+'/questions/'+i+'/answers/'+answers[i]).child('votes').transaction(function(votes) {
        return votes + 1;
      });
    }
    const currentUser =  firebase.auth().currentUser.uid;
    let ref = firebase.database().ref("surveys/"+survey+'/members');
      ref.orderByChild('id').equalTo(currentUser).limitToFirst(1).once('value', snapshot => {
        if (snapshot.exists()){
          ref.child(Object.keys(snapshot.val())[0]).update({
            votes: answers,
          });
        }
    });
    firebase.database().ref('surveys/'+survey).child('hasToVote').transaction(function(hasToVote) {        
      return hasToVote - 1;
    });
    NotifySurveyCompleted(survey, title);        
    dispatch({type: VOTING_SUCCESS});
  }
}

const NotifySurveyCompleted = (survey, title) => {
  firebase.database().ref('surveys/'+survey).once('value', (snapshot) => {
    var data = snapshot.val();
    if (!data){
        return;
    }
    if(data.hasToVote==0)
    {
      let members = snapshot.val().members;
      members.forEach(member => {
        firebase.database().ref('users/'+member.id).once('value', (snap) => {
          var data2 = snap.val();
          if (!data2){
              return;
          }
          registerForPushNotificationsAsync(data2.token, "Sondaggio completato", "Tutti i partecipanti hanno votato", {"vote": true, "key": survey, "surveyTitle": title});
        });
      })
    }
  });
}


export { getAuthor, vote, getVote, getReactions, setReactions, NotifySurveyCompleted }
