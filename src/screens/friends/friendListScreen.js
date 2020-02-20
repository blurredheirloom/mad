import React, {Component} from 'react';
import { View } from "react-native";
import { Icon, Fab } from 'native-base';
import FriendList from '../../components/friend/friendlist';
import CustomHeader from '../../components/header';

export default class FriendListScreen extends Component {

   render() {
      return (
        <View style={{flex: 1, flexDirection:'column', backgroundColor: "#fdfbfb" }}>
          <CustomHeader color='#3498db' title="Amici" type='menu'/>
          <FriendList />
          <Fab
              position="bottomRight"
              style={{backgroundColor: '#3498db' }}
              onPress={()=>this.props.navigation.navigate("NewFriend")}
          >
            <Icon type="FontAwesome" name="user-plus" />
          </Fab>
        </View>
    );
  }
}


