import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Button, Text, ListItem, Thumbnail } from 'native-base';
import * as Animatable from 'react-native-animatable';


export default class User extends Component {

    render() {
        return (
            <Animatable.View animation='fadeIn' duration={500} style={{flex:1}}>
            <ListItem style={{backgroundColor: "#fdfbfb", borderRadius: 10, padding: 5, marginLeft:0}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {this.props.data.image && <Thumbnail small style={{borderColor: '#3498db', borderWidth: 1}} source={{ uri: this.props.data.image }} />}
                {!this.props.data.image && <Thumbnail small source={require('../assets/images/user.png')} />}
                <Text style={styles.item}>{this.props.data.name}</Text>
              </View>
              <Button style={styles.button} 
              onPress={this.props.onPress}>
                <Icon style={{fontSize: 14, color:'#ecf0f1'}} type="FontAwesome" name="user-plus" />
              </Button>
            </ListItem>
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
 
  
