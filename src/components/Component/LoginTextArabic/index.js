import React from 'react';
import {View, Text, TextInput, Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {PrimaryColor} from '../../Config';
import {color} from 'react-native-reanimated';

const normalizeFont = size => {
  return size * (width * 0.0025);
};
const LoginText = props => {
  return (
    <View style={{height: 90}}>
      <View style={{height: 40, paddingBottom: 20}}>
        <Text
          style={{
            fontSize: normalizeFont(16),
            color: PrimaryColor,
            fontFamily: 'Roboto-Bold',
            textAlign: 'right',
          }}>
          {props.header}
        </Text>
      </View>
      <View
        style={{
          height: props.TextInput ? 30 : props.Mobile ? 30 : 50,
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
        }}>
        {props.TextInput ? (
          <TextInput
            keyboardType={props.keyboardType}
            placeholder={props.placeholder}
            placeholderTextColor="#ddd"
            onChangeText={props.onChange}
            value={props.value}
            style={props.normalStyle}
          />
        ) : props.Mobile ? (
          <View style={{flexDirection: 'row'}}>
            <TextInput
              keyboardType="phone-pad"
              returnKeyType="done"
              placeholder={props.placeholder}
              onChangeText={props.onChange}
              value={props.value}
              placeholderTextColor="#ddd"
              style={props.styleTwo}
            />
            <TextInput
              keyboardType="phone-pad"
              returnKeyType="done"
              placeholder={props.placeholderMobile}
              onChangeText={props.onChangetwo}
              value={props.valuetwo}
              placeholderTextColor="#ddd"
              style={props.style}
            />
          </View>
        ) : (
          props.children
        )}
      </View>
    </View>
  );
};

export default LoginText;
