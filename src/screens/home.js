import React, { Component } from 'react';
import { Notifications } from 'expo';
import { StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import { Button, Icon } from 'native-base';
import { logout } from '../actions/AuthActions';
import UserPicture from '../components/userPicture';
import CustomHeader from '../components/header';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { localize } from '../locales/i18n';

class HomeScreen extends Component {
  state = {
    notification: {},
    settings: false
  }

  componentDidMount() {
    /*Channel per Notifiche Android 8+ */
    Notifications.createChannelAndroidAsync('mad-notification', {
     name: 'MAD Notification',
     sound: true,
     priority: 'high'
   });
   this._notificationSubscription = Notifications.addListener(this._handleNotification);
 }
 

 _handleNotification = (notification) => {
   this.setState({ notification: notification });
   if(notification.origin==='selected')
   notification.data.vote ? this.props.navigation.navigate("SurveyVote", {survey: notification.data.key, surveyTitle: notification.data.surveyTitle, hasToVote: notification.data.hasToVote, owner: notification.data.owner, numMembers: notification.data.numMembers})
    : this.props.navigation.navigate("Friends");
 };

 change = () => {
  this.viewRef.flipInY(500); 
  this.setState({settings: !this.state.settings})
 }
 

 
  render() {
    return(
        <Animatable.View animation='bounceInDown' duration={500} style={{justifyContent: 'center', flex: 1, backgroundColor:'#fdfbfb' }}>
          <CustomHeader type="home" linkBackward={() => this.change()} iconBack={this.state.settings ? 'chevron-circle-left' :'gear'} color="#1abc9c" />
          <View style={{flex: 1, padding: 30, alignItems: 'center', justifyContent: 'flex-start', backgroundColor:'#1abc9c'}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Avatar")}>
              <Animatable.View  animation="pulse" duration={800} iterationCount="infinite" iterationDelay={5000}>
                <UserPicture image={this.props.user.image} uid={this.props.user.uid} name={this.props.user.displayName} style={{width: 110, height: 110, borderRadius: 55, borderWidth: 3}} large color='#fdfbfb' />
              </Animatable.View>
            </TouchableWithoutFeedback>
            <View style={{flex: 1, padding: 20}}>
              <Text style={styles.welcome}>{this.props.user.displayName.split(" ")[0]}</Text>
              <Text style={styles.welcome}>{this.props.user.displayName.split(" ")[1]}</Text>
            </View>
          </View>
          <Animatable.View ref={(ref) => this.viewRef = ref} style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 25}}>
            {this.state.settings ?
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'space-between', borderColor: '#fdfbfb'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                <Button vertical style={[styles.button, {flex: 1, height: 96, margin: 5}]} onPress={() => this.props.navigation.navigate("Avatar")}>
                  <Icon style={{color: '#fdfbfb', fontSize: 32,  paddingVertical: 10}} type="FontAwesome" name='user-circle' />
                  <Text style={{fontFamily: "Blogger", letterSpacing: 1, fontSize: 16, color: '#fdfbfb', textTransform: 'uppercase', paddingVertical: 10}}>{localize("home.avatar")}</Text>
                </Button>
                <Button vertical style={[styles.button, {flex: 1, height: 96, margin: 5}]} onPress={() => this.props.navigation.navigate("Info")}>
                  <Icon style={{color: '#fdfbfb', fontSize: 32,  paddingVertical: 10}} type="FontAwesome" name='info-circle' />
                  <Text style={{fontFamily: "Blogger", letterSpacing: 1, fontSize: 16, color: '#fdfbfb', textTransform: 'uppercase', paddingVertical: 10}}>{localize("home.info")}</Text>
                </Button>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                <Button vertical style={[styles.button, {flex: 1, height: 96, margin: 5}]} onPress={() => this.props.navigation.navigate("Tutorial")}>
                  <Icon style={{color: '#fdfbfb', fontSize: 32,  paddingVertical: 10}} type="FontAwesome" name='question-circle' />
                  <Text style={{fontFamily: "Blogger", letterSpacing: 1, fontSize: 16, color: '#fdfbfb', textTransform: 'uppercase', paddingVertical: 10}}>{localize("home.help")}</Text>
                </Button>
                <Button vertical style={[styles.button, {backgroundColor: '#e74c3c', flex: 1, height: 96, margin: 5}]} onPress={() => this.props.logout()}>
                  <Icon style={{color: '#fdfbfb', fontSize: 32,  paddingVertical: 10}} type="FontAwesome" name='sign-out' />
                  <Text style={{fontFamily: "Blogger", letterSpacing: 1, fontSize: 16, color: '#fdfbfb', textTransform: 'uppercase', paddingVertical: 10}}>{localize("home.exit")}</Text>
                </Button>
              </View>
              
            </View>
            : 
            <Button iconLeft style={styles.button} onPress={() => this.props.navigation.navigate("NewSurvey")}>
              <Icon style={{color: '#fdfbfb', fontSize: 32,  paddingVertical: 10, marginLeft:0}} type="FontAwesome" name='pencil' />
              <Text style={{fontFamily: "Blogger", letterSpacing: 1, fontSize: 16, color: '#fdfbfb', textAlign: 'center', textTransform: 'uppercase', paddingVertical: 10}}>{localize("home.makeSurvey")}</Text>
            </Button>
            }
          </Animatable.View>
        </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    backgroundColor: '#1abc9c',
    padding: 20,
    height: 64
  },
  welcome: {
    color: '#fdfbfb',
    fontSize: 24,
    textAlign:'center',
    fontFamily: 'Blogger',
  },
  logout: {
    fontFamily: 'Quicksand',
    color: '#fdfbfb',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error
});

export default connect(mapStateToProps, {logout}) (HomeScreen);
