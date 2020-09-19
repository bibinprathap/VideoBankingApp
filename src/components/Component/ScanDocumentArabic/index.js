import React, {Component} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width} = Dimensions.get('screen');
const normalizeFont = size => {
  return size * (width * 0.0025);
};
export default class ScanDocument extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          height: hp('10'),
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flex: 0.9,
            borderBottomColor: '#ddd',
            borderBottomWidth: 3,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.9}>
            {this.props.deleteOption && (
              <Icons
                size={hp('4')}
                style={{margin: hp('2'), alignSelf: 'center'}}
                name="more-horiz"
                color="green"
              />
            )}
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'UberMoveText-Medium',
              fontSize: normalizeFont(18),
              color: this.props.deleteOption ? 'green' : '#ccc',
              textAlign: 'right',
            }}>
            {this.props.titleContent}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: hp('8'),
              width: hp('8'),
              borderColor: 'green',
              borderWidth: 2,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image source={Scan_Helper} style={{width: 70, height: 70}} /> */}
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}
