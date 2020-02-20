import React, {Component} from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Text, Card } from "native-base";


class RadioButton extends Component {
  onToggle = () => {
    this.props.radioSelect(this.props.index, this.props.value);
  }
  render () {
    return (
      <TouchableWithoutFeedback onPress={this.onToggle}>
          <Card style={[styles.container, this.props.active ? styles.active : styles.inactive]}>
            <Text style={[styles.text, this.props.active ? styles.activeText : styles.inactiveText]}>{this.props.label}</Text>
          </Card>
      </TouchableWithoutFeedback>);
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 5,
  },
  active: {
    opacity: 1
  },
  inactive: {
    opacity: 0.5
  },
  activeText: {
    color: '#34495e',
    fontFamily: 'ColorTube',
    fontSize: 10
  },
  inactiveText: {
    color: '#8e44ad',
    fontFamily: 'ColorTube',
    fontSize: 10
  }
});

export default RadioButton;
