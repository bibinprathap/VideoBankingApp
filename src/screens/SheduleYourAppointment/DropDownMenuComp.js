import React, {Component} from 'react';
import {View} from 'react-native';
import DropDownPicker from './react-native-dropdown-picker/src';

class CustomePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{marginVertical: 5}}>
        <DropDownPicker
          items={[
            {label: 'UK', value: 'uk'},
            {label: 'France', value: 'france'},
            {label: 'UK', value: 'uk'},
            {label: 'France', value: 'france'},
          ]}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
          }}
          //   zIndex={1000}
          defaultValue={this.state.country}
          style={{backgroundColor: 'white'}}
          dropDownStyle={{backgroundColor: 'white'}}
          onChangeItem={item => this.props.onSelect(item)}
        />
      </View>
    );
  }
}

export {CustomePicker};
