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
import AppApi from '../../api/real';
import strings, {
  alignment,
  normalizeFont,
} from '../../api/helperServices/language';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
let mapuser = {
  2: 1634480,
  3: 1634482,
};

const api = new AppApi();

let user = {
  id: 1634480,
  name: 'Customer',
  login: 'bibinprathap@gmail.com',
  password: 'hjkl7890',
  color: '#34ad86',
};

class ProfileScreen extends Component {
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
      freeAgent: null,
      acceptPolicy: false,
      callConnect: false,
      isLogging: false,
    };
  }

  checkFreeAgents = async () => {
    try {
      const data = await api.freeAgents();
      if (data.Model[0]) {
        this.setState({freeAgent: data.Model[0]}, () => {
          let newHeaders = {...this.state.freeAgent};
          if (newHeaders['Id'] === 2) {
            this.setState(prevState => ({
              freeAgent: Object.assign({}, prevState.freeAgent, {
                Id: 1634480,
                Password: 'hjkl7890',
              }),
            }));
          } else if (newHeaders['Id'] === 3) {
            this.setState(prevState => ({
              freeAgent: Object.assign({}, prevState.freeAgent, {
                Id: 1634482,
                Password: 'hjkl7890',
              }),
            }));
          } else {
            this.setState(prevState => ({
              freeAgent: Object.assign({}, prevState.freeAgent, {
                Id: 1634482,
                Password: 'hjkl7890',
              }),
            }));
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.checkFreeAgents();
  }

  setIsLogging = isLogging => this.setState({isLogging});

  login = currentUser => {
    // this.props.navigation.navigate('TryAnotherCall');
    console.log('currentUser', currentUser);
    this.setState({callConnect: true});

    const _onSuccessLogin = () => {
      const {navigation} = this.props;
      let {freeAgent} = this.state;

      // const opponentsIds = freeAgent
      //   .filter(opponent => opponent.Id !== currentUser.Id)
      //   .map(opponent => opponent.Id);
      // this.setState({callConnect: false});

      // console.log(opponentsIds, 'OpponentId');

      if (this.state.freeAgent !== null) {
        navigation.push('VideoCall', {
          opponentsIds: [freeAgent.Id],
          AgentID: freeAgent.Id,
        });
      }
    };

    const _onFailLogin = (error = {}) => {
      this.setState({callConnect: false});
      this.props.navigation.navigate('TryAnotherCall');
      // alert(`Error.\n\n${JSON.stringify(error)}`);
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
          header={strings({key: 'TermsAndCondition', language})}
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
                flex: 0.2,

                justifyContent: 'space-around',
              }}>
              <RadioForm
                radio_props={this.state.types}
                style={{margin: 10, padding: 10}}
                // style={{
                //   justifyContent: 'space-around',
                //   paddingVertical: 10,
                // }}
                buttonColor={'black'}
                labelStyle={{position: 'absolute'}}
                formHorizontal={false}
                labelColor={'#000'}
                selectedButtonColor={'black'}
                buttonSize={15}
                animation={true}
                onPress={value => this.setState({value: value})}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.2,
                alignItems: 'center',
                paddingHorizontal: '5%',
              }}>
              <CheckBox
                disabled={false}
                value={this.state.acceptPolicy}
                onValueChange={value => this.setState({acceptPolicy: value})}
                lineWidth={2}
                hideBox={false}
                boxType={'circle'}
                tintColor={'#9E663C'}
                onCheckColor={'green'}
                onFillColor={'#fff'}
                onTintColor={'green'}
                animationDuration={0.5}
                onAnimationType={'bounce'}
                offAnimationType={'stroke'}
              />
              <Text style={{paddingLeft: 10, fontSize: normalizeFont(16)}}>
                {strings({key: 'termsCondition', language: language})}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.login(this.state.freeAgent)}
            disabled={!this.state.acceptPolicy}
            activeOpacity={0.9}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
              backgroundColor: this.state.acceptPolicy ? 'green' : '#8395a7',
              borderRadius: 10,
            }}>
            {!this.state.callConnect ? (
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                  fontSize: normalizeFont(18),
                }}>
                {strings({key: 'StartVideoCall', language})}
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

export default connect(mapStateToProps)(ProfileScreen);
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});
