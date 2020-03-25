import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';
import LottieView from 'lottie-react-native';

class Loading extends Component {

  componentDidMount(){
    this.animation.play();
  }

  render() {
    return (
      <View style={{backgroundColor: this.props.color ? this.props.color : '#fafafa', justifyContent: 'center', alignItems:'center', flex: 1 }}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{width: this.props.large ? 96 : 64, height: this.props.large ? 96 : 64}}
          source={require('../api/loading.json')}
          loop
        />
        {this.props.percent != null ? 
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>    
          <Text style={{fontFamily:'ColorTube', color:'#fdfbfb', fontSize: 24}}>{this.props.percent}</Text>
          <Icon type="FontAwesome5" name="percentage" style={{fontSize: 24, color:'#fdfbfb', paddingLeft: 10}}/>
        </View> : null }
    {/*<Spinner color={this.props.negative ? '#fdfbfb' : this.props.color} />*/}
      </View>
    );
  }
}

export default Loading;
