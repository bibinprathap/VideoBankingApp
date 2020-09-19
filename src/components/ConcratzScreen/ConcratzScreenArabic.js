import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');
import {ScrollView} from 'react-native-gesture-handler';
import Logo from '../../../assets/MainLogo.png';
import Community from '../../../assets/Community.png';
import Verifiyed from '../../../assets/Verifiyed.png';
const normalizeFont = size => {
  return size * (width * 0.0025);
};

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <ScrollView
          behavior="padding"
          contentContainerStyle={styles.innerContainer}>
          <Text style={styles.headerText}>تهانينا</Text>
          <View style={styles.mainContainer}>
            <View style={{flex: 0.9, marginVertical: hp('2')}}>
              <View style={styles.successContainer}>
                <View style={{flex: 0.5}}>
                  <Image style={styles.logoImage} source={Logo} />
                </View>

                <View style={{flex: 0.4}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'green'}}>مبروك حسابك المصرفي</Text>
                    <Text style={{color: 'green'}}>تم إنشاء</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'green'}}>
                      ستتلقى بريدًا إلكترونيًا قريبًا
                    </Text>
                    <Text style={{color: 'green'}}>حول تفاصيل الحساب</Text>
                  </View>
                </View>
                <View style={{flex: 0.5}}>
                  <Image style={styles.logoImage} source={Community} />
                </View>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity activeOpacity={0.9}>
                <Image style={styles.verifiedImage} source={Verifiyed} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: hp('4'),
  },
  headerText: {
    fontFamily: 'Lora-Bold',
    textAlign: 'right',
    fontSize: normalizeFont(21),
  },
  mainContainer: {
    paddingVertical: hp('2'),
    flex: 0.9,
  },
  successContainer: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoImage: {
    width: hp('15'),
    height: hp('15'),
    resizeMode: 'contain',
  },
  verifiedImage: {
    width: hp('10'),
    height: hp('10'),
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
