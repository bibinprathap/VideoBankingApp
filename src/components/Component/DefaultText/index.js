import React from 'react';
import {Text} from 'react-native';

const DefaultText = props => (
  <Text onPress={props.onPress} style={props.style}>
    {props.children}
  </Text>
);

export default DefaultText;
