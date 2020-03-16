import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import SharedSurvey from './sharedsurvey';
import Loading from '../loading';
import { sharedSurveysFetch } from '../../actions/ShareActions';
import { connect } from 'react-redux';
import { localize } from '../../locales/i18n';

class SharedList extends Component {

    componentDidMount(){
      this.props.sharedSurveysFetch();
    }
  
  
    renderItem = ({ item }) => {
      return(
        <SharedSurvey 
            data={item}
            onPress={() => this.props.navigation.navigate("SurveyVote", {survey : item.key, surveyTitle: item.surveyTitle, owner: item.owner, hasToVote: item.hasToVote, numMembers: item.numMembers})}
        />
      )
    }

    _keyExtractor = (item, index) => index.toString();

  
    render() {
      if(this.props.loading) 
        return <Loading color='#2ecc71' /> 
      return ( 
        <View style={{flex:1, padding: 15, marginHorizontal: 5}}>
          {this.props.sharedsurveys.length==0 ? <Text style={styles.noContent}>{localize("sharedSurveys.noContent")}</Text> :
            <FlatList 
              data={this.props.sharedsurveys}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
            />}
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    noContent: {
      fontFamily: 'Pacifico',
      alignSelf: 'center',
      fontSize: 18,
      alignItems: 'center',
      color: '#34495e',
      paddingTop: 50,
    }
  });
  
  const mapStateToProps = state => ({
    sharedsurveys : state.share.sharedsurveys,
    loading : state.share.loading
  });
  
  export default connect(mapStateToProps, { sharedSurveysFetch } ) (SharedList);