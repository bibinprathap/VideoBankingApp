import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import Header from '../../components/Component/Header';
import { connect, ReactReduxContext } from 'react-redux';
import { bookingInfoChange } from '../../redux/actions/bookingActions';
import LoginInput from '../../components/Component/LoginText';
import Panel from '../../components/Component/Panel/Panel';
import strings, {
  normalizeFont,
  alignment,
} from '../../api/helperServices/language';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-ionicons';
import { Picker, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import validator from 'validator';
import AppApi from '../../api/real';
const api = new AppApi();
class BookYourAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      mobiletwo: '',
      selected: props.language === 'English' ? 'Select' : 'تحديد',
      clicked: props.language === 'English' ? 'Select' : 'تحديد',
      branch: props.language === 'English' ? 'Select' : 'تحديد',
      city: '',
      cityId: '',
      branchId: '',
      itemValue: [],
      availableBraches: '',
      availableServices: [],
      serviceTypeId: '',
    };
  }
  validationFunction = () => {
    if (this.state.firstName == '') {
      return false
    }
    else if (this.state.middleName == '') {
      return false
    }
    else if (this.state.lastName == '') {
      return false
    }
    else if (this.state.email == '') {
      return false
    }
    else if (this.state.mobile == '') {
      return false
    }
    else if (this.state.mobiletwo == '') {
      return false
    }
    else if (this.state.city == 'Select' || this.state.city == 'تحديد') {
      return false
    }
    else if (this.state.branch == 'Select' || this.state.branch == 'تحديد') {
      return false
    }
    else if (this.state.serviceTypeId == '') {
      return false
    }
    else {
      return true
    }
  }

  componentDidMount() {
    this.getCities();
    this.getServiceTypes();
  }

  getServiceTypes = async () => {
    try {
      const data = await api.getServiceTypes();
      this.setState({
        availableServices: data.Model
      });
      console.log("service" + data.Model)
    } catch (error) {
      console.log(error);
    }
  }



  getCities = async () => {
    try {
      const data = await api.getCitiesByCountry();
      const defaultValue = data.Model.find(
        p => p.Text === 'Baghdad'
      );
      this.setState({
        itemValue: data.Model,
        cityId: defaultValue.Value,
        city: this.props.language === 'English' ? defaultValue.Text : defaultValue.TextAr
      }, () => this.getBranches());
    } catch (error) {
      console.log(error);
    }
  }

  getBranches = async () => {
    try {
      const data = await api.getBranches();
      this.setState({ availableBraches: data.Model });
      console.log("branches" + data.Model)
    } catch (error) {
      console.log(error);
    }
  }

  updateCreateScreenState = newState => {
    const { dispatch } = this.props;
    this.setState(newState, () => {
      const { name, email, mobile, mobiletwo, cityId, branchId, serviceTypeId } = this.state;
      const stateToStore = { name, email, mobile, mobiletwo, cityId, branchId, serviceTypeId };
      dispatch(bookingInfoChange('bookingDetails', stateToStore));
    });
  };

  handleFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateCreateScreenState(newState);
  };


  goToScheduleScreen = (language) => {
    if (this.state.name == '') {
      alert(strings({ key: 'EnterYourFullName', language }))
    }
    else if (this.state.email == '') {
      alert(strings({ key: 'EnterYourEmail', language }))
    }
    else if (!validator.isEmail(this.state.email)) {
      Alert.alert(
        'Email Address Required',
        `'${this.state.email}' is not a valid email. Try again with your valid email or contact support.`,
      );
    }
    else if (this.state.mobile == '') {
      alert(strings({ key: 'EnterYourMobileNumber', language }))
    }
    else if (!validator.isMobilePhone(this.state.mobile)) {
      Alert.alert(
        'Required',
        `'${this.state.mobile}' is not a valid mobile number. Try again with your valid number or contact support.`,
      );
    }
    else if (this.state.mobiletwo == '') {
      alert(strings({ key: 'EnterYourCountryCode', language }))
    }
    else if (this.state.city == 'Select' || this.state.city == 'تحديد') {
      Alert.alert(
        'Required',
        `Please select a city`,
      );
    }
    else if (this.state.branch == 'Select' || this.state.branch == 'تحديد') {
      Alert.alert(
        'Required',
        `Please select a branch`,
      );
    }
    else if (this.state.serviceTypeId == '') {
      Alert.alert(
        'Required',
        `Please select a service type`,
      );
    }
    else {
      this.props.navigation.navigate('Schedule', {
        directBooking: true
      })
    }
  }

  render() {
    const { language } = this.props;
    const { email, mobile, mobiletwo } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#F7F7F7' }} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={
            language === 'English'
              ? 'Create Your Booking'
              : 'إنشاء الحجز الخاص بك'
          }
          navigation={this.props.navigation}
        />
        <ScrollView
          nestedScrollEnabled={true}
          style={{ flex: 1, paddingHorizontal: 20 }}
          contentContainerStyle={{ justifyContent: 'center' }}>
          <LoginInput
            language={language}
            onChange={text => this.setState({ email: text })}
            value={email}
            header={strings({ key: 'FullName', language })}
            normalStyle={{
              fontSize: normalizeFont(18),
              width: wp('80'),
              textAlign: alignment(language),
            }}>
            <View
              style={{
                flex: 1,
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
                flexDirection: 'row',
              }}>
              <TextInput
                placeholder={"First       Father       Family"}
                placeholderTextColor="#ddd"
                onChangeText={this.handleFieldChange.bind(this, 'name')}
                //onChangeText={text =>this.setState({firstName:text})}
                style={{
                  fontSize: normalizeFont(17),
                  width: '100%',
                }}
              />
              {/* <TextInput
                placeholder={strings({key: 'Middlename', language})}
                placeholderTextColor="#ddd"
                onChangeText={this.handleFieldChange.bind(this, 'middleName')}
                style={{
                  fontSize: normalizeFont(17),
                  width: '35%',
                }}
              />
              <TextInput
                placeholder={strings({key: 'Lastname', language})}
                onChangeText={this.handleFieldChange.bind(this, 'lastName')}
                placeholderTextColor="#ddd"
                style={{
                  fontSize: normalizeFont(17),
                  width: '35%',
                  textAlign: 'center',
                }}
              /> */}
            </View>
          </LoginInput>
          <LoginInput
            language={language}
            keyboardType="email-address"
            onChange={this.handleFieldChange.bind(this, 'email')}
            TextInput
            value={email}
            header={strings({ key: 'email', language })}
            placeholder={strings({ key: 'yourEmailaddress', language })}
            normalStyle={{
              fontSize: normalizeFont(18),
              width: wp('80'),
              textAlign: alignment(language),
            }}
          />

          <LoginInput
            language={language}
            Mobile
            placeholderMobile={strings({ key: 'country', language })}
            onChange={this.handleFieldChange.bind(this, 'mobile')}
            header={strings({ key: 'mobile', language })}
            value={mobile}
            valuetwo={mobiletwo}
            onChangetwo={this.handleFieldChange.bind(this, 'mobiletwo')}
            placeholder={strings({ key: 'yourMobilenumber', language })}
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

          <View
            style={{
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            <Text
              style={{
                fontSize: normalizeFont(16),
                color: 'green',
                fontFamily: 'Roboto-Bold',
                flexWrap: 'wrap',
                paddingTop: 10,
                textAlign: language === 'English' ? 'left' : 'right',
              }}>
              {strings({ key: 'SelectCity', language })}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.city}
              onPress={() => alert("It's awesome, right?")}
              maxItem={200}
              action={
                item => this.getBranches(item)
              }
              itemValue={this.state.itemValue}
              selectValue={item => {
                console.log(item);
                this.handleFieldChange('city', this.props.language === 'English' ? item.Text : item.TextAr);
                this.handleFieldChange('cityId', item.Value);
                this.handleFieldChange('branch', this.props.language === 'English' ? 'Select' : 'تحديد')
              }}
            />
          </View>

          <View
            style={{
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            <Text
              style={{
                fontSize: normalizeFont(16),
                color: 'green',
                fontFamily: 'Roboto-Bold',
                flexWrap: 'wrap',
                paddingTop: 10,
                textAlign: language === 'English' ? 'left' : 'right',
              }}>
              {strings({ key: 'SelectBranch', language })}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.branch}
              onPress={() => alert("Please select a city first")}
              maxItem={200}
              action={() => null}
              itemValue={this.state.availableBraches}
              selectValue={item => {
                this.handleFieldChange('branch', this.props.language === 'English' ? item.Text : item.TextAr);
                this.handleFieldChange('branchId', item.Value);
              }}
            />
          </View>

          <View
            style={{
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            <Text
              style={{
                fontSize: normalizeFont(16),
                color: 'green',
                fontFamily: 'Roboto-Bold',
                flexWrap: 'wrap',
                paddingTop: 10,
                textAlign: language === 'English' ? 'left' : 'right',
              }}>
              {strings({ key: 'ServiceType', language })}
            </Text>


            <View style={{ height: 100, width: '100%' }}>
              {
                this.state.availableServices.map((item, index) => {
                  console.log(item)
                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent:
                          language === 'English' ? 'flex-start' : 'flex-end',
                      }}>
                      {language === 'English' ? (
                        <>
                          <Icons
                            onPress={() =>
                              this.handleFieldChange('serviceTypeId', item.Value)
                            }
                            ios={
                              this.state.serviceTypeId === item.Value
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            android={
                              this.state.serviceTypeId === item.Value
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            style={{ fontSize: 20, color: 'black' }}
                          />
                          <Text
                            onPress={() =>
                              this.handleFieldChange('serviceTypeId', item.Value)
                            }>
                            {' '}{item.Text}
                          </Text>
                        </>
                      ) : (
                          <>
                            <Text
                              onPress={() => this.handleFieldChange('serviceTypeId', item.Value)
                              }>
                              {' '}{item.TextAr}
                            </Text>
                            <Icons
                              onPress={() =>
                                this.handleFieldChange('serviceTypeId', item.Value)
                              }
                              ios={
                                this.state.serviceTypeId === item.Value
                                  ? 'radio-button-on'
                                  : 'radio-button-off'
                              }
                              android={
                                this.state.serviceTypeId === item.Value
                                  ? 'radio-button-on'
                                  : 'radio-button-off'
                              }
                              style={{ fontSize: 20, color: 'black' }}
                            />
                          </>
                        )}
                    </View>
                  )
                })
              }
            </View>
          </View>
        </ScrollView>
        <SafeAreaView>
          <View
            style={{
              width: '100%',
              height: 100,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.goToScheduleScreen(language)}
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                width: 250,
                backgroundColor: this.validationFunction() == true ? 'green' : 'gray',
                borderRadius: 10,
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                  fontSize: normalizeFont(18),
                }}>
                {strings({ key: 'Continue', language })}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

    );
  }
}

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(BookYourAccount);
