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
  Platform,
  Animated,
} from 'react-native';
import DefaultText from '../DefaultText';
import InputText from '../LoginText';
import AppApi from '../../../api/real';
const {width, height} = Dimensions.get('screen');
import {connect} from 'react-redux';
import {infoChanged} from '../../../redux/actions/bankProfileActions';
import language from '../../../api/helperServices/language';
import RNPickerSelect from 'react-native-picker-select';
import Panel from '../../Component/Panel/Panel';
const api = new AppApi();
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import strings from '../../../api/helperServices/language';
const normalizedFont = size => {
  return size * (width * 0.0025);
};

let Today;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);


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
    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
      favSport5: null,
    };
    this.placeholder = {
      label: props.language === 'English' ? 'Select a value' : 'تحديد قيمة',
      value: null,
    };
    this.state = {
      selectedValue: 'java',
      accountTypeLabel: '',
      currency: '',
      status: props.language === 'English' ? 'Select' : 'تحديد',
      accountOpeningdate: Today,
      branchName:'',
      profesionOrBAN:'',
      purpose:'',
      accounTypes :
      {
        Model: [
          {
            "Text": "Current",
            "TextAr": "الجاري",
            "Value": 1
        },
        ]
      },
      currencies: [],
      legalstatus: []
    };
    this.updateLoginScreenState = this.updateLoginScreenState.bind(this);
    this.onPress = Platform.OS == 'ios' && this.showActionSheet.bind(this);
  }


  updateLoginScreenState = (newState, env) => {
    this.setState(newState, () => {
        const stateToStore = {clicked,currency,status};
        this.props.infoChanged('CustomerInformation', stateToStore);
    });
  };
  
  accountType = async() => { 
    try {
  const data = await api.getAccounTypes();
  const defaultValue = data.Model.find(
    p => p.Text === 'Current'
  );
        this.setState({
          accountTypeLabel: this.props.language === 'English' ? defaultValue.Text : defaultValue.TextAr,
          accounTypes: data.Model
        });
        
    } catch (error) {
      console.log(error); 
    }
  };
  getCurrencies = async() => { 
    try {
  const data = await api.currencies();
  const defaultValue = data.Model.find(
    p => p.Text === 'Iraqi Dinar'
  );
  this.setState({
    currencies: data.Model,
    currency: this.props.language === 'English' ? defaultValue.Text : defaultValue.TextAr
   });
    } catch (error) {
      console.log(error); 
    }
  };
  legalstatus = async() => { 
    try {
  const data = await api.getLegalstatus();
  this.setState({legalstatus: data.Model});
    } catch (error) {
      console.log(error); 
    }
  };
  componentDidMount() {
    console.log(this.props.values.accounttype, 'value');
    this.accountType();  
    this.getCurrencies();
    this.legalstatus(); 
  }



  render() {
    const {language} = this.props;
    // console.warn('jjjjj',this.props.accountReducer)

    return (
      <ScrollView showsVerticalScrollIndicator={false}  nestedScrollEnabled={true} style={{flex: 1}}>
        <View style={{padding: 5}}>
          <InputText
            language={language}
            header={language === 'English' ? 'Branch Name' : 'اسم الفرع'}
            TextInput
            onChange={this.props.onChangeBranchName}
            placeholder={language === 'English' ? 'Branch Name' : 'اسم الفرع'}
            normalStyle={{textAlign: language == 'English' ? 'left' : 'right'}}
            Value={this.props.BranchValue}
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
              {strings({key: 'AccountType', language})}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.accountTypeLabel}
              onPress={() => alert("It's awesome, right?")}
              maxItem={240} 
              action={() => null}
              itemValue={
                 this.state.accounTypes
              }
              selectValue={item => {
                this.setState({accountTypeLabel: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeAccountType(item);
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
              {strings({key: 'AccountCurrency', language})}
            </Text>

            <Panel
              ref={ref => {
                this.myModal = ref;
              }}
              header={this.state.currency}
              action={() => null}
              onPress={() => alert("It's awesome, right?")}
              maxItem={200}
              itemValue={
               this.state.currencies
              }
              selectValue={item => {
                this.setState({currency: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeCurrency(item);
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
                textAlign: language == 'English' ? 'left' : 'right',
              }}>
              {strings({key: 'LegalStatus', language})}
            </Text>
              <Panel
                header={this.state.status}
                onPress={() => alert("It's awesome, right?")}
                action={() => null}
                maxItem={300}
                itemValue={
                  this.state.legalstatus
                }
                selectValue={item => {
                this.setState({status: this.props.language === 'English' ? item.Text : item.TextAr});
                this.props.onChangeLegal(item);
                }}>
              </Panel>
          </View>

          <InputText
            language={language}
            header={
              language === 'English'
                ? 'Profession / Business Activity Name'
                : 'اسم المهنة / النشاط التجاري'
            }
            TextInput
            onChange={this.props.onChangeProfession}
            placeholder={
              language === 'English'
                ? 'Profession / Business Activity Name'
                : 'اسم المهنة / النشاط التجاري'
            }
            Value={this.props.ProffessionValue}
            normalStyle={{textAlign: language == 'English' ? 'left' : 'right'}}
          />
          <InputText
            language={language}
            header={
              language === 'English'
                ? 'The purpose of opening an account'
                : 'الغرض من فتح حساب'
            }
            TextInput
            onChange={this.props.onChangePurpose}
            placeholder={
              language === 'English'
                ? 'The purpose of opening an account'
                : 'الغرض من فتح حساب'
            }
            Value={this.props.PurposeValue}
            normalStyle={{textAlign: language == 'English' ? 'left' : 'right'}}
          />
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
          } else if (item === 'currency') {
            this.setState({currency: options[buttonIndex]});
          } else if (item === 'status') {
            this.setState({status: options[buttonIndex]});
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
});

const mapStateToProps = state => {
  // Redux Store --> Component
 // console.log(state, 'state');
  return {
    values: state.bankProfileReducer.basicprofile,
    language: state.language.defaultLanguage,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    infoChanged: (property, value) => dispatch(infoChanged(property, value)),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(AccountDetails);
