import React, {Component} from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/header';
import VoteList from '../components/vote/votelist';
import Loading from '../components/loading';
import { connect } from 'react-redux';
import Author from '../components/vote/author';
import { localize } from '../locales/i18n';


class SurveyVoteScreen extends Component {
  
  render() {
    if(this.props.loading)
      return (<Loading color='#9b59b6'/>);  
    return(
      <View style={{flex:1, backgroundColor: "#9b59b6", justifyContent:'flex-start'}}>
        <CustomHeader color='#9b59b6' title={localize("vote.title")} type='link' linkBackward={() => this.props.navigation.pop()}/>
        <Text style={{fontFamily: 'Pacifico', fontSize: 22, color: '#ecf0f1', textAlign: 'center'}}>{this.props.navigation.state.params.survey.surveyTitle}</Text>
        <Author owner={this.props.navigation.state.params.survey.owner} />
        <VoteList survey={this.props.navigation.state.params.survey} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.vote.loading && state.survey.loading,
});

export default connect(mapStateToProps) (SurveyVoteScreen);
