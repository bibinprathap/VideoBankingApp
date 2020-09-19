import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import LoginInput from '../Component/LoginTextArabic';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');
import Left from '../../../assets/Left.png';
import Right from '../../../assets/Right.png';
import StepIndicator from 'react-native-step-indicator';
import {AuthService} from '../../services';
import {users} from '../../config';
import {connect} from 'react-redux';
const normalizeFont = size => {
  return size * (width * 0.0025);
};

const labels = [
  'تفاصيل الحساب',
  'معلومات العميل',
  'العنوان والاتصال',
  'تفاصيل العمل',
];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'green',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'green',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: 'green',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'green',
  stepIndicatorUnFinishedColor: '#ccc',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'green',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#000',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: 'green',
};

let user = {
  id: 1634480,
  name: 'Customer',
  login: 'bibinprathap@gmail.com',
  password: 'hjkl7890',
  color: '#34ad86',
};

class FillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signatureAttachment: null,
      signatureDialogVisible: false,
      base64: '',
      currentPosition: 0,
      isLogging: false,
      callConnect: false,
      address: '',
      nearestPoint: '',
      resideAnotherCountry: '',
      accommodation: '',
      mobile: '',
      mobiletwo: '',
    };
  }

  setIsLogging = isLogging => this.setState({isLogging});

  login = currentUser => {
    this.setState({callConnect: true});
    const _onSuccessLogin = () => {
      const {navigation} = this.props;
      const opponentsIds = users
        .filter(opponent => opponent.id !== currentUser.id)
        .map(opponent => opponent.id);
      this.setState({callConnect: false});
      navigation.push('VideoCall', {opponentsIds});
    };

    const _onFailLogin = (error = {}) => {
      alert(`Error.\n\n${JSON.stringify(error)}`);
    };

    this.setIsLogging(true);

    AuthService.login(currentUser)
      .then(_onSuccessLogin)
      .catch(_onFailLogin)
      .then(() => this.setIsLogging(false));
  };

  onPageChange(position) {
    this.setState({currentPosition: position});
  }

  render() {
    const {
      address,
      nearestPoint,
      resideAnotherCountry,
      accommodation,
      mobile,
      mobiletwo,
    } = this.state;
    return (
      <View style={styles.screen}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: hp('4'),
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.goBack()}>
            <Icons
              size={hp('4')}
              style={{marginBottom: hp('2'), alignSelf: 'flex-end'}}
              name="keyboard-backspace"
              color="#000"
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: 'Lora-Bold',
              textAlign: 'right',
              fontSize: normalizeFont(21),
              paddingBottom: hp('2'),
            }}>
            تعبئة النموذج
          </Text>

          <StepIndicator
            style={{width: '100%'}}
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={labels}
            stepCount={4}
          />
          <View
            style={{
              paddingVertical: hp('2'),
              flex: 1,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  paddingTop: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.currentPosition == 0 ? (
                  <Text
                    style={{
                      fontFamily: 'Lora-Bold',
                      fontSize: normalizeFont(30),
                      paddingHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    تفاصيل الحساب
                  </Text>
                ) : this.state.currentPosition == 1 ? (
                  <Text
                    style={{
                      fontFamily: 'Lora-Bold',
                      fontSize: normalizeFont(30),
                      paddingHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    معلومات العميل
                  </Text>
                ) : this.state.currentPosition == 2 ? (
                  <View style={{flex: 1}}>
                    <LoginInput
                      TextInput
                      header="عنوان الإقامة"
                      onChange={text => this.setState({address: text})}
                      value={address}
                      normalStyle={{
                        fontSize: normalizeFont(18),
                        textAlign: 'right',
                      }}
                      placeholder="العنوان الكامل ، المدينة ، المنطقة ، الشارع ، المنزل رقم."
                    />
                    <LoginInput
                      keyboardType="default"
                      onChange={text => this.setState({nearestPoint: text})}
                      TextInput
                      normalStyle={{
                        fontSize: normalizeFont(18),
                        textAlign: 'right',
                      }}
                      value={nearestPoint}
                      header="أقرب نقطة"
                      placeholder="نقطة التصريح"
                    />

                    <LoginInput
                      keyboardType="default"
                      onChange={text =>
                        this.setState({resideAnotherCountry: text})
                      }
                      normalStyle={{
                        fontSize: normalizeFont(18),
                        textAlign: 'right',
                      }}
                      TextInput
                      value={resideAnotherCountry}
                      header="هل تقيم في بلد آخر؟"
                      placeholder="الإجابة بالتفصيل"
                    />
                    <LoginInput
                      keyboardType="default"
                      onChange={text => this.setState({accommodation: text})}
                      TextInput
                      normalStyle={{
                        fontSize: normalizeFont(18),
                        textAlign: 'right',
                      }}
                      value={accommodation}
                      header="نوع الإقامة"
                      placeholder="التأجير أو المالك"
                    />
                    <LoginInput
                      Mobile
                      style={{
                        width: wp('17'),
                        fontSize: normalizeFont(18),
                        textAlign: 'right',
                      }}
                      styleTwo={{
                        paddingHorizontal: 20,
                        fontSize: normalizeFont(18),
                        width: wp('60'),
                        textAlign: 'right',
                      }}
                      placeholderMobile="بلد"
                      onChange={text => this.setState({mobile: text})}
                      header="هاتف المنزل"
                      value={mobile}
                      valuetwo={mobiletwo}
                      onChangetwo={text => this.setState({mobiletwo: text})}
                      placeholder="رقم الهاتف"
                    />
                  </View>
                ) : this.state.currentPosition == 3 ? (
                  <Text
                    style={{
                      fontFamily: 'Lora-Bold',
                      fontSize: normalizeFont(30),
                      paddingHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    تفاصيل العمل
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Lora-Bold',
                      fontSize: normalizeFont(30),
                      paddingHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    مكتملة بنجاح
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flex: 0.1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.state.currentPosition != 0 &&
                  this.onPageChange(this.state.currentPosition - 1)
                }
                activeOpacity={0.9}>
                <Image
                  style={{
                    width: hp('6'),
                    height: hp('6'),
                    resizeMode: 'contain',
                  }}
                  source={Left}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.state.currentPosition != 4 &&
                  this.onPageChange(this.state.currentPosition + 1)
                }
                activeOpacity={0.9}>
                <Image
                  style={{
                    width: hp('6'),
                    height: hp('6'),
                    resizeMode: 'contain',
                  }}
                  source={Right}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.login(user)}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor:
                this.state.currentPosition == 4 ? 'green' : '#8395a7',
              borderRadius: 10,
            }}>
            {!this.state.callConnect ? (
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                  fontSize: normalizeFont(18),
                }}>
                ابدأ مكالمة فيديو
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: '100%',
  },
});

const mapStateToProps = state => {
  // Redux Store --> Component
  return {};
};

export default connect(mapStateToProps)(FillForm);
