import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import Loading from '../loading';
import { connect } from 'react-redux';
import { surveysFetch, deleteSurvey } from '../../actions/SurveyActions';
import { SwipeRow } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';
import { localize } from '../../locales/i18n';

class SurveyList extends Component {
    componentDidMount()
    {
        this.props.surveysFetch();
    }

    goToQuestion(survey, surveyTitle, noVotes)
    {
        this.props.navigation.navigate("AddItems", {survey: survey, surveyTitle : surveyTitle, noVotes: noVotes})
    }

    _keyExtractor = (item, index) => index.toString();

    renderItem = ({item, index}) => {
        return(
            <SwipeRow
                disableRightSwipe
                rightOpenValue={-100}
                onRowDidOpen={this.props.onRowDidOpen}
                onRowDidClose={this.props.onRowDidClose}
                onRowPress={() => this.goToQuestion(item.key, item.surveyTitle, item.noVotes)}
            >
                <View style={{height: 48, flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginRight:5, backgroundColor: '#fdfbfb', borderBottomColor: '#eee', borderBottomWidth: 1}}>
                    <Button style={{backgroundColor: '#e74c3c', width: 48, height: 48, justifyContent: 'center'}} onPress={() => {this.props.deleteSurvey(item.key)}}>
                        <Icon style={{fontSize: 18}} type="FontAwesome" active name="trash" />
                    </Button>
                </View>
                <View style={{height: 48, justifyContent: 'center', backgroundColor: '#fdfbfb', borderBottomColor: '#eee', borderBottomWidth: 1}}>
                    <Animatable.Text animation='bounceInDown' duration={500} style={styles.item}>{item.surveyTitle}</Animatable.Text>
                </View>
            </SwipeRow>
        )
    }


    render()
    {
        if(this.props.loading) 
            return <Loading color='#e67e22' /> 
        return (
            <View style={{flex:1, padding: 15, marginHorizontal: 5}}>
                {this.props.surveys.length==0 ? <Text style={styles.noContent}>{localize("mySurveys.noContent")}</Text> :
                    <FlatList
                        data={this.props.surveys}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
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
        fontFamily: 'Blogger',
        fontSize: 16,
        color: '#34495e',
        lineHeight: 18,
    }, 
});

const mapStateToProps = state => ({
    surveys: state.survey.surveys,
    loading: state.survey.loading,
  });
  
export default connect(mapStateToProps, { surveysFetch, deleteSurvey } ) (SurveyList);
  