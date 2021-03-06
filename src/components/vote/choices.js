import React, { Component } from 'react';
import { Text,  Icon, Button} from 'native-base';
import { StyleSheet, View } from 'react-native';
import RadioGroup from './RadioButton/RadioGroup';
import { vote } from '../../actions/VoteActions';
import { connect } from 'react-redux';
import StepIndicator from '../survey/stepindicator';
import { localize } from '../../locales/i18n';


class Choices extends Component {
    state = {
        currQuestion: 0,
        question: 0,
        selected: '',
        myVotes: [],
        random: false
    }

  
  
    getData(question, val){
        this.setState({question: question});
        this.setState({selected: val});
    }

    vote() {
        let myVotes = this.state.myVotes;
        let len = this.props.questions[this.state.currQuestion].answers.length;
        myVotes = [...myVotes, this.state.random ? Math.floor(Math.random() * len) : this.state.selected];
        this.setState({myVotes, myVotes});
        this.setState({selected: ''});
        if(this.state.currQuestion<this.props.questions.length-1)
            this.setState({currQuestion: this.state.currQuestion+1});
        else
            this.props.vote(this.props.survey, this.props.surveyTitle, myVotes);
    }


    render() {
        return(
                <View style={{flex: 1, padding: 25}}>
                    <Text style={{color: '#fdfbfb', fontFamily:'Pacifico', fontSize: 18, textAlign: 'center'}}>{this.props.questions[this.state.currQuestion].questionTitle}</Text>
                    <View style={{flex: 1}}>
                        <RadioGroup disabled={this.state.random} radioGroupList={this.props.questions[this.state.currQuestion].answers} selected={this.state.selected} onChange={(selected) => this.getData(this.state.currQuestion, selected)} />
                    </View>
                    <View style={{padding: 15}}>
                    {this.props.questions.length>1 &&
                        <StepIndicator
                        customStyles={indicatorStyles}
                        currentPosition={this.state.currQuestion}
                        stepCount={this.props.questions.length}
                        />
                    }
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button iconLeft onPress={()=>this.setState({random: !this.state.random})} style={this.state.random ? styles.enabled : styles.disabled}>
                            <Icon style={{color: '#8e44ad', marginRight: 0}} type="FontAwesome5" name='dice'  />
                            <Text style={styles.buttonText}>{localize("vote.random")}</Text>
                        </Button>
                        <Button onPress={()=>this.vote()} disabled={!Number.isInteger(this.state.selected) && !this.state.random} style={Number.isInteger(this.state.selected) || this.state.random ? styles.enabled : styles.disabled}>
                            <Icon style={{color: '#8e44ad', marginRight: 0}} type="FontAwesome" name='thumbs-up'  />
                            <Text style={styles.buttonText}>{localize("vote.title")}</Text>
                        </Button>
                    </View>
                </View>
            ) 
    }
}

const indicatorStyles = {
    stepIndicatorSize: 16,
    currentStepIndicatorSize: 28,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: '#8e44ad',
    stepStrokeFinishedColor: '#8e44ad',
    stepStrokeUnFinishedColor: '#fdfbfb',
    separatorFinishedColor: '#8e44ad',
    separatorUnFinishedColor: '#8e44ad',
    stepIndicatorFinishedColor: '#8e44ad',
    stepIndicatorUnFinishedColor: '#8e44ad',
    stepIndicatorCurrentColor: '#8e44ad',
    stepIndicatorLabelCurrentColor: '#fdfbfb',
    stepIndicatorLabelUnFinishedColor: '#8e44ad',
    stepIndicatorLabelFinishedColor: '#8e44ad',
  }

const styles = StyleSheet.create({
    noContent: {
        fontFamily: 'Pacifico',
        fontSize: 18,
        color: '#fdfbfb',
        paddingTop: 50,
        textAlign: 'center'
    },
    buttonText: {
        fontFamily: 'Blogger',
        letterSpacing: 1,
        fontSize: 16, 
        color: '#8e44ad'
    },
    enabled : {
        backgroundColor: '#fdfbfb',
        borderRadius: 3,
    },
    disabled: {
        backgroundColor: '#b075c9',
        borderRadius: 3,
    }
});


const mapStateToProps = state => ({
    loading: state.vote.loading,
});

export default connect(mapStateToProps, { vote } ) (Choices);


