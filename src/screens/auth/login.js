import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Item, Input, Button, Text, Icon } from 'native-base';
import { login, signInWithFacebook, signInWithGoogle} from '../../actions/AuthActions';
import { connect } from 'react-redux';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import Loading from '../../components/loading';
import CustomHeader from '../../components/header';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  };
 

  loginWithFB = async() => {
    try {
      await Facebook.initializeAsync('172003210086289');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        { permissions: ['public_profile', 'email'] }
      );

      if (type === 'success') {
        this.props.signInWithFacebook(token);
      }
    }
    catch ({ message }) {
      console.log(message);
    }
  }

  loginWithGoogle = async () => {
    try {
      const isInClient = Expo.Constants.appOwnership === 'expo';
      const clientIdForUseInTheExpoClient = '934866289582-rp93005julugufc13q9jabkg8bnbkrh2.apps.googleusercontent.com';
      
      const yourClientIdForUseInStandalone = Platform.select({
        android:
          '934866289582-79dfqkk26v1kcki1nvg9pl2eqq3h09da.apps.googleusercontent.com',
        ios:
          '934866289582-jc4sqh3vacteiablm0j3egru5tvgogp8.apps.googleusercontent.com',
      });

      const clientId = isInClient
        ? clientIdForUseInTheExpoClient
        : yourClientIdForUseInStandalone;

      const result = await Google.logInAsync({
        clientId: clientId,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.props.signInWithGoogle(result.accessToken);
      } else {
        return {cancelled: true};
      }
    } catch(e) {
        return {error: true};
    }
  }

  render() {
    if(this.props.loading)
      return (<Loading color='#1abc9c' />);
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
              <Input style={styles.text} secureTextEntry placeholder='Password'
                value={this.state.password} onChangeText={(password) => this.setState({password})}
              />
              <Icon style={styles.text} active name='key' />
            </Item>
            <Button disabled={!this.state.email || !this.state.password} full
            style={[styles.button, (this.state.email && this.state.password) ? {backgroundColor: '#1abc9c'} : {backgroundColor: '#bdc3c7'}]}
              onPress={() => this.props.login({email: this.state.email, password: this.state.password})}>
              <Text style={{fontFamily: "ColorTube", fontSize: 9}}>Accedi</Text>
            </Button>
            <Text style={[styles.label, {color: '#3498db'}]} onPress={() => this.props.navigation.navigate("LostPass")}>
              Password dimenticata?
            </Text>
            <Text style={styles.label}>oppure accedi con</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button iconLeft full style={[styles.button, { flex:1, marginRight: 10, backgroundColor: '#3b5999'}]} onPress={() => this.loginWithFB()}>
              <Icon type="FontAwesome" name='facebook' />
              <Text style={{fontFamily: "ColorTube", fontSize: 8}}>Facebook</Text>
            </Button>
            <Button iconLeft full style={[styles.button, { flex:1, marginLeft: 10, flex:1, backgroundColor: '#dd4b39'}]} onPress={() => this.loginWithGoogle()}>
              <Icon type="FontAwesome" name='google' />
              <Text style={{fontFamily: "ColorTube", fontSize: 8}}>Google</Text>
            </Button>
          </View>
          <View style={{flex:1, justifyContent:'flex-end'}}>
            <Text style={[styles.label, {color: '#3498db'}]} onPress={() => this.props.navigation.navigate("Register")}>
              Non hai un account?
            </Text>
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
    fontFamily: "Quicksand"
  },
  label: {
    textAlign:'center',
    padding: 10,
    color: '#34495e',
    fontSize: 14,
    fontFamily: "Quicksand"
  }
});


const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loadingAction,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login, signInWithFacebook, signInWithGoogle} ) (LoginScreen);
