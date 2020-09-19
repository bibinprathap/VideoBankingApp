import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import Header from '../../components/Component/Header';
import { connect } from 'react-redux';
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
// import {TouchableOpacity} from 'react-native-gesture-handler';
import config from './config';
import { CustomePicker } from './DropDownMenuComp';
const greenColor = '#00822C';
import days from './config';
// import DropDownPicker from './react-native-dropdown-picker/src';
import { ButtonComp, CustomeRadioButton } from './ModuleComp';

import DropDownPicker from 'react-native-dropdown-picker';
import { BookingServices } from '../../services/booking-service';
import Axios from 'axios';
import AppApi from '../../api/real';
const api = new AppApi();
Axios.defaults.baseURL = 'http://atexapi.urukit.com';
class BookYourAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      mobile: '',
      mobiletwo: '',
      selected: props.language === 'English' ? 'Select' : 'تحديد',
      clicked: props.language === 'English' ? 'Select' : 'تحديد',
      branch: props.language === 'English' ? 'Select' : 'تحديد',
      city: props.language === 'English' ? 'Select' : 'تحديد',

      serviceType: false,
      serviceTypeOther: false,
      bookableDays: [],
      bookableTimes: config.timeset,
      selectedDay: '',
      selectedCity: '',
      selectedBranch: '',
      selectedHour: '00',
      selectedTime: '',
      selectedNotificationType: 'By SMS',
      itemValue: [],
    };
  }
  componentDidMount = () => {
    this.getCurrentDay();
    this.getCities();
    // console.warn(Platform.OS)
  };
  getCities = async () => {
    try {
      const data = await api.getCitiesByCountry();
      console.log("cities" + data)
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

  getCurrentDay = () => {
    var d = new Date();
    var n = d.getDay();
    console.warn(n)
    // setdays(daySet.combi2)
    if (n == 0) {
      this.setState({ bookableDays: days.daySet2 });
    } else if (n == 1) {
      this.setState({ bookableDays: days.daySet3 });
    } else if (n == 2) {
      this.setState({ bookableDays: days.daySet4 });
    } else if (n == 3) {
      this.setState({ bookableDays: days.daySet5 });
    } else if (n == 4) {
      this.setState({ bookableDays: days.daySet6 });
    } else if (n == 5) {
      this.setState({ bookableDays: days.daySet7 });
    } else {
      this.setState({ bookableDays: days.daySet1 });
    }
  };

  validationFunction = () => {
    if (this.state.selectedDay == '') {
      return false
    }
    else if (this.state.selectedTime == '') {
      return false
    }
    else {
      return true
    }
  }

  submitBooking = async () => {
    const payload = {
      "Id": '',
      "ReferenceNo": "",
      "FullName": this.props.booking.bookingDetails.name,
      "Email": this.props.booking.bookingDetails.email,
      "Mobile": this.props.booking.bookingDetails.mobile.concat(" ", this.props.booking.bookingDetails.mobiletwo),
      "CityId": this.props.booking.bookingDetails.cityId,
      "BranchId": this.props.booking.bookingDetails.branchId,
      "ServiceTypeId": this.props.booking.bookingDetails.serviceTypeId,
      "AppointmentDateTime": '2020-07-12T06:20:07.605Z',
      "NotifyBy": this.state.selectedNotificationType,
      "CreatedDate": new Date(),
      "ModifiedDate": new Date(),
      "IsAccomodated": true
    }
    console.log(payload);
    try {
      const data = await api.createBooking(payload);
      if (data.IsSuccessful === true){
        this.props.navigation.navigate('BookingConcratz')
      }
    } catch (error) {
      console.log(error);
    }
  }


  submit = (language) => {
    if (this.state.selectedCity == '') {
      alert(strings({ key: 'SelectYourCity', language }))
    }
    else if (this.state.selectedBranch == '') {
      alert(strings({ key: 'SelectYourBranch', language }))
    }
    else if (this.state.selectedDay == '') {
      alert(strings({ key: 'selectADay', language }))
    }
    else if (this.state.selectedTime == '') {
      alert(strings({ key: 'SelectATime', language }))
    }
    else {
      this.props.navigation.navigate('BookingConcratz')
    }
  }

  render() {
    const { language } = this.props;
    const {
      bookableDays,
      selectedDay,
      bookableTimes,
      selectedTime,
      selectedNotificationType,
      selectedCity,
      selectedBranch,
      selectedHour,

    } = this.state;
    console.log("props")
    console.log(this.props)
    const directBooking = this.props.navigation.getParam('directBooking', null)
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#F7F7F7' }} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={strings({ key: 'ScheduleYourAppointment', language })}
          navigation={this.props.navigation}
        />
        <View style={{ height: config.DevHeight - 250 }}>
          <ScrollView>
            <View style={{ marginHorizontal: 20 }}>
              {directBooking !== true ? (
                <>
                  <Text style={styles.headFont}>{strings({ key: 'SelectCity', language })}</Text>

                  {Platform.OS === 'android' ? (
                    <CustomePicker
                      onSelect={item => this.setState({ selectedCity: item })}
                    />
                  ) : (
                      <Panel
                        ref={ref => {
                          this.myModal = ref;
                        }}
                        header={this.state.city}
                        maxItem={150}
                        itemValue={this.state.itemValue}
                        selectValue={item => this.setState({ city: item })}
                      />
                    )}

                  <Text style={styles.headFont}>{strings({ key: 'SelectBranch', language })}</Text>
                  {Platform.OS === 'android' ? (
                    <CustomePicker
                      onSelect={item => this.setState({ selectedBranch: item })}
                    />
                  ) : (
                      <Panel
                        ref={ref => {
                          this.myModal = ref;
                        }}
                        header={this.state.branch}
                        maxItem={150}
                        itemValue={this.state.itemValue}
                        selectValue={item => this.setState({ branch: item })}
                      />
                    )}
                </>
              ) : null}


              <Text style={styles.headFont}>{strings({ key: 'pickDateAndTime', language })}</Text>
              <View style={{ height: 50, marginTop: 10 }}>
                <FlatList
                  horizontal
                  data={bookableDays}
                  renderItem={({ item }) => (
                    <ButtonComp
                      Val={item}
                      onSelect={() => this.setState({ selectedDay: item })}
                      Active={selectedDay}
                    />
                  )}
                />
              </View>
              <View style={{ height: 'auto', marginTop: 15 }}>
                <FlatList
                  data={config.hourSet}
                  numColumns={5}
                  renderItem={({ item }) => (
                    <ButtonComp
                      Val={`${item}:00`}
                      onSelect={() => this.setState({ selectedHour: item, selectedTime: '' })}
                      Active={`${selectedHour}:00`}
                    />)} />
              </View>
              <View style={{ height: 'auto', marginTop: 15 }}>
                <FlatList
                  data={config.minutSet}
                  numColumns={5}
                  renderItem={({ item }) => (
                    <ButtonComp
                      Val={`${selectedHour}:${item}`}
                      onSelect={() => this.setState({ selectedTime: `${selectedHour}:${item}` })}
                      Active={`${selectedTime}`}
                    />)} />
              </View>
              <View
                style={{
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderColor: greenColor,
                  marginTop: 10,
                  paddingLeft: 20,
                }}>
                <CustomeRadioButton
                  Val="By SMS"
                  Name={strings({ key: 'BySms', language })}
                  onSelect={() =>
                    this.setState({ selectedNotificationType: 'By SMS' })
                  }
                  ActiveType={selectedNotificationType}
                />
                <CustomeRadioButton
                  Val="Send to Email"
                  Name={strings({ key: 'sendToMail', language })}
                  onSelect={() =>
                    this.setState({ selectedNotificationType: 'Send to Email' })
                  }
                  ActiveType={selectedNotificationType}
                />
              </View>
              <View style={{ height: 30 }} />
            </View>
          </ScrollView>
        </View>
        
   

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
                style={this.validationFunction() == true ? styles.submitButton : styles.submitButtonInActive}
                onPress={() => this.submitBooking()
                  // this.props.navigation.navigate('BookingConcratz')
                }>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto-Bold',
                    fontSize: normalizeFont(18),
                  }}>
                  {strings({ key: 'Submityourbooking', language })}
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
    booking: state.bookingReducer
  };
};

const styles = StyleSheet.create({
  headFont: {
    // fontFamily:font.semi_bold,
    color: greenColor,
    fontSize: 12,
    marginTop: 10,
  },
  dropDown: {
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: greenColor,
  },
  submitButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonInActive: {
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
  }
});

export default connect(mapStateToProps)(BookYourAccount);
