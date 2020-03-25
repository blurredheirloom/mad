import React, {Component} from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

class Loading extends Component {

  componentDidMount(){
    this.animation.play();
  }

  render() {
    return (
      <View style={{ backgroundColor: this.props.negative ? this.props.color : '#fafafa', justifyContent: 'center', alignItems:'center', flex: 1 }}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{width: 96, height: 96}}
          source={require('../api/loading.json')}
          loop
        />
    {/*<Spinner color={this.props.negative ? '#fdfbfb' : this.props.color} />*/}
      </View>
    );
  }
}

export default Loading;
