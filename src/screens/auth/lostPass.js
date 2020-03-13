import React, { Component } from 'react';
import { Item, Input, Button, Text, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { resetPassword } from '../../actions/AuthActions';
import { connect } from 'react-redux';
import Loading from '../../components/loading';
import CustomHeader from '../../components/header';
import { localize } from '../../locales/i18n';

class LostPassScreen extends Component {
  state = {
    email: '',
  };
  

  render() {
    if(this.props.loading)
      return (<Loading color='#1abc9c'/>);
    return(
      <View style={{flex:1, backgroundColor: '#fdfbfb', flexDirection:'column'}}>       
        <CustomHeader type="login" />
        <View style={styles.content}>
          <View>
            <Item>
              <Input style={styles.text} autoCorrect={true} placeholder='Email' value={this.state.email} 
              onChangeText={(email) => this.setState({email})}/>
              <Icon style={styles.text} active name='mail' />
            </Item>
            <Button disabled={!this.state.email} block
            style={[styles.button, (this.state.email) ? {backgroundColor: '#1abc9c'} : {backgroundColor: '#bdc3c7'}]}
              onPress={() => this.props.resetPassword(this.state.email)}>
              <Text style={{fontFamily: "Blogger", letterSpacing: 1, fontSize: 16}}>{localize("auth.recoverButton")}</Text>
            </Button>
          </View>
          <View style={{flex:1, justifyContent:'flex-end'}}>
            <Text style={styles.login} onPress={() => this.props.navigation.navigate("Login")}>{localize("auth.loginLabel")}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 35,
    paddingTop: 10,
    flex: 1
  },
  button: {
    marginTop: 25,
    borderRadius: 5,
    elevation:0,
    height: 50
  },
  text: {
    color: '#34495e',
    fontFamily: 'Quicksand'
  },
  login: {
    textAlign:'center',
    paddingTop: 15,
    paddingBottom: 10,
    color: '#3498db',
    fontSize: 14,
    fontFamily: "Quicksand"
  }
});


const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loadingAction,
  error: state.auth.error,
});

export default connect(mapStateToProps, { resetPassword }) (LostPassScreen);
