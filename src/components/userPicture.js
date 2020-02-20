import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';

class UserPicture extends Component {
  render() {
    if(this.props.user.photoURL)
    {
      return(
        <Thumbnail {...this.props} style={{borderColor: this.props.color, borderWidth: 1}} source={{uri: this.props.user.photoURL+"?type=large"}} />
      )
    }
    return (
        <Thumbnail {...this.props} style={{borderColor: this.props.color, borderWidth: 1}} source={require('../assets/images/user.png')} />
    )
  }
}

const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error
});

export default connect(mapStateToProps) (UserPicture);
