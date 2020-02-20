import React, { Component } from 'react';
import { StyleSheet, View, FlatList} from 'react-native';
import { Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

class YourVote extends Component {

  renderItem = ({ item, index }) => {
    return(
      <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent:'space-between', alignItems:'center', marginVertical: 15}}>
        <Text style={styles.question}>{this.props.questions[index].questionTitle}</Text>
        <Text style={styles.item}>{this.props.questions[index].answers[item].value}</Text>
      </View>
    )
  }

  _keyExtractor = (item, index) => index.toString();


  render() {
    return(
      <View style={{flex: 1, justifyContent:'flex-start', paddingHorizontal: 20}}>
        <Text style={styles.alreadyVoted}>Hai già votato</Text>
        <Text style={[styles.item, {color: '#fdfdfd', textAlign: 'center', padding: 10}]}>La tua scelta</Text>
        <Animatable.View delay={500} animation="flipInY" style={styles.card}>
          <FlatList
            data={this.props.yourVotes}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
        </Animatable.View>
        <Text style={styles.alreadyVoted} >
            {this.props.hasToVote} {this.props.hasToVote > 1 ? "altri utenti devono" : "altro utente deve"} ancora votare
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  question: {
    fontFamily: 'Pacifico',
    fontSize: 16,
    color: '#9b59b6',
  },
  item: {
    fontFamily: 'ColorTube',
    fontSize: 11,
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
    backgroundColor: '#fdfdfd',
  }
});

const mapStateToProps = state => ({
  questions: state.survey.questions,
  loading: state.vote.loading,
});

export default connect(mapStateToProps) (YourVote);





