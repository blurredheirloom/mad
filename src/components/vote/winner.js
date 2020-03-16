import React, { Component } from 'react';
import { Text, Icon } from 'native-base';
import { StyleSheet, View, FlatList, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { getReactions, setReactions } from '../../actions/VoteActions';
import * as Animatable from 'react-native-animatable';
import { AnimatedEmoji } from './Emoji/AnimatedEmoji';
import Emoji from 'react-native-emoji';
import StepIndicator from '../survey/stepindicator';
import { localize } from '../../locales/i18n';


class Winner extends Component {

  state = {
    winner: [],
    emojiArray: [],
    page: 0,
    defaultEmojis: [
      {
        key: 0,
        name: 'heart_eyes'
      },
      {
        key: 1,
        name: 'joy'
      },
      {
        key: 2,
        name: 'expressionless'
      },
      {
        key: 3,
        name: 'sweat'
      },
      {
        key: 4,
        name: 'rage'
      },
    ]
  }

  constructor(props) {
    super(props);
    this._emojis={}
  }


  generateEmoji = (index) => {
    const newEmojis = [];
    for (let i = 0; i < 20; i++) {
      const emoji = {
        key: i,
        name: this.state.defaultEmojis[index].name,
        size: Math.floor(Math.random() * Math.floor(20)) + 20,
        duration: Math.floor(Math.random() * Math.floor(6000)) + 2000,
        xPosition: Math.floor(Math.random()*Dimensions.get('window').width),
      };
      newEmojis.push(emoji);
    }
    this.setState({emojiArray : newEmojis});  
  };

  componentDidMount()
  {
    this.props.getReactions(this.props.survey);
    this.getWinner();
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps!=this.props)
    {
      this.getWinner();
    }
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
      max = {"question": i, "votes": 0, "answer": ""};
    }
    this.setState({winner: winnerArray});
  }

  renderItem = ({ item, index }) => {
    return(
      <View style={{flex:1, paddingVertical: 10}}>
        <Text style={styles.question}>{this.props.questions[item.question].questionTitle}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center',
      paddingBottom: 5}}>
          <View style={{flex: 0.5, justifyContent:'flex-end', paddingRight: 10}}>
            <Text style={styles.item}>{item.answer}</Text>
          </View>
          <Animatable.View delay={1500} animation="zoomIn" 
          style={{flex: 0.5, flexDirection:'row', alignItems: 'center', justifyContent:'flex-end', backgroundColor:'#f1b37e', borderRadius: 3}}>
            <Icon type="FontAwesome" style={{color:'#fdfbfb', position: 'absolute', left: 0, elevation: 1, fontSize: 16, paddingHorizontal: 10}} name="trophy" />
            <View style={{flex: (item.votes/this.props.numMembers), flexDirection: 'row', backgroundColor: '#e67e22', justifyContent: 'flex-end', alignItems:'center', borderBottomLeftRadius: (item.votes/this.props.numMembers)*3 | 0, borderTopLeftRadius: (item.votes/this.props.numMembers)*3 | 0, borderBottomRightRadius: 3, borderTopRightRadius: 3,paddingVertical: 10}}>
              <Text style={{fontFamily:'ColorTube', color:'#fdfbfb',fontSize: 9}}>{Math.floor(item.votes/this.props.numMembers*100)}</Text>
              <Icon type="FontAwesome5"  name="percentage" style={{fontSize: 9, color:'#fdfbfb', paddingLeft: 5, paddingRight: 10}}/>
            </View>
          </Animatable.View>
        </View>
      </View>
    )
  }

  onAnimationCompleted = (index) => {
    let newEmojis = Object.assign(this.state.emojiArray, []);
    newEmojis = newEmojis.filter(e => e.key !== index);
    this.setState({ emojiArray: newEmojis });
  };

  goToPage = (page) => {
    this.setState({page: page});
  }

  voteReaction(index) {
    this.props.setReactions(this.props.survey, index);
    this.generateEmoji(index);
  }

  _keyExtractor = (item, index) => index.toString();
  
  render() {
      let emojiComponents = this.state.emojiArray.map((emoji) => {
        return (
          <AnimatedEmoji
            key={emoji.key}
            index={emoji.key}
            ref={ref => this._emojis[emoji.key] = ref}
            style={{ elevation: 2, left: emoji.xPosition }}
            name={emoji.name}
            size={emoji.size}
            duration={emoji.duration}
            onAnimationCompleted={this.onAnimationCompleted}
          />
        )
      });

      let emojiSelector = this.state.defaultEmojis.map((emoji) => {
        return (
          <Animatable.View animation={this.props.yourReaction ? "tada": null} duration={1000} iterationCount="infinite" iterationDelay={1000+(Math.random()*2000+1000)}  key={emoji.key}>
            <Emoji onPress={() => !this.props.yourReaction ? this.voteReaction(emoji.key) : null} name={emoji.name} style={{fontSize: 36}} />
            {this.props.yourReaction && <Text style={{position: 'absolute', elevation: 9999, backgroundColor: '#e67e22', borderRadius: 8, width: 16, height: 16, textAlign: 'center', textAlignVertical:'center', fontSize: 10, color: '#fdfbfb', bottom: 0, right:0}}>{this.props.reactions[emoji.key] ? this.props.reactions[emoji.key] : 0}</Text>}
          </Animatable.View>
        )
      });

      return(
          <View style={{flex:1, justifyContent:'space-between', paddingHorizontal: 25, paddingVertical:20}}>
            <Animatable.View
            animation="tada" style={styles.card}>
              <Text style={styles.title}>{localize("vote.results")}</Text>
              <FlatList
                data={this.state.winner.filter(x => x.question===this.state.page)}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
              />
              {this.state.winner.length> 1 ?
              <View style={{paddingVertical: 20}}>
                <StepIndicator
                  customStyles={indicatorStyles}
                  currentPosition={this.state.page}
                  stepCount={this.state.winner.length}
                  onPress={this.goToPage}
                />
              </View>: null }
              <View style={{flexDirection: 'row', paddingTop: 25, borderTopColor:'#eee', borderTopWidth: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fdfbfb'}}>
              {emojiSelector}
              </View>
            </Animatable.View>
            {emojiComponents}
          </View>
      );
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
    color: '#e67e22',
    textAlign: 'center',
    borderBottomColor: '#e67e22',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  question: {
    fontFamily: 'Pacifico',
    fontSize: 18,
    color: '#8e44ad',
    lineHeight: 24,
    paddingVertical: 10
  },
  item: {
    fontFamily: 'Blogger',
    fontSize: 18,
    color: '#e67e22',
  },
  card : {
    elevation: 1, 
    padding: 20,
    flex:1,
    borderRadius: 3,
    backgroundColor: '#fdfbfb',
  }
});

const mapStateToProps = state => ({
  reactions: state.vote.reactions,
  yourReaction: state.vote.yourReaction,
  loading: state.vote.loading,
});

export default connect(mapStateToProps, { getReactions, setReactions } ) (Winner);
