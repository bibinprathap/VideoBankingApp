import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,ScrollView} from 'react-native';
import strings, {normalizeFont} from '../../api/helperServices/language';
import AnimatedInput from "react-native-animated-input";
import {connect} from 'react-redux';
import {CustomeInput} from './Components'
import Logo from '../../../assets/MainLogo.png';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class LoginScreen extends Component {
  constructor(props){  
    super(props);  
    this.state = {  
         userName: '',
         password:''
      }   
  }  
 



  render() {
    const {language} = this.props;
    return (
      <View style={style.container}>
        <ScrollView>
          <View style={{height:150,justifyContent:'center',alignItems:'center'}}>
            <Image style={style.logoImage} source={Logo} />
          </View>
          <View style={{marginHorizontal:30,height:'auto',marginTop:10}}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>
              {strings({key: 'signin', language})}
            </Text>
            <CustomeInput
              onTexting={text=>this.setState({userName:text})}
              Value={this.state.userName}
              PlaceHolder={strings({key: 'userName', language})}

            />

            <CustomeInput
              onTexting={text=>this.setState({password:text})}
              Value={this.state.password}
              PlaceHolder={strings({key: 'password', language})}
              secureTextEntry

            />

            <TouchableOpacity style={style.loginButton}>
              <Text style={{color:'white',fontWeight:'bold'}}>
                {strings({key: 'login', language})}
              </Text>
            </TouchableOpacity>

            <View style={{height:80,justifyContent:'center',alignItems:'center'}}>
              <Text>
                {strings({key: 'loginWithFaceId', language})}
              </Text>
              <TouchableOpacity style={{marginTop:10}}>
                <AntDesign name='scan1' size={30}/>
              </TouchableOpacity>
            </View>
           <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text>
              {strings({key: 'dontAccountWith', language})}
              </Text>
           </View>
           
           <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this.props.navigation.navigate('Create')}
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#4C7A39',
                    borderRadius: 10,
                    marginVertical:10,
                    paddingHorizontal:40
                    
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Roboto-Bold',
                      fontSize: normalizeFont(18),
                      textAlign:'center'
                    }}>
                    {strings({key: 'openNewBankAccount', language})}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this.props.navigation.navigate('BookAppoint')}
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#4C7A39',
                    borderRadius: 10,
                    marginTop:10
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Roboto-Bold',
                      fontSize: normalizeFont(18),
                    }}>
                    {strings({key: 'BookYourAppointment', language})}
                  </Text>
                </TouchableOpacity>
                

                <View style={{height:30,marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity>
                      <Text style={{fontWeight:'bold',color:'#abc',fontSize:12}}>
                      {strings({key: 'forgotpassword', language})}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{fontWeight:'bold',color:'#D6B045',fontSize:12}}>
                        {strings({key: 'signUp', language})}
                      </Text>
                    </TouchableOpacity>
                </View>

          </View>
          <View style={{height:50}}/>
          
          
        </ScrollView>
        {/* <View style={style.top}>
          <Image style={style.logoImage} source={Logo} />
        </View>
        <View style={style.bottom}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.navigate('Create')}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              backgroundColor: 'green',
              borderRadius: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
              }}>
              {strings({key: 'openNewBankAccount', language})}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.navigate('BookAppoint')}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              backgroundColor: 'green',
              borderRadius: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
              }}>
              {strings({key: 'BookYourAppointment', language})}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoImage: {
    width: hp('20'),
    height: hp('20'),
    resizeMode: 'contain',
  },
  loginButton:{
    height:40,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#D6B045',
    marginTop:10
  }
});

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(LoginScreen);
