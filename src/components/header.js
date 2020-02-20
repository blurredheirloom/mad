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
            <View style={{flex:0.6, alignItems:'stretch', flexDirection:'column'}}>
              <Text style={styles.titleHome}>mad</Text>
              <Text style={styles.subtitleHome}>make a decision</Text>
            </View>
        </View>
      )
    }
    else if (this.props.type=="info")
    {
      return(
        <View style={[styles.header, {justifyContent: 'flex-start', alignItems:'center', flexDirection:'row', backgroundColor: this.props.color}]}>
            <Button 
              style={{flex: 0.2}}
              transparent
              onPress={this.props.linkBackward}
              >
              <Icon style={{color: '#fdfdfd', marginLeft: 0, fontSize: 32}} type="FontAwesome" name={"chevron-circle-left"} />
            </Button>
            <View style={{flex:0.6, alignItems:'stretch', flexDirection:'column'}}>
              <Text style={styles.titleHome}>mad</Text>
              <Text style={styles.subtitleHome}>make a decision</Text>
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
                style={{width: 48, height: 48}}
                >
                <Icon style={{color:'#fdfdfd', marginLeft: 0, fontSize: 32}} type="FontAwesome" name="chevron-circle-left" />
              </Button>
              <View style={{flex: 1, justifyContent:'flex-start'}}>
                <Text style={styles.titleLogged}>{this.props.title}</Text>
                {this.props.span ? <Text style={styles.titleLogged}>{this.props.span+" con"}</Text> : null }
              </View>
              <Button
                transparent
                onPress={this.props.linkForward}
                disabled={!this.props.forward}
                style={[this.props.forward ? styles.visible : styles.hidden, {width: 48, height: 48}]}
                >
                <Icon style={{color:'#fdfdfd', marginRight: 0, fontSize: 32}} type="FontAwesome" name="chevron-circle-right" />
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
    paddingHorizontal: 15,
    borderBottomWidth: 0,
    height: 100,
    justifyContent: 'center',
  },
  titleLogged: {
    color: '#ecf0f1',
    fontFamily: 'Pacifico',
    fontSize: 22,
    textAlign: 'center',
  },
  title: {
    marginTop: 80,
    marginBottom: -40,
    fontSize: 48,
    fontFamily: 'ColorTube'
  },
  subtitle: {
    fontSize: 32,
    color: '#34495e',
    fontFamily: 'Pacifico',
    textAlign: 'center'
  },
  titleHome: {
    marginBottom: -24,
    fontSize: 32,
    color: '#ecf0f1',
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