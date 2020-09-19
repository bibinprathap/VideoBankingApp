import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PrimaryColor} from '../../Config';

export default class header extends Component {
  render() {
    return (
      <View
        style={{
          height: 100,
          width: '100%',
          backgroundColor: '#F7F7F7',
          justifyContent: 'center',
          paddingLeft: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 0.4,
          elevation: 2,
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.goBack()}>
          <Icons
            size={hp('4')}
            style={{marginBottom: hp('2'), alignSelf: 'flex-start'}}
            name="keyboard-backspace"
            color={PrimaryColor}
          />
        </TouchableOpacity>
        <Text
          style={{fontSize: 22, fontFamily: 'Lora-Bold', color: PrimaryColor}}>
          {this.props.header}
        </Text>
      </View>
    );
  }
}
