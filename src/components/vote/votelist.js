import React, { Component } from 'react';
import { getVote } from '../../actions/VoteActions';
import { questionsFetch } from '../../actions/SurveyActions';
import { StyleSheet, View, Text } from 'react-native';
import Choices from './choices';
import YourVote from './yourvote';
import Winner from './winner';
import { connect } from 'react-redux';
import Loading from '../loading';


class VoteList extends Component {
  
  componentDidMount() {
    if(this.props.survey)
    {
      this.props.getVote(this.props.survey.key);
      this.props.questionsFetch(this.props.survey.key);
    }
  }

  componentDidUpdate(prevProps)
  {
      if(this.props.survey!=prevProps.survey)
          this.props.questionsFetch(this.props.survey.key);
  }

  render() {
      if(this.props.loading)
        return (<Loading color='#9b59b6'/>);
      else if(!this.props.questions)
        return(
            <Text style={styles.noContent}>Questo sondaggio non esiste</Text>
        ); 
      return (
        <View style={{flex: 1}}>
          {!this.props.yourVotes ? 
            <Choices survey={this.props.survey.key} surveyTitle={this.props.survey.surveyTitle} />
            :
            this.props.hasToVote==0 ?
            <Winner survey={this.props.survey.key} yourReaction={this.props.yourReaction} />
            :
            <YourVote survey={this.props.survey.key} yourVotes={this.props.yourVotes} />
          }
        </View>
      );      
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderColor: '#ecf0f1'
  },
  noContent: {
    fontFamily: 'Pacifico',
    fontSize: 18,
    color: '#fdfbfb',
    paddingTop: 50,
    textAlign: 'center'
  },
  owner: {
    fontFamily: 'Quicksand',
    padding: 10,
    fontSize: 12,
    color: '#ecf0f1',
  },
  alreadyVoted: {
    fontFamily: 'Quicksand',
    padding: 10,
    paddingBottom: 30,
    fontSize: 14,
    color: '#ecf0f1',
    textAlign: 'center'
  },
  
});

const mapStateToProps = state => ({
  loading: state.survey.loading || state.vote.loading,
  questions: state.survey.questions,
  hasToVote: state.survey.hasToVote,
  numMembers: state.survey.numMembers,
  yourVotes: state.vote.yourVotes,
  yourReaction: state.vote.yourReaction
});

export default connect(mapStateToProps, { getVote, questionsFetch } ) (VoteList);


