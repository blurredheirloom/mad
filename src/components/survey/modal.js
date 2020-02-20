import React, { Component } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Text, Icon, Button } from "native-base";

export default class ConfirmModal extends Component {


  render() {
    return(
        <Modal
            animationType="slide"
            visible={this.props.modalVisible}
            onRequestClose={this.props.cancel}>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'#e74c3c'}}>
                    <Text style={styles.text}>Sei sicuro di voler eliminare tutti i sondaggi?</Text>
                    <View style={{justifyContent:'space-around' }}>
                      <Button
                        iconLeft style={{backgroundColor: '#fdfdfd', height: 64, marginVertical: 15}} onPress={this.props.confirm}>
                          <Icon style={{color:'#e74c3c'}} type="FontAwesome" name="check" />
                          <Text style={styles.textButton}>Conferma</Text>
                      </Button>
                      <Button
                        iconLeft style={{backgroundColor: '#fdfdfd', height: 64, marginVertical: 15}} onPress={this.props.cancel}>
                        <Icon style={{color:'#e74c3c'}} type="FontAwesome" name="times" />
                        <Text style={styles.textButton}>Annulla</Text>
                      </Button>
                    </View>
                </View>
        </Modal>
    )
  }
}

const styles = StyleSheet.create({
  textButton: {
    fontFamily:'ColorTube', 
    fontSize: 10, 
    color:'#e74c3c'
  },
  text: {
    fontFamily: 'ColorTube',
    fontSize: 13,
    color: '#ecf0f1',
    padding: 24,
    textAlign: 'center',
    lineHeight: 40
  }
});


