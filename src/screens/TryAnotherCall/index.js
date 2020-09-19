import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('screen');
import Header from '../../components/Component/Header';
import {connect} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {users} from '../../config';
import {AuthService} from '../../services';

import strings, {
  alignment,
  normalizeFont,
} from '../../api/helperServices/language';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

let user = {
  id: 1634480,
  name: 'Customer',
  login: 'bibinprathap@gmail.com',
  password: 'hjkl7890',
  color: '#34ad86',
};

class TryAnotherCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      declarationText:
        'Every single smartphone app we mess with is bound to feel different. With every stroke of your finger, experience the fluid user experience you have always wanted! Our applications are built in accordanceEvery single smartphone app we mess with is bound to feel different. With every stroke of your finger, experience the fluid user experience you have always wanted! Our applications are built in accordanceEvery single smartphone app we mess with is bound to feel different.',
      types: [
        {label: strings({key: 'Text1', language: props.language}), value: 0},
        {
          label: strings({key: 'Text2', language: props.language}),
          value: 1,
        },
      ],
      acceptPolicy: false,
      callConnect: false,
      isLogging: false,
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

  render() {
    const {language} = this.props;
    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={strings({key: 'TryVideoCall', language})}
          navigation={this.props.navigation}
        />
        <ScrollView
          behavior="padding"
          contentContainerStyle={{
            flex: 1,
            // justifyContent: 'center',

            width: '100%',
            paddingHorizontal: hp('2'),
          }}>
          <View
            style={{
              paddingVertical: hp('2'),
              flex: 0.9,
            }}>
            <View style={{flex: 0.9, margin: 20}}>
              <View
                style={{
                  flex: 1,
                  borderColor: '#ddd',
                  borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Light',
                      fontSize: normalizeFont(17),
                    }}>
                    {strings({key: 'declarationText', language: language})}
                  </Text>
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                paddingHorizontal: 20,
              }}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('ScheduleOtherAppointment')
                }
                style={{
                  color: 'green',
                  fontFamily: 'Roboto-Bold',
                  fontSize: normalizeFont(18),
                  textAlign: language === 'English' ? 'left' : 'right',
                }}>
                {strings({key: 'ScheduleYourAppointment', language: language})}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.login(user)}
            activeOpacity={0.9}
            style={{
              height: 50,
              justifyContent: 'center',

              alignItems: 'center',
              marginHorizontal: 20,
              backgroundColor: 'green',
              borderRadius: 10,
            }}>
            {!this.state.callConnect ? (
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                  fontSize: normalizeFont(18),
                }}>
                {strings({key: 'TryAnotherVideoCall', language})}
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  // Redux Store --> Component

  return {
    profileimage: state.bankProfileReducer.profileimage,
    attachments: state.attachments.allattachments,
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(TryAnotherCall);
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
