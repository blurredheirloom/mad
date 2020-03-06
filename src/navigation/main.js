/* Main Navigation */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'native-base';
import HomeScreen from '../screens/home';
import InfoScreen from '../screens/info';
import NewSurveyScreen from '../screens/newSurvey';
import SurveyListScreen from '../screens/surveys/surveyListScreen';
import AddItemsScreen from '../screens/surveys/addItemsScreen';
import SharedListScreen from '../screens/shared/sharedListScreen';
import ShareWithScreen from '../screens/shared/shareWithScreen';
import SurveyVoteScreen from '../screens/surveyVoteScreen';
import FriendListScreen from '../screens/friends/friendListScreen';
import NewFriendScreen from '../screens/friends/newFriendScreen';
import UserPicture from '../components/userPicture';
import Badge from '../components/badge';
import AddAvatarScreen from '../screens/addAvatarScreen';
import CameraScreen from '../screens/camera';

const MainNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator(
        {
          Home: { screen: HomeScreen },
          NewSurvey: { screen: NewSurveyScreen },
          AddItems: { screen: AddItemsScreen },
          ShareWith: { screen: ShareWithScreen },
          Info: {screen: InfoScreen},
          Avatar: {
            screen: createStackNavigator(
            {
              Avatar: { screen: AddAvatarScreen },
              Camera: { screen: CameraScreen }
            },
            {
              headerMode: 'none',
              initialRouteName: 'Avatar',
            })
          }
        },
        {
          headerMode: 'none',
          initialRouteName: 'Home',
         
          navigationOptions: { 
            tabBarIcon: ({ focused }) => {
              if(!focused)
                return (
                    <UserPicture style={{borderWidth: 1}} small color='#bdc3c7' />
                );
              else {
                return (
                  <Icon
                    type="FontAwesome"
                    name='home'
                    style={focused ? {color: '#1abc9c'} : {color: '#bdc3c7'}}
                  />
                );
              }
            },
            tabBarLabel: () => {}
          }
        }
      )
    },
    Survey: {
      screen: createStackNavigator(
        {
          SurveyList: { screen: SurveyListScreen },
          AddItems: { screen: AddItemsScreen },
          ShareWith: { screen: ShareWithScreen },
          
        },
        {
          headerMode: 'none',
          initialRouteName: 'SurveyList',
          navigationOptions: { 
            tabBarIcon: ({ focused }) => {
              return (
                <Icon
                  type="FontAwesome"
                  name='list-ul'
                  style={focused ? {color: '#e67e22'} : {color: '#bdc3c7'}}
                />
              );
            },
            tabBarLabel: () => {}
          }
        }
      )
    },
    Shared: {
      screen: createStackNavigator(
        {
          SharedList: { screen: SharedListScreen},
          SurveyVote: { screen: SurveyVoteScreen },
        },
        {
          headerMode: 'none',
          initialRouteName: 'SharedList',
          navigationOptions: { 
            tabBarIcon: ({ focused }) => {
              return (
                <Badge type="surveys" style={focused ? {color: '#2ecc71'} : {color: '#bdc3c7'}}/>
              );
            },
            tabBarLabel: () => {}
          }
        }
      )
    },
    Friends: {
      screen: createStackNavigator(
        {
          FriendList: { screen: FriendListScreen },
          NewFriend: { screen: NewFriendScreen },
        },
        {
          headerMode: 'none',
          initialRouteName: 'FriendList',
          navigationOptions: { 
            tabBarIcon: ({ focused }) => {
              return (
                <Badge type="friends" style={focused ? {color: '#3498db'} : {color: '#bdc3c7'}}/>
              );
            },
            tabBarLabel: () => {}
          }
        }
      )
    }
  },
  {
    tabBarOptions: {
      style: {
  			backgroundColor: '#fdfdfd',
        borderTopColor: "#eaeaea",
        borderTopWidth: 1, 
        borderRadius: 50
      },
      keyboardHidesTabBar: false,
    }
  }
)

export default createAppContainer(MainNavigation);
