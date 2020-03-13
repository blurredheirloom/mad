import React, { Component } from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import { Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import StepIndicator from '../survey/stepindicator';
import { localize } from '../../locales/i18n';

class YourVote extends Component {
  state = {
    page: 0
  }


  _keyExtractor = (item, index) => index.toString();

  goToPage = (page) => {
    this.setState({page: page});
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent:'flex-start', paddingHorizontal: 20}}>
        <Text style={styles.alreadyVoted}>{localize("vote.alreadyVoted")}</Text>
        <Text style={styles.title}>{localize("vote.yourChoice")}</Text>
        <Animatable.View delay={500} animation="flipInY" style={styles.card}>
          <View style={{flex:1, justifyContent:'space-between', alignItems:'stretch', marginVertical: 10}}>
            <Text style={styles.question}>{this.props.questions[this.state.page].questionTitle}</Text>
            <Text style={styles.item}>{this.props.questions[this.state.page].answers[this.props.yourVotes[this.state.page]].value}</Text>
          </View>
          {this.props.yourVotes.length> 1 ?
          <View style={{paddingVertical: 30}}>
          <StepIndicator
            customStyles={indicatorStyles}
            currentPosition={this.state.page}
            stepCount={this.props.yourVotes.length}
            onPress={this.goToPage}
          /></View>: null }
        </Animatable.View>
        <Text style={styles.alreadyVoted} >
            {this.props.hasToVote} {this.props.hasToVote > 1 ? localize("vote.morePendings") : localize("vote.onePending")}
        </Text>
      </View>
    )
  }
}

const indicatorStyles = {
  stepIndicatorLabelFontSize: 11,
  currentStepIndicatorLabelFontSize: 11,
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 22,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: '#e67e22',
  stepStrokeFinishedColor: '#e67e22',
  stepStrokeUnFinishedColor: '#e67e22',
  separatorFinishedColor: '#e67e22',
  separatorUnFinishedColor: '#e67e22',
  stepIndicatorFinishedColor: '#e67e22',
  stepIndicatorUnFinishedColor: '#e67e22',
  stepIndicatorCurrentColor: '#e67e22',
  stepIndicatorLabelCurrentColor: '#fdfbfb',
  stepIndicatorLabelUnFinishedColor: '#fdfbfb',
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Blogger' ,
    fontSize: 22,
    color: '#fdfbfb',
    textAlign: 'center',
    paddingBottom: 5
  },
  question: {
    fontFamily: 'Pacifico',
    fontSize: 18,
    lineHeight: 24,
    color: '#9b59b6',
    paddingBottom: 10,
  },
  item: {
    fontFamily: 'Blogger',
    fontSize: 18,
    color: '#e67e22',
  },
  alreadyVoted: {
    fontFamily: 'Quicksand',
    paddingVertical: 20,
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#ecf0f1',
    textAlign: 'center'
  },
  card : {
    flex: 1,
    padding: 20,
    marginVertical: 20,
    borderRadius: 3,
    backgroundColor: '#fdfbfb',
  }
});

const mapStateToProps = state => ({
  questions: state.survey.questions,
  hasToVote: state.survey.hasToVote,
  numMembers: state.survey.numMembers,
  loading: state.vote.loading,
});

export default connect(mapStateToProps) (YourVote);





