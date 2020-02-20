import React, {Component} from 'react';
import { View } from 'react-native';
import { Spinner} from 'native-base';

class Loading extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#fdfbfb', justifyContent: 'center', alignItems:'center', flex: 1 }}>
        <Spinner color={this.props.color} />
      </View>
    );
  }
}

export default Loading;
