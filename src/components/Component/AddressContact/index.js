import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Picker,
  ActionSheetIOS,
  ScrollView,
  LayoutAnimation,
  Platform,
  TextInput,
} from 'react-native';
import DefaultText from '../DefaultText';
import InputText from '../LoginText';
import AppApi from '../../../api/real';
const {width, height} = Dimensions.get('screen');
import ActionSheet from '../ActionSheetIOS';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import Icons from 'react-native-ionicons';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Panel from '../../Component/Panel/Panel';
import strings, { normalizeFont, alignment } from '../../../api/helperServices/language';

const normalizedFont = size => {
  return size * (width * 0.0025);
};

let Today;
const api = new AppApi();


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    var today = new Date().toISOString().split('T')[0];
    var td = today
      .split('/')
      .reverse()
      .join('/');
    var tdd = td
      .split('/')
      .reverse()
      .join('/');
    Today = tdd
      .split('-')
      .reverse()
      .join('/');
    this.state = {

      clicked: props.language === 'English' ? 'Owner' : 'صاحب',

      status: 'Company',
      dateOfBirth: Today,
      date_of_birth: [],
      anotherNationality: false,
      resideInOtherCountry: false,
      accommodation: props.language === 'English' ? 'Select' : 'تحديد',
      accommodationtypes: [],
      maritalStatuses: [],
      educationStatuses: [],
      jobStatuses: [],
      countries: [],
      country: '',
      marriageStatus: props.language === 'English' ? 'Select' : 'تحديد',
      educationLevel: props.language === 'English' ? 'Select' : 'تحديد',
      jobTitle: props.language === 'English' ? 'Select' : 'تحديد',
    };
    this.inputRef = [];

    this.placeholder = {
      label: props.language === 'English' ? 'Select a value' : 'تحديد قيمة',
      value: null,
    };

    this.onPress = Platform.OS == 'ios' && this.showActionSheet.bind(this);
  }

  getAccommodation = async() => { 
    try {
  const data = await api.getAccommodationType();
  this.setState({accommodationtypes: data.Model});
  console.log("ssda" + data.Model)
    } catch (error) {
      console.log(error); 
    }
  };


  onTextChange = (text = '', id = 0) => {
    let { date_of_birth } = this.state;
    if (text.length == 1 && id < 7) {
      if (id == 1 && date_of_birth[2]) {
        this.inputRef[id].blur();
      } else if (id == 3 && date_of_birth[4]) {
        this.inputRef[id].blur();
      } else {
        console.log('id', id);
        this.inputRef[id + 1].focus();
        date_of_birth[id + 1] = '';
      }
      date_of_birth[id] = text;
      this.setState({ date_of_birth });
    } else {
      date_of_birth[id] = text;
      this.setState({ date_of_birth });
      this.inputRef[id].blur();
      console.log('DOB hsgdhg')
      console.log(this.state.date_of_birth)
      const day = this.state.date_of_birth[0].concat(this.state.date_of_birth[1])
      const month = this.state.date_of_birth[2].concat(this.state.date_of_birth[3])
      const year = this.state.date_of_birth[4].concat(this.state.date_of_birth[5], this.state.date_of_birth[6], this.state.date_of_birth[7])
      const DOB = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').toDate();
      console.log(DOB);
      this.props.onChangeDob(DOB);
    }
  };

  _onKeyPress(e, id) {
    const { date_of_birth } = this.state;
    if (e.nativeEvent.key === 'Backspace') {
      const nextIndex = id > 0 ? id - 1 : 0;
      this.inputRef[nextIndex].focus();
      date_of_birth[nextIndex] = '';
      this.setState({ date_of_birth });
    }
  }

  _onFocus(index) {
    let { date_of_birth } = this.state;
    date_of_birth[index] = '';
    this.setState({ date_of_birth });
  }

  _viewTouch(toIndex) {
    this.inputRef[toIndex].focus();
  }

  getCountries = async () => {
    try {
      const data = await api.getCountries();
      const defaultValue = data.Model.find(
        p => p.Text === 'Iraq'
      );
      this.setState({
        countries: data.Model,
        country: this.props.language === 'English' ? defaultValue.Text : defaultValue.TextAr
      });
    } catch (error) {
      console.log(error);
    }
  };

  getMaritalStatus = async() => { 
    try {
  const data = await api.getmaritalStatus();
  this.setState({maritalStatuses: data.Model});
    } catch (error) {
      console.log(error); 
    }
  };

  getEducation = async() => { 
    try {
  const data = await api.getEducationalLevel();
  this.setState({educationStatuses: data.Model});
    } catch (error) {
      console.log(error); 
    }
  };

  getJob = async() => { 
    try {
  const data = await api.getJobDetails();
  this.setState({jobStatuses: data.Model});
    } catch (error) {
      console.log(error); 
    }
  };


  componentDidMount() {
    console.log(this.props.values.accounttype, 'value');
    this.getAccommodation();
    this.getCountries();
    this.getMaritalStatus();
    this.getEducation();
    this.getJob(); 
  }
  render() {
    const {language} = this.props;
    let {date_of_birth} = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={{padding: 5}}>
          {this.props.values.accounttype === 0 ? (
            <>
              <Text
                style={{
                  fontSize: normalizedFont(20),
                  fontFamily: 'Lora-Bold',
                  paddingBottom: 20,
                  textAlign: language === 'English' ? 'left' : 'right',
                }}>
                {language === 'English'
                  ? 'Housing information'
                  : 'معلومات الإسكان'}
              </Text>
              <InputText
                language={language}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
                onChange={this.props.onChangeAddress}
                header={
                  language === 'English' ? 'Resident address' : 'عنوان الإقامة'
                }
                TextInput
                placeholder={
                  language === 'English' ? 'Resident address' : 'عنوان الإقامة'
                }
                Value={this.props.ResidentAddresspersonal}
              />

              <InputText
                header={language === 'English' ? 'Nearest point' : 'أقرب نقطة'}
                TextInput
                placeholder={
                  language === 'English' ? 'Nearest point' : 'أقرب نقطة'
                }
                Value={this.props.NearestPoint}
    
                onChange={this.props.onChangeNearestPoint}
                language={language}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
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
                  {strings({ key: 'DoYouResideInAnotherCountry', language })}
                </Text>


                <View style={{ height: 80, width: '100%' }}>
                  <View
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
                          onPress={() => {
                            this.setState({ resideInOtherCountry: false });
                            this.props.onChangeHasOtherNation(false)
                          }
                          }
                          ios={
                            this.state.resideInOtherCountry !== true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          android={
                            this.state.resideInOtherCountry !== true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          style={{ fontSize: 20, color: 'black' }}
                        />
                        <Text
                          onPress={() => {
                            this.setState({ resideInOtherCountry: false });
                            this.props.onChangeHasOtherNation(false)
                          }
                          }>
                          {' '}{'No'}
                        </Text>
                      </>
                    ) : (
                        <>
                          <Text
                            onPress={() => {
                              this.setState({ resideInOtherCountry: false });
                              this.props.onChangeHasOtherNation(false)
                            }
                            }>
                            {' '}{'ل'}
                          </Text>
                          <Icons
                            onPress={() => {
                              this.setState({ resideInOtherCountry: false });
                              this.props.onChangeHasOtherNation(false)
                            }
                            }
                            ios={
                              this.state.resideInOtherCountry !== true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            android={
                              this.state.resideInOtherCountry !== true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            style={{ fontSize: 20, color: 'black' }}
                          />
                        </>
                      )}
                  </View>

                  <View
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
                          onPress={() => {
                            this.setState({ resideInOtherCountry: true });
                            this.props.onChangeHasOtherNation(true)
                          }
                          }
                          ios={
                            this.state.resideInOtherCountry === true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          android={
                            this.state.resideInOtherCountry === true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          style={{ fontSize: 20, color: 'black' }}
                        />
                        <Text
                          onPress={() => {
                            this.setState({ resideInOtherCountry: true });
                            this.props.onChangeHasOtherNation(true)
                          }
                          }>
                          {' '}{'Yes'}
                        </Text>
                      </>
                    ) : (
                        <>
                          <Text
                            onPress={() => {
                              this.setState({ resideInOtherCountry: true });
                              this.props.onChangeHasOtherNation(true)
                            }
                            }>
                            {' '}{'نعم'}
                          </Text>
                          <Icons
                            onPress={() => {
                              this.setState({ resideInOtherCountry: true });
                              this.props.onChangeHasOtherNation(true)
                            }
                            }
                            ios={
                              this.state.resideInOtherCountry === true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            android={
                              this.state.resideInOtherCountry === true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            style={{ fontSize: 20, color: 'black' }}
                          />
                        </>
                      )}
                  </View>
                </View>
              </View>

              <View
            style={{
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            <Text
              style={{
                fontSize: normalizedFont(16),
                color: 'green',
                fontFamily: 'Roboto-Bold',
                flexWrap: 'wrap',
                paddingTop: 10,
                textAlign: language === 'English' ? 'left' : 'right',
              }}>
              {strings({key: 'Accommodationtype', language})}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.accommodation}
              onPress={() => alert("It's awesome, right?")}
              maxItem={200} 
              action={() => null}
              itemValue={
                 this.state.accommodationtypes
              }
              selectValue={item => {
                this.setState({accommodation: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeAccomodation(item);
                }}
           >
            </Panel>
          </View>

              <InputText
                header={language === 'English' ? 'Home phone' : 'هاتف المنزل'}
                TextInput
                keyboardType="numeric"
                returnType="done"
                placeholder={
                  language === 'English' ? 'Home phone' : 'هاتف المنزل'
                }
                Value={this.props.HomePhone}
                language={language}
                onChange={this.props.onChangeHomePhone}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={language === 'English' ? 'Mobile' : 'التليفون المحمول'}
                TextInput
                keyboardType="numeric"
                returnType="done"
                placeholder={
                  language === 'English' ? 'Mobile' : 'التليفون المحمول'
                }
                Value={this.props.Mobile}
                onChange={this.props.onChangeMobile}
                language={language}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={language === 'English' ? 'Email' : 'البريد الإلكتروني'}
                TextInput
                placeholder={
                  language === 'English' ? 'Email' : 'البريد الإلكتروني'
                }
                Value={this.props.AddressEmail}
                onChange={this.props.onChangeAddressEmail}
                language={language}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <Text
                style={{
                  fontSize: normalizedFont(20),
                  fontFamily: 'Lora-Bold',
                  paddingVertical: 20,
                }}>
                {language === 'English' ? 'Work information' : 'معلومات العمل'}
              </Text>

              <InputText
                header={
                  language === 'English'
                    ? "Organization's owner name"
                    : 'اسم صاحب المؤسسة'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? "Organization's owner name"
                    : 'اسم صاحب المؤسسة'
                }
                Value={this.props.OrganizationOwnerName}
                onChange={this.props.onChangeOrgOwner}
                language={language}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={
                  language === 'English'
                    ? 'The activity of the organization in details'
                    : 'نشاط المنظمة بالتفصيل'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? 'The activity of the organization in details'
                    : 'نشاط المنظمة بالتفصيل'
                }
                Value={this.props.OrganizationActivity}
                language={language}
                onChange={this.props.onChangeOrgAct}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={
                  language === 'English'
                    ? "Customer's job title within the organization"
                    : 'المسمى الوظيفي للعميل داخل المنظمة'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? "Customer's job title within the organization"
                    : 'المسمى الوظيفي للعميل داخل المنظمة'
                }
                Value={this.props.JobTitle}
                language={language}
                onChange={this.props.onChangeJobTitle}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={
                  language === 'English'
                    ? 'Organization address'
                    : 'عنوان المنظمة'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? 'Organization address'
                    : 'عنوان المنظمة'
                }
                Value={this.props.OrganizationAddress}
                language={language}
                onChange={this.props.onChangeOrgAddress}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={
                  language === 'English' ? 'Organization phone' : 'هاتف المنظمة'
                }
                keyboardType="numeric"
                returnType="done"
                TextInput
                placeholder={
                  language === 'English' ? 'Organization phone' : 'هاتف المنظمة'
                }
                Value={this.props.OrganizationPhone}
                language={language}
                onChange={this.props.onChangePhone}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />
              <InputText
                header={language === 'English' ? 'FAX' : 'الفاكس'}
                TextInput
                placeholder={language === 'English' ? 'FAX' : 'الفاكس'}
                Value={this.props.OrganizationFax}
                language={language}
                onChange={this.props.onChangeFax}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />
            </>
          ) : (
            <>
              <InputText
                header={
                  language === 'English'
                    ? 'Quadruple name and surname in Arabic'
                    : 'الاسم واللقب الرباعي باللغة العربية'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? 'Quadruple name and surname in Arabic'
                    : 'الاسم واللقب الرباعي باللغة العربية'
                }
                Value={this.props.FullNameAr}
                language={language}
                onChange={this.props.onChangeFullNameAr}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={
                  language === 'English'
                    ? 'Quadruple name and surname in English'
                    : 'الاسم واللقب الرباعي باللغة الإنجليزية'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? 'Quadruple name and surname in English'
                    : 'الاسم واللقب الرباعي باللغة الإنجليزية'
                }
                Value={this.props.FullName}

                language={language}
                onChange={this.props.onChangeFullName}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />
              <InputText
                header={
                  language === 'English'
                    ? 'Why the account is not managed by the beneficiary'
                    : 'لماذا لا يتم إدارة الحساب من قبل المستفيد'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? 'Why the account is not managed by the beneficiary'
                    : 'لماذا لا يتم إدارة الحساب من قبل المستفيد'
                }
                Value={this.props.WhyAccountNotManagedByBeneficiary}

                language={language}
                onChange={this.props.onChangeWhyAccount}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />
              <InputText
                header={
                  language === 'English'
                    ? "Mother's triple name"
                    : 'اسم الأم الثلاثي'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? "Mother's triple name"
                    : 'اسم الأم الثلاثي'
                }
                Value={this.props.MotherName}

                language={language}
                onChange={this.props.onChangeMother}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              
              <InputText
                language={language}
                header={
                  language === 'English' ? 'Date of birth' : 'تاريخ الولادة'
                }
                placeholder={
                  language === 'English' ? 'Date of birth' : 'تاريخ الولادة'
                }

                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}>
                <View
                  style={{
                    justifyContent:
                      language === 'English' ? 'flex-start' : 'flex-end',
                    alignItems:
                      language === 'English' ? 'flex-start' : 'flex-end',
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      ref={input => {
                        this.inputRef[0] = input;
                      }}
                      style={styles.textInput}
                      // value={date_of_birth[0]}
                      onChangeText={text => {
                        if (['0', '1', '2', '3'].indexOf(text) > -1) {
                          this.onTextChange(text, 0);
                        }
                      }}
                      placeholderTextColor="#8B8A8B"
                      placeholder="D"
                      returnKeyType="next"
                      onSubmitEditing={() => { }}
                      secureTextEntry={false}
                      underlineColorAndroid="transparent"
                      maxLength={1}
                      keyboardType="number-pad"
                      onKeyPress={e => this._onKeyPress(e, 0)}
                      onFocus={() => this._onFocus(0)}
                    // autoFocus={props.autoFocus}
                    />

                    <View
                      onTouchStart={() => this._viewTouch(0)}
                      pointerEvents="box-only">
                      <TextInput
                        ref={input => {
                          this.inputRef[1] = input;
                        }}
                        style={styles.textInput}
                        value={date_of_birth[1]}
                        onChangeText={text => {
                          if (
                            date_of_birth[0] === '3' &&
                            ['0', '1'].indexOf(text) > -1
                          ) {
                            this.onTextChange(text, 1);
                          } else if (date_of_birth[0] !== '3') {
                            if (
                              date_of_birth[0] == '0' &&
                              [
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                              ].indexOf(text) > -1
                            ) {
                              this.onTextChange(text, 1);
                            } else if (
                              date_of_birth[0] == '1' &&
                              [
                                '0',
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                              ].indexOf(text) > -1
                            ) {
                              this.onTextChange(text, 1);
                            } else if (
                              date_of_birth[0] == '2' &&
                              [
                                '0',
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                              ].indexOf(text) > -1
                            ) {
                              this.onTextChange(text, 1);
                            }
                          }
                        }}
                        placeholderTextColor="#8B8A8B"
                        placeholder="D"
                        secureTextEntry={false}
                        underlineColorAndroid="transparent"
                        maxLength={1}
                        keyboardType="number-pad"
                        onKeyPress={e => this._onKeyPress(e, 1)}
                        onFocus={() => this._onFocus(1)}
                      />
                    </View>

                    <View>
                      <TextInput
                        ref={input => {
                          this.inputRef[2] = input;
                        }}
                        style={[styles.textInput, { paddingLeft: 5 }]}
                        value={date_of_birth[2]}
                        onChangeText={text => {
                          if (['0', '1'].indexOf(text) > -1) {
                            this.onTextChange(text, 2);
                          }
                        }}
                        // onSubmitEditing={this.submitName}
                        placeholderTextColor="#8B8A8B"
                        placeholder="M"
                        secureTextEntry={false}
                        underlineColorAndroid="transparent"
                        maxLength={1}
                        keyboardType="number-pad"
                        onKeyPress={e => this._onKeyPress(e, 2)}
                        onFocus={() => this._onFocus(2)}
                      // autoFocus={props.autoFocus}
                      />
                    </View>

                    <View
                      onTouchStart={() => this._viewTouch(2)}
                      pointerEvents="box-only">
                      <TextInput
                        ref={input => {
                          this.inputRef[3] = input;
                        }}
                        style={styles.textInput}
                        value={date_of_birth[3]}
                        onChangeText={text => {
                          if (
                            date_of_birth[2] === '1' &&
                            ['0', '1', '2'].indexOf(text) > -1
                          ) {
                            this.onTextChange(text, 3);
                          } else if (date_of_birth[2] !== '1') {
                            if (
                              date_of_birth[2] == '0' &&
                              [
                                '1',
                                '2',
                                '3',
                                '4',
                                '5',
                                '6',
                                '7',
                                '8',
                                '9',
                              ].indexOf(text) > -1
                            ) {
                              if (
                                date_of_birth[0] == '3' &&
                                date_of_birth[1] == '1' &&
                                [
                                  '0',
                                  '1',
                                  '3',
                                  '4',
                                  '5',
                                  '6',
                                  '7',
                                  '8',
                                  '9',
                                ].indexOf(text) > -1
                              ) {
                                this.onTextChange(text, 3);
                              } else if (
                                date_of_birth[0] == '3' &&
                                date_of_birth[1] == '0' &&
                                [
                                  '0',
                                  '1',
                                  '3',
                                  '4',
                                  '5',
                                  '6',
                                  '7',
                                  '8',
                                  '9',
                                ].indexOf(text) > -1
                              ) {
                                this.onTextChange(text, 3);
                              } else if (
                                date_of_birth[0] == '2' &&
                                [
                                  '0',
                                  '1',
                                  '2',
                                  '3',
                                  '4',
                                  '5',
                                  '6',
                                  '7',
                                  '8',
                                  '9',
                                ].indexOf(text) > -1
                              ) {
                                this.onTextChange(text, 3);
                              } else if (
                                date_of_birth[0] == '1' &&
                                [
                                  '0',
                                  '1',
                                  '2',
                                  '3',
                                  '4',
                                  '5',
                                  '6',
                                  '7',
                                  '8',
                                  '9',
                                ].indexOf(text) > -1
                              ) {
                                this.onTextChange(text, 3);
                              } else if (
                                date_of_birth[0] == '0' &&
                                [
                                  '0',
                                  '1',
                                  '2',
                                  '3',
                                  '4',
                                  '5',
                                  '6',
                                  '7',
                                  '8',
                                  '9',
                                ].indexOf(text) > -1
                              ) {
                                this.onTextChange(text, 3);
                              }
                            }
                          }
                        }}
                        placeholderTextColor="#8B8A8B"
                        placeholder="M"
                        secureTextEntry={false}
                        underlineColorAndroid="transparent"
                        maxLength={1}
                        keyboardType="number-pad"
                        onKeyPress={e => this._onKeyPress(e, 3)}
                        onFocus={() => this._onFocus(3)}
                      // autoFocus={props.autoFocus}
                      />
                    </View>

                    <View
                      onTouchStart={() => this._viewTouch(4)}
                      pointerEvents="box-only">
                      <TextInput
                        ref={input => {
                          this.inputRef[4] = input;
                        }}
                        style={[styles.textInput, { paddingLeft: 5 }]}
                        value={date_of_birth[4]}
                        onChangeText={text => {
                          if (['1', '2'].indexOf(text) > -1) {
                            this.onTextChange(text, 4);
                          }
                        }}
                        // onSubmitEditing={this.submitName}
                        placeholderTextColor="#8B8A8B"
                        placeholder="Y"
                        secureTextEntry={false}
                        underlineColorAndroid="transparent"
                        maxLength={1}
                        keyboardType="number-pad"
                        onKeyPress={e => this._onKeyPress(e, 4)}
                        onFocus={() => this._onFocus(4)}
                      // autoFocus={props.autoFocus}
                      />
                    </View>

                    <View
                      onTouchStart={() => this._viewTouch(4)}
                      pointerEvents="box-only">
                      <TextInput
                        ref={input => {
                          this.inputRef[5] = input;
                        }}
                        style={styles.textInput}
                        value={date_of_birth[5]}
                        onChangeText={text => {
                          if (date_of_birth[4] === '2' && text === '0') {
                            this.onTextChange(text, 5);
                          } else if (
                            date_of_birth[4] == '1' &&
                            ['9'].indexOf(text) > -1
                          ) {
                            this.onTextChange(text, 5);
                          } else if (
                            date_of_birth[4] == '2' &&
                            ['0'].indexOf(text) > -1
                          ) {
                            this.onTextChange(text, 5);
                          }
                        }}
                        placeholderTextColor="#8B8A8B"
                        placeholder="Y"
                        secureTextEntry={false}
                        underlineColorAndroid="transparent"
                        maxLength={1}
                        keyboardType="number-pad"
                        onKeyPress={e => this._onKeyPress(e, 5)}
                        onFocus={() => this._onFocus(5)}
                      // autoFocus={props.autoFocus}
                      />
                    </View>
                    <View
                      onTouchStart={() => this._viewTouch(4)}
                      pointerEvents="box-only">
                      <TextInput
                        ref={input => {
                          this.inputRef[6] = input;
                        }}
                        style={styles.textInput}
                        value={date_of_birth[6]}
                        onChangeText={text => this.onTextChange(text, 6)}
                        onChangeText={text => {
                          if (
                            date_of_birth[4] === '2' &&
                            ['0', '1', '2'].indexOf(text) > -1
                          ) {
                            this.onTextChange(text, 6);
                          } else if (
                            date_of_birth[4] == '1' &&
                            date_of_birth[5] == '9' &&
                            ['2', '3', '4', '5', '6', '7', '8', '9'].indexOf(
                              text,
                            ) > -1
                          ) {
                            this.onTextChange(text, 6);
                          }
                        }}
                        placeholderTextColor="#8B8A8B"
                        placeholder="Y"
                        secureTextEntry={false}
                        underlineColorAndroid="transparent"
                        maxLength={1}
                        keyboardType="number-pad"
                        onKeyPress={e => this._onKeyPress(e, 6)}
                        onFocus={() => this._onFocus(6)}
                      // autoFocus={props.autoFocus}
                      />
                    </View>

                    <View
                      onTouchStart={() => this._viewTouch(4)}
                      pointerEvents="box-only">
                      <TextInput
                        ref={input => {
                          this.inputRef[7] = input;
                        }}
                        style={styles.textInput}
                        value={date_of_birth[7]}
                        onChangeText={text => this.onTextChange(text, 7)}
                        placeholderTextColor="#8B8A8B"
                        placeholder="Y"
                        secureTextEntry={false}
                        underlineColorAndroid="transparent"
                        maxLength={1}
                        keyboardType="number-pad"
                        onKeyPress={e => this._onKeyPress(e, 7)}
                        onFocus={() => this._onFocus(7)}
                      // autoFocus={props.autoFocus}
                      />
                    </View>
                  </View>
                </View>
              </InputText>



              <InputText
                header={
                  language === 'English' ? 'Place of birth' : 'مكان الولادة'
                }
                TextInput
                placeholder={
                  language === 'English' ? 'Place of birth' : 'مكان الولادة'
                }
                Value={this.props.PlaceOfBirth}
                language={language}
                onChange={this.props.onChangePlaceOfBirth}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
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
                    fontSize: normalizedFont(16),
                    color: 'green',
                    fontFamily: 'Roboto-Bold',
                    flexWrap: 'wrap',
                    paddingTop: 10,
                    textAlign: language === 'English' ? 'left' : 'right',
                  }}>
                  {strings({ key: 'CustomerNationality', language })}
                </Text>

                <Panel
                  ref={ref => {
                    this.myModal = ref;
                  }}
                  header={this.state.country}
                  onPress={() => alert("It's awesome, right?")}
                  maxItem={200}
                  action={() => null}
                  itemValue={
                    this.state.countries
                  }
                  selectValue={item => {
                    this.setState({ country: this.props.language === 'English' ? item.Text : item.TextAr });
                    this.props.onChangeCountry(item);
                  }}
                >
                </Panel>
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
                  {strings({ key: 'IsTheCustomerHoldingAnotherNationality', language })}
                </Text>


                <View style={{ height: 80, width: '100%' }}>
                  <View
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
                          onPress={() => {
                            this.setState({ anotherNationality: false });
                            this.props.onChangeHasOtherNation(false)
                          }
                          }
                          ios={
                            this.state.anotherNationality !== true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          android={
                            this.state.anotherNationality !== true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          style={{ fontSize: 20, color: 'black' }}
                        />
                        <Text
                          onPress={() => {
                            this.setState({ anotherNationality: false });
                            this.props.onChangeHasOtherNation(false)
                          }
                          }>
                          {' '}{'No'}
                        </Text>
                      </>
                    ) : (
                        <>
                          <Text
                            onPress={() => {
                              this.setState({ anotherNationality: false });
                              this.props.onChangeHasOtherNation(false)
                            }
                            }>
                            {' '}{'ل'}
                          </Text>
                          <Icons
                            onPress={() => {
                              this.setState({ anotherNationality: false });
                              this.props.onChangeHasOtherNation(false)
                            }
                            }
                            ios={
                              this.state.anotherNationality !== true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            android={
                              this.state.anotherNationality !== true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            style={{ fontSize: 20, color: 'black' }}
                          />
                        </>
                      )}
                  </View>

                  <View
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
                          onPress={() => {
                            this.setState({ anotherNationality: true });
                            this.props.onChangeHasOtherNation(true)
                          }
                          }
                          ios={
                            this.state.anotherNationality === true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          android={
                            this.state.anotherNationality === true
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          style={{ fontSize: 20, color: 'black' }}
                        />
                        <Text
                          onPress={() => {
                            this.setState({ anotherNationality: true });
                            this.props.onChangeHasOtherNation(true)
                          }
                          }>
                          {' '}{'Yes'}
                        </Text>
                      </>
                    ) : (
                        <>
                          <Text
                            onPress={() => {
                              this.setState({ anotherNationality: true });
                              this.props.onChangeHasOtherNation(true)
                            }
                            }>
                            {' '}{'نعم'}
                          </Text>
                          <Icons
                            onPress={() => {
                              this.setState({ anotherNationality: true });
                              this.props.onChangeHasOtherNation(true)
                            }
                            }
                            ios={
                              this.state.anotherNationality === true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            android={
                              this.state.anotherNationality === true
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            style={{ fontSize: 20, color: 'black' }}
                          />
                        </>
                      )}
                  </View>
                </View>
              </View>


              <InputText
                header={
                  language === 'English'
                    ? 'National ID number'
                    : 'رقم الهوية الوطنية'
                }
                TextInput
                keyboardType="numeric"
                returnType="done"
                placeholder={
                  language === 'English'
                    ? 'National ID number'
                    : 'رقم الهوية الوطنية'
                }
                Value={this.props.NationalIdNumber}
                language={language}
                onChange={this.props.onChangeNationalID}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={
                  language === 'English'
                    ? 'Place and date of issue'
                    : 'مكان وتاريخ صدوره'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? 'Place and date of issue'
                    : 'مكان وتاريخ صدوره'
                }
                Value={this.props.IdDateOfIssue}

                language={language}
                onChange={(text) => {this.props.onChangeIdDate(text); this.props.onChangeIdPlace(text);}}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />
              <InputText
                header={
                  language === 'English'
                    ? 'Civil ID card number'
                    : 'رقم البطاقة المدنية'
                }
                keyboardType="numeric"
                returnType="done"
                Mobile
                placeholder={
                  language === 'English'
                    ? 'Civil ID card number'
                    : 'رقم البطاقة المدنية'
                }
                Value={this.props.CivilIdNumber}

                language={language}
                onChange={this.props.onChangeCivilID}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              
              <InputText
                TextInput
                language={language}
                header={
                  language === 'English'
                    ? 'Place and date of issue'
                    : 'مكان وتاريخ صدوره'
                }
                placeholder={
                  language === 'English'
                    ? 'Place and date of issue'
                    : 'مكان وتاريخ صدوره'
                }
                Value={this.props.CivilIdDateOfIssue}

                onChange={(text) => {this.props.onChangeCivilDate(text); this.props.onChangeCivilPlace(text)}}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={
                  language === 'English' ? 'Passport number' : 'رقم جواز السفر'
                }
                keyboardType="numeric"
                returnType="done"
                TextInput
                placeholder={
                  language === 'English' ? 'Passport number' : 'رقم جواز السفر'
                }
                Value={this.props.PassportNumber}

                language={language}
                onChange={this.props.onChangePassportID}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />
              <InputText
                header={
                  language === 'English'
                    ? 'Place and date of issue'
                    : 'مكان وتاريخ صدوره'
                }
                TextInput
                placeholder={
                  language === 'English'
                    ? 'Place and date of issue'
                    : 'مكان وتاريخ صدوره'
                }
                Value={this.props.PassportIsueDate}

                language={language}
                onChange={(text) => {this.props.onChangePassportDate(text); this.props.onChangePassportPlace(text);}}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
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
                fontSize: normalizedFont(16),
                color: 'green',
                fontFamily: 'Roboto-Bold',
                flexWrap: 'wrap',
                paddingTop: 10,
                textAlign: language === 'English' ? 'left' : 'right',
              }}>
              {strings({key: 'Maritalstatus', language})}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.marriageStatus}
              onPress={() => alert("It's awesome, right?")}
              maxItem={240} 
              action={() => null}
              itemValue={
                 this.state.maritalStatuses
              }
              selectValue={item => {
                this.setState({marriageStatus: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeMarriage(item);
                }}
           >
            </Panel>
          </View>

          <View
            style={{
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            <Text
              style={{
                fontSize: normalizedFont(16),
                color: 'green',
                fontFamily: 'Roboto-Bold',
                flexWrap: 'wrap',
                paddingTop: 10,
                textAlign: language === 'English' ? 'left' : 'right',
              }}>
              {strings({key: 'Educationlevel', language})}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.educationLevel}
              onPress={() => alert("It's awesome, right?")}
              maxItem={240} 
              action={() => null}
              itemValue={
                 this.state.educationStatuses
              }
              selectValue={item => {
                this.setState({educationLevel: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeEducation(item);
                }}
           >
            </Panel>
          </View>

          <View
            style={{
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            <Text
              style={{
                fontSize: normalizedFont(16),
                color: 'green',
                fontFamily: 'Roboto-Bold',
                flexWrap: 'wrap',
                paddingTop: 10,
                textAlign: language === 'English' ? 'left' : 'right',
              }}>
              {strings({key: 'Jobdetails', language})}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.jobTitle}
              onPress={() => alert("It's awesome, right?")}
              maxItem={240} 
              action={() => null}
              itemValue={
                 this.state.jobStatuses
              }
              selectValue={item => {
                this.setState({jobTitle: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeJob(item);
                }}
           >
            </Panel>
          </View>


              {this.state.jobTitle === 'Merchant' ? (
                <InputText
                  language={language}
                  header={
                    language === 'English'
                      ? 'The last audited financial statements for merchant customer'
                      : 'آخر بيانات مالية مدققة للعملاء التجاريين'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'The last audited financial statements for merchant customer'
                      : 'آخر بيانات مالية مدققة للعملاء التجاريين'
                  }
                  Value={this.props.TheLastAuditedStatement}
                  onChange={this.props.onChangeLastAuditState}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />
              ) : null}

              <InputText
                header={
                  language === 'English' ? 'Resident address' : 'عنوان الإقامة'
                }
                TextInput
                placeholder={
                  language === 'English' ? 'Resident address' : 'عنوان الإقامة'
                }
                Value={this.props.ResidentAddress}

                language={language}
                onChange={this.props.onChangeResidentAddress}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={language === 'English' ? 'Mobile' : 'التليفون المحمول'}
                TextInput
                keyboardType="numeric"
                returnType="done"
                placeholder={
                  language === 'English' ? 'Mobile' : 'التليفون المحمول'
                }
                Value={this.props.BeneficiaryMobile}

                language={language}
                onChange={this.props.onChangeBeneMobile}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                header={language === 'English' ? 'Email' : 'البريد الإلكتروني'}
                TextInput
                placeholder={
                  language === 'English' ? 'Email' : 'البريد الإلكتروني'
                }
                Value={this.props.BeneficiaryEmail}

                language={language}
                onChange={this.props.onChangeBeneEmail}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    );
  }

  showActionSheet(options, index, cancel, item) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: index,
        // destructiveButtonIndex: DESTRUCTIVE_INDEX,
      },
      buttonIndex => {
        if (buttonIndex !== cancel) {
          if (item === 'clicked') {
            this.setState({clicked: options[buttonIndex]});
          } else if (item === 'marriageStatus') {
            this.setState({marriageStatus: options[buttonIndex]});
          } else if (item === 'educationLevel') {
            this.setState({educationLevel: options[buttonIndex]});
          } else if (item === 'jobTitle') {
            this.setState({jobTitle: options[buttonIndex]});
          }
        }
      },
    );
  }
}

const styles = StyleSheet.create({
  textObj: {
    fontSize: normalizedFont(18),
    color: 'green',
  },
  textInput: {
    backgroundColor: '#FFFFFF',

    fontFamily: 'UberMoveText-Regular',
    fontSize: normalizedFont(16),
    color: '#333333',

    // height: 35,
    // width: 25,
    paddingBottom: 5,

    ...Platform.select({
      ios: {
        textAlign: 'center',
      },
    }),

    // backgroundColor: 'red',
  },
});

const mapStateToProps = state => {
  // Redux Store --> Component
  console.log(state, 'state');
  return {
    values: state.bankProfileReducer.basicprofile,
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(AccountDetails);
