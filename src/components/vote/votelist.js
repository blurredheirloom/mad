import React, { Component } from 'react';
import { remainingVotes, getVote } from '../../actions/VoteActions';
import YourVote from './yourvote';
import Winner from './winner';
import { connect } from 'react-redux';
import Loading from '../loading';
import Choices from './choices';


class VoteList extends Component {

  componentDidMount() {
    this.props.getVote(this.props.survey)
    this.props.remainingVotes(this.props.survey);
  }


  render() {
      if(this.props.loading)
        return (<Loading color='#9b59b6'/>);
      if(!this.props.yourVotes)
        return <Choices survey={this.props.survey} surveyTitle={this.props.surveyTitle} questions={this.props.questions} />
      return this.props.hasToVote==0 ? <Winner survey={this.props.survey} numMembers={this.props.numMembers} questions={this.props.questions} yourReaction={this.props.yourReaction} /> 
      : <YourVote surveyTitle={this.props.surveyTitle} survey={this.props.survey} yourVotes={this.props.yourVotes} questions={this.props.questions} />
  }
}


const mapStateToProps = state => ({
  yourVotes: state.vote.yourVotes,
  yourReaction: state.vote.yourReaction,
  loading: state.vote.loading,
  hasToVote: state.vote.hasToVote,
});

export default connect(mapStateToProps, { remainingVotes, getVote } ) (VoteList);


