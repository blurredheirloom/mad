import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Button, Text, ListItem } from 'native-base';
import * as Animatable from 'react-native-animatable';
import UserPicture from './userPicture';

export default class User extends Component {

    render() {
        return (
            <Animatable.View useNativeDriver animation='fadeIn' duration={500} style={{flex: 1, marginHorizontal: 10, paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center'}}>
                <UserPicture image={this.props.data.image} uid={this.props.data.key} name={this.props.data.name} style={{borderWidth: 1.5}} small color='#3498db' />
                <Text style={styles.item}>{this.props.data.name}</Text>
              </View>
              <Button style={styles.button} 
              onPress={this.props.onPress}>
                <Icon style={{fontSize: 14, color:'#fdfbfb'}} type="FontAwesome" name="user-plus" />
              </Button>
          </Animatable.View>
      );
    }
}



  const styles = StyleSheet.create({
    button: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      backgroundColor: '#3498db',
    },
    item: {
      fontFamily: 'Blogger',
      fontSize: 13,
      color: '#34495e',
      paddingHorizontal: 10
    }
  });
 
  
