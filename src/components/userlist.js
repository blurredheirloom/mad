import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import Loading from './loading';
import User from './user';
import { searchUser, addFriend } from '../actions/FriendActions';
import { connect } from 'react-redux';


class UserList extends Component {

  search(value) {
    if(value != '')
    {
      value = value.trim().toUpperCase();
      this.props.searchUser(value);
    }
  }

  addFriend(key, name, image) {
    this.props.addFriend(key, name, image);
    this.props.navigation.pop();
  }

  renderItem = ({ item }) => {
    return(
        <User 
            data={item}
            onPress={() => this.addFriend(item.key, item.name, item.image)}
        />
    )
  }

  render() {
        if(this.props.loading) 
            return <Loading color='#3498db' />
        return (
            <View style={{padding: 10, flex:1}}>
                {this.props.foundItems!='' &&
                    <FlatList
                        data={this.props.foundItems}
                        renderItem={this.renderItem}
                    />
                }
            </View>
        );
  }
}


const mapStateToProps = state => ({
  foundItems : state.friend.foundItems,
  loading: state.friend.loading
});

export default connect(mapStateToProps, { searchUser, addFriend } ) (UserList);
