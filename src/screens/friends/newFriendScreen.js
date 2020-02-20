import React, {Component} from 'react';
import { View } from "react-native";
import CustomHeader from '../../components/header';
import InputBar from '../../components/inputBar';
import UserList from '../../components/userlist';
import { searchUser } from '../../actions/FriendActions';
import { connect } from 'react-redux';


class NewFriendScreen extends Component {

  search(value) {
    if(value != '')
    {
      value = value.trim().toUpperCase();
      this.props.searchUser(value);
    }
  }

  
  render() {
      return (
      <View style={{flex: 1, flexDirection:'column', backgroundColor: "#fdfbfb"}}>
        <CustomHeader color='#3498db' title="Aggiungi amico" type='link' linkBackward={() => this.props.navigation.pop()}/>
        <InputBar color='#3498db' loading={this.props.loading} placeholder='Cerca utente' icon='search' 
        onSubmit={(value)=>this.search(value)}/>
        <UserList navigation={this.props.navigation} />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  foundItems : state.friend.foundItems,
});

export default connect(mapStateToProps, { searchUser } ) (NewFriendScreen);
