import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class SharedSurvey extends Component
{
    render(){
        return(
            <ListItem style={{ marginLeft:0, borderBottomColor: '#eee', borderBottomWidth: 1 }} onPress={this.props.onPress}>
                <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                    <Animatable.Text animation='bounceInDown' duration={500} style={styles.item}>{this.props.data.surveyTitle}</Animatable.Text>
                    {this.props.data.hasToVote==0 ? <Icon style={{fontSize: 16, color:"#2ecc71"}} type="FontAwesome" name="handshake-o" /> : null}
                </View>
            </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      fontFamily: 'ColorTube',
      fontSize: 10,
      color: '#34495e',
      marginLeft: 0,
    }
  });