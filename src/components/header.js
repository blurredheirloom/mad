import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, Button } from 'native-base';

class CustomHeader extends Component {
  render() {
    if(this.props.type=="login")
      return (
        <View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <Text style={[{color: '#1abc9c'}, styles.title]}>m</Text>
              <Text style={[{color: '#e67e22'}, styles.title]}>a</Text>
              <Text style={[{ color: '#3498db'}, styles.title]}>d</Text>
            </View>
            <Text style={styles.subtitle}>make a decision</Text>
        </View>
      )
    else if (this.props.type=="home")
    {
      return (
        <View style={[styles.header, {alignItems: 'center', flexDirection:'row', backgroundColor: this.props.color}]}>
            <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
              <Button
                  transparent
                  onPress={this.props.linkBackward}
                  disabled={this.props.noBack}
                  style={[!this.props.noBack ? styles.visible : styles.hidden, {width: 48, height: 48}]}
                  >
                  <Icon style={{color: '#fdfbfb' , marginLeft: 0, fontSize: this.props.iconSize ? this.props.iconSize :32}} type="FontAwesome" name={this.props.iconBack ? this.props.iconBack : "chevron-circle-left"} />
              </Button>
              <View style={{flex: 1, justifyContent:'flex-start'}}>
                <View style={{alignItems:'stretch', flexDirection:'column'}}>
                  <Text style={styles.titleHome}>mad</Text>
                  <Text style={styles.subtitleHome}>make a decision</Text>
                </View>
              </View>
              <Button
                transparent
                onPress={this.props.linkForward}
                disabled={!this.props.forward}
                style={[this.props.forward ? styles.visible : styles.hidden, {width: 48, height: 48}]}
                >
                <Icon style={{color:'#fdfbfb', marginRight: 0, fontSize: this.props.iconSize ? this.props.iconSize :32}} type="FontAwesome" name={this.props.iconForward ? this.props.iconForward : "chevron-circle-right"} />
              </Button>
            </View>
        </View>
      )
    }
    return (
      <View style={[styles.header, {backgroundColor: this.props.color}]}>
        {this.props.type!='menu' ?
          <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
              <Button
                transparent
                onPress={this.props.linkBackward}
                disabled={this.props.noBack}
                style={[!this.props.noBack ? styles.visible : styles.hidden, {width: 48, height: 48}]}
                >
                <Icon style={{color: this.props.iconColor ? this.props.iconColor : '#fdfbfb', marginLeft: 0, fontSize: this.props.iconSize ? this.props.iconSize :32}} type="FontAwesome" name={this.props.iconBack ? this.props.iconBack : "chevron-circle-left"} />
              </Button>
              <View style={{flex: 1, justifyContent:'flex-start'}}>
                {this.props.type=='info' ? 
                <View style={{alignItems:'stretch', flexDirection:'column'}}>
                  <Text style={styles.titleHome}>mad</Text>
                  <Text style={styles.subtitleHome}>make a decision</Text>
                </View> :
                <Text style={styles.titleLogged}>{this.props.title}</Text>}
              </View>
              <Button
                transparent
                onPress={this.props.linkForward}
                disabled={!this.props.forward}
                style={[this.props.forward ? styles.visible : styles.hidden, {width: 48, height: 48}]}
                >
                <Icon style={{color: this.props.iconColor ? this.props.iconColor : '#fdfbfb', marginRight: 0, fontSize: this.props.iconSize ? this.props.iconSize :32}} type="FontAwesome" name={this.props.iconForward ? this.props.iconForward : "chevron-circle-right"} />
              </Button>
          </View>
        :
            <Text style={styles.titleLogged}>{this.props.title}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    height: 100,
    justifyContent: 'center',
  },
  titleLogged: {
    color: '#fdfbfb',
    fontFamily: 'Pacifico',
    fontSize: 22,
    textAlign: 'center',
  },
  title: {
    marginTop: 80,
    marginBottom: -38,
    fontSize: 51,
    fontFamily: 'ColorTube'
  },
  subtitle: {
    fontSize: 26,
    letterSpacing: 1,
    color: '#34495e',
    fontFamily: 'Pacifico',
    textAlign: 'center'
  },
  titleHome: {
    marginBottom: -24,
    fontSize: 32,
    color: '#fdfbfb',
    fontFamily: 'ColorTube',
    textAlign: 'center',
  },
  subtitleHome: {
    fontSize: 18,
    color: '#34495e',
    fontFamily: 'Pacifico',
    textAlign: 'center',
  },
  visible: {
    opacity: 1
  },
  hidden: {
    opacity: 0
  }
});

export default CustomHeader;
