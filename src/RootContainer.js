import React, { Component } from 'react';
import { Root } from 'native-base';
import HomeScreen from './navigation/main';
import LoginScreen from './navigation/login';
import Loading from './components/loading';
import { loadingUser } from './actions/AuthActions';
import { connect } from 'react-redux';
import TutorialScreen from './screens/tutorial';

class RootContainer extends Component {
  state = {
    loadingFonts: true,
  }

  async componentDidMount()
  {
    this.props.loadingUser();
    await Expo.Font.loadAsync({
      FontAwesome: require('native-base/Fonts/FontAwesome.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Pacifico: require("./assets/fonts/Pacifico.ttf"),
      ColorTube: require("./assets/fonts/ColorTube.otf"),
      Blogger: require("./assets/fonts/Blogger.ttf"),
      Quicksand: require("./assets/fonts/Quicksand.otf"),
    });
    this.setState({loadingFonts: false});
  }

  render() {
    return (
        (this.props.loading || this.state.loadingFonts) ?
          <Loading />
        :
         (this.props.user ? 
            this.props.user.tutorial ? <TutorialScreen login /> : <HomeScreen /> 
          : 
        <Root><LoginScreen /></Root>)
    )
  }
}


const mapStateToProps = state => ({
  user : state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error
});

export default connect(mapStateToProps, {loadingUser})(RootContainer);
