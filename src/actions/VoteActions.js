// Azioni per il voto dei sondaggi creati

import {
  GET_AUTHOR_START, GET_AUTHOR_SUCCESS,
  GET_VOTE_START, GET_VOTE_SUCCESS,
  HAS_TO_VOTE_START, HAS_TO_VOTE_SUCCESS,
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
        dispatch({ type: GET_VOTE_SUCCESS, payload: votes});
    });
  }
}


const getAuthor = (author) => {
  const currentUser =  firebase.auth().currentUser.uid;
  return (dispatch) => {
    dispatch({ type: GET_AUTHOR_START });
    firebase.database().ref('users/'+author).once('value', snap => {
      var data = snap.val();
      if(author==currentUser)
        data.name="Te"
      dispatch({ type: GET_AUTHOR_SUCCESS, payload: data});
    })
  }
}

const hasToVote = (survey) => {
  return (dispatch) => {
    dispatch({type: HAS_TO_VOTE_START});
    firebase.database().ref('surveys/'+survey).on('value', snapshot => {
      var data = snapshot.val();
      if(!data) return;
      dispatch({type: HAS_TO_VOTE_SUCCESS, payload: data.hasToVote});
    });
  }
}


const vote = (survey, answers) => {
  return (dispatch) => {
    dispatch({type: VOTING_START});
    firebase.database().ref('surveys/'+survey).child('hasToVote').transaction(function(hasToVote) {        
        return hasToVote - 1;
    });
    for (let i=0; i<answers.length; i++)
    {
      firebase.database().ref("surveys/"+survey+'/questions/'+i+'/answers/'+answers[0]).child('votes').transaction(function(votes) {
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
    NotifySurveyCompleted(survey);        
    dispatch({type: VOTING_SUCCESS});
  }
}

const NotifySurveyCompleted = (survey) => {
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
          registerForPushNotificationsAsync(data2.token, "Sondaggio completato", "Tutti i partecipanti hanno votato");
        });
      })
    }
  });
}


export { getAuthor, vote, getVote, hasToVote, NotifySurveyCompleted }
