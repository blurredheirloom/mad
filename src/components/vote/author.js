import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { getAuthor } from '../../actions/VoteActions';
import { localize } from '../../locales/i18n';


class Author extends Component {
  
    componentDidMount() {
        if(this.props.owner)
            this.props.getAuthor(this.props.owner);
    }

    render() {
        return(
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 40, borderBottomWidth: 1, borderBottomColor: '#8e44ad'}}>
            <View style={{flex: 0.3, flexDirection : 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <Text style={styles.owner}>{localize("vote.author")}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                  {this.props.author.image ? <Thumbnail style={{backgroundColor: '#fdfbfb', borderWidth: 1, borderColor: '#fdfbfb'}} small source={{ uri: this.props.author.image }} />
                  : <Thumbnail style={{backgroundColor: '#fdfbfb', borderWidth: 1, borderColor: '#fdfbfb'}} small source={require('../../assets/images/user.png')} />}
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
    color: '#ecf0f1',
    marginRight: 10
  }
});

const mapStateToProps = state => ({
  author : state.vote.author,
  loading: state.vote.loading,
});

export default connect(mapStateToProps, { getAuthor } ) (Author);
