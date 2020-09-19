import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {PrimaryColor} from '../../Config';
const {width, height} = Dimensions.get('screen');

const normalizeFont = size => {
  return size * (width * 0.0025);
};
const ActionSheetIOS = props => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
      }}>
      <Text
        style={{
          fontSize: normalizeFont(16),
          color: PrimaryColor,
          fontFamily: 'Roboto-Bold',
        }}>
        {props.header}
      </Text>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          marginVertical: 10,
          width: '60%',
          height: 40,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: 5,
        }}
        onPress={props.onPress}>
        <Text style={{textAlign: 'center', fontSize: normalizeFont(14)}}>
          {props.value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionSheetIOS;
