import React, {Component} from 'react';
import { StyleSheet, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button, Card, Thumbnail, Text} from 'native-base';
import Loading from '../components/loading';
import CustomHeader from '../components/header';
import { connect } from 'react-redux';
import { getAvatars, setAvatar, defaultAvatar } from '../actions/UserActions';
import StepIndicator from '../components/survey/stepindicator';



class AddAvatarScreen extends Component {
  
  state = {
    avatar: null,
    selected: null,
    page: 0
  };


  componentDidMount()
  {
    this.props.getAvatars();
  }

  _keyExtractor = (item, index) => index.toString();


  changeAvatar = () => {
    this.props.setAvatar(this.props.user.uid, this.state.avatar, false);
    this.props.navigation.navigate("Home");
  }

  defaultAvatar = () => {
    this.props.defaultAvatar();
    this.props.navigation.navigate("Home");
  }

  goToPage = (page) => {
    this.setState({selected: null});
    this.setState({avatar: null});
    this.setState({page: page});
  }

  renderItem = ({item, index}) => {
      return(
        <TouchableWithoutFeedback onPress={() => this.setState({selected: index, avatar: item.name})}>
          <Thumbnail style={[this.state.selected===index ? styles.enabled :  null, {marginHorizontal: 5}]}  square source={{uri: item.url}}/>
        </TouchableWithoutFeedback>
      )
    }

  render() {
    return(
        <View style={{flex: 1, flexDirection:'column', backgroundColor: "#1abc9c"}}>
            <CustomHeader color='#1abc9c' title="Scegli il tuo avatar" type='link' linkBackward={() => this.props.navigation.pop()} forward={this.state.selected!=null} linkForward={() => this.changeAvatar()}/>
            <View style={{flex: 1, padding: 10}}>
                <Card style={{flex:1, borderRadius: 5, paddingHorizontal: 15, backgroundColor:'#fdfbfb'}}>
                {this.props.loading ? <Loading color='#1abc9c'/> :
                  <View style={{flex: 1, paddingVertical: 25}}>
                    <FlatList
                        columnWrapperStyle={{justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 20}}
                        numColumns={5}
                        initialNumToRender={16}
                        data={this.props.avatars.filter(x => x.name.charAt(0)===''+this.state.page)}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
                    />  
                    <View style={{paddingTop: 15}}>
                      <StepIndicator
                        customStyles={indicatorStyles}
                        currentPosition={this.state.page}
                        stepCount={this.props.avatars.length/50}
                        onPress={this.goToPage}
                      />
                    </View>  
                  </View>                     
                }
                </Card>
                <Text style={{fontFamily: 'ColorTube', color: '#fdfbfb', fontSize: 6, textAlign: 'center'}}>Avatars made by Freepik from www.flaticon.com</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
                  <Button vertical onPress={() => this.defaultAvatar()} style={{backgroundColor: 'transparent', elevation: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5}}>
                    <Icon type="FontAwesome" name="user-circle" style={{color: '#fdfbfb'}}/>
                    <Text style={{fontFamily: 'ColorTube', fontSize: 10, color: '#fdfbfb', paddingTop: 5}}>Ripristina</Text>
                  </Button>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 5}}>
                    <Button onPress={() => this.props.navigation.navigate("Camera", {gallery: true})} style={{backgroundColor: '#2c3e50', marginLeft: 25, borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
                      <Icon type="FontAwesome" name="image" style={{color: '#fdfbfb'}}/>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate("Camera", {gallery: false})} style={{backgroundColor: '#2c3e50', marginLeft: 25, borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon type="FontAwesome" name="camera" style={{color: '#fdfbfb'}}/>
                    </Button>
                  </View>
                </View>
            </View>
        </View>
    );
  }
}

const indicatorStyles = {
  stepIndicatorSize: 24,
  currentStepIndicatorSize: 28,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: '#1abc9c',
  stepStrokeFinishedColor: '#1abc9c',
  stepStrokeUnFinishedColor: '#1abc9c',
  separatorFinishedColor: '#1abc9c',
  separatorUnFinishedColor: '#1abc9c',
  stepIndicatorFinishedColor: '#1abc9c',
  stepIndicatorUnFinishedColor: '#1abc9c',
  stepIndicatorCurrentColor: '#1abc9c',
  stepIndicatorLabelCurrentColor: '#fdfdfd',
  stepIndicatorLabelUnFinishedColor: '#fdfdfd',
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Pacifico' ,
    fontSize: 28,
    color: '#34495e',
    textAlign: 'center',
  },
  modalTitle: {
    fontFamily: 'ColorTube' ,
    fontSize: 12,
    color: '#ecf0f1', 
    textAlign: 'center',
  },
  example: {
    fontFamily: 'Quicksand',
    padding: 20,
    paddingBottom: 40,
    fontSize: 14,
    color: '#ecf0f1',
    lineHeight: 25,
    textAlign: 'justify'
  },
  item: {
    fontFamily: 'ColorTube',
    fontSize: 10,
    color: '#34495e',
  },
  icon: {
    fontSize: 18,
    color:'#ecf0f1',
    textAlign:'center'
  },
  noContent: {
    fontFamily: 'ColorTube',
    textAlign: 'center',
    fontSize: 10,
    color: '#34495e',
    paddingTop: 20,
    paddingBottom: 20
  },
  enabled: {
    backgroundColor: '#1abc9c',
    borderColor: '#2c3e50',
    borderRadius: 50,
    borderWidth: 4,
  }
});

const mapStateToProps = state => ({
    user: state.auth.user,
    loading: state.user.loading,
    avatars: state.user.avatars
});
  
export default connect(mapStateToProps, {getAvatars, setAvatar, defaultAvatar}) (AddAvatarScreen);