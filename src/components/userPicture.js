import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { View } from 'react-native-animatable';
import hashColor from 'hash-color-material';

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


class UserPicture extends Component {
  getNameColor = () => {
    const hex = hashColor.getColorFromString(this.props.uid ? this.props.uid : this.props.user.uid);
    return (hexToRgb(hex).r*0.299 + hexToRgb(hex).g*0.587 + hexToRgb(hex).b*0.114) > 186  ? '#34495e' : '#fdfbfb';
  }

  getName = () => {
    var name = this.props.name ? this.props.name : this.props.user.displayName;
    return name.split(" ")[0].charAt(0)+(name.split(" ")[1] ? name.split(" ")[1].charAt(0) : '')
  }

  render() {
    if(this.props.image)
    {
      return(
        <Thumbnail {...this.props} style={[this.props.style, {backgroundColor: '#fdfbfb', borderColor: this.props.color}]} source={{uri: this.props.image}} />
      )
    }
    else
    {
      return(
        this.props.user.image && this.props.tab ?
        <Thumbnail {...this.props} style={[this.props.style, {backgroundColor: '#fdfbfb', borderColor: this.props.color}]} source={{uri: this.props.user.image}} /*: require('../assets/images/user.png')} /> */ /> : 
        <View style={{borderWidth: this.props.small ? 1.5 : 3, borderRadius: this.props.small ? 18 : 55, width: this.props.small ? 36 : 110, height: this.props.small ? 36 : 110, justifyContent: 'center', alignItems: 'center', backgroundColor: hashColor.getColorFromString(this.props.uid ? this.props.uid : this.props.user.uid), borderColor: this.props.color}}>
          <Text style={{textTransform: 'uppercase', fontWeight: 'bold', fontSize: this.props.small ? 16: 48, color: this.getNameColor()}}>{this.getName()}</Text>
        </View> 
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps) (UserPicture);
