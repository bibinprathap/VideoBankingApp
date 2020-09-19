import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert
} from 'react-native';
import LoginInput from '../Component/LoginText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../Component/Header';
import AppApi from '../../api/real';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import {infoChanged} from '../../redux/actions/bankProfileActions';
import validator from 'validator';
import alertsHelper from '../../api/helperServices/alerts';
import strings, {
  alignment,
  normalizeFont,
} from '../../api/helperServices/language';

const api = new AppApi();
const emptyCreateScreenState = {
  name: '',
  email: '',
  mobile: '',
  mobiletwo: '',
  accounttype: 0,
  
};
class CreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...emptyCreateScreenState,
      types: [
        {label: strings({key: 'personal', language: props.language}), value: 0},
        {
          label: strings({key: 'cooperate', language: props.language}),
          value: 1,
        },
      ],
      ...props.values,
    };
    this.handleSendOTP = this.handleSendOTP.bind(this);
  }

  updateCreateScreenState = newState => {
    const {dispatch} = this.props;
    this.setState(newState, () => {
      const {name, email, mobile, accounttype, mobiletwo} = this.state;
      const stateToStore = {name, email, mobile, mobiletwo, accounttype};
      dispatch(infoChanged('basicprofile', stateToStore));
    });
  };

  validationFunction = () => {
    const {name, email, mobile, accounttype, mobiletwo} = this.state;
    if (name == '') {
      return false;
    } else if (email == '') {
      return false;
    } else if (mobile == '') {
      return false;
    } else if (mobiletwo == '') {
      return false;
    }
    // else if(accounttype==''){
    //   return false
    // }
    else {
      return true;
    }
  };

  continue = language => {
    if (this.state.name == '') {
      alert(strings({key: 'EnterYourName', language}));
    } else if (!validator.isEmail(this.state.email)) {
      Alert.alert(
        'Email Address Required',
        `'${this.state.email}' is not a valid email. Try again with your valid email or contact support.`,
      );
    } else if (!validator.isMobilePhone(this.state.mobile)) {
      Alert.alert(
        'Required',
        `'${this.state.mobile}' is not a valid mobile number. Try again with your valid number or contact support.`,
      );
    } else if (this.state.mobiletwo == '') {
      alert(strings({key: 'EnterYourCountryCode', language}));
    } else {
      this.handleSendOTP(language);
    }
  };

  handleFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateCreateScreenState(newState);
  };
  handleSendOTP = async language => {
    const {name, email, mobile, mobiletwo, accounttype} = this.state;
    const {dispatch} = this.props;

    alertsHelper.showAlert(strings({key: 'sendOTP', language}), 'Sending OTP');

    try {
      let userDetails = {...this.state};
      const createdUserData = await api.createUser({...userDetails});
      console.log('this is response from createUser', createdUserData);

      dispatch(infoChanged('createuserInfo', createdUserData.Model));

      // await api.sendVerificationSMS({
      //   name,
      //   email,
      //   mobile,
      //   mobiletwo,
      //   accounttype,
      // });
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
    this.props.navigation.navigate('Otp');
  };

  render() {
    const {name, email, mobile, mobiletwo, accounttype} = this.state;
    const {language} = this.props;
    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={
            language === 'English'
              ? 'Lets Start create your account'
              : 'يتيح ابدأ إنشاء حسابك'
          }
          navigation={this.props.navigation}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            // justifyContent: 'center',
            width: '100%',
            paddingHorizontal: hp('4'),
            paddingTop: hp('3'),
          }}>
          {/* <Text
            style={{
              fontFamily: 'Lora-Bold',
              textAlign: alignment(language),
              fontSize: normalizeFont(21),
            }}>
            {strings({key: 'verifyMobileNumber', language})}
          </Text> */}
          <View style={{paddingVertical: hp('2')}}>
            <LoginInput
              Empty={true}
              TextInput
              language={language}
              header={strings({key: 'name', language})}
              onChange={this.handleFieldChange.bind(this, 'name')}
              Value={name}
              placeholder={strings({key: 'yourFullname', language})}
              normalStyle={{
                fontSize: normalizeFont(18),
                width: wp('80'),
                textAlign: alignment(language),
              }}
            />
            <LoginInput
              language={language}
              keyboardType="email-address"
              onChange={this.handleFieldChange.bind(this, 'email')}
              TextInput
              Value={email}
              header={strings({key: 'email', language})}
              placeholder={strings({key: 'yourEmailaddress', language})}
              normalStyle={{
                fontSize: normalizeFont(18),
                width: wp('80'),
                textAlign: alignment(language),
              }}
            />
            <LoginInput
              language={language}
              Mobile
              placeholderMobile={strings({key: 'country', language})}
              onChange={this.handleFieldChange.bind(this, 'mobile')}
              header={strings({key: 'mobile', language})}
              value={mobile}
              valuetwo={mobiletwo}
              onChangetwo={this.handleFieldChange.bind(this, 'mobiletwo')}
              placeholder={strings({key: 'yourMobilenumber', language})}
              style={{
                width: wp('17'),
                fontSize: normalizeFont(18),
                textAlign: alignment(language),
              }}
              styleTwo={{
                paddingHorizontal: 20,
                fontSize: normalizeFont(18),
                width: wp('60'),
                textAlign: alignment(language),
              }}
            />
            <LoginInput
              language={language}
              header={strings({key: 'accountType', language})}>
              <RadioForm
                radio_props={this.state.types}
                initial={0}
                style={{
                  justifyContent: 'space-around',
                  marginHorizontal: 30,
                }}
                formHorizontal={true}
                labelHorizontal={true}
                buttonWrapStyle={{marginLeft: 5}}
                buttonColor={'black'}
                selectedButtonColor={'black'}
                labelStyle={{fontSize: normalizeFont(16)}}
                buttonSize={15}
                animation={true}
                onPress={value => {
                  this.handleFieldChange('accounttype', value);
                  // this.setState({value: value});
                }}
              />
            </LoginInput>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            // disabled={!this.validationFunction()}
            onPress={() => this.continue(language)}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor:
                this.validationFunction() == true ? 'green' : 'gray',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
              }}>
              {strings({key: 'continue1to5', language})}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    values: state.bankProfileReducer.basicprofile,
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(CreateScreen);
