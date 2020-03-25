import React, {Component} from 'react';
import { StyleSheet, View, FlatList, Modal } from 'react-native';
import { Icon, Button, Text, Card, Input } from 'native-base';
import Loading from '../../components/loading';
import CustomHeader from '../../components/header';
import InputBar from '../../components/inputBar';
import { createSurvey, questionsFetch } from '../../actions/SurveyActions';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { SwipeRow } from 'react-native-swipe-list-view';
import StepIndicator from '../../components/survey/stepindicator';
import { localize } from '../../locales/i18n';

class AddItemsScreen extends Component {
  

  state = {
    active: false,
    inputValue: '',
    questionTitle:'',
    ready: false,
    currQuestion: 0,
    modalVisible: false,
    items: [],
    questions: []
  };


  async componentDidMount()
  {
    this.rows = {}
    if(this.props.navigation.state.params.survey)
    {
      await this.props.questionsFetch(this.props.navigation.state.params.survey);
      this.setState({items: this.props.questions[0].answers});
      this.setState({questions: this.props.questions});
      this.setState({questionTitle: this.state.questions[this.state.currQuestion].questionTitle});
      this.check();
    }
    else 
      if(this.state.questions.length==0)
        this.setState({modalVisible: true});
  }

  check()
  {
    for(let question of this.state.questions)
    {
      if(question.answers.length==0)
        return this.setState({ready: false})
    }
    this.setState({ready: true})
  }
 
  addItem = (value) => {
    if(value!='')
    {
        if(this.state.items.length<10)
        {
            let items = this.state.items;
            items = [...items, {value: value}];
            this.setState({items: items})
            this.update(items);
            this.setState({inputValue: ''});
        }
    }
  }

  update = (items) => {
    let questions = this.state.questions;
    questions[this.state.currQuestion].answers = items;
    this.setState({questions: questions});
    this.check();    
  }


  goToQuestion = (question) => {
    if(question<this.state.questions.length)
    {
      this.setState({currQuestion: question});
      this.setState({items: this.state.questions[question].answers});
      this.setState({questionTitle: this.state.questions[question].questionTitle});
    }
  }


  addQuestion = (title) => {
    this.setState({modalVisible: false});
    this.setState({active: false});
    if(this.state.questions.length<5){
      let questions = this.state.questions;
      questions.push({questionTitle: title, answers: []});
      this.setState({questions: questions});
      this.goToQuestion(this.state.questions.length-1);
      this.check();
    }
    this.setState({inputValue: ''});
  }

  removeQuestion = (question) => {
    if(this.state.questions.length>1){
      let questions = this.state.questions;
      questions.splice(question, 1);
      this.setState({questions: questions});
      this.goToQuestion(this.state.questions.length-1);
      this.check();
    }
  }

  share = () => {
    this.setState({active: false});
    this.props.navigation.navigate("ShareWith", {title: this.props.navigation.state.params.surveyTitle, questions: this.state.questions, survey: this.props.navigation.state.params.survey})
  }
  


  deleteItem = (key) => {
    this.setState(prevState => ({
        items: prevState.items.filter(i => i !== key),
    }));
    this.update(this.state.items.filter(i => i !== key));
  }
 
  _keyExtractor = (item, index) => index.toString();


