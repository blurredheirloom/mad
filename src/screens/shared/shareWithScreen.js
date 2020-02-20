import React, { Component } from 'react';
import { View } from "react-native";
import CustomHeader from '../../components/header';
import FriendList from '../../components/friend/friendlist';
import { shareWith } from '../../actions/ShareActions';
import { connect } from 'react-redux';
import { createSurvey, updateSurvey } from '../../actions/SurveyActions';

class ShareWithScreen extends Component {

  state = {
    selected : [],
  };

  getData(val){
      this.setState({selected: val});
  }

  
  shareWithUsers = async() =>
  {
      let friends = this.state.selected.map(x => x = {"id": x.key, "votes":false});
      if(this.props.navigation.state.params.survey)
      {
        await this.props.updateSurvey(this.props.navigation.state.params.survey, this.props.navigation.state.params.questions);
      }
      else
      {
        await this.props.createSurvey(this.props.navigation.state.params.title, this.props.navigation.state.params.questions);
        this.props.shareWith(friends, this.props.surveyId);
      }
      this.props.navigation.popToTop();
      this.props.navigation.navigate("SurveyList");
  }
  
  render() {
      return (
        <View style={{flex: 1, flexDirection:'column', backgroundColor: "#3498db"}}>
          <CustomHeader color='#3498db' title="Condividi" span={this.props.navigation.state.params.title} type='link'
          linkBackward={() => this.props.navigation.pop()} forward={this.state.selected.length>0} linkForward={() => this.shareWithUsers()}/>
          <FriendList share="true" navigation={this.props.navigation} sendData={(val) => this.getData(val)} />
        </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.friend.loading,
  surveyId: state.survey.id,
});

export default connect(mapStateToProps, {createSurvey, updateSurvey, shareWith}) (ShareWithScreen)