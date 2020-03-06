import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Item, Input } from 'native-base';
import Loading from '../components/loading';
import CustomHeader from '../components/header';
import { createSurvey } from '../actions/SurveyActions';
import { connect } from 'react-redux';


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
      return (<Loading color='#2c3e50' />);
    return(
      <View style={{flex: 1, flexDirection:'column', backgroundColor: "#2c3e50"}}>
        <CustomHeader color='#2c3e50' title="Nuovo sondaggio" type='back' 
        linkBackward={() => this.props.navigation.navigate("Home")} 
        forward={this.state.inputValue!=''} linkForward={() => this.makeSurvey(this.state.inputValue)}/>
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <Text style={styles.title}>Scegli un titolo per il tuo sondaggio</Text>
          <Text style={styles.example}>Ad esempio: 'Pasqua {new Date().getFullYear()}', 'I miei 18 anni', 'Festa Mario', ...</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 20}}>
            <Icon type="FontAwesome" style={styles.icon} name="quote-left" />
            <Item style={{flex:1}}>
              <Input maxLength={36} style={styles.input} disabled = {this.props.loading} placeholderTextColor="#fff"
              value={this.state.inputValue} onChangeText={(inputValue) => this.setState({inputValue})}
              onSubmitEditing={()=>this.makeSurvey(this.state.inputValue)}
              />
            </Item>
            <Icon type="FontAwesome" style={styles.icon} name="quote-right" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'ColorTube' ,
    fontSize: 13,
    color: '#ecf0f1',
    textAlign: 'center',
    lineHeight: 26
  },
  icon: {
    fontSize: 18,
    color:'#ecf0f1',
    textAlign:'center'
  },
  input: {
    fontFamily: 'Quicksand',
    color: '#ecf0f1'
  },
  example: {
    fontFamily: 'Quicksand',
    padding: 20,
    paddingBottom: 40,
    fontSize: 14,
    color: '#ecf0f1',
    lineHeight: 25,
    textAlign: 'justify'
  }
});

const mapStateToProps = state => ({
  loading: state.survey.loading,
});

export default connect(mapStateToProps, { createSurvey } ) (NewSurveyScreen);
