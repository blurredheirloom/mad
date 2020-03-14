import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/header';
import VoteList from '../components/vote/votelist';
import Loading from '../components/loading';
import { connect } from 'react-redux';
import Author from '../components/vote/author';
import { localize } from '../locales/i18n';
import { questionsFetch } from '../actions/VoteActions';


class SurveyVoteScreen extends Component {

  async componentDidMount()
  {
    if(this.props.navigation.state.params.survey)
    {
      await this.props.questionsFetch(this.props.navigation.state.params.survey);
    }
  }
  
  render() {
    if(this.props.loading)
      return (<Loading color='#9b59b6'/>);  
    return(
      <View style={{flex:1, backgroundColor: "#9b59b6", justifyContent:'flex-start'}}>
        <CustomHeader color='#9b59b6' title={localize("vote.title")} type='link' linkBackward={() => this.props.navigation.pop()}/>
        {this.props.questionsVote.length==0 ? <Text style={styles.noContent}>{localize("vote.deleted")}</Text> :
        <View style={{flex: 1}}>
          <Text style={{fontFamily: 'Pacifico', fontSize: 22, color: '#ecf0f1', textAlign: 'center'}}>{this.props.navigation.state.params.surveyTitle}</Text>
          <Author owner={this.props.navigation.state.params.owner} />
          <VoteList survey={this.props.navigation.state.params.survey} questions={this.props.questionsVote} numMembers={this.props.navigation.state.params.numMembers}/>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noContent: {
    fontFamily: 'Pacifico',
    fontSize: 18,
    color: '#fdfbfb',
    paddingTop: 50,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  loading: state.vote.loading,
  questionsVote: state.vote.questions,
});

export default connect(mapStateToProps, {questionsFetch}) (SurveyVoteScreen);
