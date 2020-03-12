import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';

class UserPicture extends Component {
  render() {
    if(this.props.user.image)
    {
      return(
        <Thumbnail {...this.props} style={[this.props.style, {backgroundColor: '#fdfbfb', borderColor: this.props.color}]} source={{uri: this.props.user.image}} />
      )
    }
    return (
        <Thumbnail {...this.props} style={[this.props.style, {backgroundColor: '#fdfbfb', borderColor: this.props.color}]} source={require('../assets/images/user.png')} />
    )
  }
}

const mapStateToProps = state => ({
  user : state.auth.user,
});

export default connect(mapStateToProps) (UserPicture);
