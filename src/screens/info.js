import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import { Text, Thumbnail } from 'native-base';
import CustomHeader from '../components/header';


class InfoScreen extends Component {
  render() {
    return(
      <View style={{flex: 1}}>
      <View style={{flex: 2, paddingHorizontal: 15, justifyContent:'space-around', backgroundColor: '#1abc9c'}}>
        <CustomHeader type="info" color="#1abc9c" linkBackward={() => this.props.navigation.pop()} />
          <View style={{paddingHorizontal: 15, justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{fontFamily: 'ColorTube', fontSize: 10, color: '#ecf0f1'}}>mad </Text>
              <Text style={styles.text}>(</Text>
              <Text style={{fontFamily: 'Pacifico', fontSize: 13, color: '#34495e'}}>make a decision</Text>
              <Text style={styles.text}>)</Text>
            </View>
            <Text style={styles.text}>
                è un’app che aiuta a prendere decisioni insieme ad altre persone.{"\n"}
                Un utente può creare un sondaggio (ad es. "Dove mangiamo stasera?"),
                aggiungere le scelte possibili e condividerlo con gli amici.{"\n"}
                Ogni utente invitato a partecipare al sondaggio può esprimere la propria preferenza, votando.
            </Text>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <View style={styles.description}>
              <Text style={{fontFamily: 'ColorTube', color: '#34495e', fontSize: 8}}>Progetto per</Text>
              <Text style={[styles.text, {textAlign: 'right', flex:1, flexWrap: 'wrap'}]}>Laboratorio Avanzato di Programmazione II</Text>
            </View>
            <View style={styles.description}>
              <Text style={{fontFamily: 'ColorTube', color: '#34495e', fontSize: 8}}>Realizzato da</Text>
              <Text style={[styles.text, {textAlign: 'right'}]}>Matteo Stracquadanio</Text>
            </View>
          </View>
      </View>
      <View style={{flex:1, flexDirection:'column', backgroundColor: '#ffffff', paddingHorizontal: 30}}> 
        <Text style={{fontFamily: 'ColorTube', color: '#34495e', paddingVertical: 10, fontSize: 8}}>Realizzato con</Text>
        <View style={{flex:1, justifyContent:'space-around'}}>
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
      paddingVertical: 5
    },
    title: {
      marginBottom: -24,
      fontSize: 32,
      color: '#ecf0f1',
      fontFamily: 'ColorTube',
      textAlign: 'center',
    },
    text: {
      fontFamily: 'Quicksand',
      fontSize: 14,
      color: '#ecf0f1',
      lineHeight: 20,
      textAlign: 'left',
    },
    subtitle: {
      fontSize: 18,
      color: '#34495e',
      fontFamily: 'Pacifico',
      textAlign: 'center',
    },
    header: {
      backgroundColor: '#1abc9c',
      paddingTop: 40,
      paddingBottom: 20,
      height: 100,
      borderBottomWidth: 0,
    }
  });

export default InfoScreen;
