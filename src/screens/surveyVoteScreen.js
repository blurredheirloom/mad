import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/header';
import VoteList from '../components/vote/votelist';
import { connect } from 'react-redux';
import Author from '../components/vote/author';
import { localize } from '../locales/i18n';
import { remainingVotes } from '../actions/VoteActions';
import Loading from '../components/loading';


class SurveyVoteScreen extends Component {


  state = {
    hasToVote: this.props.navigation.state.params.hasToVote,
    deleted: false
  }

  componentDidMount()
  {
    if(this.props.navigation.state.params.survey)
    {
      this.props.remainingVotes(this.props.navigation.state.params.survey);
    }
  }


  componentDidUpdate(prevProps)
  {
    if(prevProps.hasToVote.hasToVote!=this.props.hasToVote.hasToVote && this.props.hasToVote.id===this.props.navigation.state.params.survey)
      this.setState({hasToVote: this.props.hasToVote.hasToVote});
    if(this.props.hasToVote.hasToVote===null && prevProps.hasToVote.hasToVote!=this.props.hasToVote.hasToVote && this.props.hasToVote.id===this.props.navigation.state.params.survey)
      this.setState({deleted: true});
  }


  
  render() {
    if(this.props.loading)
        return <Loading color="#9b59b6" />
    return(
      <View style={{flex:1, backgroundColor: "#9b59b6", justifyContent:'flex-start'}}>
        <CustomHeader color='#9b59b6' title={localize("vote.title")} type='link' linkBackward={() => this.props.navigation.pop()}/>
        {this.state.deleted ? <Text style={styles.noContent}>{localize("vote.deleted")}</Text> :
        <View style={{flex: 1}}>
          <Text style={{fontFamily: 'Pacifico', fontSize: 22, color: '#fdfbfb', textAlign: 'center'}}>{this.props.navigation.state.params.surveyTitle}</Text>
          <Author owner={this.props.navigation.state.params.owner} />
          <VoteList survey={this.props.navigation.state.params.survey}  surveyTitle={this.props.navigation.state.params.surveyTitle}  hasToVote={this.state.hasToVote} numMembers={this.props.navigation.state.params.numMembers}/>
        </View>}
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
  hasToVote: state.vote.hasToVote,
  loading: state.vote.loading,
});

export default connect(mapStateToProps, {remainingVotes}) (SurveyVoteScreen);
