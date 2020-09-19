import React from 'react';
import StarIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {PrimaryColor} from '../../Config';
import {color} from 'react-native-reanimated';
import strings, {
  alignment,
  normalizeFont,
} from '../../../api/helperServices/language';
import DefaultText from '../DefaultText';

const LoginText = props => {
  return (
    <View>
      <View>
        {!props.Text && (
          <Text
            numberOfLines={2}
            style={{
              fontSize: normalizeFont(16),
              color: PrimaryColor,
              fontFamily: 'Roboto-Bold',
              flexWrap: 'wrap',
              paddingVertical: 15,
              textAlign: alignment(props.language),
            }}>
            {props.header}
          </Text>
        )}
      </View>
      <View
        style={{
          height: props.TextInput
            ? Platform.OS === 'ios'
              ? 30
              : 45
            : props.Mobile
            ? Platform.OS === 'ios'
              ? 30
              : 45
            : props.Text
            ? 30
            : 40,
          borderBottomColor: (props.TextInput || props.Mobile) && '#ddd',
          borderBottomWidth: (props.TextInput || props.Mobile) && 1,
        }}>
        {props.TextInput ? (
          <View style={{position:'relative'}}>
            <TextInput
            keyboardType={props.keyboardType}
            returnKeyType={props.returnType}
            placeholder={props.placeholder}
            placeholderTextColor="#ddd"
            onChangeText={props.onChange}
            value={props.Value}
            style={props.normalStyle}
          />
          {props.value==''&&
            <View style={{position:'absolute',right: 0,top:0}}>
              <StarIcon name='multiplication' size={10} color='red'/>
            </View>}
          </View>
          
        ) : props.Mobile ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent:
                props.language === 'English' ? 'flex-start' : 'flex-end',
            }}>
            {props.language === 'English' ? (
              <>
                <TextInput
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  placeholder={props.placeholderMobile}
                  onChangeText={props.onChangetwo}
                  value={props.valuetwo}
                  placeholderTextColor="#ddd"
                  style={props.style}
                />
                <TextInput
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  placeholder={props.placeholder}
                  onChangeText={props.onChange}
                  value={props.value}
                  placeholderTextColor="#ddd"
                  style={props.styleTwo}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </View>
        ) : props.Text ? (
          <DefaultText
            style={{
              color: PrimaryColor,
              fontSize: normalizeFont(16),
              fontFamily: 'Roboto-Bold',
              textAlign: alignment(props.language),
            }}>
            {props.header} :
            <Text
              style={{
                fontFamily: 'Lora-Bold',
                color: '#000',
                fontSize: normalizeFont(18),
              }}>
              {' '}
              {props.value}
            </Text>
          </DefaultText>
        ) : (
          props.children
        )}
      </View>
    </View>
  );
};

export default LoginText;
