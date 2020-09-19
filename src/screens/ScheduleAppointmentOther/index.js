import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList
} from 'react-native';
import Header from '../../components/Component/Header';
import {connect} from 'react-redux';
import LoginInput from '../../components/Component/LoginText';
import Panel from '../../components/Component/Panel/Panel';

import config from '../SheduleYourAppointment/config'
import {ButtonComp,CustomeRadioButton} from '../SheduleYourAppointment/ModuleComp'
const greenColor = '#00822C'
import {CustomePicker} from '../SheduleYourAppointment/DropDownMenuComp'
import days from '../SheduleYourAppointment/config'




import strings, {
  normalizeFont,
  alignment,
} from '../../api/helperServices/language';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-ionicons';
import {Picker, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
      bookableDays:[],
      bookableTimes:config.timeset,
      selectedDay:'',
      selectedCity:'',
      selectedBranch:'',
      selectedHour:'00',
      selectedTime:'',
      selectedNotificationType:'By SMS'
    };
  }

  componentDidMount = () =>{
    this.getCurrentDay()
  }
  getCurrentDay = () =>{
    var d = new Date();
    var n = d.getDay()
    // console.warn(n)
    // setdays(daySet.combi2)
    if(n==0){
        this.setState({bookableDays:days.daySet2})
    }
    else if(n==1){
      this.setState({bookableDays:days.daySet3})
    }else if(n==2){
      this.setState({bookableDays:days.daySet4})
    }else if(n==3){
      this.setState({bookableDays:days.daySet5})
    }else if(n==4){
      this.setState({bookableDays:days.daySet6})
    }
    else if(n==5){
      this.setState({bookableDays:days.daySet7})
    }
    else{
      this.setState({bookableDays:days.daySet1})
    }
    
 }

 validationFunction = ()=>{
  if(this.state.selectedCity==''){
    return false
  }
  else if(this.state.selectedBranch==''){
    return false
  }
  else if(this.state.selectedDay==''){
    return false
  }
  else if(this.state.selectedTime==''){
    return false
  }
  else{
    return true
  }
}

submit = (language)=>{
  if(this.state.selectedCity==''){
    alert(strings({key: 'SelectYourCity', language}))
  }
  else if(this.state.selectedBranch==''){
    alert(strings({key: 'SelectYourBranch', language}))
  }
  else if(this.state.selectedDay==''){
    alert(strings({key: 'selectADay', language}))
  }
  else if(this.state.selectedTime==''){
    alert(strings({key: 'SelectATime', language}))
  }
  else{
    this.props.navigation.navigate('BookingConcratz')
  }
}

  render() {
    const {language} = this.props;
    const {bookableDays,
      selectedDay,
      bookableTimes,
      selectedTime,
      selectedNotificationType,
      selectedCity,
      selectedBranch,
      selectedHour
    } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={strings({key: 'ScheduleYourAppointment', language})}
          navigation={this.props.navigation}
        />
        <View style={{height:config.DevHeight-100}}>
          <ScrollView>
              <View style={{marginHorizontal:20}}>
                <Text style={styles.headFont}>{strings({key: 'SelectCity', language})}</Text>
                <CustomePicker onSelect={(item)=>this.setState({selectedCity:item})}/>
                <Text style={styles.headFont}>{strings({key: 'SelectBranch', language})}</Text>
                <CustomePicker onSelect={(item)=>this.setState({selectedBranch:item})}/>
                <Text style={styles.headFont}>{strings({key: 'pickDateAndTime', language})}</Text>
                <View style={{height:50,marginTop:10}}>
                  <FlatList horizontal
                    data={bookableDays}
                    renderItem={(({item})=><ButtonComp Val={item}
                                              onSelect={()=>this.setState({selectedDay:item})}
                                              Active={selectedDay}/>)}/>
                </View>
                <View style={{height:'auto',marginTop:15}}>
                  <FlatList 
                    data={config.hourSet}
                    numColumns={5}
                    renderItem={({item})=>(
                      <ButtonComp
                        Val={`${item}:00`}
                        onSelect={() => this.setState({selectedHour: item,selectedTime:''})}
                        Active={`${selectedHour}:00`}
                      />)}/>
                </View>
                <View style={{height: 'auto', marginTop: 15}}>
                  <FlatList 
                    data={config.minutSet}
                    numColumns={5}
                    renderItem={({item})=>(
                      <ButtonComp
                        Val={`${selectedHour}:${item}`}
                        onSelect={() => this.setState({selectedTime: `${selectedHour}:${item}`})}
                        Active={`${selectedTime}`}
                      />)}/>
                </View>
                <View style={{height:40,flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,borderColor:greenColor,marginTop:10,paddingLeft:20}}>
                            <CustomeRadioButton Val='By SMS'
                                                Name={strings({key: 'BySms', language})}
                                                onSelect={()=>this.setState({selectedNotificationType:'By SMS'})}
                                                ActiveType={selectedNotificationType}/>
                            <CustomeRadioButton Val='Send to Email'
                                                Name={strings({key: 'sendToMail', language})}
                                                onSelect={()=>this.setState({selectedNotificationType:'Send to Email'})}
                                                ActiveType={selectedNotificationType}/>     
                </View>
                <TouchableOpacity style={this.validationFunction()==true ? styles.submitButton : styles.submitButtonInActive}
                                  disabled={!this.validationFunction()}
                                  onPress={() => this.submit(language)}>
                        <Text
                            style={{
                              color: '#fff',
                              fontFamily: 'Roboto-Bold',
                              fontSize: normalizeFont(18),
                            }}>
                            {strings({key: 'Submityourbooking', language})}
                        </Text>
                </TouchableOpacity>
                <View style={{height:30}}/>


      
              </View>

          </ScrollView>
        </View>
        
        
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

const styles = StyleSheet.create({
  headFont:{
      // fontFamily:font.semi_bold,
      color:greenColor,
      fontSize:12,
      marginTop:10
  },
  dropDown:{
      height:40,
      borderBottomWidth:0.5,
      borderColor:greenColor
  },
  submitButton:{
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green',
      borderRadius: 5,
      marginTop:10
      
  },
  submitButtonInActive:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
  }
  
});

export default connect(mapStateToProps)(BookYourAccount);