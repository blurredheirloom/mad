import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Icon, Button} from "native-base";
import { Camera } from 'expo-camera';
import CustomHeader from '../components/header';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { setAvatar } from '../actions/UserActions';
import { localize } from '../locales/i18n';
import Loading from '../components/loading';

class CameraScreen extends Component {

    state = {
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flash: Camera.Constants.FlashMode.auto,
        source: null,
        uploading: false,
        progress: 0
    }
 
    async componentDidMount() {
        if(this.props.navigation.state.params.gallery)
        {
            this.setState({hasCameraPermission: true});
            this.pickImage(); 
        }
        else
        {
            const { status } = await Camera.requestPermissionsAsync();
            this.setState({hasCameraPermission: status === 'granted'});
        }
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            if(this.state.cameraType === Camera.Constants.Type.front)
                this.flipAndCompress(photo.uri);
            else
                this.setState({source: photo.uri});
        }
    }

    flipAndCompress = async (uri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ flip: ImageManipulator.FlipType.Horizontal }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        this.setState({source: manipResult.uri});
      };
    
    uploadImage = async (url) => {
        this.setState({uploading: true});
        const response = await fetch(url);
        const blob = await response.blob();
        var metadata = {
            contentType: 'image/png'
        };
        const filename = this.props.user.uid+".png";
        const uploadTask = firebase.storage().ref('avatars').child(this.props.user.uid+'/'+filename).put(blob, metadata)
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
                this.setState({progress: Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)});
            },
            error => {
                console.log(error)
            },
            () => {uploadTask.snapshot.ref.getDownloadURL().then(url => this.changeAvatar(url))}
        );
    }

    changeAvatar = (url) => {
        this.setState({uploading: false});
        this.props.setAvatar(this.props.user.uid, url, true);
        this.props.navigation.navigate("Home");
    }

    clear = () => {
        this.props.navigation.state.params.gallery ? this.props.navigation.pop() : this.setState({source: null})
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5
        });

        if (!result.cancelled) {
          this.setState({ source: result.uri });
        }
        else
            this.props.navigation.pop()
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return (
            <View style={{flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Quicksand', textAlign: 'center', fontSize: 18, color: '#fdfbfb'}}>{localize("camera.permission")}</Text>
                <Button onPress={()=>Camera.requestPermissionsAsync()} style={{backgroundColor: '#fdfbfb', marginVertical: 30, padding: 10}}>
                    <Text style={{fontFamily: 'ColorTube', color: '#111', fontSize: 10}}>
                        Consenti
                    </Text>
                </Button>
            </View>
            )
        } 
        if(this.state.uploading)
            return (
                <View style={{flex: 1}}>
                <CustomHeader color='#2c3e50' title={localize("camera.uploading")} type='menu' />
                <Loading color='#2c3e50' percent={this.state.progress} />
                </View>
            )
        return (
            <View style={{flex: 1}}>
            <CustomHeader color='#111' title={localize("camera.title")} type='link' linkBackward={() => this.props.navigation.pop()} />
            <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#111'}}>
                <View style={{ borderColor: '#fdfbfb', borderWidth: 2, width: 240, height: 240, justifyContent: 'center', alignItems: 'center', borderRadius: 120, overflow: 'hidden' }}>
                    {this.state.source ? 
                    <Image
                        style={{ width: 240, height: 320}}
                        source={{uri: this.state.source}}
                    />
                    :
                    this.props.navigation.state.params.gallery ? null :
                    <Camera 
                        ref={ref => {this.camera = ref;}}
                        style={{width: 240, height: 320, justifyContent: 'flex-end', alignItems: 'center'}} 
                        type={this.state.cameraType}
                        quality={0}
                        flashMode={this.state.flash}
                    >    
                    </Camera>
                    }
                </View>
                { this.state.source ? 
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button onPress={() => this.clear()} style={{backgroundColor: 'transparent', borderColor: '#fdfbfb', borderWidth: 2, borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
                        <Icon type="FontAwesome" name="trash" style={{color: '#fdfbfb'}}/>
                    </Button>
                    <Button onPress={() => this.uploadImage(this.state.source)} style={{backgroundColor: 'transparent', borderColor: '#fdfbfb', borderWidth: 2, borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
                        <Icon type="FontAwesome" name="check" style={{color: '#fdfbfb'}}/>
                    </Button>
                </View>
                :
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button onPress={() => {
                        this.setState({cameraType: this.state.cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back})
                    }} style={{backgroundColor: 'transparent', elevation: 0, borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon type="FontAwesome" name="refresh" style={{color: '#fdfbfb'}}/>
                    </Button>
                    <Button onPress={() => this.snap()} style={{backgroundColor: 'transparent', borderColor: '#fdfbfb', borderWidth: 2, borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
                        <Icon type="FontAwesome" name="camera" style={{color: '#fdfbfb'}}/>
                    </Button>
                    <Button onPress={() => {
                            this.setState({
                            flash:
                                this.state.flash === Camera.Constants.FlashMode.on ?
                                Camera.Constants.FlashMode.off : 
                                this.state.flash === Camera.Constants.FlashMode.off ?
                                Camera.Constants.FlashMode.auto : Camera.Constants.FlashMode.on
                            });
                        }} style={{backgroundColor: 'transparent', elevation: 0, borderRadius: 50, width: 64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.flash === Camera.Constants.FlashMode.on ?
                            <Icon type="MaterialCommunityIcons" name="flash" style={{color: '#fdfbfb'}}/>
                        :
                        this.state.flash === Camera.Constants.FlashMode.auto ? 
                            <Icon type="MaterialCommunityIcons" name="flash-auto" style={{color: '#fdfbfb'}}/>
                        :
                            <Icon type="MaterialCommunityIcons" name="flash-off" style={{color: '#fdfbfb'}}/>
                        }
                    </Button>
                </View>
                }
            </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});
  
export default connect(mapStateToProps, {setAvatar}) (CameraScreen);