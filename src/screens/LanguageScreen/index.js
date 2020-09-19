import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground
} from 'react-native';
const {width, height} = Dimensions.get('window');
import RadioForm from 'react-native-simple-radio-button';
import Logo from '../../../assets/MainLogo.png';
import {connect} from 'react-redux';
import {storeLanguage} from './store/actions';
import {Modal} from '../../components/Modal';

import {environmentInfoChanged} from '../../redux/actions/environmentActions';
//'../../redux/actions/bankProfileActions';
import HeaderGeneric from '../../components/InputControls/HeaderGeneric';

import LoginInput from '../../components/Component/LoginText';
//'../../Component/LoginText';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Verifiyed from '../../../assets/Verifiyed.png';

const normalizedFont = size => {
  return size * (width * 0.0025);
};

class LanguageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      ...props.environment,
      settingsVisible: false,
      types: [{label: 'English', value: 0}, {label: 'Arabic', value: 1}],
    };
  }

  updateCreateScreenState = newState => {
    const {dispatch} = this.props;
    this.setState(newState, () => {
      const {title, baseURL} = this.state;
      const stateToStore = {title, baseURL};
      this.props.changeEnvironment(stateToStore);
      // dispatch(environmentInfoChanged(stateToStore));
    });
  };

  handleFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateCreateScreenState(newState);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.Language, 'langage');
  }

  render() {
    const {baseURL, title} = this.state;
    return (
      <View style={{backgroundColor: '#F7F7F7', flex: 1,position:'relative'}}>
        {/* <ImageBackground style={{height:height+300,width:width+300,position:'absolute',bottom:10,left:0,resizeMode:'contain'}}  source={require('./bground.jpeg')}> */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.settingsVisible}
          onRequestClose={() => this.setState({settingsVisible: false})}>
          <HeaderGeneric
            backAction={() => this.setState({settingsVisible: false})}
            title="Settings"
          />
          <ScrollView style={styles.reconciliationWrapper}>
            <View style={styles.screen}>
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  width: '100%',
                  paddingHorizontal: hp('4'),
                }}>
                <Text
                  style={{
                    fontFamily: 'Lora-Bold',
                    textAlign: 'left',
                    fontSize: normalizedFont(21),
                  }}>
                  API Base URI
                </Text>
                <View style={{paddingVertical: hp('2')}}>
                  <LoginInput
                    TextInput
                    header="URI"
                    onChange={this.handleFieldChange.bind(this, 'baseURL')}
                    value={baseURL}
                    placeholder="Base Url"
                    normalStyle={{
                      fontSize: normalizedFont(18),
                      width: wp('80'),
                    }}
                  />
                  <LoginInput
                    TextInput
                    header="Name"
                    onChange={this.handleFieldChange.bind(this, 'title')}
                    value={title}
                    placeholder="Title"
                    normalStyle={{
                      fontSize: normalizedFont(18),
                      width: wp('80'),
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </Modal>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.setState({settingsVisible: true})}>
            <Image style={styles.logoImage} source={Logo} />
          </TouchableOpacity>
        </View>

        
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <TouchableOpacity
            onPress={() => {
              if (this.state.value === 0) {
                this.props.changeLanguage('English');
                this.props.navigation.navigate('AuthScreen');
              } else {
                this.props.changeLanguage('Arabic');
                this.props.navigation.navigate('AuthScreen');
                //  this.props.navigation.navigate('AuthStack_AR');
              }
            }}
            activeOpacity={0.9}>
            <Image style={styles.verifiedImage} source={Verifiyed} />
          </TouchableOpacity> */}
        </View>
        {/* </ImageBackground> */}
       
        <Image style={{height:height+350,width:width+300,position:'absolute',bottom:0,left:0}} source={require('./bground.jpeg')}/>
        <View style={{height:height,width:width,position:'absolute',left:0,top:0}}>

          <View style={{flex: 1, alignItems: 'center'}}>  
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.setState({settingsVisible: true})}>
              <Image style={styles.logoImage} source={Logo} />
            </TouchableOpacity>
          </View>

          <View
          style={{
            flex: 1,
            alignItems:'center',
            justifyContent:'space-around'
          }}>
        
         
            <TouchableOpacity
              onPress={()=>{
                this.props.changeLanguage('English');
                this.props.navigation.navigate('AuthScreen');
              }}>
              <Text style={{fontSize: 18,fontWeight:'bold'}}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:20}} onPress={()=>{
                this.props.changeLanguage('Arabic');
                this.props.navigation.navigate('AuthScreen');
            }}>
              <Text style={{fontSize: 18,fontWeight:'bold'}}>العربية</Text>
            </TouchableOpacity>
          
         
        </View>
        <View style={{flex:3}}/>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reconciliationWrapper: {
    flex: 1,
    margin: 5,
  },
  logoImage: {
    width: 100,
    height:100,
    resizeMode: 'contain',
    marginTop:30
  },
  verifiedImage: {
    width: hp('10'),
    height: hp('10'),
    resizeMode: 'contain',
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function mapStateToProps(state) {
  return {
    Language: state.language.defaultLanguage,
    environment: state.environmentReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLanguage: value => dispatch(storeLanguage(value)),
    changeEnvironment: value => dispatch(environmentInfoChanged(value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageScreen);
