import React, {Component} from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { Button , Icon, Text} from 'native-base';
import Friend from './friend';
import Loading from '../loading';
import { friendsFetch, acceptFriend, deleteFriend } from '../../actions/FriendActions';
import { connect } from 'react-redux';

class FriendList extends Component {
    
    componentDidMount() {
        this.props.friendsFetch();
    }

    state = {
        items : [],
    };

    onCheckBoxPress(item) {
        item.checked = !item.checked;
        let newData = [];
        if(item.checked)
            newData = [...this.state.items, item];
        else
        {
            newData = [...this.state.items];
            newData.splice(newData.indexOf(item), 1);
        }
        this.setState({"items" : newData});
        this.props.sendData(newData);
    }



    renderItem = ({ item }) => {
        return(
            <Friend 
                data={item}
                share={this.props.share}
                onCheck={this.props.share ? () => this.onCheckBoxPress(item) : null}
                accept={()=>this.props.acceptFriend(item.key)}
                reject={()=>this.props.deleteFriend(item.key)}
            />
        )
    }

    render()
    {
        if(this.props.loading) 
            return <Loading color='#3498db' />
        else
        {
            if(this.props.share)
            {
                return(
                   <View style={{flex: 1, padding: 15}}>
                        {this.props.friends=='' ? 
                            <View style={{flex:1, alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Text style={[styles.noContent, {color: '#fdfdfd'}]}>Non hai aggiunto amici</Text>
                                <Button style={{backgroundColor: '#fdfdfd'}} onPress={() => this.props.navigation.navigate("NewFriend")}>
                                    <Icon style={{color: '#3498db'}} type="FontAwesome" name='user-plus' />
                                    <Text uppercase={false} style={{fontFamily: 'ColorTube', color: '#3498db', fontSize: 10, textAlign: 'center'}}>Aggiungi amici</Text>
                                </Button>
                            </View>
                        :
                        <FlatList
                            data={this.props.friends.filter(friend => friend.state==true)}
                            renderItem={this.renderItem}
                        />}
                    </View>
                )
            }
            else
            {
                return (
                    <View style={{padding: 15}}>
                        {this.props.friends=='' ? <Text style={styles.noContent}>Non hai aggiunto amici</Text> :
                            <FlatList
                                data={this.props.friends}
                                renderItem={this.renderItem}
                            />
                        }
                    </View>
                )
            }
        }
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
    },
    surveyTitle: {
        fontFamily: 'ColorTube' ,
        fontSize: 11,
        color: '#ecf0f1',
        paddingHorizontal: 10
    },
});

const mapStateToProps = state => ({
    friends : state.friend.friends,
    loading: state.friend.loading
});

  
export default connect(mapStateToProps, { friendsFetch, acceptFriend, deleteFriend } ) (FriendList);