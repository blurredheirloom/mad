import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import RadioButton from './RadioButton';

class RadioGroup extends Component {
  
  radioSelect = (key, item) => {
    if(!this.props.disabled)
    {
      this.props.onChange(key);
    }
  }

  render () {
    const radioGroup = this.props.radioGroupList.map((item, index) =>
        <RadioButton key={index} index={index} label={item.value}
          value={item.key} 
          radioSelect={this.radioSelect} active={this.props.selected === index && !this.props.disabled}
        />
    );

    return (
      <ScrollView>
        {radioGroup}
      </ScrollView>
    );
  }
}

export default RadioGroup;