  renderItem = ({item, index}) => {
    if(this.props.navigation.state.params.noVotes)
      return(
        <SwipeRow
          ref={(ref) => {this.rows[index] = ref }}
          disableRightSwipe
          rightOpenValue={-100}
        >
          <View style={{height: 48, flexDirection:'row', justifyContent:'flex-end', alignItems:'center', borderBottomColor: '#eee', borderBottomWidth: 1}}>
              <Button style={{backgroundColor: '#e74c3c', width: 48, height: 48, justifyContent: 'center'}} onPress={() => {this.rows[index].closeRow(); this.deleteItem(item)}}>
                  <Icon style={{fontSize: 18}} type="FontAwesome" active name="trash" />
              </Button>
          </View>
          <View style={{height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fdfbfb',borderBottomColor: '#eee', borderBottomWidth: 1}}>
            <Animatable.Text animation='bounceInDown' duration={500} style={styles.item}>{item.value}</Animatable.Text>
          </View>
        </SwipeRow>
      )
    else
      return(
        <View style={{height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fdfbfb',borderBottomColor: '#eee', borderBottomWidth: 1}}>
            <Animatable.Text animation='bounceInDown' duration={500} style={styles.item}>{item.value}</Animatable.Text>
        </View>
      ) 
}

  render() {
    if(this.props.navigation.state.params.noVotes)
    {
      return(
        <View style={{flex: 1, flexDirection:'column', backgroundColor: "#8e44ad"}}>
          <CustomHeader color='#8e44ad' title={localize("addItems.title")} type='link' linkBackward={() => this.state.currQuestion>0 ? this.goToQuestion(this.state.currQuestion-1) : this.props.navigation.pop()} forward={this.state.ready} linkForward={() => this.share()} />
          <InputBar full={this.state.items.length===10} max={localize("addItems.max")} color='#8e44ad' loading={this.props.loading} placeholder={localize("addItems.placeholder")} icon='plus' 
          onSubmit={(value)=>this.addItem(value)}/>
          <Animatable.View useNativeDriver style={{flex:1, paddingVertical: 10, paddingHorizontal: 20}} duration={1500} easing='ease-out-back' animation="flipInY">
            <Card style={{flex:1, borderRadius: 5, padding: 20, backgroundColor:'#fdfbfb'}}>
                <View style={{flexDirection:'row', marginBottom: 10, justifyContent: 'space-between', alignItems:'center'}}>
                  <Button disabled={this.state.questions.length<2} style={[this.state.questions.length<2 ? styles.disabled : styles.enabled, {width: 32, height: 32, borderRadius: 2, justifyContent: 'center', backgroundColor: '#8e44ad'}]} onPress={() => this.removeQuestion(this.state.currQuestion)}>
                    <Icon style={{color: '#fdfbfb', fontSize: 14, marginLeft: 0, marginRight: 0}} type="FontAwesome" name="minus" />
                  </Button>
                  <Text style={[styles.title, {paddingHorizontal: 10, lineHeight: 32, flex:1, fontSize: 22}]}>{this.props.navigation.state.params.surveyTitle}</Text>
                  <Button disabled={!this.state.ready || this.state.questions.length>4} style={[this.state.ready && this.state.questions.length<5 ? styles.enabled : styles.disabled,{width: 32, height: 32, borderRadius: 2, justifyContent: 'center', backgroundColor: '#8e44ad'}]} onPress={() => this.setState({modalVisible: true})}>
                    <Icon style={{color: '#fdfbfb', fontSize: 14, marginLeft: 0, marginRight: 0}} type="FontAwesome" name="plus" />
                  </Button>
                </View>
                {this.props.loading ? <Loading /> :
                  <View style={{flex: 1}}>
                    <View style={{flex:1, justifyContent:'flex-start'}}>
                      <Text style={[styles.title,{fontSize: 18, color: "#8e44ad", marginBottom: 10, padding: 0, textAlign:'left', borderBottomWidth:1, borderColor: "#b075c9"}]}>
                        {this.state.questionTitle}</Text>
                      {
                        this.state.items.length==0 ? <Text style={styles.noContent}>{localize("addItems.noContent")}</Text> :
                        <FlatList
                            data={this.state.items}
                            renderItem={this.renderItem}
                            keyExtractor={this._keyExtractor}
                        />                            
                      }
                    </View>
                    {this.state.questions.length>1 &&
                    <View style={{paddingTop: 20}}>
                      <StepIndicator
                        customStyles={indicatorStyles}
                        currentPosition={this.state.currQuestion}
                        stepCount={this.state.questions.length}
                        onPress={this.goToQuestion}
                      />
                    </View>
                    }
                  </View>
                }
            </Card>
          </Animatable.View>
          <Modal
              animationType="none"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => this.state.questions.length>0 ? this.setState({modalVisible: false}) : this.props.navigation.pop()}>
              <View style={{flex: 1, marginTop: -25, justifyContent:'flex-start',  alignItems:'stretch', backgroundColor:'#8e44ad'}}>
                <CustomHeader color='#8e44ad' title={localize("newQuestion.title")} forward={this.state.inputValue!=''} type='link' linkForward={()=>this.addQuestion(this.state.inputValue)} linkBackward={() => {this.state.questions.length>0 ? this.setState({modalVisible: false}) : this.props.navigation.navigate("NewSurvey")}} />
                <View style={{paddingHorizontal: 15}}>
                  <Text style={[styles.title, {color: '#fdfbfb'}]}>{this.props.navigation.state.params.surveyTitle}</Text>
                  <Text style={styles.example}>{localize("newQuestion.example")}</Text>
                  <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 20}}>
                    <Icon type="FontAwesome" style={styles.icon} name="quote-left" />
                    <Input maxLength={48} style={{fontFamily: 'Blogger', fontSize: 18, color: '#fdfbfb', borderBottomColor: '#fdfbfb', borderBottomWidth: 2}} disabled = {this.props.loading} placeholderTextColor="#fdfbfb"
                    value={this.state.inputValue} onChangeText={(inputValue) => this.setState({inputValue})} onSubmitEditing={() => this.addQuestion(this.state.inputValue)}
                    />
                    <Icon type="FontAwesome" style={styles.icon} name="quote-right" />
                  </View>
                </View>
              </View>
          </Modal>
      </View>
      );
    }
    else
      return(
        <View style={{flex: 1, flexDirection:'column', backgroundColor: "#8e44ad"}}>
          <CustomHeader color='#8e44ad' title={localize("addItems.title")} type='link' linkBackward={() => this.state.currQuestion>0 ? this.goToQuestion(this.state.currQuestion-1) : this.props.navigation.pop()} />
          <Text style={{fontFamily: 'Quicksand', color: '#fdfbfb', padding: 20, textAlign: 'center'}}>{localize("addItems.locked")}</Text>
          <Animatable.View style={{flex:1, paddingVertical: 10, paddingHorizontal:20, justifyContent: 'center'}} duration={1500} easing='ease-out-back' animation="flipInY">
            <Card style={{flex:1, borderRadius: 5, padding: 20, backgroundColor:'#fdfbfb'}}>
              <Text style={[styles.title, {paddingHorizontal: 10, lineHeight: 32, fontSize: 22}]}>{this.props.navigation.state.params.surveyTitle}</Text>
              {this.props.loading ? <Loading /> :
                <View style={{flex: 1}}>
                  <View style={{flex:1, justifyContent:'flex-start'}}>
                    <Text style={[styles.title,{fontSize: 18, color: "#8e44ad", marginBottom: 10, padding: 0, textAlign:'left', borderBottomWidth:1, borderColor: "#b075c9"}]}>
                      {this.state.questionTitle}</Text>
                    {
                      this.state.items.length==0 ? <Text style={styles.noContent}>{localize("addItems.noContent")}</Text> :
                      <FlatList
                          data={this.state.items}
                          renderItem={this.renderItem}
                          keyExtractor={this._keyExtractor}
                      />                            
                    }
                  </View>
                  {this.state.questions.length>1 &&
                   <View style={{paddingTop: 20}}>
                    <StepIndicator
                      customStyles={indicatorStyles}
                      currentPosition={this.state.currQuestion}
                      stepCount={this.state.questions.length}
                      onPress={this.goToQuestion}
                    />
                    </View>
                  }
                </View>
              }
            </Card>
          </Animatable.View>
        </View>
      );
  }
}

const indicatorStyles = {
  stepIndicatorSize: 24,
  currentStepIndicatorSize: 28,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: '#8e44ad',
  stepStrokeFinishedColor: '#8e44ad',
  stepStrokeUnFinishedColor: '#8e44ad',
  separatorFinishedColor: '#8e44ad',
  separatorUnFinishedColor: '#b075c9',
  stepIndicatorFinishedColor: '#8e44ad',
  stepIndicatorUnFinishedColor: '#b075c9',
  stepIndicatorCurrentColor: '#8e44ad',
  stepIndicatorLabelCurrentColor: '#fdfbfb',
  stepIndicatorLabelUnFinishedColor: '#fdfbfb',
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Pacifico' ,
    fontSize: 28,
    color: '#34495e',
    textAlign: 'center',
  },
  example: {
    fontFamily: 'Quicksand',
    padding: 20,
    paddingBottom: 48,
    fontSize: 16,
    color: '#fdfbfb',
    lineHeight: 25,
    textAlign: 'justify'
  },
  item: {
    fontFamily: 'Blogger',
    fontSize: 18,
    color: '#34495e',
  },
  icon: {
    fontSize: 18,
    color:'#fdfbfb',
    textAlign:'center'
  },
  noContent: {
    fontFamily: 'Blogger',
    textAlign: 'center',
    fontSize: 18,
    color: '#34495e',
    paddingTop: 20,
    paddingBottom: 20
  },
  enabled: {
    opacity: 1
  },
  disabled: {
    opacity: 0
  }
});

const mapStateToProps = state => ({
  loading: state.survey.loading,
  questions: state.survey.questions
});

export default connect(mapStateToProps, { createSurvey, questionsFetch } ) (AddItemsScreen);
