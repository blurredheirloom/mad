import React, { Component } from 'react';
import { Text, Icon} from 'native-base';
import { StyleSheet, View, FlatList} from 'react-native';
import { questionsFetch } from '../../actions/SurveyActions';
import { vote } from '../../actions/VoteActions';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';


class Winner extends Component {

  state = {
    winner: []
  }

  componentDidMount() {
    if(this.props.survey) {
        this.props.questionsFetch(this.props.survey);
        this.getWinner();
    }
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.questions != this.props.questions)
      this.getWinner();
  }

  getWinner()
  {
    let max = {"question": 0, "votes": 0, "value": ""};
    let winnerArray = [];
    for(let i=0; i<this.props.questions.length; i++)
    {
      this.props.questions[i].answers.forEach(function(x){
        if (x.votes > max.votes) max = {"question": i, "votes": x.votes, "answer": x.value};
        else if (x.votes === max.votes) max = {"question": i, "votes": x.votes, "answer": x.value+"\n\n"+max.answer};
      });
      winnerArray = [...winnerArray, max];
      max = {"question": 0, "votes": 0, "answer": ""};
    }
    this.setState({winner: winnerArray});
  }

  getAnswers(question)
  {
    return question.answers;
  }

  renderItem = ({ item, index }) => {
    return(
      <View>
        <Text style={styles.question}>{this.props.questions[item.question].questionTitle}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', alignItems:'center',
      paddingVertical: 10}}>
          <View style={{flex: 0.5, justifyContent:'flex-end' ,paddingRight: 5}}>
            <Text style={styles.item}>{item.answer}</Text>
          </View>
          <Animatable.View delay={1500} animation="zoomIn" 
          style={{flex: 0.5, flexDirection:'row', alignItems: 'center', justifyContent:'flex-end', backgroundColor:'#f1b37e', borderRadius: 3}}>
            <Icon type="FontAwesome" style={{color:'#fdfdfd', position: 'absolute', left: 0, elevation: 1, fontSize: 16, paddingHorizontal: 10}} name="trophy" />
            <View style={{flex: item.votes/this.props.numMembers, flexDirection: 'row', backgroundColor: '#e67e22', justifyContent: 'flex-end', alignItems:'center', borderBottomLeftRadius: (item.votes/this.props.numMembers)*3 | 0, borderTopLeftRadius: (item.votes/this.props.numMembers)*3 | 0, borderBottomRightRadius: 3, borderTopRightRadius: 3,paddingVertical: 10}}>
              <Text style={{fontFamily:'ColorTube', color:'#fdfdfd',fontSize: 9}}>{item.votes/this.props.numMembers*100}</Text>
              <Icon type="FontAwesome5"  name="percentage" style={{fontSize: 9, color:'#fdfdfd', paddingLeft: 5, paddingRight: 10}}/>
            </View>
          </Animatable.View>
      </View>
      </View>
    )
  }

  _keyExtractor = (item, index) => index.toString();
  
  render() {
      return(
          <View style={{flex: 1, justifyContent:'center', padding: 20}}>
              <Animatable.View
              animation="tada" style={styles.card}>
                <Text style={styles.title}>Risultati</Text>
                <FlatList
                  data={this.state.winner}
                  renderItem={this.renderItem}
                  keyExtractor={this._keyExtractor}
                />
              </Animatable.View>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'ColorTube' ,
    fontSize: 12,
    color: '#e67e22',
    textAlign: 'center',
    borderBottomColor: '#e67e22',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  button: {
    borderRadius: 5,
    borderColor: '#ecf0f1'
  },
  noContent: {
    fontFamily: 'ColorTube',
    textAlign: 'center',
    fontSize: 10,
    color: '#ecf0f1',
    paddingTop: 20,
    paddingBottom: 20
  },
  question: {
    fontFamily: 'Pacifico',
    fontSize: 18,
    color: '#8e44ad',
    paddingVertical: 5,
    lineHeight: 30
  },
  item: {
    fontFamily: 'ColorTube',
    fontSize: 10,
    color: '#e67e22',
  },
  card : {
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

export default connect(mapStateToProps, { questionsFetch, vote } ) (Winner);
