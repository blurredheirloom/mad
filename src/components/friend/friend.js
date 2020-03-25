import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button, Text, CheckBox } from 'native-base';
import { SwipeRow } from 'react-native-swipe-list-view';
import UserPicture from '../userPicture';

export default class Friend extends Component
{
    render(){
        if(this.props.share)
        {
            return(
                <TouchableWithoutFeedback onPress={this.props.onCheck}>
                    <View style={{flex: 1, paddingHorizontal: 5, paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#fdfbfb', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <UserPicture image={this.props.data.image} style={{borderWidth: 1.5}} uid={this.props.data.key} name={this.props.data.name} small color='#fdfbfb' />
                            <Text style={[styles.item, {flex:1, color: '#fdfbfb'}]}>{this.props.data.name}</Text>
                        </View>
                        <CheckBox
                            style={{borderColor: '#fdfbfb', backgroundColor: 'transparent', borderRadius: 1, left:0, marginRight: 10}}
                            checked={this.props.data.checked}
                            onPress={this.props.onCheck}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else
        {
            return(
                <SwipeRow
                    disableRightSwipe
                    onRowPress={this.props.onRowPress}
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
                    <View style={{height: 64, paddingHorizontal: 5, borderBottomColor: '#eee', borderBottomWidth: 1, flex:1,
                        backgroundColor: "#fdfbfb", flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
                            <UserPicture image={this.props.data.image} style={{borderWidth: 1.5}} uid={this.props.data.key} name={this.props.data.name} small color='#3498db' />
                            <Text style={styles.item}>{this.props.data.name}</Text>
                        </View>
                        {this.props.data.state === "sent" &&
                            <Icon type="FontAwesome" name="hourglass-half" style={{paddingHorizontal: 10, fontSize: 16,  color: '#bdc3c7'}} />
                        }
                        {this.props.data.state === "received" &&
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
      fontFamily: 'Blogger',
      fontSize: 14,
      color: '#34495e',
      paddingHorizontal: 10
    }
  });