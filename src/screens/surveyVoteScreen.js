import React, {Component} from 'react';
import { View } from 'react-native';
import CustomHeader from '../components/header';
import VoteList from '../components/vote/votelist';
import Loading from '../components/loading';
import { connect } from 'react-redux';


class SurveyVoteScreen extends Component {
  
  render() {
    if(this.props.loading)
      return (<Loading color='#9b59b6'/>);  
    return(
      <View style={{flex:1, flexDirection:'column', backgroundColor: "#9b59b6", justifyContent:'flex-start'}}>
        <CustomHeader color='#9b59b6' title="Vota" type='link' linkBackward={() => this.props.navigation.pop()}/>
        <VoteList survey={this.props.navigation.state.params.survey} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.vote.loading,
});

export default connect(mapStateToProps) (SurveyVoteScreen);
