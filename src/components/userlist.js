import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
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
                {this.props.error != '' ?
                    <Text style={styles.noContent}>{this.props.error}</Text> :
                    <FlatList
                        data={this.props.foundItems}
                        renderItem={this.renderItem}
                    />
                }
            </View>
        );
  }
}

const styles = StyleSheet.create({
  noContent: {
    fontFamily: 'Pacifico',
    alignSelf: 'center',
    fontSize: 18,
    alignItems: 'center',
    color: '#34495e',
    paddingTop: 50,
  }
});


const mapStateToProps = state => ({
  foundItems : state.friend.foundItems,
  error: state.friend.error,
  loading: state.friend.loading
});

export default connect(mapStateToProps, { searchUser, addFriend } ) (UserList);
