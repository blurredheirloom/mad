import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAuthor } from '../../actions/VoteActions';
import { localize } from '../../locales/i18n';
import UserPicture from '../userPicture';

class Author extends Component {
  
  constructor(props) {
    super(props);
    if(props.owner)
      props.getAuthor(props.owner);
  }

  componentDidUpdate(prevProps){
    if(this.props.owner!=prevProps.owner)
      this.props.getAuthor(this.props.owner);
  }

    render() {
      
        return(
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 40, borderBottomWidth: 1, borderBottomColor: '#8e44ad'}}>
            <View style={{flex: 0.3, flexDirection : 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <Text style={styles.owner}>{localize("vote.author")}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                  <UserPicture image={this.props.author.image} uid={this.props.owner} name={this.props.author.name} style={{borderWidth: 1.5}} small color='#fdfbfb' />
                  <Text style={[styles.owner, { marginLeft: 5, fontFamily: 'Blogger', letterSpacing: 1, textTransform: 'uppercase'}]}>{this.props.author.name}</Text>
              </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  owner: {
    fontFamily: 'Quicksand',
    fontSize: 12,
    color: '#fdfbfb',
    marginRight: 10
  }
});

const mapStateToProps = state => ({
  author : state.vote.author,
});

export default connect(mapStateToProps, { getAuthor } ) (Author);
