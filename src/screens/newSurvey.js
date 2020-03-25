import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Item, Input } from 'native-base';
import Loading from '../components/loading';
import CustomHeader from '../components/header';
import { createSurvey } from '../actions/SurveyActions';
import { connect } from 'react-redux';
import { localize } from '../locales/i18n';


class NewSurveyScreen extends Component {
  state = {
    inputValue: '',
  }

  makeSurvey(title)
  {
    if(this.state.inputValue!='')
    {
      this.setState({inputValue: ''});
      this.props.navigation.navigate("AddItems", {surveyTitle : title, noVotes: true})
    }
  }

  render() {
    if(this.props.loading)
      return (<Loading />);
    return(
      <View style={{flex: 1, flexDirection:'column', backgroundColor: "#16a085"}}>
        <CustomHeader color='#16a085' title={localize("newSurvey.title")} type='back' 
        linkBackward={() => this.props.navigation.popToTop()} 
        forward={this.state.inputValue!=''} linkForward={() => this.makeSurvey(this.state.inputValue)}/>
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <Text style={styles.title}>{localize("newSurvey.desc")}</Text>
          <Text style={styles.example}>{localize("newSurvey.example", {year: new Date().getFullYear()})}</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 20}}>
            <Icon type="FontAwesome" style={styles.icon} name="quote-left" />
            
              <Input maxLength={36} style={styles.input} disabled = {this.props.loading} placeholderTextColor="#fdfbfb"
              value={this.state.inputValue} onChangeText={(inputValue) => this.setState({inputValue})}
              onSubmitEditing={()=>this.makeSurvey(this.state.inputValue)}
              />
            <Icon type="FontAwesome" style={styles.icon} name="quote-right" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Blogger' ,
    fontSize: 24,
    color: '#fdfbfb',
    textAlign: 'center',
    lineHeight: 32
  },
  icon: {
    fontSize: 18,
    color:'#fdfbfb',
    textAlign:'center'
  },
  input: {
    fontFamily: 'Blogger',
    fontSize: 18,
    color: '#fdfbfb',
    borderBottomColor: '#fdfbfb',
    borderBottomWidth: 2
  },
  example: {
    fontFamily: 'Quicksand',
    padding: 20,
    paddingBottom: 48,
    fontSize: 16,
    color: '#fdfbfb',
    lineHeight: 25,
    textAlign: 'justify'
  }
});

const mapStateToProps = state => ({
  loading: state.survey.loading,
});

export default connect(mapStateToProps, { createSurvey } ) (NewSurveyScreen);
