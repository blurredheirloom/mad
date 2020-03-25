import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Item, Input, Button, Text, Icon } from 'native-base';
import { register } from '../../actions/AuthActions';
import Loading from '../../components/loading';
import { connect } from 'react-redux';
import CustomHeader from '../../components/header';
import { localize } from '../../locales/i18n';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    visible: false
  };

  render() {
    if(this.props.loading)
      return (<Loading large />);
    return(
      <View style={{flex:1, backgroundColor: '#fdfbfb', flexDirection:'column'}}>
        <CustomHeader type="login" />
        <View style={styles.content}>
          <View>
            <Item>
              <Input style={styles.text} autoCorrect={true} placeholder='Email' 
                value={this.state.email} onChangeText={(email) => this.setState({email})}
              />
              <Icon style={styles.text} active name='mail' />
            </Item>
            <Item last>
              <Input style={styles.text} secureTextEntry={!this.state.visible} placeholder='Password'
                value={this.state.password} onChangeText={(password) => this.setState({password})}
              />
              <TouchableWithoutFeedback onPressIn={() => {this.state.password.length ? this.setState({visible: true}) : null}} 
                onPressOut={() => {this.state.password.length ? this.setState({visible: false}) : null}}>
              <Icon style={[styles.text,{paddingLeft: 15}]} active name={this.state.visible ? 'eye' : 'key'} />
              </TouchableWithoutFeedback>
            </Item>
            <Button disabled={!this.state.email || !this.state.password} block
            style={[styles.button, (this.state.email && this.state.password) ? {backgroundColor: '#1abc9c'} : {backgroundColor: '#40bca3'}]}
              onPress={() => this.props.register({
                email: this.state.email,
                password: this.state.password,
              })}>
              <Text style={{fontFamily: "Blogger", letterSpacing: 1, fontSize: 16, color: (this.state.email && this.state.password) ? '#fdfbfb' : '#00a082'}}>{localize("auth.registerButton")}</Text>
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
    marginTop: 20,
    borderRadius: 2,
    height: 48
  },
  text: {
    color: '#34495e',
    fontFamily: "Blogger"
  },
  login: {
    textAlign:'center',
    paddingTop: 15,
    paddingBottom: 10,
    color: '#3498db',
    fontSize: 16,
    fontFamily: "Blogger"
  }
});


const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loadingAction,
  error: state.auth.error,
});

export default connect(mapStateToProps, { register } ) (RegisterScreen);
