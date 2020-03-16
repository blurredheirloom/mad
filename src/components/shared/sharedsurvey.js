import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class SharedSurvey extends Component
{
    render(){
        return(
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                    <Animatable.Text animation='bounceInDown' duration={500} style={styles.item}>{this.props.data.surveyTitle}</Animatable.Text>
                    {this.props.data.hasToVote==0 ? <Icon style={{paddingLeft: 15, fontSize: 16, color:"#2ecc71"}} type="FontAwesome" name="handshake-o" /> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    item: {
      fontFamily: 'Blogger',
      fontSize: 16,
      color: '#34495e',
      flex: 1,
      lineHeight: 18
    }
  });