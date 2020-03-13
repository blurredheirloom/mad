import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Modal} from 'react-native';
import { Button , Icon, Text, Thumbnail} from 'native-base';
import Friend from './friend';
import Loading from '../loading';
import { friendsFetch, acceptFriend, deleteFriend } from '../../actions/FriendActions';
import { connect } from 'react-redux';
import { localize } from '../../locales/i18n';

class FriendList extends Component {
    
    componentDidMount() {
        this.props.friendsFetch();
    }

    state = {
        items : [],
        currentItem: null,
        modalVisible: false
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


    renderItem = ({ item }, index) => {
        return(
            <Friend 
                index={index}
                data={item}
                share={this.props.share}
                onRowOpen={this.props.onRowOpen}
                onRowClose={this.props.onRowClose}
                onRowPress={()=>this.onRowPress(item)}
                onCheck={this.props.share ? () => this.onCheckBoxPress(item) : null}
                accept={()=>this.props.acceptFriend(item.key)}
                reject={()=>this.props.deleteFriend(item.key)}
            />
        )
    }

    onRowPress = (item) => {
       this.setState({currentItem: item});
       this.setState({modalVisible: true});
    }

    _keyExtractor = (item, index) => index.toString();


    render()
    {
        if(this.props.loading) 
            return <Loading negative={this.props.share} color='#3498db' />
        else
        {
            if(this.props.share)
            {
                return(
                   <View style={{flex: 1, paddingVertical: 15, paddingHorizontal: 20}}>
                        {this.props.friends.length==0 ? 
                            <View style={{flex:1, alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Text style={[styles.noContent, {color: '#fdfbfb'}]}>{localize("friends.noContent")}</Text>
                                <Button style={{backgroundColor: '#fdfbfb'}} onPress={() => this.props.navigation.navigate("NewFriend")}>
                                    <Icon style={{color: '#3498db'}} type="FontAwesome" name='user-plus' />
                                    <Text style={{fontFamily: 'Blogger', textTransform: 'uppercase', color: '#3498db', fontSize: 16, letterSpacing: 1, textAlign: 'center'}}>{localize("friends.add")}</Text>
                                </Button>
                            </View>
                        :
                        <FlatList
                            data={this.props.friends.filter(friend => friend.state==true)}
                            renderItem={this.renderItem}
                            keyExtractor={this._keyExtractor}
                        />}
                    </View>
                )
            }
            else
            {
                return (
                    <View style={{flex: 1, paddingVertical: 15, paddingHorizontal: 20}}>
                        {this.props.friends.length==0 ? <Text style={styles.noContent}>{localize("friends.noContent")}</Text> :
                            <FlatList
                                data={this.props.friends}
                                renderItem={this.renderItem}
                                keyExtractor={this._keyExtractor}
                            />
                        }
                        {this.state.currentItem ? 
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => this.setState({modalVisible: false})}>
                                <View style={{flex: 1, margin: 15, justifyContent: 'center'}}>
                                    <View style={{borderRadius: 5, padding: 20, elevation: 1, justifyContent:'space-between', alignItems: 'center', backgroundColor:'#3498db'}}>
                                        <Button full transparent style={{justifyContent:'flex-end'}} >
                                            <Icon type="FontAwesome" name="times" style={{color: '#fdfbfb'}} onPress={()=>this.setState({modalVisible: false})} />
                                        </Button>
                                        <Thumbnail large source={{uri: this.state.currentItem.image}} style={{width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: '#fdfbfb'}} />
                                        <Text style={styles.welcome}>{this.state.currentItem.name}</Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            {this.state.currentItem.state==='received' &&
                                            <Button transparent style={{flex: 1, justifyContent: 'flex-start'}}>
                                                <Icon type="FontAwesome" name="check" style={{color: '#fdfbfb'}} onPress={() => {this.setState({modalVisible: false});this.props.acceptFriend(this.state.currentItem.key)}} />
                                            </Button>
                                            }
                                            <Button transparent style={{flex: 1, justifyContent: 'flex-end'}} >
                                                <Icon type="FontAwesome" name="trash" style={{color: '#fdfbfb'}} onPress={() => {this.setState({modalVisible: false}); this.props.deleteFriend(this.state.currentItem.key)}} />
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                        </Modal> : null }
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
    welcome: {
        color: '#fdfbfb',
        fontSize: 20,
        textAlign:'center',
        padding: 20, 
        textTransform: 'uppercase', 
        fontFamily: 'Blogger',
        paddingHorizontal: 10
      },
});

const mapStateToProps = state => ({
    friends : state.friend.friends,
    loading: state.friend.loading
});

  
export default connect(mapStateToProps, { friendsFetch, acceptFriend, deleteFriend } ) (FriendList);