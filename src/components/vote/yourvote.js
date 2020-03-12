import React, { Component } from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import { Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import StepIndicator from '../survey/stepindicator';

class YourVote extends Component {
  state = {
    page: 0
  }


  renderItem = ({ item }) => {
    return(
      <View style={{flex:1, justifyContent:'space-between', alignItems:'stretch', marginVertical: 10}}>
        <Text style={styles.question}>{this.props.questions[this.state.page].questionTitle}</Text>
        <Text style={styles.item}>{this.props.questions[this.state.page].answers[item].value}</Text>
      </View>
    )
  }

  _keyExtractor = (item, index) => index.toString();

  goToPage = (page) => {
    this.setState({page: page});
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent:'flex-start', paddingHorizontal: 20}}>
        <Text style={styles.alreadyVoted}>Hai già votato</Text>
        <Text style={styles.title}>La tua scelta</Text>
        <Animatable.View delay={500} animation="flipInY" style={styles.card}>
          <FlatList
            data={this.props.yourVotes.filter(x => this.props.yourVotes.indexOf(x)===this.state.page)}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
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
            {this.props.hasToVote} {this.props.hasToVote > 1 ? "altri utenti devono" : "altro utente deve"} ancora votare
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





