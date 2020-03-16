import React, { Component } from 'react';
import { getVote, questionsFetch } from '../../actions/VoteActions';
import { Text, StyleSheet } from 'react-native';
import { localize } from '../../locales/i18n';
import { connect } from 'react-redux';
import Loading from '../loading';
import Choices from './choices';
import YourVote from './yourvote';
import Winner from './winner';


class VoteList extends Component {

  componentDidMount() {
    this.props.questionsFetch(this.props.survey);
    this.props.getVote(this.props.survey);
  }

  componentDidUpdate(prevProps){
    if(this.props.survey!=prevProps.survey)
    {
      this.props.questionsFetch(this.props.survey);
      this.props.getVote(this.props.survey)
    }
  }
  

  render() {
      if(this.props.loading)
        return (<Loading color='#9b59b6'/>);
      if(this.props.questions===undefined)
        return <Text style={styles.noContent}>{localize("vote.deleted")}</Text>
      if(!this.props.yourVotes)
        return <Choices hasToVote={this.props.hasToVote} survey={this.props.survey} questions={this.props.questions} surveyTitle={this.props.surveyTitle} />
      return this.props.hasToVote===0 ? 
      <Winner survey={this.props.survey} numMembers={this.props.numMembers} questions={this.props.questions} yourReaction={this.props.yourReaction} /> 
      : <YourVote hasToVote={this.props.hasToVote} survey={this.props.survey} questions={this.props.questions} />
  }
}

const styles = StyleSheet.create({
  noContent: {
    fontFamily: 'Pacifico',
    fontSize: 18,
    color: '#fdfbfb',
    paddingTop: 50,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  yourVotes: state.vote.yourVotes,
  questions: state.vote.surveyDetails.questions,
  loading: state.vote.loading,
});

export default connect(mapStateToProps, { getVote, questionsFetch } ) (VoteList);


