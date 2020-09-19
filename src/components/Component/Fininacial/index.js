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
} from 'react-native';
import DefaultText from '../DefaultText';
import InputText from '../LoginText';
import AppApi from '../../../api/real';
const {width, height} = Dimensions.get('screen');
import ActionSheet from '../ActionSheetIOS';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Panel from '../../Component/Panel/Panel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import strings from '../../../api/helperServices/language';
const normalizedFont = size => {
  return size * (width * 0.0025);
};
const api = new AppApi();
var BUTTONS = [
  'Salary',
  'Commercial returns',
  'Personal savings',
  'Investments',
  'Other',
  'Cancel',
];
var ARABIC_BUTTONS = [
  'راتب',
  'عوائد تجارية',
  'مدخرات شخصية',
  'استثمارات',
  'آخر',
  'إلغاء',
];
// var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 5;

var CURRENCY = [
  'Less than one million Iraqi dinars',
  '1 million to 5 million',
  '5 million to 10 million',
  '10 million to 25 million',
  'More than 25 million',
  'Cancel',
];

var ARABIC_CURRENCY = [
  'اقل من مليون دينار عراقي',
  'من مليون إلى 5 ملايين',
  '5 مليون إلى 10 مليون',
  'من 10 مليون إلى 25 مليون',
  'أكثر من 25 مليون',
  'إلغاء',
];

var CANCEL_INDEX_CURRENCY = 5;

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
    this.state = {
      fundStatus: props.language === 'English' ? 'Select' : 'تحديد',
      monthlyStatus: props.language === 'English' ? 'Select' : 'تحديد',
          fundStatuses: [],
          monthlyStatuses: []
        };
    this.placeholder = {
      label: props.language === 'English' ? 'Select a value' : 'تحديد قيمة',
      value: null,
    };

    this.onPress = Platform.OS === 'ios' && this.showActionSheet.bind(this);
  }
  fundSources = async() => { 
    try {
  const data = await api.getFundSources();
  this.setState({fundStatuses: data.Model});
    } catch (error) {
      console.log(error); 
    }
  };
  totalMonthly = async() => { 
    try {
  const data = await api.gettotalMonthly();
  this.setState({monthlyStatuses: data.Model});
    } catch (error) {
      console.log(error); 
    }
  };

  componentDidMount(){
    this.fundSources(); 
    this.totalMonthly();
    
    
  }
  render() {
    const {language} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={{padding: 5}}>
          <InputText
            language={language}
            header={language === 'English' ? 'Branch Name' : 'اسم الفرع'}
            TextInput
            placeholder={language === 'English' ? 'Branch Name' : 'اسم الفرع'}
            Value={this.props.BankName}
            onChange={this.props.onChangeBankName}
            normalStyle={{
              textAlign: language == 'English' ? 'left' : 'right',
            }}
          />
          <InputText
            language={language}
            header={
              language === 'English'
                ? 'Date of first dealing'
                : 'تاريخ أول معاملة'
            }
            TextInput
            placeholder={
              language === 'English'
                ? 'Date of first dealing'
                : 'تاريخ أول معاملة'
            }
            Value={this.props.DateofFirstDealing}

            onChange={this.props.onChangeDateOfDealing}
            normalStyle={{
              textAlign: language == 'English' ? 'left' : 'right',
            }}
          />

          <InputText
            language={language}
            header={
              language === 'English'
                ? 'Amount of cash facilities obtained, if any'
                : 'مقدار التسهيلات النقدية التي تم الحصول عليها ، إن وجدت'
            }
            TextInput
            placeholder={
              language === 'English'
                ? 'Amount of cash facilities obtained, if any'
                : 'مقدار التسهيلات النقدية التي تم الحصول عليها ، إن وجدت'
            }
            Value={this.props.ObtainedAmount}

            onChange={this.props.onChangeObtainedAmount}
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
                  {strings({ key: 'Sourceoffunds', language })}
                </Text>

                <Panel
                  ref={ref => {
                    this.myModal = ref;
                  }}
                  header={this.state.fundStatus}
                  onPress={() => alert("It's awesome, right?")}
                  maxItem={200}
                  action={() => null}
                  itemValue={
                    this.state.fundStatuses
                  }
                  selectValue={item => {
                    this.setState({ fundStatus: this.props.language === 'English' ? item.Text : item.TextAr });
                    this.props.onChangeFundSource(item);
                  }}
                >
                </Panel>
              </View>
          <InputText
            language={language}
            header={
              language === 'English'
                ? 'Additional income, if any '
                : 'دخل إضافي ، إن وجد'
            }
            TextInput
            placeholder={
              language === 'English'
                ? 'Additional income, if any '
                : 'دخل إضافي ، إن وجد'
            }
            Value={this.props.AdditionalIncome}

            onChange={this.props.onChangeAddIncome}
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
                  {strings({ key: 'Totalmonthlyincome', language })}
                </Text>

                <Panel
                  ref={ref => {
                    this.myModal = ref;
                  }}
                  header={this.state.monthlyStatus}
                  onPress={() => alert("It's awesome, right?")}
                  maxItem={200}
                  action={() => null}
                  itemValue={
                    this.state.monthlyStatuses
                  }
                  selectValue={item => {
                    this.setState({ monthlyStatus: this.props.language === 'English' ? item.Text : item.TextAr });
                    this.props.onChangeMonthlyIncome(item);
                  }}
                >
                </Panel>
              </View>

          <InputText
            language={language}
            header={
              language === 'English'
                ? 'Monthly estimate of the commercial transactions with the bank'
                : 'تقدير شهري للمعاملات التجارية مع البنك'
            }
            TextInput
            placeholder={
              language === 'English'
                ? 'Monthly estimate of the commercial transactions with the bank'
                : 'تقدير شهري للمعاملات التجارية مع البنك'
            }
            Value={this.props.MonthlyCommercialTransactionEstimate}

            onChange={this.props.onChangeMonthlyCommercial}
            normalStyle={{
              textAlign: language == 'English' ? 'left' : 'right',
            }}
          />

          <InputText
            language={language}
            header={
              language === 'English'
                ? 'Annual estimate of the commercial transactions with the bank'
                : 'التقدير السنوي للمعاملات التجارية مع البنك'
            }
            TextInput
            placeholder={
              language === 'English'
                ? 'Annual estimate of the commercial transactions with the bank'
                : 'التقدير السنوي للمعاملات التجارية مع البنك'
            }
            Value={this.props.AnnualCommercialTransactionEstimate}

            onChange={this.props.onChangeAnnualCommercial}
            normalStyle={{
              textAlign: language == 'English' ? 'left' : 'right',
            }}
          />
          <InputText
            language={language}
            header={
              language === 'English'
                ? 'Nature of businesses expected to be dealt with the bank'
                : 'طبيعة الأعمال المتوقع التعامل معها مع البنك'
            }
            TextInput
            placeholder={
              language === 'English'
                ? 'Nature of businesses expected to be dealt with the bank'
                : 'طبيعة الأعمال المتوقع التعامل معها مع البنك'
            }
            Value={this.props.NatureofBuissinessWithBank}

            onChange={this.props.onChangeNatureBuss}
            normalStyle={{
              textAlign: language == 'English' ? 'left' : 'right',
            }}
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
          if (item === 'sourceFund') {
            this.setState({sourceFund: options[buttonIndex]});
          } else if (item === 'monthlyIncome') {
            this.setState({monthlyIncome: options[buttonIndex]});
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

  return {
    values: state.bankProfileReducer.basicprofile,
    language: state.language.defaultLanguage,
  };
};

export default connect(mapStateToProps)(AccountDetails);
