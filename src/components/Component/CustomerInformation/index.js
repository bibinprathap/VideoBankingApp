import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Picker,
  ActionSheetIOS,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import DefaultText from '../DefaultText';
import InputText from '../LoginText';
import AppApi from '../../../api/real';
const { width, height } = Dimensions.get('screen');
import moment from 'moment';
import Panel from '../../Component/Panel/Panel';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import Icons from 'react-native-ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import strings, { normalizeFont, alignment } from '../../../api/helperServices/language';
const normalizedFont = size => {
  return size * (width * 0.0025);
};
const api = new AppApi();
let Today;



const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
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

class CustomerDetails extends Component {
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
      marriageStatus: props.language === 'English' ? 'Select' : 'تحديد',
      educationLevel: props.language === 'English' ? 'Select' : 'تحديد',
      jobTitle: props.language === 'English' ? 'Select' : 'تحديد',
      companyActivity: props.language === 'English' ? 'Select' : 'تحديد',
      dateOfBirth: Today,
      date_of_birth: [],
      companyActivitys: {
        Model: [
          {
            "Text": "Company",
            "TextAr": "شركة",
            "Value": 1
          },
        ]
      },
      maritalStatuses: [],
      educationStatuses: [],
      jobStatuses: [],
      companyActivities: [],
      countries: [],
      country: '',
      anotherNationality: false
    };
    this.inputRef = [];
    this.placeholder = {
      label: props.language === 'English' ? 'Select a value' : 'تحديد قيمة',
      value: null,
    };

    this.onPress = Platform.OS === 'ios' && this.showActionSheet.bind(this);
  }


  companyActivitys = async () => {
    try {
      const data = await api.getCompanyActivity();
      this.setState({ companyActivities: data.Model });
    } catch (error) {
      console.log(error);
    }
  };

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
    this.companyActivitys();
    this.getCountries();
    this.getMaritalStatus();
    this.getEducation();
    this.getJob();  
  }

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

  render() {
    const { language } = this.props;
    let { date_of_birth } = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ padding: 5 }}>
          {this.props.values.accounttype == 0 ? (
            <>
              <InputText
                TextInput
                language={language}
                header={
                  language === 'English'
                    ? 'Quadruple name and surname in Arabic'
                    : 'الاسم واللقب الرباعي باللغة العربية'
                }
                placeholder={
                  language === 'English'
                    ? 'Quadruple name and surname in Arabic'
                    : 'الاسم واللقب الرباعي باللغة العربية'
                }
                Value={this.props.NameArab}
                onChange={this.props.onChangeFullNameAr}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                TextInput
                language={language}
                header={
                  language === 'English'
                    ? 'Quadruple name and surname in English'
                    : 'الاسم واللقب الرباعي باللغة الإنجليزية'
                }
                placeholder={
                  language === 'English'
                    ? 'Quadruple name and surname in English'
                    : 'الاسم واللقب الرباعي باللغة الإنجليزية'
                }
                Value={this.props.NameEnglish}
                onChange={this.props.onChangeFullName}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                language={language}
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
                Value={this.props.DOB}
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
                language={language}
                TextInput
                header={
                  language === 'English' ? 'place of birth' : 'مكان الولادة'
                }
                placeholder={
                  language === 'English' ? 'place of birth' : 'مكان الولادة'
                }
                Value={this.props.BirthPlace}
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
                TextInput
                language={language}
                keyboardType="numeric"
                returnType="done"
                header={
                  language === 'English'
                    ? 'National ID number'
                    : 'رقم الهوية الوطنية'
                }
                placeholder={
                  language === 'English'
                    ? 'National ID number'
                    : 'رقم الهوية الوطنية'
                }
                Value={this.props.NationalIdNumber}
                onChange={this.props.onChangeNationalID}
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
                Value={this.props.NationalityIdDate}

                onChange={(text) => {this.props.onChangeIdDate(text); this.props.onChangeIdPlace(text);}}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                TextInput
                language={language}
                keyboardType="numeric"
                returnType="done"
                header={
                  language === 'English'
                    ? 'Civil ID card number'
                    : 'رقم البطاقة المدنية'
                }
                placeholder={
                  language === 'English'
                    ? 'Civil ID card number'
                    : 'رقم البطاقة المدنية'
                }
                Value={this.props.CivilIdNumber}
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
                Value={this.props.CivilIdPlaceOfIssue}

                onChange={(text) => {this.props.onChangeCivilDate(text); this.props.onChangeCivilPlace(text)}}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}
              />

              <InputText
                TextInput
                language={language}
                header={
                  language === 'English' ? 'Passport number' : 'رقم جواز السفر'
                }
                placeholder={
                  language === 'English' ? 'Passport number' : 'رقم جواز السفر'
                }
                Value={this.props.PassportNumber}
                onChange={this.props.onChangePassportID}
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
                Value={this.props.PassportIssuePlace}
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


   
              {this.state.jobTitle === 'Other' ? (
                <InputText
                  language={language}
                  header={
                    language === 'English'
                      ? 'Customer profession required in detail'
                      : 'مهنة العملاء المطلوبة بالتفصيل'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Customer profession required in detail'
                      : 'مهنة العملاء المطلوبة بالتفصيل'
                  }
                  onChange={this.props.onChangeJobOther}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />
              ) : null}

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
                  onChange={this.props.onChangeLastAuditState}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />
              ) : null}
            </>                                                                     //ACCOUNT TYPE===1     ####################################################################
          ) : (
              <>
                <InputText
                  language={language}
                  header={
                    language === 'English'
                      ? 'Company name and surname in Arabic'
                      : 'اسم الشركة ولقبها بالعربية'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Company name and surname in Arabic'
                      : 'اسم الشركة ولقبها بالعربية'
                  }
                  Value={this.props.CommercialNameAr}
                  onChange={this.props.onChangeCompanyNameAr}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  language={language}
                  header={
                    language === 'English'
                      ? 'Company name and surname in English'
                      : 'اسم الشركة ولقبها باللغة الإنجليزية'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Company name and surname in English'
                      : 'اسم الشركة ولقبها باللغة الإنجليزية'
                  }
                  Value={this.props.CommercialName}
                  onChange={this.props.onChangeCompanyName}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Authorized person to manage company’s account'
                      : 'الشخص المفوض لإدارة حساب الشركة'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Authorized person to manage company’s account'
                      : 'الشخص المفوض لإدارة حساب الشركة'
                  }
                  Value={this.props.AuthorizedPersonName}
                  language={language}
                  onChange={this.props.onChangeAuthName}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Address of the authorized person'
                      : 'عنوان الشخص المفوض'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Address of the authorized person'
                      : 'عنوان الشخص المفوض'
                  }
                  Value={this.props.AuthorizedPersonAddress}
                  language={language}
                  onChange={this.props.onChangeAuthAddress}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Managing director or CEO'
                      : 'العضو المنتدب أو الرئيس التنفيذي'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Managing director or CEO'
                      : 'العضو المنتدب أو الرئيس التنفيذي'
                  }
                  Value={this.props.ManagingDirectorName}
                  language={language}
                  onChange={this.props.onChangeMdName}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Chairman of the board'
                      : 'رئيس مجلس الإدارة'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Chairman of the board'
                      : 'رئيس مجلس الإدارة'
                  }
                  Value={this.props.ChairmanofBoard}
                  language={language}
                  onChange={this.props.onChangeChairmanName}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Board members'
                      : 'أعضاء مجلس الإدارة'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Board members'
                      : 'أعضاء مجلس الإدارة'
                  }
                  Value={this.props.BoardMembers}
                  language={language}
                  onChange={this.props.onChangeBoardName}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Names of the shareholders'
                      : 'أسماء المساهمين'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Names of the shareholders'
                      : 'أسماء المساهمين'
                  }
                  Value={this.props.StackHolders}

                  language={language}
                  onChange={this.props.onChangeStack}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English' ? 'Commercial register' : 'تسجيل تجاري'
                  }
                  TextInput
                  placeholder={
                    language === 'English' ? 'Commercial register' : 'تسجيل تجاري'
                  }
                  Value={this.props.CommercialRegister}

                  language={language}
                  onChange={this.props.onChangeCommercial}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Company nationality'
                      : 'جنسية الشركة'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Company nationality'
                      : 'جنسية الشركة'
                  }
                  Value={this.props.CompanyNationality}

                  language={language}
                  onChange={this.props.onChangeCompanyNationality}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? "Number of company's branches"
                      : 'عدد فروع الشركة'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? "Number of company's branches"
                      : 'عدد فروع الشركة'
                  }
                  Value={this.props.TotalBranches}

                  language={language}
                  onChange={this.props.onChangeTotalBranches}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Correspondence address'
                      : 'عنوان المراسلة'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Correspondence address'
                      : 'عنوان المراسلة'
                  }
                  Value={this.props.CorrespondenceAddress}
                  language={language}
                  onChange={this.props.onChangeCorresAddress}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Names of those authorized to withdraw and deposit'
                      : 'أسماء المفوضين بالانسحاب والإيداع'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Names of those authorized to withdraw and deposit'
                      : 'أسماء المفوضين بالانسحاب والإيداع'
                  }
                  Value={this.props.AuthorozedToWithdrawDeposits}
                  language={language}
                  onChange={this.props.onChangeAuthWith}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                {/* {Platform.OS == 'ios' ? (
                <ActionSheet
                  onPress={() =>
                    this.onPress(
                      language === 'English'
                        ? COMPANY_ACTIVITY
                        : ARABIC_COMPANY_ACTIVITY,
                      CANCEL_INDEX_COMPNAY_ACTIVITY,
                      5,
                      'companyActivity',
                    )
                  }
                  header={
                    language === 'English' ? 'Company activity' : 'نشاط الشركه'
                  }
                  value={this.state.companyActivity}
                />
              ) : ( */}

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
              {strings({key: 'Companyactivity', language})}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.companyActivity}
              onPress={() => alert("It's awesome, right?")}
              maxItem={240} 
              action={() => null}
              itemValue={
                 this.state.companyActivities
              }
              selectValue={item => {
                this.setState({companyActivity: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeCompanyActivity(item);
                }}
           >
            </Panel>
          </View>


                {/* <InputText
                header={
                  language === 'English' ? 'Company activity' : 'نشاط الشركه'
                }
                language={language}
                normalStyle={{
                  textAlign: language == 'English' ? 'left' : 'right',
                }}>
                {language === 'English' ? (
                  <RNPickerSelect
                    placeholder={this.placeholder}
                    onValueChange={value =>
                      this.setState({companyActivity: value})
                    }
                    style={{textAlign: 'left'}}
                    items={[
                      {
                        label: 'Industrial',
                        value: 'Industrial',
                      },
                      {
                        label: 'Commercial',
                        value: 'Commercial',
                      },
                      {label: 'Agricultural', value: 'Agricultural'},
                      {label: 'Services', value: 'Services'},
                      {label: 'Charitable', value: 'Charitable'},
                    ]}
                    Icon={() => {
                      return (
                        <Icon
                          name="md-arrow-down"
                          size={hp('2.5')}
                          color="gray"
                        />
                      );
                    }}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                  />
                ) : (
                  <View
                    style={{
                      borderColor: 'grey',
                      borderWidth: 1,
                      flex: 1,
                      paddingHorizontal: 10,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 0.1}}>
                      <Icon name="md-arrow-down" size={24} color="gray" />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        height: hp('4'),
                        justifyContent: 'center',
                        width: '100%',
                      }}>
                      <RNPickerSelect
                        style={{textAlign: 'right'}}
                        placeholder={this.placeholder}
                        textInputProps={{textAlign: 'right'}}
                        onValueChange={value =>
                          this.setState({companyActivity: value})
                        }
                        items={[
                          {label: 'صناعي', value: 'صناعي'},
                          {label: 'تجاري', value: 'تجاري'},
                          {label: 'زراعية', value: 'زراعية'},
                          {label: 'خدمات', value: 'خدمات'},
                          {label: 'الخيرية', value: 'الخيرية'},
                        ]}
                      />
                    </View>
                  </View>
                )}
              </InputText> */}

                <InputText
                  header={
                    language === 'English'
                      ? 'Date of establishment'
                      : 'تاريخ التأسيس'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Date of establishment'
                      : 'تاريخ التأسيس'
                  }
                  Value={this.props.EstablishmentDate}
                  language={language}
                  onChange={this.props.onChangeEstdDate}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English' ? 'Nominal capital' : 'برأسمال اسمي'
                  }
                  TextInput
                  placeholder={
                    language === 'English' ? 'Nominal capital' : 'برأسمال اسمي'
                  }
                  Value={this.props.NominalCapital}
                  language={language}
                  onChange={this.props.onChangeNomCap}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English' ? 'Paid capital' : 'رأس المال المدفوع'
                  }
                  TextInput
                  placeholder={
                    language === 'English' ? 'Paid capital' : 'رأس المال المدفوع'
                  }
                  Value={this.props.PaidCapital}

                  language={language}
                  onChange={this.props.onChangePaidCap}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'Place of incorporation'
                      : 'مكان التأسيس'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'Place of incorporation'
                      : 'مكان التأسيس'
                  }
                  Value={this.props.IncorporationPlace}

                  language={language}
                  onChange={this.props.onChangeIncorpPlace}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English' ? 'Telephone number' : 'رقم هاتف'
                  }
                  TextInput
                  keyboardType="numeric"
                  returnType="done"
                  placeholder={
                    language === 'English' ? 'Telephone number' : 'رقم هاتف'
                  }
                  Value={this.props.TelephoneNumber}
                  language={language}
                  onChange={this.props.onChangeTelNumber}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={language === 'English' ? 'Fax number' : 'رقم الفاكس'}
                  TextInput
                  keyboardType="numeric"
                  returnType="done"
                  placeholder={
                    language === 'English' ? 'Fax number' : 'رقم الفاكس'
                  }
                  Value={this.props.FaxNumber}
                  language={language}
                  onChange={this.props.onChangeFaxNumber}
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
                  Value={this.props.Email}
                  language={language}
                  onChange={this.props.onChangeEmail}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'The latest audited financial statements of the company'
                      : 'أحدث القوائم المالية المدققة للشركة'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'The latest audited financial statements of the company'
                      : 'أحدث القوائم المالية المدققة للشركة'
                  }
                  Value={this.props.LatestAuditedFinancialStatementofCompany}

                  language={language}
                  onChange={this.props.onChangeLastAudit}
                  normalStyle={{
                    textAlign: language == 'English' ? 'left' : 'right',
                  }}
                />

                <InputText
                  header={
                    language === 'English'
                      ? 'The name of the external auditor'
                      : 'اسم المراجع الخارجي'
                  }
                  TextInput
                  placeholder={
                    language === 'English'
                      ? 'The name of the external auditor'
                      : 'اسم المراجع الخارجي'
                  }
                  Value={this.props.ExternalAuditorName}

                  language={language}
                  onChange={this.props.onChangeAuditName}
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
          if (item === 'marriageStatus') {
            this.setState({ marriageStatus: options[buttonIndex] });
          } else if (item === 'educationLevel') {
            this.setState({ educationLevel: options[buttonIndex] });
          } else if (item === 'jobTitle') {
            this.setState({ jobTitle: options[buttonIndex] });
          } else if (item === 'companyActivity') {
            this.setState({ companyActivity: options[buttonIndex] });
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

export default connect(mapStateToProps)(CustomerDetails);
