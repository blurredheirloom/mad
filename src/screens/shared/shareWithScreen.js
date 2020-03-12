import React, { Component } from 'react';
import { View, Text } from "react-native";
import CustomHeader from '../../components/header';
import FriendList from '../../components/friend/friendlist';
import { NotifyShareWith } from '../../actions/ShareActions';
import { connect } from 'react-redux';
import { createSurvey, updateSurvey } from '../../actions/SurveyActions';
import Loading from '../../components/loading';

class ShareWithScreen extends Component {

  state = {
    selected : [],
  };

  getData(val){
      this.setState({selected: val});
  }

  
  shareWithUsers = () =>
  {
      let friends = this.state.selected.map(x => x = {"id": x.key, "votes":false});
      if(this.props.navigation.state.params.survey)
      {
        this.props.updateSurvey(this.props.navigation.state.params.survey, this.props.navigation.state.params.questions, friends);
      }
      else
      {
        this.props.createSurvey(this.props.navigation.state.params.title, this.props.navigation.state.params.questions, friends);
        //this.props.NotifyShareWith(friends, {"survey" : this.props.surveyId, "title" : this.props.navigation.state.params.title});
      }
      this.props.navigation.popToTop();
      this.props.navigation.navigate("SurveyList");
  }
  
  render() {
      if(this.props.loading)
        return <Loading color='#3498db'/>;
      return (
        <View style={{flex: 1, flexDirection:'column', backgroundColor: "#3498db"}}>
          <CustomHeader color='#3498db' title="Condividi" type='link'
          linkBackward={() => this.props.navigation.pop()} forward={this.state.selected.length>0} linkForward={() => this.shareWithUsers()}/>
          <View style={{paddingHorizontal: 10}}>
            <Text style={{fontFamily: 'Pacifico' , fontSize: 24, lineHeight: 36, color: '#fdfbfb', textAlign: 'center'}}>{this.props.navigation.state.params.title}</Text>
            <Text style={{fontFamily: 'Blogger' , fontSize: 16, color: '#fdfbfb', textAlign: 'center'}}>con</Text>
          </View>
          <FriendList share="true" navigation={this.props.navigation} sendData={(val) => this.getData(val)} />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.share.loading && state.survey.loading,
  surveyId: state.survey.id,
});

export default connect(mapStateToProps, {createSurvey, updateSurvey,NotifyShareWith}) (ShareWithScreen)