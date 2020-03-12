import React, {Component} from 'react';
import { View } from "react-native";
import FriendList from '../../components/friend/friendlist';
import CustomHeader from '../../components/header';

export default class FriendListScreen extends Component {

  render() {
    return (
      <View style={{flex: 1, flexDirection:'column', backgroundColor: "#fdfbfb" }}>
        <CustomHeader color='#3498db' title="Amici" type='link' forward noBack iconSize={24} iconForward='user-plus' linkForward={()=>this.props.navigation.navigate("NewFriend")} />
        <FriendList />
      </View>
  );
}
}


