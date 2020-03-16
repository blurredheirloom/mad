import React, { Component } from 'react';
import { Icon, Button} from 'native-base';
import { StyleSheet, View, Text } from 'react-native';
import { setTutorial } from '../actions/UserActions';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import { localize } from '../locales/i18n';

class TutorialScreen extends Component {
  state = {
    current: 0
  }

  onDone = () => {
    if(this.props.login)
      this.props.setTutorial();
    else
      this.props.navigation.pop();
  };
 
  onNext = (index) => {
    this.AppIntroSlider.goToSlide(index+1)
    this.setState({current: index+1});
  };

  _renderItem = ({ item }) => (
    item.key=='0' ?
      <View style={{flex: 1, paddingVertical: 20, paddingHorizontal: 20, backgroundColor: item.backgroundColor, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Text style={{fontSize: 64, fontFamily: 'ColorTube', color: '#1abc9c'}}>m</Text>
          <Text style={{fontSize: 64, fontFamily: 'ColorTube', color: '#e67e22'}}>a</Text>
          <Text style={{fontSize: 64, fontFamily: 'ColorTube', color: '#3498db'}}>d</Text>
        </View>
        <Text style={{color: '#2c3e50', fontFamily: 'Pacifico', fontSize: 36, textAlign: 'center', marginTop: -48}}>{item.text}</Text>
      </View>
    :
      <View style={{flex: 1, paddingVertical: 20, paddingHorizontal: 20, backgroundColor: item.backgroundColor, justifyContent: 'space-around', alignItems: 'center'}}>
        <Text style={{fontSize: 32, color: '#fdfbfb', fontFamily: 'Pacifico', textAlign: 'center'}}>{item.title}</Text>
        <Icon type="FontAwesome" name={item.icon} style={{fontSize: 128, color:'#fdfbfb'}}/>
        <Text style={{color: '#fdfbfb', fontFamily: 'Blogger', fontSize: 22, textAlign: 'center', paddingVertical: 30}}>{item.text}</Text>
      </View>
  );
  

  _renderDoneButton = () => {
    return (
      <Button transparent onPress={()=>this.onDone()}>
        <Icon type="FontAwesome" name='check-square' style={{fontSize: 32, color:'#fdfbfb'}}/>
      </Button>
    );
  };

  _renderNextButton = () => {
    return (
      <Button transparent onPress={() => this.onNext(this.state.current)}>
        <Icon type="FontAwesome" name='chevron-circle-right' style={{fontSize: 32, color: this.state.current===0 ? '#2c3e50' : '#fdfbfb'}}/>
      </Button>
    );
  };

  _renderSkipButton = () => {
    return (
      <Button transparent onPress={() => this.onDone()} style={{paddingLeft: 10, paddingBottom: 0}}>
        <Text style={{fontSize: 16, color: this.state.current===0 ? '#2c3e50' : '#fdfbfb', fontFamily: 'Blogger', letterSpacing: 1, textTransform: 'uppercase'}}>{this.props.login ? localize("tutorial.skip") : localize("tutorial.close")}</Text>
      </Button>
    );
  };

  _onSlideChange = (index) => {
    this.setState({current: index});
  }

  render() {
    return (
        <AppIntroSlider
          ref={ref => this.AppIntroSlider = ref}
          slides={slides}
          renderItem={this._renderItem}
          renderDoneButton={this._renderDoneButton}
          renderSkipButton={this._renderSkipButton}
          renderNextButton={this._renderNextButton}
          showSkipButton={true}
          onSlideChange={this._onSlideChange}
          activeDotStyle={{backgroundColor: this.state.current===0 ? '#2c3e50' : 'rgba(255,255,255,.9)'}}
        /> 
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#fdfbfb',
    fontFamily: 'Pacifico',
    textAlign: 'center',
  },
  text: {
    color: '#fdfbfb',
    fontFamily: 'Blogger',
    fontSize: 12,
  }
});

const slides = [
  {
    key: '0',
    title: 'mad',
    text: 'make a decision',
    backgroundColor: '#fdfbfb',
  },
  {
    key: '1',
    title: localize("tutorial.title1"),
    text: localize("tutorial.desc1"),
    icon: 'users',
    titleStyle: styles.title,
    textStyle: styles.text,
    backgroundColor: '#3498db',
  },
  {
    key: '2',
    title: localize("tutorial.title2"),
    text: localize("tutorial.desc2"),
    icon: 'pencil',
    titleStyle: styles.title,
    textStyle: styles.text,
    backgroundColor: '#e67e22',
  },
  {
    key: '3',
    title: localize("tutorial.title3"),
    text: localize("tutorial.desc3"),
    icon: 'comment',
    titleStyle: styles.title,
    textStyle: styles.text,
    backgroundColor: '#2ecc71',
  },
  {
    key: '4',
    title: localize("tutorial.title4"),
    text: localize("tutorial.desc4"),
    icon: 'thumbs-up',
    titleStyle: styles.title,
    textStyle: styles.text,
    backgroundColor: '#9b59b6',
  }
]

const mapStateToProps = state => ({
  user : state.auth.user,
});

export default connect(mapStateToProps, {setTutorial})(TutorialScreen);
