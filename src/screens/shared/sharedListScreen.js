import React, {Component} from 'react';
import { View } from "react-native";
import CustomHeader from '../../components/header';
import SharedList from '../../components/shared/sharedlist';
import { localize } from '../../locales/i18n';

export default class SharedListScreen extends Component {
  render() {
      return (
        <View style={{flex: 1, backgroundColor: '#fdfbfb'}}>
          <CustomHeader color='#2ecc71' title={localize("sharedSurveys.title")} type='menu'/>
          <SharedList navigation={this.props.navigation} />
        </View>
    );
  }
}

