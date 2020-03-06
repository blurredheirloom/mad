import React, { Component } from 'react';
import { Icon } from 'native-base';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getPendingRequests } from '../actions/FriendActions';
import { sharedSurveysFetch } from '../actions/ShareActions';

class Badge extends Component {
    componentDidMount(){
        this.props.getPendingRequests();
        this.props.sharedSurveysFetch();
    }

    render() {
        if(this.props.type==='friends')
        {
            if(this.props.pendingRequests>0)
            {
                return(
                    <View transparent style={{flexDirection: 'row', alignItems:'flex-start', justifyContent: 'flex-end'}}>
                        <Text style={{position: 'absolute', elevation: 9999, backgroundColor: '#e74c3c', borderRadius: 8, width: 16, height: 16, textAlign: 'center', fontSize: 10, color: '#fdfbfb'}}>{this.props.pendingRequests}</Text>
                        <Icon
                            type="FontAwesome"
                            name='users'
                            style={this.props.style}
                        />
                    </View>
                );
            }
            else
                return(
                    <Icon
                        type="FontAwesome"
                        name='users'
                        style={this.props.style}
                    />
                )
        }
        else if(this.props.type==='surveys')
        {
            if(this.props.pendingSurveys>0)
            {
                return(
                    <View transparent style={{flexDirection: 'row', alignItems:'flex-start', justifyContent: 'flex-end'}}>
                        <Text style={{position: 'absolute', elevation: 9999, backgroundColor: '#e74c3c', borderRadius: 8, width: 16, height: 16, textAlign: 'center', fontSize: 10, color: '#fdfbfb'}}>{this.props.pendingSurveys}</Text>
                        <Icon
                        type="FontAwesome"
                        name='comment'
                        style={this.props.style}
                        />
                    </View>
                );
            }
            else
                return(
                    <Icon
                    type="FontAwesome"
                    name='comment'
                    style={this.props.style}
                    />
                )
        }
        else   
            return(
                <Icon
                    type="FontAwesome"
                    name='comment'
                    style={this.props.style}
                />
            )
    }
}

const mapStateToProps = state => ({
    pendingRequests : state.friend.pendingRequests,
    pendingSurveys: state.share.pendingSurveys
});

export default connect(mapStateToProps, {sharedSurveysFetch, getPendingRequests}) (Badge);


