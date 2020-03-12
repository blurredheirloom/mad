import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon, Button } from 'native-base';

class InputBar extends Component
{
  state = {
    inputValue: '',
  }

  onSubmit()
  {
    this.props.onSubmit(this.state.inputValue);
    this.setState({inputValue: ''});
  }

  render() {
    return (
        <View style={[styles.bar, {backgroundColor: this.props.color}]}>
          <TextInput style={[styles.input, this.props.full ? styles.disabled : styles.enabled]} editable = {!this.props.loading && !this.props.full}
          placeholderTextColor={this.props.full ? this.props.color : "#bdc3c7"} placeholder={this.props.full ? "MAX 10 scelte a domanda" : this.props.placeholder} value={this.state.inputValue}
          onChangeText={(inputValue) => this.setState({inputValue})}
          onSubmitEditing={() => this.onSubmit(this.state.inputValue)}
          underlineColorAndroid='transparent'
          maxLength={48}
          />
          <Button rounded style={[styles.button, this.state.inputValue=='' ? styles.disabled : styles.enabled]}
            disabled = {this.state.inputValue==''}
            onPress={()=>this.onSubmit(this.state.inputValue)}>
            <Icon style={{ fontSize: 14, color: this.props.color}}  type="FontAwesome" name={this.props.icon} />
          </Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    padding: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 0.95,
    height: 48,
    fontFamily: 'Blogger',
    fontSize: 18,
    backgroundColor: '#ecf0f1',
    color: '#34495e',
    borderRadius: 50,
    elevation: 1,
    paddingHorizontal: 20
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  enabled: {
    backgroundColor: 'rgba(236, 240, 241, 1)',
    elevation: 1,
  },
  disabled: {
    backgroundColor: 'rgba(236, 240, 241, 0.2)',
    elevation: 0,
  }
});


export default InputBar;
