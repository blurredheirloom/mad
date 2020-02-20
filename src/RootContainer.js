import React, { Component } from 'react';
import HomeScreen from './navigation/main';
import LoginScreen from './navigation/login';
import Loading from './components/loading';
import { Root } from 'native-base';
import { loadingUser } from './actions/AuthActions';
import { connect } from 'react-redux';

class RootContainer extends Component {
  state = {
    loadingFonts: true,
  }

 async componentDidMount()
  {
    await this.props.loadingUser();
    await Expo.Font.loadAsync({
      FontAwesome: require('native-base/Fonts/FontAwesome.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Pacifico: require("./assets/fonts/Pacifico.ttf"),
      ColorTube: require("./assets/fonts/ColorTube.otf"),
      Quicksand: require("./assets/fonts/Quicksand.otf"),
    });
    this.setState({loadingFonts: false});
  }


  render() {
    return (
      <Root>
        {(this.props.loading || this.state.loadingFonts) ?
          <Loading color='#1abc9c'/>
        :
         (this.props.user ? <HomeScreen /> : <LoginScreen />)
        }
      </Root>
    )
  }
}

const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error
});

export default connect(mapStateToProps, {loadingUser})(RootContainer);
