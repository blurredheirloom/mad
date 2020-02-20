import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { Icon, Button, Text, Thumbnail, ListItem, CheckBox } from 'native-base';
import { SwipeRow } from 'react-native-swipe-list-view';

export default class Friend extends Component
{
    render(){
        if(this.props.share)
        {
            return(
                <ListItem style={{marginLeft:0, flex: 1, justifyContent:'space-between'}} onPress={this.props.onCheck}>
                    <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                        {this.props.data.image && <Thumbnail small source={{ uri: this.props.data.image }} />}
                        {!this.props.data.image && <Thumbnail small source={require('../../assets/images/user.png')} />}
                        <Text style={[styles.item, {color: '#ecf0f1'}]}>{this.props.data.name}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                        <CheckBox
                            style={{borderColor: '#ecf0f1', borderRadius: 1}}
                            checked={this.props.data.checked}
                            onPress={this.props.onCheck}
                        />
                    </View>
                </ListItem>
            )
        }
        else
        {
            return(
                <SwipeRow
                    disableRightSwipe
                    rightOpenValue={this.props.data.state == "received" ? -180 : -100}
                >
                    <View style={{flex: 1, borderBottomColor: '#eee', borderBottomWidth: 1, backgroundColor: "#fdfbfb", 
                        flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                        {this.props.data.state == "received" &&
                        <Button success onPress={this.props.accept} style={{width: 48, height: 48, justifyContent: 'center', marginHorizontal: 20}}>
                            <Icon type="FontAwesome" active name="check" style={{fontSize: 16}}/>
                        </Button>
                        }
                        <Button danger onPress={this.props.reject} style={{width: 48, height: 48, justifyContent: 'center'}}>
                            <Icon type="FontAwesome" active name="times" style={{fontSize: 16}}/>
                        </Button>
                    </View>
                    <View style={{height: 64, borderBottomColor: '#eee', borderBottomWidth: 1, flex:1,
                        backgroundColor: "#fdfbfb", flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
                            {this.props.data.image && <Thumbnail small source={{ uri: this.props.data.image }} />}
                            {!this.props.data.image && <Thumbnail small source={require('../../assets/images/user.png')} />}
                            <Text style={styles.item}>{this.props.data.name}</Text>
                        </View>
                        {this.props.data.state == "sent" &&
                            <Icon type="FontAwesome" name="hourglass-half" style={{paddingHorizontal: 10, fontSize: 16,  color: '#bdc3c7'}} />
                        }
                        {this.props.data.state == "received" &&
                            <Icon type="MaterialCommunityIcons" name="gesture-swipe-right" style={{paddingHorizontal: 10, fontSize: 18, color: '#bdc3c7'}} />
                        }
                    </View>
                </SwipeRow>
            )
        }
    }
}

const styles = StyleSheet.create({
    item: {
      fontFamily: 'Quicksand',
      fontSize: 12,
      color: '#34495e',
      paddingHorizontal: 10
    }
  });