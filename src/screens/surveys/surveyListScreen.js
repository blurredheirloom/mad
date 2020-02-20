import React, { Component } from "react";
import { View } from "react-native";
import { Icon, Fab, Button} from "native-base";
import SurveyList from '../../components/survey/surveylist';
import CustomHeader from '../../components/header';
import CustomModal from '../../components/survey/modal';
import { createSurvey, deleteUserSurveys } from '../../actions/SurveyActions';
import { connect } from 'react-redux';


class SurveyListScreen extends Component {
  state = {
    active: false,
    modalVisible: false
  }

  addSurvey(value)
  {
    if(value!='')
      this.props.createSurvey(value);
  }

  deleteAllSurveys()
  {
    this.props.deleteUserSurveys();
    this.setState({modalVisible: false});
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection:'column', backgroundColor: '#fdfdfd'}}>
        <CustomHeader color='#e67e22' title="I miei sondaggi" type='menu'/>
        <SurveyList navigation={this.props.navigation}/>
        {this.props.surveys.length>0 ?
        <Fab
            active={this.state.active}
            position="bottomRight"
            direction="up"
            style={{backgroundColor: '#e67e22'}}
            onPress={() => this.setState({ active: !this.state.active })}
        >
            <Icon type="FontAwesome" name="bars" />
            <Button style={{backgroundColor: '#1abc9c'}} onPress={() => this.props.navigation.navigate("NewSurvey")}>
              <Icon type="FontAwesome" name="plus" />
            </Button>
            <Button style={{backgroundColor: '#e74c3c'}} onPress={()=>this.setState({modalVisible: true})}>
              <Icon type="FontAwesome" name="trash" />
            </Button>
        </Fab> :
        <Fab
            position="bottomRight"
            style={{backgroundColor: '#1abc9c'}}
            onPress={() => this.props.navigation.navigate("NewSurvey")}
        >
          <Icon type="FontAwesome" name="plus" />
        </Fab>
      }
      <CustomModal 
        modalVisible={this.state.modalVisible} 
        confirm={() => this.deleteAllSurveys()} 
        cancel={() => this.setState({modalVisible: false})} 
      />
    </View>
    )
  }
}


const mapStateToProps = state => ({
  surveys: state.survey.surveys,
});

export default connect(mapStateToProps, { createSurvey, deleteUserSurveys } ) (SurveyListScreen);
