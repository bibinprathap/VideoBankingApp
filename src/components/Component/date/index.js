import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  ToastAndroid,
  BackHandler,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
const {height, width} = Dimensions.get('screen');
import Modal from 'react-native-modal';

import NetInfo from '@react-native-community/netinfo';
import * as AuthContext from '../../../utils/AuthContext';
import {Container, LanguageResource} from '../../../components';

const genders = ['Male', 'Female', 'Others'];
const normalizeFont = size => {
  return size * (width * 0.0025);
};
var today = new Date().toISOString().split('T')[0];
today = today
  .split('-')
  .reverse()
  .join('-');

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      date_of_birth: this.props.date_of_birth ? this.props.date_of_birth : [],
      gender: this.props.gender ? this.props.gender : '',
      date_error_msg: '',
      gender_error_msg: '',
      valid_Modal: false,
      isConnected: false,
    };
    this.inputRef = [];
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.getConnectionInfo().then(data => {
      if (data.type == 'wifi' || data.type == 'cellular') {
        this.setState({isConnected: true});
      } else {
        this.setState({isConnected: false});
      }
    });

    this.subscription = NetInfo.addEventListener(
      'connectionChange',
      this.listener,
    );
  }
  listener = data => {
    if (data.type == 'wifi' || data.type == 'cellular') {
      this.setState({isConnected: true});
    } else {
      this.setState({isConnected: false});
    }
  };

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.subscription.remove();
  }

  submitDateGenderiOS = () => {
    const {setDOB, setGender} = this.props;
    const {
      date_of_birth,
      gender,
      date_error_msg,
      gender_error_msg,
    } = this.state;
    setDOB(date_of_birth);
    setGender(gender);
    this.props.navigation.navigate('Password');
  };

  submitDateGender = () => {
    const {setDOB, setGender} = this.props;
    const {
      date_of_birth,
      gender,
      date_error_msg,
      gender_error_msg,
    } = this.state;

    // console.log("Date of Birth", date_of_birth);

    if (date_of_birth.length == 0) {
      this.setState({
        date_error_msg: 'Select Date of Birth',
        valid_Modal: true,
      });
    } else if (date_of_birth.length < 8) {
      this.setState({
        date_error_msg: 'Invalid Date of Birth',
        valid_Modal: true,
      });
    } else if (gender.length == 0) {
      this.setState({gender_error_msg: 'Select Gender', valid_Modal: true});
    } else if (date_of_birth.length == 8 && gender.length != 0) {
      let flag = true;
      date_of_birth.forEach((item, index) => {
        if (item.length == 0) {
          flag = false;
          this.setState({
            date_error_msg: 'Select Date of Birth',
            valid_Modal: true,
          });
        }
        // console.log(index);

        if (index + 1 == date_of_birth.length && flag) {
          setDOB(date_of_birth);
          setGender(gender);
          this.props.navigation.navigate('Password');
        }
      });
    }
  };

  onTextChange = (text = '', id = 0) => {
    let {date_of_birth} = this.state;
    // console.log(text, date_of_birth.join(''));
    if (text.length == 1 && id < 7) {
      if (id == 1 && date_of_birth[2]) {
        this.inputRef[id].blur();
      } else if (id == 3 && date_of_birth[4]) {
        this.inputRef[id].blur();
      } else {
        this.inputRef[id + 1].focus();
        date_of_birth[id + 1] = '';
      }
    } else {
      this.inputRef[id].blur();
    }
    date_of_birth[id] = text;
    this.setState({date_of_birth});
  };

  _onKeyPress(e, id) {
    const {date_of_birth} = this.state;
    // console.log('pressed');
    if (e.nativeEvent.key === 'Backspace') {
      const nextIndex = id > 0 ? id - 1 : 0;
      this.inputRef[nextIndex].focus();
      date_of_birth[nextIndex] = '';
      this.setState({date_of_birth});
    }
  }

  _onFocus(index) {
    let {date_of_birth} = this.state;
    // console.log('focus clear');

    date_of_birth[index] = '';
    this.setState({date_of_birth});
  }

  _viewTouch(toIndex) {
    const {date_of_birth} = this.state;

    // console.log('touch clear');
    this.inputRef[toIndex].focus();
    // date_of_birth[currentIndex].length
    // this.setState({ date_of_birth }, () => this.inputRef[toIndex].focus());
    // this.inputRef[toIndex].focus()
  }

  _closeModal = () => this.setState({valid_Modal: false});

  _open_valid_modal = () => this.setState({valid_Modal: true});

  _render_valid_modal() {
    const {valid_Modal, date_error_msg, gender_error_msg} = this.state;
    if (valid_Modal) {
      return (
        <Modal
          isVisible={valid_Modal}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
          onBackdropPress={this._closeModal}
          onBackButtonPress={this._closeModal}
          backdropColor="black"
          backdropOpacity={0.5}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 5,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              paddingHorizontal: '5%',
              paddingBottom: 30,
            }}>
            <TouchableOpacity
              onPress={this._closeModal}
              style={{
                height: 40,
                width: 40,
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginTop: 10,
              }}>
              <Icon name="close" color="#A8A7A7" size={25} />
            </TouchableOpacity>

            <View
              style={{
                width: width / 4,
                alignSelf: 'center',
                marginTop: 5,
                borderRadius: 5,
              }}
            />

            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              {date_error_msg.length > 0 && (
                <Text
                  style={{
                    fontSize: normalizeFont(16),
                    color: '#b22222',
                    fontFamily: 'UberMoveText-Regular',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  *{date_error_msg}{' '}
                </Text>
              )}
              {gender_error_msg.length > 0 && (
                <Text
                  style={{
                    fontSize: normalizeFont(16),
                    color: '#b22222',
                    fontFamily: 'UberMoveText-Regular',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  *{gender_error_msg}{' '}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      return null;
    }
  }

  render() {
    const {date_of_birth, gender, valid_Modal, isConnected} = this.state;
    // console.log(date_of_birth);
    return (
      <Container style={styles.container}>
        {this._render_valid_modal()}
        <StatusBar
          barStyle="dark-content"
          backgroundColor={valid_Modal ? '#FFFFFF' : '#FFFFFF'}
        />

        <TouchableOpacity
          style={{
            height: 40,
            paddingLeft: '5%',
            justifyContent: 'center',
            marginVertical: 4,
          }}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-left" color="#A8A7A7" size={25} />
        </TouchableOpacity>

        {/* <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                /> */}

        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            style={{flex: 1, marginHorizontal: '6%'}}
            behavior="height"
            enabled>
            <View style={{marginHorizontal: '6%'}}>
              {Platform.OS == 'android' ? (
                <Text
                  style={{
                    fontSize: normalizeFont(20),
                    color: '#515050',
                    fontFamily: 'UberMoveText-Bold',
                  }}>
                  Date of Birth
                </Text>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: normalizeFont(20),
                      color: '#515050',
                      fontFamily: 'UberMoveText-Bold',
                    }}>
                    Date of Birth
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: '#dcdde1',
                      fontSize: normalizeFont(20),
                      fontFamily: 'UberMoveText-Bold',
                    }}>
                    [optional]
                  </Text>
                </View>
              )}

              <Text
                style={{
                  fontSize: normalizeFont(14),
                  color: '#A09E9F',
                  fontFamily: 'UberMoveText-Medium',
                  marginVertical: 5,
                  paddingBottom: 30,
                }}>
                {LanguageResource.getdatePage(this.props.selected_lang)}
              </Text>

              <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  ref={input => {
                    this.inputRef[0] = input;
                  }}
                  style={styles.textInput}
                  value={date_of_birth[0]}
                  onChangeText={text => {
                    if (['0', '1', '2', '3'].indexOf(text) > -1) {
                      this.onTextChange(text, 0);
                    }
                  }}
                  placeholderTextColor="#8B8A8B"
                  placeholder="D"
                  returnKeyType="next"
                  onSubmitEditing={() => {}}
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
                          ['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(
                            text,
                          ) > -1
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
                    // onSubmitEditing={this.submitName}
                    placeholderTextColor="#8B8A8B"
                    placeholder="D"
                    secureTextEntry={false}
                    underlineColorAndroid="transparent"
                    maxLength={1}
                    keyboardType="number-pad"
                    onKeyPress={e => this._onKeyPress(e, 1)}
                    onFocus={() => this._onFocus(1)}
                    // caretHidden={true}
                    // autoFocus={props.autoFocus}
                  />
                </View>

                <Text
                  style={{
                    fontSize: normalizeFont(20),
                    color: '#515050',
                    fontFamily: 'UberMoveText-Regular',
                  }}>
                  /
                </Text>

                <View>
                  <TextInput
                    ref={input => {
                      this.inputRef[2] = input;
                    }}
                    style={styles.textInput}
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
                          ['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(
                            text,
                          ) > -1
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
                <Text
                  style={{
                    fontSize: normalizeFont(20),
                    color: '#515050',
                    fontFamily: 'UberMoveText-Regular',
                  }}>
                  /
                </Text>

                <View
                  onTouchStart={() => this._viewTouch(4)}
                  pointerEvents="box-only">
                  <TextInput
                    ref={input => {
                      this.inputRef[4] = input;
                    }}
                    style={styles.textInput}
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
                        ['0', '1'].indexOf(text) > -1
                      ) {
                        this.onTextChange(text, 6);
                      } else if (
                        date_of_birth[4] == '1' &&
                        date_of_birth[5] == '9' &&
                        ['2', '3', '4', '5', '6', '7', '8', '9'].indexOf(text) >
                          -1
                      ) {
                        this.onTextChange(text, 6);
                      }
                      // else if (date_of_birth[4] !== "2") {
                      //   this.onTextChange(text, 6);
                      // }
                    }}
                    // onSubmitEditing={this.submitName}
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

            <View style={{flex: 1, marginHorizontal: '6%'}}>
              {Platform.OS == 'android' ? (
                <Text
                  style={{
                    fontSize: normalizeFont(20),
                    color: '#515050',
                    fontFamily: 'UberMoveText-Bold',
                  }}>
                  Gender
                </Text>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: normalizeFont(20),
                      color: '#515050',
                      fontFamily: 'UberMoveText-Bold',
                    }}>
                    Gender
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      color: '#dcdde1',
                      fontSize: normalizeFont(20),
                      fontFamily: 'UberMoveText-Bold',
                    }}>
                    [optional]
                  </Text>
                </View>
              )}

              <Text
                style={{
                  fontSize: normalizeFont(14),
                  color: '#A09E9F',
                  fontFamily: 'UberMoveText-Medium',
                  marginVertical: 5,
                  paddingBottom: 40,
                }}>
                {LanguageResource.getgenderPage(this.props.selected_lang)}
              </Text>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                {genders.map((gen, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginVertical: 4,
                      height: 40,
                      width: width * 0.3,
                      backgroundColor: gen === gender ? '#91E3C4' : '#FFFFFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                      borderWidth: gen === gender ? 1 : 0.25,
                      borderColor: gen === gender ? '#91E3C4' : '#A8A7A7',
                      marginTop: height * 0.02,
                    }}
                    onPress={() => this.setState({gender: gen})}>
                    <Text
                      style={{
                        fontSize: normalizeFont(16),
                        color: gen === gender ? '#FFFFFF' : '#8B8A8B',
                        fontFamily: 'UberMoveText-Regular',
                      }}>
                      {gen}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={{height: 140}} />
        </ScrollView>
        {Platform.OS == 'android' ? (
          <TouchableOpacity
            disabled={
              this.state.date_of_birth.length != 8 ||
              this.state.gender.length == 0
                ? true
                : false
            }
            activeOpacity={1}
            style={[
              styles.nextButton,
              {
                backgroundColor:
                  this.state.date_of_birth.length == 8 && this.state.gender
                    ? '#91E3C4'
                    : '#F3F4F5',
              },
            ]}
            onPress={() => {
              isConnected == true
                ? this.submitDateGender()
                : Platform.OS == 'android'
                ? ToastAndroid.show(
                    'No Internet Connection',
                    ToastAndroid.SHORT,
                  )
                : Toast.show('No Internet Connection', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                  });
            }}>
            <Text
              style={{
                fontSize: normalizeFont(18),
                color:
                  this.state.date_of_birth.length == 8 && this.state.gender
                    ? '#FFFFFF'
                    : '#515050',
                fontFamily: 'UberMoveText-Medium',
                textAlign: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.nextButton,
              {
                backgroundColor: '#91E3C4',
              },
            ]}
            onPress={() => {
              isConnected == true
                ? this.submitDateGenderiOS()
                : Platform.OS == 'android'
                ? ToastAndroid.show(
                    'No Internet Connection',
                    ToastAndroid.SHORT,
                  )
                : Toast.show('No Internet Connection', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                  });
            }}>
            <Text
              style={{
                fontSize: normalizeFont(18),
                color: '#FFFFFF',
                fontFamily: 'UberMoveText-Medium',
                textAlign: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A8A7A7',
    fontFamily: 'UberMoveText-Regular',
    fontSize: normalizeFont(16),
    color: '#333333',
    borderBottomWidth: 1,

    height: 35,
    width: 25,
    paddingBottom: 5,
    marginLeft: 2,
    ...Platform.select({
      ios: {
        textAlign: 'center',
      },
    }),

    marginRight: 1,
    // backgroundColor: 'red',
  },
  nextButton: {
    height: 50,
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#91E3C4',
    borderRadius: 40,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
  },
});
