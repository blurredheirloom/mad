import React, { Component } from 'react';
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import Loading from '../loading';
import { connect } from 'react-redux';
import { surveysFetch, deleteSurvey, createQuestion } from '../../actions/SurveyActions';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';


class SurveyList extends Component {
    componentDidMount()
    {
      this.props.surveysFetch();
    }

    goToQuestion(survey, surveyTitle, noVotes)
    {
        this.props.navigation.navigate("AddItems", {survey: survey, surveyTitle : surveyTitle, noVotes: noVotes})
    }


    render()
    {
        if(this.props.loading) 
            return <Loading color='#e67e22' /> 
        return (
            <View style={{padding: 15}}>
                {this.props.surveys=='' ? <Text style={styles.noContent}>Non hai ancora creato un sondaggio</Text> :
                    <SwipeListView
                        disableRightSwipe={true}
                        data={this.props.surveys}
                        renderItem={ (data) => (
                            <TouchableNativeFeedback onPress={()=>this.goToQuestion(data.item.key, data.item.surveyTitle, data.item.noVotes)}>
                                <View style={{height: 48, justifyContent: 'center', backgroundColor: '#fdfbfb', borderBottomColor: '#eee', borderBottomWidth: 1}}>
                                    <Animatable.Text animation='bounceInDown' duration={500} style={styles.item}>{data.item.surveyTitle}</Animatable.Text>
                                </View>
                            </TouchableNativeFeedback>
                        )}
                        renderHiddenItem={ (data) => (
                            <View style={{height: 48, flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginRight:5, backgroundColor: '#fdfbfb', borderBottomColor: '#eee', borderBottomWidth: 1}}>
                                <Button style={{backgroundColor: '#e74c3c', width: 48, height: 48, justifyContent: 'center'}} onPress={()=>this.props.deleteSurvey(data.item.key)}>
                                    <Icon style={{fontSize: 18}} type="FontAwesome" active name="trash" />
                                </Button>
                            </View>
                        )}
                        rightOpenValue={-150}
                    />
                }
            </View>            
        )
    }
}   

const styles = StyleSheet.create({
    noContent: {
        fontFamily: 'Pacifico',
        fontSize: 18,
        color: '#34495e',
        paddingTop: 50,
        textAlign: 'center'
    },
    item: {
        fontFamily: 'ColorTube',
        fontSize: 10,
        color: '#34495e',
        textAlign: 'left'
    },
    
});

const mapStateToProps = state => ({
    surveys: state.survey.surveys,
    loading: state.survey.loading,
  });
  
export default connect(mapStateToProps, { surveysFetch, createQuestion, deleteSurvey } ) (SurveyList);
  