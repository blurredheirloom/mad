import React, { Component } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Text, Icon, Button } from "native-base";
import Loading from '../loading';
import { connect } from 'react-redux';
import { localize } from '../../locales/i18n';

class ConfirmModal extends Component {
render() {
    if(this.props.loading)
      return <Loading color='#e74c3c' /> 
    return(
        <Modal
            animationType="slide"
            visible={this.props.modalVisible}
            onRequestClose={this.props.cancel}>
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor:'#e74c3c'}}>
                    <Text style={styles.text}>{localize("mySurveys.warning")}</Text>
                    <View style={{justifyContent:'space-around' }}>
                      <Button
                        iconLeft style={{backgroundColor: '#fdfbfb', height: 64, marginVertical: 15}} onPress={this.props.confirm}>
                          <Icon style={{color:'#e74c3c'}} type="FontAwesome" name="check" />
                          <Text style={styles.textButton}>{localize("mySurveys.confirm")}</Text>
                      </Button>
                      <Button
                        iconLeft style={{backgroundColor: '#fdfbfb', height: 64, marginVertical: 15}} onPress={this.props.cancel}>
                        <Icon style={{color:'#e74c3c'}} type="FontAwesome" name="times" />
                        <Text style={styles.textButton}>{localize("mySurveys.cancel")}</Text>
                      </Button>
                    </View>
                </View>
        </Modal>
    )
  }
}

const styles = StyleSheet.create({
  textButton: {
    fontFamily:'Blogger', 
    fontSize: 16, 
    letterSpacing: 1,
    color:'#e74c3c'
  },
  text: {
    fontFamily: 'Blogger',
    fontSize: 22,
    color: '#ecf0f1',
    padding: 24,
    textAlign: 'center',
    lineHeight: 40
  }
});


const mapStateToProps = state => ({
  loading: state.survey.loading,
});

export default connect(mapStateToProps) (ConfirmModal);



