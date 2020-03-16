import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import { Text, Thumbnail } from 'native-base';
import CustomHeader from '../components/header';
import { localize } from '../locales/i18n';


class InfoScreen extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
      <View style={{flex: 2,  backgroundColor: '#1abc9c'}}>
          <CustomHeader type="info" color="#1abc9c" linkBackward={() => this.props.navigation.pop()} />
          <View style={{flex:1, paddingVertical: 15, paddingHorizontal: 30, justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{fontFamily: 'ColorTube', fontSize: 10, color: '#fdfbfb', paddingRight: 10}}>mad</Text>
              <Text style={styles.text}>(</Text>
              <Text style={{fontFamily: 'Pacifico', fontSize: 13, color: '#34495e'}}>make a decision</Text>
              <Text style={styles.text}>)</Text>
            </View>
            <Text style={styles.text}>{localize("info.description")}</Text>
            <View style={styles.description}>
              <Text style={{fontFamily: 'Blogger', color: '#34495e', fontSize: 14}}>{localize("info.authorLabel")}</Text>
              <Text style={[styles.text, {flex:1, textAlign: 'right'}]}>{localize("info.authorName")}</Text>
            </View>
          </View>
      </View>
      <View style={{flex:1, backgroundColor: '#fdfbfb', justifyContent:'space-between', paddingHorizontal: 30, paddingVertical: 15}}> 
        <Text style={{fontFamily: 'Blogger', color: '#34495e', fontSize: 14}}>{localize("info.techLabel")}</Text>
        <View style={{flex:1, justifyContent:'space-evenly'}}>
          <View style={styles.row}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Thumbnail small square source={require('../assets/images/react.png')} />
              <Text style={{fontFamily: 'Pacifico', paddingHorizontal: 10}}>+</Text>
              <Thumbnail small square source={require('../assets/images/expo.png')} />
            </View>
            <Text style={[styles.text, {textAlign: 'right', color: '#34495e'}]}>React Native + Expo</Text>
          </View>
          <View style={styles.row}>
            <Thumbnail small square source={require('../assets/images/firebase.png')} />
            <Text style={[styles.text, {textAlign: 'right', color: '#34495e'}]}>Firebase</Text>
          </View>
          <View style={styles.row}>
            <Thumbnail small square source={require('../assets/images/redux.png')} />
            <Text style={[styles.text, {textAlign: 'right', color: '#34495e'}]}>Redux</Text>
          </View>
        </View>
        <Text style={{fontFamily: 'Quicksand', textAlign: 'center',  color: '#34495e', fontSize: 12}}>Copyright {'\u00A9'} {new Date().getFullYear()}</Text>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    row: {
      flexDirection:'row', 
      justifyContent:'space-between', 
      alignItems:'center'
    },
    description: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderColor: '#34495e',
      borderTopWidth: 0.8,
      paddingTop: 10,
      marginTop: 5
    },
    text: {
      fontFamily: 'Quicksand',
      fontSize: 14,
      color: '#fdfbfb',
      lineHeight: 20,
    }
  });

export default InfoScreen;
