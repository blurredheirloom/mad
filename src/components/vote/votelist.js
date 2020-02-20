import React, { Component } from 'react';
import { getVote, hasToVote } from '../../actions/VoteActions';
import { StyleSheet, View, Text } from 'react-native';
import Choices from './choices';
import YourVote from './yourvote';
import Winner from './winner';
import { connect } from 'react-redux';
import Author from './author';


class VoteList extends Component {
  
  componentDidMount() {
    if(this.props.survey)
    {
      this.props.getVote(this.props.survey.key);
      this.props.hasToVote(this.props.survey.key);
    }
  }

  render() {
    if(!this.props.yourVotes)
      return (
        <View style={{flex: 1}}>
          <Text style={styles.title}>{this.props.survey.surveyTitle}</Text>
          <Author owner={this.props.survey.owner} />
          <Choices survey={this.props.survey.key} />
        </View>
      );
    if(this.props.remainingVotes>0)
      return(
        <View style={{flex: 1}}>
          <Text style={styles.title}>{this.props.survey.surveyTitle}</Text>
          <Author owner={this.props.survey.owner} />
          <YourVote survey={this.props.survey.key} yourVotes={this.props.yourVotes} hasToVote={this.props.remainingVotes} />
        </View>
      );
    if(this.props.remainingVotes==0)
      return(
        <View style={{flex: 1}}>
          <Text style={styles.title}>{this.props.survey.surveyTitle}</Text>
          <Author owner={this.props.survey.owner} />
          <Winner numMembers={this.props.survey.numMembers} survey={this.props.survey.key} />
        </View>
      );
      
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Pacifico' ,
    fontSize: 22,
    color: '#ecf0f1',
    textAlign: 'center'
  },
  button: {
    borderRadius: 5,
    borderColor: '#ecf0f1'
  },
  noContent: {
    fontFamily: 'Pacifico',
    fontSize: 18,
    color: '#fdfdfd',
    paddingTop: 50,
    textAlign: 'center'
  },
  item: {
    fontFamily: 'ColorTube',
    fontSize: 10,
    color: '#34495e',
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
  remainingVotes: state.vote.remainingVotes,
  yourVotes: state.vote.yourVotes
});

export default connect(mapStateToProps, { hasToVote, getVote } ) (VoteList);


