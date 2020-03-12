import React, { Component } from "react";
import { View } from "react-native";
import SurveyList from '../../components/survey/surveylist';
import CustomHeader from '../../components/header';
import CustomModal from '../../components/survey/modal';
import { createSurvey, deleteUserSurveys } from '../../actions/SurveyActions';
import { connect } from 'react-redux';

class SurveyListScreen extends Component {
  state = {
    modalVisible: false
  }

  addSurvey(value)
  {
    if(value!='')
      this.props.createSurvey(value);
  }

  deleteAllSurveys()
  {
    this.setState({modalVisible: false});
    this.props.deleteUserSurveys();
  }

  
  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#fdfbfb'}}>
        <CustomHeader color='#e67e22' title="I miei sondaggi" type='link' noBack={this.props.surveys.length===0} forward iconBack='trash' iconForward='pencil'
         linkForward={() => this.props.navigation.navigate("NewSurvey")}
         linkBackward={() => this.setState({modalVisible: true})}
         iconSize={24}
        />
        <SurveyList navigation={this.props.navigation}/>        
        {this.state.modalVisible ?
        <CustomModal 
          modalVisible={this.state.modalVisible} 
          confirm={() => this.deleteAllSurveys()} 
          cancel={() => this.setState({modalVisible: false})} 
        /> : null }
    </View>
    )
  }
}


const mapStateToProps = state => ({
  surveys: state.survey.surveys,
});

export default connect(mapStateToProps, { createSurvey, deleteUserSurveys } ) (SurveyListScreen);
