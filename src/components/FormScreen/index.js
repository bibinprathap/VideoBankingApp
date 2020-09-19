import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Header from '../Component/Header';
import LoginInput from '../Component/LoginText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppApi from '../../api/real';
const {width, height} = Dimensions.get('screen');
import Left from '../../../assets/Left.png';
import Right from '../../../assets/Right.png';
import StepIndicator from 'react-native-step-indicator';
import {AuthService} from '../../services';
import {users} from '../../config';
import {connect} from 'react-redux';
import AccountDetails from '../Component/AccountDetails';
import CustomerDetails from '../Component/CustomerInformation';
import AddressContact from '../Component/AddressContact';
import Financial from '../Component/Fininacial';
import strings from '../../api/helperServices/language';
import { accountInfoChange } from '../../redux/actions/accountDetailsActions';
const api = new AppApi();

const normalizeFont = size => {
  return size * (width * 0.0025);
};

const labels = [
  'Account Details',
  'Customer Information',
  'Address and contact',
  'Financial matters',
];

const ARABIC_LABEL = [
  'تفاصيل الحساب',
  'معلومات العميل',
  'العنوان والاتصال',
  'امور مالية',
];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'green',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'green',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: 'green',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'green',
  stepIndicatorUnFinishedColor: '#ccc',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'green',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#000',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: 'green',
};

let user = {
  id: 1634480,
  name: 'Customer',
  login: 'bibinprathap@gmail.com',
  password: 'hjkl7890',
  color: '#34ad86',
};

class FillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signatureAttachment: null,
      signatureDialogVisible: false,
      base64: '',
      currentPosition: 0,
      isLogging: false,
      callConnect: false,
      address: '',
      nearestPoint: '',
      resideAnotherCountry: '',
      accommodation: '',

      Id: 0,
      UserId: 0,
      CompanyOrIndividual: "",
      BranchName: '',
      AccountTypeId: 0,
      CurrencyId: 0,
      LegalStatusId: 0,
      LegaStatus_Other: "",
      ProfessionBusinessActivity: "",
      AccountOpeningReason: "",

      //DATA FROM ACCOUNT DETAILS COMPONENT


      FullName: "",
      FullNameAr: "",
      MotherName: "",
      DateOfBirth: "",
      PlaceOfBirth: "",
      NationalityId: 0,
      HasAnotherNationality: false,
      NationalIdNumber: "",
      IdDateOfIssue: "",
      IdPlaceOfIssue: "",
      CivilIdNumber: "",
      CivilIdDateOfIssue: "",
      CivilIdPlaceOfIssue: "",
      PassportNumber: "",
      PassportIsueDate: "",
      PassportIssuePlace: "",
      MaritalStatusId: 0,
      EducationLevelId: 0,
      JobDetailId: 0,
      JobDetail_Other: "",
      TheLastAuditedFinancialStatement: "",

      //DATA FROM CUSTOMER INFO COMPONENT
      CommercialName: "",
      CommercialNameAr: "",
      AuthorizedPersonName: "",
      AuthorizedPersonAddress: "",
      ManagingDirectorName: "",
      ChairmanofBoard: "",
      BoardMembers: "",
      StackHolders: "",
      CommercialRegister: "",
      CompanyNationality: 0,
      TotalBranches: 0,
      CorrespondenceAddress: "",
      AuthorozedToWithdrawDeposits: "",
      CompanyActivityId: 0,
      EstablishmentDate: "",
      NominalCapital: 0,
      PaidCapital: 0,
      IncorporationPlace: "",
      TelephoneNumber: "",
      FaxNumber: "",
      Email: "",
      LatestAuditedFinancialStatementofCompany: 0,
      ExternalAuditorName: "",

      //DATA FROM ADDRESS COMPONENT
      ResidentAddress: "",
      NearestPoint: "",
      ResideInOtherCountry: true,
      AccommodationTypeId: 0,
      HomePhone: "",
      Mobile: "",
      AddressEmail: "",
      OrganizationOwnerName: "",
      OrganizationActivity: "",
      JobTitle: "",
      OrganizationAddress: "",
      OganizatonNationalityId: 0,
      OrganizationPhone: "",
      OrganizationFax: "",

      //DATA FROM FINACIAL COMPONENENT
      BankName: "",
      DateofFirstDealing: "",
      ObtainedAmount: 0,
      FundSourceId: 0,
      AdditionalIncome: "",
      MonthlyIncomeId: 0,
      MonthlyCommercialTransactionEstimate: 0,
      AnnualCommercialTransactionEstimate: 0,
      NatureofBuissinessWithBank: "",

      WhyAccountNotManagedByBeneficiary: "",
      TheLastAuditedStatement: '',
      BeneficiaryMobile: '',
      BeneficiaryEmail: '',
      postion_0: false,
      position_1: false,
      position_2: false,
      position_3: false,
    };
  }

  setIsLogging = isLogging => this.setState({isLogging});

  maritalStatus = async () => {
    try {
      const data = await api.getmaritalStatus();
      this.setState({maritalStatus: data});
    } catch (error) {
      console.log(error);
    }
  };
  education = async () => {
    try {
      const data = await api.getEducationalLevel();
      this.setState({education: data});
    } catch (error) {
      console.log(error);
    }
  };

  jobDetails = async () => {
    try {
      const data = await api.getJobDetails();
      this.setState({jobDetails: data});
    } catch (error) {
      console.log(error);
    }
  };

  CustomerInformation = CustomerInformationDetails => {
    console.log('CustomerInformation... lod', CustomerInformationDetails);
  };

  componentDidMount() {
    this.maritalStatus();
    this.education();
    this.jobDetails();
    console.warn('HAHAHAHA',this.props.values.accounttype)

  }

  updateAccountState = newState => {
    const { dispatch } = this.props;
    this.setState(newState, () => {
      const { Id, UserId, CompanyOrIndividual, BranchName, AccountTypeId, CurrencyId, LegalStatusId, LegaStatus_Other, ProfessionBusinessActivity, AccountOpeningReason } = this.state;
      const stateToStore = { Id, UserId, CompanyOrIndividual, BranchName, AccountTypeId, CurrencyId, LegalStatusId, LegaStatus_Other, ProfessionBusinessActivity, AccountOpeningReason };
      dispatch(accountInfoChange('AccountDetails', stateToStore));
    });
  };

  handleAccountFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateAccountState(newState);
  };

  updateCustomerState = newState => {
    const { dispatch } = this.props;
    this.setState(newState, () => {
      const {  FullName, FullNameAr, MotherName, DateOfBirth, PlaceOfBirth, NationalityId, HasAnotherNationality, NationalIdNumber, IdDateOfIssue, IdPlaceOfIssue, CivilIdNumber, CivilIdDateOfIssue, CivilIdPlaceOfIssue, PassportNumber, PassportIsueDate, PassportIssuePlace, MaritalStatusId, EducationLevelId, JobDetailId, JobDetail_Other, TheLastAuditedFinancialStatement  } = this.state;
      const stateToStore = { FullName, FullNameAr, MotherName, DateOfBirth, PlaceOfBirth, NationalityId, HasAnotherNationality, NationalIdNumber, IdDateOfIssue, IdPlaceOfIssue, CivilIdNumber, CivilIdDateOfIssue, CivilIdPlaceOfIssue, PassportNumber, PassportIsueDate, PassportIssuePlace, MaritalStatusId, EducationLevelId, JobDetailId, JobDetail_Other, TheLastAuditedFinancialStatement};
      dispatch(accountInfoChange('CustomerInformation', stateToStore));
    });
  };

  handleCustomerFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateCustomerState(newState);
  };

  updateCompanyState = newState => {
    const { dispatch } = this.props;
    this.setState(newState, () => {
      const { CommercialName, CommercialNameAr, AuthorizedPersonName, AuthorizedPersonAddress, ManagingDirectorName, ChairmanofBoard, BoardMembers, StackHolders, CommercialRegister, CompanyNationality, TotalBranches, CorrespondenceAddress, AuthorozedToWithdrawDeposits, CompanyActivityId, EstablishmentDate, NominalCapital, PaidCapital, IncorporationPlace, TelephoneNumber, FaxNumber, Email, LatestAuditedFinancialStatementofCompany, ExternalAuditorName } = this.state;
      const stateToStore = { CommercialName, CommercialNameAr, AuthorizedPersonName, AuthorizedPersonAddress, ManagingDirectorName, ChairmanofBoard, BoardMembers, StackHolders, CommercialRegister, CompanyNationality, TotalBranches, CorrespondenceAddress, AuthorozedToWithdrawDeposits, CompanyActivityId, EstablishmentDate, NominalCapital, PaidCapital, IncorporationPlace, TelephoneNumber, FaxNumber, Email, LatestAuditedFinancialStatementofCompany, ExternalAuditorName };
      dispatch(accountInfoChange('CompanyInformation', stateToStore));
    });
  };

  handleCompanyFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateCompanyState(newState);
  };

  updateAddressState = newState => {
    const { dispatch } = this.props;
    this.setState(newState, () => {
      const { ResidentAddress, NearestPoint, ResideInOtherCountry, AccommodationTypeId, HomePhone, Mobile, AddressEmail, OrganizationOwnerName, OrganizationActivity, JobTitle, OrganizationAddress, OganizatonNationalityId, OrganizationPhone, OrganizationFax } = this.state;
      const stateToStore = { ResidentAddress, NearestPoint, ResideInOtherCountry, AccommodationTypeId, HomePhone, Mobile, AddressEmail, OrganizationOwnerName, OrganizationActivity, JobTitle, OrganizationAddress, OganizatonNationalityId, OrganizationPhone, OrganizationFax };
      dispatch(accountInfoChange('CustomerAddressAndContactInformation', stateToStore));
    });
  };

  handleAddressFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateAddressState(newState);
  };

  updateBeneficiaryState = newState => {
    const { dispatch } = this.props;
    this.setState(newState, () => {
      const {  FullName, FullNameAr, WhyAccountNotManagedByBeneficiary, MotherName, DateOfBirth,  PlaceOfBirth, NationalityId, HasAnotherNationality, NationalIdNumber, IdDateOfIssue, IdPlaceOfIssue, CivilIdNumber, CivilIdDateOfIssue, CivilIdPlaceOfIssue, PassportNumber, PassportIsueDate, PassportIssuePlace, MaritalStatusId, EducationLevelId, JobDetailId, JobDetail_Other, TheLastAuditedStatement, ResidentAddress, BeneficiaryMobile, BeneficiaryEmail  } = this.state;
      const stateToStore = { FullName, FullNameAr, WhyAccountNotManagedByBeneficiary, MotherName, DateOfBirth, PlaceOfBirth, NationalityId, HasAnotherNationality, NationalIdNumber, IdDateOfIssue, IdPlaceOfIssue, CivilIdNumber, CivilIdDateOfIssue, CivilIdPlaceOfIssue, PassportNumber, PassportIsueDate, PassportIssuePlace, MaritalStatusId, EducationLevelId, JobDetailId, JobDetail_Other, TheLastAuditedStatement, ResidentAddress, BeneficiaryMobile, BeneficiaryEmail};
      dispatch(accountInfoChange('BeneficiaryInformation', stateToStore));
    });
  };

  handleBeneficiaryFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateBeneficiaryState(newState);
  };

  updateFinancialState = newState => {
    const { dispatch } = this.props;
    this.setState(newState, () => {
      const {  BankName, DateofFirstDealing, ObtainedAmount, FundSourceId, AdditionalIncome,  MonthlyIncomeId, MonthlyCommercialTransactionEstimate, AnnualCommercialTransactionEstimate, NatureofBuissinessWithBank } = this.state;
      const stateToStore = {  BankName, DateofFirstDealing, ObtainedAmount, FundSourceId, AdditionalIncome,  MonthlyIncomeId, MonthlyCommercialTransactionEstimate, AnnualCommercialTransactionEstimate, NatureofBuissinessWithBank };
      dispatch(accountInfoChange('FinancialMatter', stateToStore));
    });
  };

  handleFinancialFieldChange = async (name, value) => {
    const newState = {};
    newState[name] = value;
    this.updateFinancialState(newState);
  };

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

  onPageChange(position) {
    this.setState({currentPosition: position});
  }

  buttonFunction = () => {
    if (this.props.form.FinancialMatter.BankName == '') {
      return false
    } else if (this.props.form.FinancialMatter.DateofFirstDealing == '') {
      return false
    } else if (this.props.form.FinancialMatter.ObtainedAmount == '') {
      return false
    }else if (this.props.form.FinancialMatter.AdditionalIncome == '') {
      return false
    }else if (this.props.form.FinancialMatter.MonthlyCommercialTransactionEstimate == '') {
      return false
    } else if (this.props.form.FinancialMatter.AnnualCommercialTransactionEstimate == '') {
      return false
    } else if (this.props.form.FinancialMatter.NatureofBuissinessWithBank == '') {
      return false
    } else {
      return true
    }
  };


  // validationFunction = language => {
  //   if (this.state.branchName == '') {
  //     alert(strings({key: 'EnterYourBranch', language}));
  //   } else if (this.state.profesionOrBAN == '') {
  //     alert(strings({key: 'EnterYourProffession', language}));
  //   } else if (this.state.purpose == '') {
  //     alert(strings({key: 'EnterYourPurpose', language}));
  //   } else {
  //     this.onContinewPress();
  //   }
  // };

  //VALIDATING POSITION 0
  validatePosition_0 = (language) => {
    if (this.props.accountReducer.AccountDetails.BranchName == '') {
      this.setState({postion_0: false});
      alert(strings({key: 'EnterYourBranch', language}));
    } else if (this.props.accountReducer.AccountDetails.ProfessionBusinessActivity == '') {
      this.setState({postion_0: false});
      alert(strings({key: 'EnterYourProffession', language}));
    } else if (this.props.accountReducer.AccountDetails.AccountOpeningReason== '') {
      this.setState({postion_0: false});
      alert(strings({key: 'EnterYourPurpose', language}));
    } else {
      this.setState({postion_0: true});
      this.forWardToNextPage()
    }
  };

  //VALIDATING POSITION 1
  validatePosition_1_acctype_0 = (language) => {
    if (this.props.accountReducer.CustomerInformation.FullNameAr == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterQuadSurNameInArabic', language}));
    }
     else if (this.props.accountReducer.CustomerInformation.FullName == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterQuadSurNameInEnglish', language}));
    } else if (this.props.accountReducer.CustomerInformation.MotherName == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterYourMothersTripleName', language}));
    }
      else if (this.props.accountReducer.CustomerInformation.DateOfBirth == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterYourDob', language}));
    } else if (this.props.accountReducer.CustomerInformation.PlaceOfBirth == '') {
      this.setState({postion_1: false});
      console.warn(this.props.accountReducer.CustomerInformation)
      alert(strings({key: 'EnterPlaceOfBirth', language}));
    } 
    // else if (this.props.accountReducer.CustomerInformation.NationalityId == '') {
    //   this.setState({postion_1: false});
    //   alert(strings({key: 'EnterNationality', language}));
    // }
    else if (this.props.accountReducer.CustomerInformation.NationalIdNumber == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterNationalIdNumber', language}));
    } else if (this.props.accountReducer.CustomerInformation.IdPlaceOfIssue  == '' || this.props.accountReducer.CustomerInformation.IdDateOfIssue=='') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterPlaceAndDateOfIssueofNationIdCard', language}));
    } else if (this.props.accountReducer.CustomerInformation.CivilIdNumber == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterCivilIdCardNumber', language}));
    } else if (this.props.accountReducer.CustomerInformation.CivilIdPlaceOfIssue == '' || this.props.accountReducer.CustomerInformation.CivilIdDateOfIssue=='') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterPlaceAndDateOfIssueofCivilIdCard', language}));
    } else if (this.props.accountReducer.CustomerInformation.PassportNumber == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterPassportNumber', language}));
    } else if (this.props.accountReducer.CustomerInformation.PassportIssuePlace == '' || this.props.accountReducer.CustomerInformation.PassportIsueDate=='') {
      this.setState({postion_1: false});
      alert(strings({key: 'EnterPlaceAndDateOfIssueofPassport', language}));
    } else {
      this.setState({postion_1: true});
      this.forWardToNextPage()
    }
  };

  validatePosition_1_acctype_1 = (language)=>{
    if (this.props.form.CompanyInformation.CommercialNameAr == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'CompanynameandsurnameinArabic', language}));
    }
     else if (this.props.form.CompanyInformation.CommercialName == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'CompanynameandsurnameinEnglish', language}));
    } else if (this.props.form.CompanyInformation.AuthorizedPersonName == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Authorizedpersontomanagecompanysaccount', language}));
    }
    else if (this.props.form.CompanyInformation.AuthorizedPersonAddress == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Addressoftheauthorizedperson', language}));
    } else if (this.props.form.CompanyInformation.ManagingDirectorName == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'ManagingdirectororCEO', language}));
    }
    else if (this.props.form.CompanyInformation.ChairmanofBoard == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Chairmanoftheboard', language}));
    } else if (this.props.form.CompanyInformation.BoardMembers == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Boardmembers', language}));
    } else if (this.props.form.CompanyInformation.StackHolders == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Namesoftheshareholders', language}));
    }else if (this.props.form.CompanyInformation.CommercialRegister == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Commercialregister', language}));
    }else if (this.props.form.CompanyInformation.CompanyNationality == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Companynationality', language}));
    }else if (this.props.form.CompanyInformation.TotalBranches == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Numberofcompanybranches', language}));
    }else if (this.props.form.CompanyInformation.CorrespondenceAddress == '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Correspondenceaddress', language}));
    }else if (this.props.form.CompanyInformation.AuthorozedToWithdrawDeposits== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Namesofthoseauthorizedtowithdrawanddeposit', language}));
    }else if (this.props.form.CompanyInformation.EstablishmentDate== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Dateofestablishment', language}));
    }else if (this.props.form.CompanyInformation.NominalCapital== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Nominalcapital', language}));
    }else if (this.props.form.CompanyInformation.PaidCapital== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Paidcapital', language}));
    }else if (this.props.form.CompanyInformation.IncorporationPlace== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Placeofincorporation', language}));
    }else if (this.props.form.CompanyInformation.TelephoneNumber== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Telephonenumber', language}));
    }else if (this.props.form.CompanyInformation.FaxNumber== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Faxnumber', language}));
    }else if (this.props.form.CompanyInformation.Email== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Email', language}));
    }else if (this.props.form.CompanyInformation.LatestAuditedFinancialStatementofCompany== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Thelatestauditedfinancialstatementsofthecompany', language}));
    }else if (this.props.form.CompanyInformation.ExternalAuditorName== '') {
      this.setState({postion_1: false});
      alert(strings({key: 'Thenameoftheexternalauditor', language}));
    }else {
      this.setState({postion_1: true});
      this.forWardToNextPage()
    }
  }

  //VALIDATING POSITION 2

  validatePosition_2_acctype_1 = (language) => {
    if (this.props.form.BeneficiaryInformation.FullNameAr == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryFullNameAr', language}));
    } else if (this.props.form.BeneficiaryInformation.FullName == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryFullName', language}));
    } else if (this.props.form.BeneficiaryInformation.WhyAccountNotManagedByBeneficiary == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Whytheaccountisnotmanagedbythebeneficiary', language}));
    }  else if (this.props.form.BeneficiaryInformation.MotherName == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryMothersTripleName', language}));
    }  else if (this.props.form.BeneficiaryInformation.DateOfBirth == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryDOB', language}));
    }  else if (this.props.form.BeneficiaryInformation.PlaceOfBirth == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryPlaceOfBirth', language}));
    }  else if (this.props.form.BeneficiaryInformation.NationalIdNumber == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryNationalIdNumber', language}));
    }  else if (this.props.form.BeneficiaryInformation.IdDateOfIssue == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryPlaceAndDateOfIssueofNationIdCard', language}));
    }  else if (this.props.form.BeneficiaryInformation.CivilIdNumber == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryCivilIdCardNumber', language}));
    }  else if (this.props.form.BeneficiaryInformation.CivilIdDateOfIssue == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryPlaceAndDateOfIssueofCivilIdCard', language}));
    }  else if (this.props.form.BeneficiaryInformation.PassportNumber == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryPassportNumber', language}));
    }  else if (this.props.form.BeneficiaryInformation.PassportIsueDate == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryPlaceAndDateOfIssueofPassport', language}));
    }  else if (this.props.form.BeneficiaryInformation.ResidentAddress == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryRecidentAddress', language}));
    }  else if (this.props.form.BeneficiaryInformation.BeneficiaryMobile == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryMobileNumber', language}));
    }  else if (this.props.form.BeneficiaryInformation.BeneficiaryEmail == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'BeneficiaryEmail', language}));
    } else {
      this.setState({postion_2: true});
      this.forWardToNextPage()
    }
  };

  validatePosition_2_acctype_0 =(language)=>{
    if (this.props.form.CustomerAddressAndContactInformation.ResidentAddress == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'EnterYourRecidentAddress', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.NearestPoint == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Nearestpoint', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.HomePhone == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Homephone', language}));
    }else if (this.props.form.CustomerAddressAndContactInformation.Mobile == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Mobile', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.AddressEmail == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'EnterYourEmail', language}));
    }else if ( this.props.form.CustomerAddressAndContactInformation.OrganizationOwnerName== '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Organizationownername', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.OrganizationActivity == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Theactivityoftheorganizationindetails', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.JobTitle == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Customersjobtitlewithintheorganization', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.OrganizationAddress == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Organizationaddress', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.OrganizationPhone == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Organizationphone', language}));
    } else if (this.props.form.CustomerAddressAndContactInformation.OrganizationFax == '') {
      this.setState({postion_2: false});
      alert(strings({key: 'Faxnumber', language}));
    } else {
      this.setState({postion_2: true});
      this.forWardToNextPage()
    }
  }

  //VALIDATING POSITION 3
  validatePosition_3 = (language) => {
    if (this.props.form.FinancialMatter.BankName == '') {
      this.setState({postion_3: false});
      alert(strings({key: 'EnterFinancialBrachName', language}));
    } else if (this.props.form.FinancialMatter.DateofFirstDealing == '') {
      this.setState({postion_3: false});
      alert(strings({key: 'EnterTheDateOfFirstDealing', language}));
    } else if (this.props.form.FinancialMatter.ObtainedAmount == '') {
      this.setState({postion_3: false});
      alert(strings({key: 'Amountofcashfacilitiesobtainedifany', language}));
    }else if (this.props.form.FinancialMatter.AdditionalIncome == '') {
      this.setState({postion_3: false});
      alert(strings({key: 'Additionalincomeifany', language}));
    }else if (this.props.form.FinancialMatter.MonthlyCommercialTransactionEstimate == '') {
      this.setState({postion_3: false});
      alert(strings({key: 'MonthlyEstimate', language}));
    } else if (this.props.form.FinancialMatter.AnnualCommercialTransactionEstimate == '') {
      this.setState({postion_3: false});
      alert(strings({key: 'AnnualEstimate', language}));
    } else if (this.props.form.FinancialMatter.NatureofBuissinessWithBank == '') {
      this.setState({postion_3: false});
      alert(strings({key: 'EnterNatureOfBusiness', language}));
    } else {
      this.setState({postion_3: true});
      this.submitForm()
    }
  };
                                                                      //WORK TO DO***********************************************************************
  switchValidationFunction = (position,language,accType) => {
    switch (position) {
      case 0:
        this.validatePosition_0(language);
        break;
      case 1:
        this.props.values.accounttype==0 ?
          this.validatePosition_1_acctype_0(language)
          :
          this.validatePosition_1_acctype_1(language);
        break;
      case 2:
        this.props.values.accounttype==0 ?
        this.validatePosition_2_acctype_0(language)
        :
        this.validatePosition_2_acctype_1(language)
        break;
      default:
        this.validatePosition_3(language)
        console.warn('hLOOOOEOEOE')
    }
    // console.warn(position)
  };

  // financialBranchName:'',
  // dateOfFirstDealing:'',
  // MonthlyEstimateTransaction:'',
  // AnnualEstimateTransaction:'',
  // NatureOfBusiness:'',

  accountDetailsIndividual = async () => {
    try {
      const data = await api.createIndividual();
      console.log('createIndividual', data);
      this.setState({individualDetails: data});
    } catch (error) {
      console.log(error);
    }
  };

  accountDetailsCompany = async () => {
    try {
      const data = await api.createCompany();
      console.log('createCompany', data);
      this.setState({companyDetails: data});
    } catch (error) {
      console.log(error);
    }
  };

  onContinewPress() {
    console.log('this.props.values.accounttype', this.props.values);
    if (this.props.values.accounttype == 0) {
      this.accountDetailsIndividual();
      this.props.navigation.navigate('Terms');
    }
    if (this.props.values.accounttype == 1) {
      this.accountDetailsCompany();
      this.props.navigation.navigate('Terms');
    }
  }

  forWardToNextPage = () => {
    this.state.currentPosition != 4 &&
      this.onPageChange(this.state.currentPosition + 1);
    console.warn(this.state.currentPosition + 1);
  };



  submitPersonalForm = async () => {
    const payload = {
      "Id": 0,
      "UserId": 136,
      "CompanyOrIndividual": "Individual",
      "BranchName": this.props.form.AccountDetails.BranchName,
      "AccountTypeId": this.props.form.AccountDetails.AccountTypeId,
      "AccountNumber": "",
      "AccountOpeniningDate": "",
      "CurrencyId": this.props.form.AccountDetails.CurrencyId,
      "LegalStatusId": this.props.form.AccountDetails.LegalStatusId,
      "LegaStatus_Other": this.props.form.AccountDetails.LegaStatus_Other,
      "ProfessionBusinessActivity": this.props.form.AccountDetails.ProfessionBusinessActivity,
      "AccountOpeningReason": this.props.form.AccountDetails.AccountOpeningReason,
      "CustomerInformation": {
        "FullName": this.props.form.CustomerInformation.FullName,
        "FullNameAr": this.props.form.CustomerInformation.FullNameAr,
        "MotherName": this.props.form.CustomerInformation.MotherName,
        "MotherNameAr": "",
        "DateOfBirth": this.props.form.CustomerInformation.DateOfBirth,
        "PlaceOfBirth": this.props.form.CustomerInformation.PlaceOfBirth,
        "NationalityId": this.props.form.CustomerInformation.NationalityId,
        "HasAnotherNationality": this.props.form.CustomerInformation.HasAnotherNationality,
        "NationalIdNumber": this.props.form.CustomerInformation.NationalIdNumber,
        "IdDateOfIssue": this.props.form.CustomerInformation.IdDateOfIssue,
        "IdPlaceOfIssue": this.props.form.CustomerInformation.IdPlaceOfIssue,
        "CivilIdNumber": this.props.form.CustomerInformation.CivilIdNumber,
        "CivilIdDateOfIssue": this.props.form.CustomerInformation.CivilIdDateOfIssue,
        "CivilIdPlaceOfIssue": this.props.form.CustomerInformation.CivilIdPlaceOfIssue,
        "PassportNumber": this.props.form.CustomerInformation.PassportNumber,
        "PassportIsueDate": this.props.form.CustomerInformation.PassportIsueDate,
        "PassportIssuePlace": this.props.form.CustomerInformation.PassportIssuePlace,
        "MaritalStatusId": this.props.form.CustomerInformation.MaritalStatusId,
        "SpouseName": "",
        "EducationLevelId": this.props.form.CustomerInformation.EducationLevelId,
        "EducationLevel_Other": this.props.form.CustomerInformation.EducationLevel_Other,
        "JobDetailId": this.props.form.CustomerInformation.JobDetailId,
        "JobDetail_Other": this.props.form.CustomerInformation.JobDetail_Other,
        "TheLastAuditedFinancialStatement": this.props.form.CustomerInformation.TheLastAuditedFinancialStatement,
      },
      "CustomerAddressAndContactInformation": {
      
        "ResidentAddress": this.props.form.CustomerAddressAndContactInformation.ResidentAddress,
        "NearestPoint": this.props.form.CustomerAddressAndContactInformation.NearestPoint,
        "ResideInOtherCountry": this.props.form.CustomerAddressAndContactInformation.ResideInOtherCountry,
        "AccommodationTypeId": this.props.form.CustomerAddressAndContactInformation.AccommodationTypeId,
        "HomePhone": this.props.form.CustomerAddressAndContactInformation.HomePhone,
        "Mobile": this.props.form.CustomerAddressAndContactInformation.Mobile,
        "Email": this.props.form.CustomerAddressAndContactInformation.AddressEmail,
        "OrganizationOwnerName": this.props.form.CustomerAddressAndContactInformation.OrganizationOwnerName,
        "OrganizationActivity": this.props.form.CustomerAddressAndContactInformation.OrganizationActivity,
        "JobTitle": this.props.form.CustomerAddressAndContactInformation.JobTitle,
        "OrganizationAddress": this.props.form.CustomerAddressAndContactInformation.OrganizationAddress,
        "OganizatonNationalityId": 1,
        "OrganizationPhone": this.props.form.CustomerAddressAndContactInformation.OrganizationPhone,
        "OrganizationFax": this.props.form.CustomerAddressAndContactInformation.OrganizationFax
      },
      "FinancialMatter": {  
        "BankName": this.props.form.FinancialMatter.BankName,
        "DateofFirstDealing": this.props.form.FinancialMatter.DateofFirstDealing,
        "ObtainedAmount": this.props.form.FinancialMatter.ObtainedAmount,
        "FundSourceId": this.props.form.FinancialMatter.FundSourceId,
        "AdditionalIncome": this.props.form.FinancialMatter.AdditionalIncome,
        "MonthlyIncomeId": this.props.form.FinancialMatter.MonthlyIncomeId,
        "MonthlyCommercialTransactionEstimate": this.props.form.FinancialMatter.MonthlyCommercialTransactionEstimate,
        "AnnualCommercialTransactionEstimate": this.props.form.FinancialMatter.AnnualCommercialTransactionEstimate,
        "NatureofBuissinessWithBank": this.props.form.FinancialMatter.NatureofBuissinessWithBank
      }
    }
    console.log(payload);
    try {
      const data = await api.createIndividual(payload);
      if (data.IsSuccessful === true){
        this.props.navigation.navigate('Terms')
      }
    } catch (error) {
      console.log(error);
    }
  }

  submitCompanyForm = async () => {
    const payload = {
      "Id": 0,
      "UserId": 136,
      "CompanyOrIndividual": "Company",
      "BranchName": this.props.form.AccountDetails.BranchName,
      "AccountTypeId": this.props.form.AccountDetails.AccountTypeId,
      "AccountNumber": "",
      "AccountOpeniningDate": "",
      "CurrencyId": this.props.form.AccountDetails.CurrencyId,
      "LegalStatusId": this.props.form.AccountDetails.LegalStatusId,
      "LegaStatus_Other": this.props.form.AccountDetails.LegaStatus_Other,
      "ProfessionBusinessActivity": this.props.form.AccountDetails.ProfessionBusinessActivity,
      "AccountOpeningReason": this.props.form.AccountDetails.AccountOpeningReason,
      "CompanyInformation": {
        "CommercialName": this.props.form.CompanyInformation.CommercialName,
        "CommercialNameAr": this.props.form.CompanyInformation.CommercialNameAr,
        "AuthrizedPersonName": this.props.form.CompanyInformation.AuthorizedPersonName,
        "AuthorizedPersonAddress": this.props.form.CompanyInformation.AuthorizedPersonAddress,
        "ManagingDirectorName": this.props.form.CompanyInformation.ManagingDirectorName,
        "ChairmanofBoard": this.props.form.CompanyInformation.ChairmanofBoard,
        "BoardMembers": this.props.form.CompanyInformation.BoardMembers,
        "StackHolders": this.props.form.CompanyInformation.StackHolders,
        "CommercialRegister": this.props.form.CompanyInformation.CommercialRegister,
        "CompanyNationality": this.props.form.CompanyInformation.CompanyNationality,
        "TotalBranches": this.props.form.CompanyInformation.TotalBranches,
        "CorrespondenceAddress": this.props.form.CompanyInformation.CorrespondenceAddress,
        "AuthorozedToWithdrawDeposits": this.props.form.CompanyInformation.AuthorozedToWithdrawDeposits,
        "CompanyActivityId": this.props.form.CompanyInformation.CompanyActivityId,
        "EstablishmentDate": this.props.form.CompanyInformation.EstablishmentDate,
        "NominalCapital": this.props.form.CompanyInformation.NominalCapital,
        "PaidCapital": this.props.form.CompanyInformation.PaidCapital,
        "IncorporationPlace": this.props.form.CompanyInformation.IncorporationPlace,
        "TelephoneNumber": this.props.form.CompanyInformation.TelephoneNumber,
        "FaxNumber": this.props.form.CompanyInformation.FaxNumber,
        "Email": this.props.form.CompanyInformation.Email,
        "LatestAuditedFinancialStatementofCompany":this.props.form.CompanyInformation.LatestAuditedFinancialStatementofCompany,
        "ExternalAuditorName": this.props.form.CompanyInformation.ExternalAuditorName
      },
      "BeneficiaryInformation": {
        "FullName": this.props.form.BeneficiaryInformation.FullName,
        "FullNameAr": this.props.form.BeneficiaryInformation.FullNameAr,
        "WhyAccountNotManagedByBeneficiary": this.props.form.BeneficiaryInformation.WhyAccountNotManagedByBeneficiary,
        "MontherName": this.props.form.BeneficiaryInformation.MotherName,
        "MotherNameAr": this.props.form.BeneficiaryInformation.MontherName,
        "DateOfBirth": this.props.form.BeneficiaryInformation.DateOfBirth,
        "PlaceOfBirth": this.props.form.BeneficiaryInformation.PlaceOfBirth,
        "NationalityId": this.props.form.BeneficiaryInformation.NationalityId,
        "HasAnotherNationality": this.props.form.BeneficiaryInformation.HasAnotherNationality,
        "NationalIdNumber": this.props.form.BeneficiaryInformation.NationalIdNumber,
        "IdDateOfIssue": this.props.form.BeneficiaryInformation.IdDateOfIssue,
        "IdPlaceOfIssue": this.props.form.BeneficiaryInformation.IdPlaceOfIssue,
        "CivilIdNumber": this.props.form.BeneficiaryInformation.CivilIdNumber,
        "CivilIdDateOfIssue": this.props.form.BeneficiaryInformation.CivilIdDateOfIssue,
        "CivilIdPlaceOfIssue": this.props.form.BeneficiaryInformation.CivilIdPlaceOfIssue,
        "PassportNumber": this.props.form.BeneficiaryInformation.PassportNumber,
        "PassportIsueDate": this.props.form.BeneficiaryInformation.PassportIsueDate,
        "PassportIssuePlace": this.props.form.BeneficiaryInformation.PassportIssuePlace,
        "MaritalStatusId": this.props.form.BeneficiaryInformation.MaritalStatusId,
        "EducationalLevelId": this.props.form.BeneficiaryInformation.EducationalLevelId,
        "EducationLevel_Other": this.props.form.BeneficiaryInformation.EducationLevel_Other,
        "JobDetailsId": this.props.form.BeneficiaryInformation.JobDetailId,
        "JobDetails_Other": this.props.form.BeneficiaryInformation.JobDetail_Other,
        "TheLastAuditedStatement": this.props.form.BeneficiaryInformation.TheLastAuditedStatement,
        "ResidentAddress": this.props.form.BeneficiaryInformation.ResidentAddress,
        "Mobile": this.props.form.BeneficiaryInformation.BeneficiaryMobile,
        "Email": this.props.form.BeneficiaryInformation.BeneficiaryEmail
      },
      "FinancialMatter": {  
        "BankName": this.props.form.FinancialMatter.BankName,
        "DateofFirstDealing": this.props.form.FinancialMatter.DateofFirstDealing,
        "ObtainedAmount": this.props.form.FinancialMatter.ObtainedAmount,
        "FundSourceId": this.props.form.FinancialMatter.FundSourceId,
        "AdditionalIncome": this.props.form.FinancialMatter.AdditionalIncome,
        "MonthlyIncomeId": this.props.form.FinancialMatter.MonthlyIncomeId,
        "MonthlyCommercialTransactionEstimate": this.props.form.FinancialMatter.MonthlyCommercialTransactionEstimate,
        "AnnualCommercialTransactionEstimate": this.props.form.FinancialMatter.AnnualCommercialTransactionEstimate,
        "NatureofBuissinessWithBank": this.props.form.FinancialMatter.NatureofBuissinessWithBank
      }
    }
    
    console.log(payload);
    try {
      const data = await api.createCompany(payload);
      if (data.IsSuccessful === true){
        this.props.navigation.navigate('Terms')
      }
    } catch (error) {
      console.log(error);
    }
  }

  submitForm = ()=>{                                            //THIS IS THE EXACT FINAL FUNCTION SWITCHING IN FORM SCREEN
    if(this.props.values.accounttype == 0){
      this.submitPersonalForm()
    }
    else{
      this.submitCompanyForm()
    }
  }

  render() {
    const {
      address,
      nearestPoint,
      resideAnotherCountry,
      accommodation,
      mobile,
      mobiletwo,
    } = this.state;
    const {language} = this.props;
    return (
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#F7F7F7'}} />
        <StatusBar barStyle="dark-content" />
        <Header
          header={language === 'English' ? 'Fill-up the form' : 'تعبئة النموذج'}
          navigation={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: hp('4'),
          }}>
          <StepIndicator
            style={{width: '100%'}}
            customStyles={customStyles}
            currentPosition={this.state.currentPosition}
            labels={language === 'English' ? labels : ARABIC_LABEL}
            stepCount={4}
          />
          <View
            style={{
              flex: 0.9,
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                }}>
                {this.state.currentPosition == 0 ? (
                  <View style={{flex: 1}}>
                    <AccountDetails
                      onChangeBranchName={
                        this.handleAccountFieldChange.bind(this, 'BranchName')
                      }
                      onChangePurpose={this.handleAccountFieldChange.bind(this, 'AccountOpeningReason')}
                      onChangeProfession={
                        this.handleAccountFieldChange.bind(this, 'ProfessionBusinessActivity')
                      }
                      onChangeAccountType={item => this.handleAccountFieldChange('AccountTypeId', item.Value) }
                      onChangeCurrency={item => this.handleAccountFieldChange('CurrencyId', item.Value) }
                      onChangeLegal={item => this.handleAccountFieldChange('LegalStatusId', item.Value) }


                      BranchValue={this.props.form.AccountDetails.BranchName}
                      ProffessionValue={this.props.form.AccountDetails.ProfessionBusinessActivity}
                      PurposeValue={this.props.form.AccountDetails.AccountOpeningReason}
                    />
                  </View>
                ) : this.state.currentPosition == 1 ? (
                  <View style={{flex: 1}}>
                    <CustomerDetails
                      maritalStatus={this.state.maritalStatus}
                      jobDetails={this.state.jobDetails}
                      education={this.state.education}
                      onChangeFullName={
                        this.handleCustomerFieldChange.bind(this, 'FullName')
                      }
                      NameEnglish={this.props.form.CustomerInformation.FullName}

                      onChangeFullNameAr={
                        this.handleCustomerFieldChange.bind(this, 'FullNameAr')
                      }
                      NameArab={this.props.form.CustomerInformation.FullNameAr}

                      onChangeMother={
                        this.handleCustomerFieldChange.bind(this, 'MotherName')
                      }
                      MotherName={this.props.form.CustomerInformation.MotherName}

                      onChangeDob={item => this.handleCustomerFieldChange('DateOfBirth', item) }
                      DOB={this.props.form.CustomerInformation.DateOfBirth}

                      onChangePlaceOfBirth={
                        this.handleCustomerFieldChange.bind(this, 'PlaceOfBirth')
                      }
                      BirthPlace={this.props.form.CustomerInformation.PlaceOfBirth}

                      
                      onChangeCountry={item => this.handleCustomerFieldChange('NationalityId', item.Value) }
                      // NationalityIdNumber={this.props.form.CustomerInformation.NationalityId}

                      onChangeHasOtherNation={item => this.handleCustomerFieldChange('HasAnotherNationality', item) }
                      // NationalityId={this.props.form.CustomerInformation.HasAnotherNationality}


                      // onChangePassport={
                      //   this.handleCustomerFieldChange.bind(this, 'PassportNumber')
                      // }
                      // PassportNumber={this.props.form.CustomerInformation.PassportNumber}


                                                                                                  //NATIONAL ID

                      onChangeNationalID={
                        this.handleCustomerFieldChange.bind(this, 'NationalIdNumber')
                      }
                      NationalIdNumber={this.props.form.CustomerInformation.NationalIdNumber}

                      onChangeIdDate={
                        this.handleCustomerFieldChange.bind(this, 'IdDateOfIssue')
                      }
                      NationalityIdDate={this.props.form.CustomerInformation.IdDateOfIssue}
                                                                                                          // WANT CONFIRMATION
                      onChangeIdPlace={
                        this.handleCustomerFieldChange.bind(this, 'IdPlaceOfIssue')          
                      }

                      // NationalityId={this.props.form.CustomerInformation.NationalityId}



                                                                                              // CIVIL ID

                      onChangeCivilID={
                        this.handleCustomerFieldChange.bind(this, 'CivilIdNumber')
                      }
                      CivilIdNumber={this.props.form.CustomerInformation.CivilIdNumber}

                      onChangeCivilDate={
                        this.handleCustomerFieldChange.bind(this, 'CivilIdDateOfIssue')
                      }
                      CivilIdDateOfIssue={this.props.form.CustomerInformation.CivilIdDateOfIssue}

                      onChangeCivilPlace={
                        this.handleCustomerFieldChange.bind(this, 'CivilIdPlaceOfIssue')
                      }
                      CivilIdPlaceOfIssue={this.props.form.CustomerInformation.CivilIdPlaceOfIssue}





                                                                                                      //PASSPORT
                      onChangePassportID={
                        this.handleCustomerFieldChange.bind(this, 'PassportNumber')
                      }
                      PassportNumber={this.props.form.CustomerInformation.PassportNumber}

                      onChangePassportDate={
                        this.handleCustomerFieldChange.bind(this, 'PassportIsueDate')
                      }
                      PassportIsueDate={this.props.form.CustomerInformation.PassportIsueDate}

                      onChangePassportPlace={
                        this.handleCustomerFieldChange.bind(this, 'PassportIssuePlace')
                      }
                      PassportIssuePlace={this.props.form.CustomerInformation.PassportIssuePlace}





                      onChangeJobOther={
                        this.handleCustomerFieldChange.bind(this, 'JobDetail_Other')
                      }
                      onChangeLastAuditState={
                        this.handleCustomerFieldChange.bind(this, 'TheLastAuditedFinancialStatement')
                      }
                      onChangeMarriage={item => this.handleCustomerFieldChange('MaritalStatusId', item.Value) }
                      onChangeJob={item => this.handleCustomerFieldChange('JobDetailId', item.Value) }
                      onChangeEducation={item => this.handleCustomerFieldChange('EducationLevelId', item.Value) }










                      onChangeCompanyName={
                        this.handleCompanyFieldChange.bind(this, 'CommercialName')
                      }
                      CommercialName={this.props.form.CompanyInformation.CommercialName}

                      
                      onChangeCompanyNameAr={
                        this.handleCompanyFieldChange.bind(this, 'CommercialNameAr')
                      }
                      CommercialNameAr={this.props.form.CompanyInformation.CommercialNameAr}

                      onChangeAuthName={
                        this.handleCompanyFieldChange.bind(this, 'AuthorizedPersonName')
                      }
                      AuthorizedPersonName={this.props.form.CompanyInformation.AuthorizedPersonName}

                      onChangeAuthAddress={
                        this.handleCompanyFieldChange.bind(this, 'AuthorizedPersonAddress')
                      }
                      AuthorizedPersonAddress={this.props.form.CompanyInformation.AuthorizedPersonAddress}

                      onChangeMdName={
                        this.handleCompanyFieldChange.bind(this, 'ManagingDirectorName')
                      }
                      ManagingDirectorName={this.props.form.CompanyInformation.ManagingDirectorName}

                      onChangeChairmanName={
                        this.handleCompanyFieldChange.bind(this, 'ChairmanofBoard')
                      }
                      ChairmanofBoard={this.props.form.CompanyInformation.ChairmanofBoard}

                      onChangeBoardName={
                        this.handleCompanyFieldChange.bind(this, 'BoardMembers')
                      }
                      BoardMembers={this.props.form.CompanyInformation.BoardMembers}

                      onChangeStack={
                        this.handleCompanyFieldChange.bind(this, 'StackHolders')
                      }
                      StackHolders={this.props.form.CompanyInformation.StackHolders}

                      onChangeCommercial={
                        this.handleCompanyFieldChange.bind(this, 'CommercialRegister')
                      }
                      CommercialRegister={this.props.form.CompanyInformation.CommercialRegister}

                      onChangeCompanyNationality={
                        this.handleCompanyFieldChange.bind(this, 'CompanyNationality')
                      }
                      CompanyNationality={this.props.form.CompanyInformation.CompanyNationality}

                      onChangeTotalBranches={
                        this.handleCompanyFieldChange.bind(this, 'TotalBranches')
                      }
                      TotalBranches={this.props.form.CompanyInformation.TotalBranches}

                      onChangeCorresAddress={
                        this.handleCompanyFieldChange.bind(this, 'CorrespondenceAddress')
                      }
                      CorrespondenceAddress={this.props.form.CompanyInformation.CorrespondenceAddress}

                      onChangeAuthWith={
                        this.handleCompanyFieldChange.bind(this, 'AuthorozedToWithdrawDeposits')
                      }
                      AuthorozedToWithdrawDeposits={this.props.form.CompanyInformation.AuthorozedToWithdrawDeposits}

                      onChangeEstdDate={
                        this.handleCompanyFieldChange.bind(this, 'EstablishmentDate')
                      }
                      EstablishmentDate={this.props.form.CompanyInformation.EstablishmentDate}

                      onChangeNomCap={
                        this.handleCompanyFieldChange.bind(this, 'NominalCapital')
                      }
                      NominalCapital={this.props.form.CompanyInformation.NominalCapital}

                      onChangePaidCap={
                        this.handleCompanyFieldChange.bind(this, 'PaidCapital')
                      }
                      PaidCapital={this.props.form.CompanyInformation.PaidCapital}

                      onChangeIncorpPlace={
                        this.handleCompanyFieldChange.bind(this, 'IncorporationPlace')
                      }
                      IncorporationPlace={this.props.form.CompanyInformation.IncorporationPlace}

                      onChangeTelNumber={
                        this.handleCompanyFieldChange.bind(this, 'TelephoneNumber')
                      }
                      TelephoneNumber={this.props.form.CompanyInformation.TelephoneNumber}

                      onChangeFaxNumber={
                        this.handleCompanyFieldChange.bind(this, 'FaxNumber')
                      }
                      FaxNumber={this.props.form.CompanyInformation.FaxNumber}

                      onChangeEmail={
                        this.handleCompanyFieldChange.bind(this, 'Email')
                      }
                      Email={this.props.form.CompanyInformation.Email}

                      onChangeLastAudit={
                        this.handleCompanyFieldChange.bind(this, 'LatestAuditedFinancialStatementofCompany')
                      }
                      LatestAuditedFinancialStatementofCompany={this.props.form.CompanyInformation.LatestAuditedFinancialStatementofCompany}

                      onChangeAuditName={
                        this.handleCompanyFieldChange.bind(this, 'ExternalAuditorName')
                      }
                      ExternalAuditorName={this.props.form.CompanyInformation.ExternalAuditorName}

                      onChangeCompanyActivity={item => this.handleCompanyFieldChange('CompanyActivityId', item.Value) }


                      
                    />
                  </View>
                ) : this.state.currentPosition == 2 ? (
                  <View style={{flex: 1}}>
                    <AddressContact
                      maritalStatus={this.state.maritalStatus}
                      jobDetails={this.state.jobDetails}
                      education={this.state.education}

                      onChangeAddress={
                        this.handleAddressFieldChange.bind(this, 'ResidentAddress')
                      }
                      ResidentAddresspersonal={this.props.form.CustomerAddressAndContactInformation.ResidentAddress}

                      onChangeNearestPoint={
                        this.handleAddressFieldChange.bind(this, 'NearestPoint')
                      }
                      NearestPoint={this.props.form.CustomerAddressAndContactInformation.NearestPoint}

                      onChangeHasOtherNation={item => this.handleAddressFieldChange('ResideInOtherCountry', item) }
                      onChangeHomePhone={
                        this.handleAddressFieldChange.bind(this, 'HomePhone')
                      }
                      HomePhone={this.props.form.CustomerAddressAndContactInformation.HomePhone}

                      onChangeMobile={
                        this.handleAddressFieldChange.bind(this, 'Mobile')
                      }
                      Mobile={this.props.form.CustomerAddressAndContactInformation.Mobile}

                      onChangeAddressEmail={
                        this.handleAddressFieldChange.bind(this, 'AddressEmail')
                      }
                      AddressEmail={this.props.form.CustomerAddressAndContactInformation.AddressEmail}

                      onChangeOrgOwner={
                        this.handleAddressFieldChange.bind(this, 'OrganizationOwnerName')
                      }
                      OrganizationOwnerName={this.props.form.CustomerAddressAndContactInformation.OrganizationOwnerName}
                      
                      onChangeAccomodation={item => this.handleAddressFieldChange('AccommodationTypeId', item.Value) }
                      onChangeOrgAct={
                        this.handleAddressFieldChange.bind(this, 'OrganizationActivity')
                      }
                      OrganizationActivity={this.props.form.CustomerAddressAndContactInformation.OrganizationActivity}

                      onChangeJobTitle={
                        this.handleAddressFieldChange.bind(this, 'JobTitle')
                      }
                      JobTitle={this.props.form.CustomerAddressAndContactInformation.JobTitle}

                      onChangeOrgAddress={
                        this.handleAddressFieldChange.bind(this, 'OrganizationAddress')
                      }
                      OrganizationAddress={this.props.form.CustomerAddressAndContactInformation.OrganizationAddress}

                      onChangePhone={
                        this.handleAddressFieldChange.bind(this, 'OrganizationPhone')
                      }
                      OrganizationPhone={this.props.form.CustomerAddressAndContactInformation.OrganizationPhone}

                      onChangeFax={
                        this.handleAddressFieldChange.bind(this, 'OrganizationFax')
                      }
                      OrganizationFax={this.props.form.CustomerAddressAndContactInformation.OrganizationFax}



                                                                                              //DOUBTED AREA**********************************////////////////************************************************************
                      onChangeFullName={
                        this.handleBeneficiaryFieldChange.bind(this, 'FullName')
                      }
                      FullName={this.props.form.BeneficiaryInformation.FullName}

                      onChangeFullNameAr={
                        this.handleBeneficiaryFieldChange.bind(this, 'FullNameAr')
                      }
                      FullNameAr={this.props.form.BeneficiaryInformation.FullNameAr}

                      onChangeMother={
                        this.handleBeneficiaryFieldChange.bind(this, 'MotherName')
                      }
                      MotherName={this.props.form.BeneficiaryInformation.MotherName}

                      onChangeWhyAccount={
                        this.handleBeneficiaryFieldChange.bind(this, 'WhyAccountNotManagedByBeneficiary')
                      }
                      WhyAccountNotManagedByBeneficiary={this.props.form.BeneficiaryInformation.WhyAccountNotManagedByBeneficiary}

                      onChangeDob={item => this.handleBeneficiaryFieldChange('DateOfBirth', item) }
                      
                      onChangePlaceOfBirth={
                        this.handleBeneficiaryFieldChange.bind(this, 'PlaceOfBirth')
                      }
                      PlaceOfBirth={this.props.form.BeneficiaryInformation.PlaceOfBirth}

                      onChangeCountry={item => this.handleBeneficiaryFieldChange('NationalityId', item.Value) }
                      onChangeHasOtherNation={item => this.handleBeneficiaryFieldChange('HasAnotherNationality', item) }
                      // onChangePassport={
                      //   this.handleBeneficiaryFieldChange.bind(this, 'PassportNumber')
                      // }
                      // PassportNumber={this.props.form.BeneficiaryInformation.PassportNumber}

                      onChangeNationalID={
                        this.handleBeneficiaryFieldChange.bind(this, 'NationalIdNumber')
                      }
                       NationalIdNumber={this.props.form.BeneficiaryInformation.NationalIdNumber}

                      onChangeIdDate={
                        this.handleBeneficiaryFieldChange.bind(this, 'IdDateOfIssue')
                      }
                      IdDateOfIssue={this.props.form.BeneficiaryInformation.IdDateOfIssue}

                      onChangeIdPlace={
                        this.handleBeneficiaryFieldChange.bind(this, 'IdPlaceOfIssue')
                      }
                      IdPlaceOfIssue={this.props.form.BeneficiaryInformation.IdPlaceOfIssue}

                      onChangeCivilID={
                        this.handleBeneficiaryFieldChange.bind(this, 'CivilIdNumber')
                      }
                      CivilIdNumber={this.props.form.BeneficiaryInformation.CivilIdNumber}

                      onChangeCivilDate={
                        this.handleBeneficiaryFieldChange.bind(this, 'CivilIdDateOfIssue')
                      }
                      CivilIdDateOfIssue={this.props.form.BeneficiaryInformation.CivilIdDateOfIssue}

                      onChangeCivilPlace={
                        this.handleBeneficiaryFieldChange.bind(this, 'CivilIdPlaceOfIssue')
                      }
                      CivilIdPlaceOfIssue={this.props.form.BeneficiaryInformation.CivilIdPlaceOfIssue}

                      onChangePassportID={
                        this.handleBeneficiaryFieldChange.bind(this, 'PassportNumber')
                      }
                      PassportNumber={this.props.form.BeneficiaryInformation.PassportNumber}

                      onChangePassportDate={
                        this.handleBeneficiaryFieldChange.bind(this, 'PassportIsueDate')
                      }
                      PassportIsueDate={this.props.form.BeneficiaryInformation.PassportIsueDate}

                      onChangePassportPlace={
                        this.handleBeneficiaryFieldChange.bind(this, 'PassportIssuePlace')
                      }
                      PassportIssuePlace={this.props.form.BeneficiaryInformation.PassportIssuePlace}

                      onChangeJobOther={
                        this.handleBeneficiaryFieldChange.bind(this, 'JobDetail_Other')
                      }
                      JobDetail_Other={this.props.form.BeneficiaryInformation.JobDetail_Other}

                      onChangeLastAuditState={
                        this.handleBeneficiaryFieldChange.bind(this, 'TheLastAuditedStatement')
                      }
                      TheLastAuditedStatement={this.props.form.BeneficiaryInformation.TheLastAuditedStatement}

                      onChangeResidentAddress={
                        this.handleBeneficiaryFieldChange.bind(this, 'ResidentAddress')
                      }
                      ResidentAddress={this.props.form.BeneficiaryInformation.ResidentAddress}

                      onChangeBeneMobile={
                        this.handleBeneficiaryFieldChange.bind(this, 'BeneficiaryMobile')
                      }
                      BeneficiaryMobile={this.props.form.BeneficiaryInformation.BeneficiaryMobile}

                      onChangeBeneEmail={
                        this.handleBeneficiaryFieldChange.bind(this, 'BeneficiaryEmail')
                      }
                      BeneficiaryEmail={this.props.form.BeneficiaryInformation.BeneficiaryEmail}

                      onChangeMarriage={item => this.handleBeneficiaryFieldChange('MaritalStatusId', item.Value) }
                      onChangeJob={item => this.handleBeneficiaryFieldChange('JobDetailId', item.Value) }
                      onChangeEducation={item => this.handleBeneficiaryFieldChange('EducationLevelId', item.Value) }
                    />
                  </View>
                ) : this.state.currentPosition == 3 ? (
                  <View style={{flex: 1}}>
                    <Financial
                    onChangeBankName={
                        this.handleFinancialFieldChange.bind(this, 'BankName')
                      }
                      BankName={this.props.form.FinancialMatter.BankName}

                      onChangeDateOfDealing={
                        this.handleFinancialFieldChange.bind(this, 'DateofFirstDealing')
                      }
                      DateofFirstDealing={this.props.form.FinancialMatter.DateofFirstDealing}

                      onChangeObtainedAmount={
                        this.handleFinancialFieldChange.bind(this, 'ObtainedAmount')
                      }
                      ObtainedAmount={this.props.form.FinancialMatter.ObtainedAmount}

                      onChangeAddIncome={
                        this.handleFinancialFieldChange.bind(this, 'AdditionalIncome')
                      }
                      AdditionalIncome={this.props.form.FinancialMatter.AdditionalIncome}

                      onChangeMonthlyCommercial={
                        this.handleFinancialFieldChange.bind(this, 'MonthlyCommercialTransactionEstimate')
                      }
                      MonthlyCommercialTransactionEstimate={this.props.form.FinancialMatter.MonthlyCommercialTransactionEstimate}

                      onChangeAnnualCommercial={
                        this.handleFinancialFieldChange.bind(this, 'AnnualCommercialTransactionEstimate')
                      }
                      AnnualCommercialTransactionEstimate={this.props.form.FinancialMatter.AnnualCommercialTransactionEstimate}

                      onChangeNatureBuss={
                        this.handleFinancialFieldChange.bind(this, 'NatureofBuissinessWithBank')
                      }
                      NatureofBuissinessWithBank={this.props.form.FinancialMatter.NatureofBuissinessWithBank}

                      onChangeFundSource={item => this.handleFinancialFieldChange('FundSourceId', item.Value) } 
                      onChangeMonthlyIncome={item => this.handleFinancialFieldChange('MonthlyIncomeId', item.Value) } 
                    
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lora-Bold',
                        fontSize: normalizeFont(30),
                        paddingHorizontal: 10,
                        textAlign: 'center',
                      }}>
                      FINISH
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                flex: 0.15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              {this.state.currentPosition !== 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    this.state.currentPosition != 0 &&
                    this.onPageChange(this.state.currentPosition - 1)
                  }
                  activeOpacity={0.9}>
                  <Image
                    style={{
                      width: hp('6'),
                      height: hp('6'),
                      resizeMode: 'contain',
                    }}
                    source={Left}
                  />
                </TouchableOpacity>
              ) : (
                <View />
              )}
              {this.state.currentPosition !== 3 && (
                <TouchableOpacity
                  onPress={() => this.switchValidationFunction(this.state.currentPosition,language)}
                  activeOpacity={0.9}>
                  <Image
                    style={{
                      width: hp('6'),
                      height: hp('6'),
                      resizeMode: 'contain',
                    }}
                    source={Right}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            // onPress={() => this.login(user)}
            //onPress={() => this.props.navigation.navigate('Terms')}
            //onPress={() => this.validationFunction(language)}
            onPress={() => {
              this.switchValidationFunction(this.state.currentPosition,language)
              }}
            // disabled={!this.validationFunction()}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor:
                this.buttonFunction() == true && this.state.currentPosition == 3
                  ? 'green'
                  : '#8395a7',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Bold',
                fontSize: normalizeFont(18),
              }}>
              {strings({key: 'continue5to5', language})}
              {/* {language === 'English'
                  ? 'Start Video Call'
                  : 'ابدأ مكالمة فيديو'} */}
            </Text>
            {/* {!this.state.callConnect ? (
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                  fontSize: normalizeFont(18),
                }}>
                {strings({key: 'continue5to5', language})}
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )} */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    values: state.bankProfileReducer.basicprofile || {},
    accountReducer:state.accountReducer,
    language: state.language.defaultLanguage,
    form: state.accountReducer
  };
};

export default connect(mapStateToProps)(FillForm);
