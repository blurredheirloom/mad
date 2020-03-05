import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { getAuthor } from '../../actions/VoteActions';


class Author extends Component {
  
    componentDidMount() {
        if(this.props.owner)
            this.props.getAuthor(this.props.owner);
    }

    render() {
        return(
            <View style={{flexDirection: 'row', paddingTop: 15, paddingBottom: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 50, borderBottomWidth: 1, borderBottomColor: '#fdfbfb'}}>
              <Text style={styles.owner}>creato da:</Text>
              {this.props.author.image ? <Thumbnail style={{backgroundColor: '#fdfdfd', borderWidth: 1, borderColor: '#fdfbfb'}} small source={{ uri: this.props.author.image }} />
              : <Thumbnail style={{backgroundColor: '#fdfdfd', borderWidth: 1, borderColor: '#fdfbfb'}} small source={require('../../assets/images/user.png')} />}
              <Text style={[styles.owner, {padding: 5, textTransform: 'uppercase'}]}>{this.props.author.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  owner: {
    fontFamily: 'Quicksand',
    padding: 15,
    fontSize: 13,
    color: '#ecf0f1'
  }
});

const mapStateToProps = state => ({
  author : state.vote.author,
  loading: state.vote.loading,
});

export default connect(mapStateToProps, { getAuthor } ) (Author);
