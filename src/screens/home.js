import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, Text, TouchableWithoutFeedback} from 'react-native';
import { Button, Icon} from 'native-base';
import { logout } from '../actions/AuthActions';
import UserPicture from '../components/userPicture';
import CustomHeader from '../components/header';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

class HomeScreen extends Component {
 
  render() {
    return(
        <Animatable.View animation='bounceInDown' duration={500} style={{justifyContent: 'center', flex: 1, backgroundColor:'#fdfbfb' }}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate("Info")}>
            <CustomHeader type="home" color="#1abc9c" />
          </TouchableHighlight>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor:'#1abc9c'}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Avatar")}>
              <Animatable.View animation="pulse" duration={800} iterationCount="infinite" iterationDelay={5000}>
                <UserPicture style={{width: 110, height: 110, borderRadius: 55, borderWidth: 2}} large color='#ecf0f1' />
              </Animatable.View>
            </TouchableWithoutFeedback>
            <Text style={styles.welcome}>{this.props.user.displayName}</Text>
            <Text uppercase={false} style={styles.logout} onPress={()=>this.props.logout()}>Esci</Text>
          </View>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Button vertical style={styles.button} onPress={() => this.props.navigation.navigate("NewSurvey")}>
              <Icon style={{color: '#ecf0f1', paddingTop: 10, paddingBottom:10}} type="FontAwesome" name='pencil' />
              <Text uppercase={false} style={{fontFamily: 'ColorTube', color: '#ecf0f1', fontSize: 10, textAlign: 'center', paddingTop: 10, paddingBottom:10}}>Crea sondaggio</Text>
            </Button>
          </View>
        </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: '#1abc9c',
    alignSelf: 'center',
    padding: 10,
  },
  welcome: {
    color: '#ecf0f1',
    fontSize: 20,
    textAlign:'center',
    fontFamily: 'Quicksand',
    paddingHorizontal: 10
  },
  logout: {
    fontFamily: 'Quicksand',
    textDecorationLine: 'underline',
    color: '#ecf0f1',
    fontSize: 18,
    padding: 10
  },
});

const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error
});

export default connect(mapStateToProps, {logout}) (HomeScreen);
