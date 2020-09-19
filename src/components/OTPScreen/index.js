import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LoginInput from '../Component/LoginText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DefaultText from '../Component/DefaultText';
const {width, height} = Dimensions.get('screen');
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import OtpText from '../Component/OtpText';
import AppApi from '../../api/real';
import alertsHelper from '../../api/helperServices/alerts';
import {connect} from 'react-redux';
import strings, {
  alignment,
  normalizeFont,
} from '../../api/helperServices/language';
import Header from '../Component/Header';
const api = new AppApi();
class CreateScreen extends Component {
  inputs = {};
  focusTheField = id => {
    this.inputs[id].focus();
  };
  constructor(props) {
    super(props);
    this.state = {
      types: [{label: 'Personal', value: 0}, {label: 'Cooperate', value: 1}],
      textinputOne: '',
      textinputTwo: '',
      textinputThree: '',
      textinputFour: '',
    };
    this.handleSendOTP = this.handleSendOTP.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
  }
  handleSendOTP = async () => {
    const {name, email, mobile, mobiletwo, accounttype} = this.props.values;
    alertsHelper.showAlert('Send OTP', 'Sending OTP');

    try {
      await api.sendVerificationSMS({
        name,
        email,
        mobile,
        mobiletwo,
        accounttype,
      });
    } catch (error) {
      alertsHelper.hideAlert();
      alertsHelper.show('error', 'SEND OTP', 'Netrork Error');
    }
    alertsHelper.hideAlert();
  };

  firstText = text => {
    this.setState(
      {
        textinputOne: text,
        textinputTwo: '',
        textinputThree: '',
        textinputFour: '',
      },
      () => this.focusTheField('field2'),
    );
  };

  secondText = text => {
    this.setState({textinputTwo: text}, () => this.focusTheField('field3'));
  };

  thirdText = text => {
    this.setState({textinputThree: text}, () => this.focusTheField('field4'));
  };

  fourthText = text => {
    this.setState({textinputFour: text}, () =>
      this.props.navigation.navigate('Profile'),
    );
  };

  // fourthText = text => {
  //   this.setState({textinputFour: text}, () => {
  //     Keyboard.dismiss();
  //     const {
  //       textinputOne,
  //       textinputTwo,
  //       textinputThree,
  //       textinputFour,
  //     } = this.state;
  //     this.props.onChange(
  //       textinputOne + textinputTwo + textinputThree + textinputFour,
  //     );
  //   });
  // };

  verifyOTP = async otp => {
    alertsHelper.showAlert('Send OTP', 'Sending OTP');

    try {
      //await api.confirmsmsTocken({ otp });
    } catch (error) {
      //alertsHelper.hideAlert();
      alertsHelper.show('error', 'SEND OTP', 'Netrork Error');
    }
    //alertsHelper.hideAlert();
  };
  render() {
    const {values} = this.props;
    const {language} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={strings({key: 'verifyMobileNumber', language})}
          navigation={this.props.navigation}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            // justifyContent: 'center',
            width: '100%',
            paddingHorizontal: hp('4'),
          }}>
          {/* <Text
            style={{
              fontFamily: 'Lora-Bold',
              textAlign: alignment(language),
              fontSize: normalizeFont(21),
            }}>
            {strings({key: 'verifyMobileNumber', language})}
          </Text> */}
          <View style={{paddingVertical: hp('1')}}>
            <Text
              style={{
                fontFamily: 'Lora-Bold',
                textAlign: language == 'English' ? 'center' : 'right',
                fontSize: normalizeFont(16),
                paddingTop: hp('5'),
                color: 'green',
              }}>
              {strings({key: 'OTPhasbeedsendtoyourMobile', language})}
            </Text>
            <Text
              style={{
                fontFamily: 'Lora-Bold',
                textAlign: 'center',
                fontSize: normalizeFont(16),
                paddingBottom: hp('5'),
                color: 'green',
              }}>
              {values.mobile + ' ' + values.mobiletwo}
            </Text>

            <View
              style={{
                height: 70,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                }}>
                <TextInput
                  value={this.state.textinputOne}
                  onChangeText={text =>
                    this.setState({textinputOne: ''}, () =>
                      this.firstText(text),
                    )
                  }
                  style={{
                    fontSize: normalizeFont(24),
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                  }}
                  onFocus={() =>
                    this.setState({
                      textinputOne: '',
                      textinputTwo: '',
                      textinputThree: '',
                      textinputFour: '',
                    })
                  }
                  keyboardType="number-pad"
                  returnKeyType="done"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.focusTheField('field2');
                  }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                }}>
                <TextInput
                  value={this.state.textinputTwo}
                  onChangeText={text => this.secondText(text)}
                  onFocus={() =>
                    this.setState({
                      textinputTwo: '',
                    })
                  }
                  returnKeyType="done"
                  keyboardType="number-pad"
                  blurOnSubmit={false}
                  ref={input => {
                    this.inputs['field2'] = input;
                  }}
                  style={{
                    fontSize: normalizeFont(24),
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                  }}
                  onSubmitEditing={() => {
                    this.focusTheField('field3');
                  }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                }}>
                <TextInput
                  value={this.state.textinputThree}
                  onChangeText={text => this.thirdText(text)}
                  ref={input => {
                    this.inputs['field3'] = input;
                  }}
                  onFocus={() =>
                    this.setState({
                      textinputThree: '',
                    })
                  }
                  keyboardType="number-pad"
                  returnKeyType="done"
                  blurOnSubmit={false}
                  style={{
                    fontSize: normalizeFont(24),
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                  }}
                  onSubmitEditing={() => {
                    this.focusTheField('field4');
                  }}
                />
              </View>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                }}>
                <TextInput
                  value={this.state.textinputFour}
                  onFocus={() =>
                    this.setState({
                      textinputFour: '',
                    })
                  }
                  onChangeText={text => this.fourthText(text)}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    this.props.navigation.navigate('Profile');
                    // Keyboard.dismiss();
                  }}
                  ref={input => {
                    this.inputs['field4'] = input;
                  }}
                  style={{
                    fontSize: normalizeFont(24),
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                  }}
                />
              </View>
            </View>
            {/* <OtpText onChange={this.verifyOTP} /> */}
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            // onPress={() =>
            //   this.state.textinputOne !== '' &&
            //   this.state.textinputTwo !== '' &&
            //   this.state.textinputThree !== '' &&
            //   this.state.textinputFour !== ''
            //     ?
            //     this.props.navigation.navigate('Profile')
            //     : alertsHelper.show(
            //         'error',
            //         'Enter the OTP',
            //         'Before Change your mobile',
            //       )
            // }
            activeOpacity={0.9}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor:
                'green',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
                textAlign: alignment(language),
              }}>
              {strings({key: 'changeMobileNumber', language})}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <DefaultText
              onPress={this.handleSendOTP}
              style={{
                fontSize: normalizeFont(16),
                textAlign: alignment(language),
                paddingVertical: hp('5'),
              }}>
              {strings({key: 'didnotReceive', language})} ?{' '}
              <Text style={{color: 'green', fontFamily: 'Roboto-Bold'}}>
                {strings({key: 'resend', language})}
              </Text>
            </DefaultText>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  console.log(state, 'State');

  return {
    values: state.bankProfileReducer.basicprofile,
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(CreateScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
