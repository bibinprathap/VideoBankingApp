import RestApi from './restapi';
import axios from 'axios';
import {store} from '../redux/store/store';

export default class AppApi {
  sendVerificationSMS = async params => {
    const restApi = new RestApi({controller: 'users'});
    try {
      let response = await restApi.post({
        url: 'sendOTP',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data.result;
    } catch (error) {
      throw error;
    }
  };

  freeAgents = async params => {
    const restApi = new RestApi({controller: 'api/agents/freeagents'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  currencies = async params => {
    const restApi = new RestApi({controller: 'api/lookup/currencies'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getLegalstatus = async params => {
    const restApi = new RestApi({controller: 'api/lookup/legalstatus'});
    try {
      let response = await restApi.get({
        url: params,
        body: '',
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getJobDetails = async params => {
    const restApi = new RestApi({controller: 'api/lookup/JobDetails'});
    try {
      let response = await restApi.get({
        url: params,
        body: '',
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getAccounTypes = async params => {
    const restApi = new RestApi({controller: 'api/lookup/AccounTypes'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCompanyActivity = async params => {
    const restApi = new RestApi({controller: 'api/lookup/CompanyActivity'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getFundSources = async params => {
    const restApi = new RestApi({controller: 'api/lookup/FundSources'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  gettotalMonthly = async params => {
    const restApi = new RestApi({controller: 'api/lookup/MonthlyIncome'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getMonthlyIncome = async params => {
    const restApi = new RestApi({controller: 'api/lookup/MonthlyIncome'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCountries = async params => {
    const restApi = new RestApi({controller: 'api/lookup/countries'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getCitiesByCountry = async params => {
    const restApi = new RestApi({
      controller: 'api/lookup/CitiesByCountry?countryId=' + 1,
    });
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getBranches = async params => {
    const restApi = new RestApi({controller: 'api/lookup/branches'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getServiceTypes = async params => {
    const restApi = new RestApi({controller: 'api/lookup/ServiceTypes'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getAccommodationType = async params => {
    const restApi = new RestApi({controller: 'api/lookup/AccommodationType'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  getmaritalStatus = async params => {
    const restApi = new RestApi({controller: 'api/lookup/MaritalStatus'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  getEducationalLevel = async params => {
    const restApi = new RestApi({controller: 'api/lookup/EducationalLevel'});
    try {
      let response = await restApi.get({
        url: '',
        body: params,
        cancelable: true,
        showAlerts: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  callUpdate = async params => {
    const restApi = new RestApi({
      controller: `api/agents/updateagnetstatus?agentid=${params.Id}&isbusy=${
        params.isbusy
      }&isonline=${params.isonline}`,
    });

    try {
      let response = await restApi.post({
        url: '',
        cancelable: true,
        showAlerts: true,
      });

      console.log(response, 'callUpdate');

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  createUser = async params => {
    var details = {
      Password: 'password',
      Email: params.email,
      MobileNumber: params.mobiletwo + params.mobile,
      AccountType: 'personal',
      Name: params.name,
      UserRole: 'personal',
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = decodeURIComponent(property);
      var encodedValue = decodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const restApi = new RestApi({controller: 'api/users/create'});
    console.log('helloooo');
    try {
      let response = await restApi.post({
        url: '',
        body: formBody,
        cancelable: true,
        showAlerts: true,
      });

      console.log(response, 'CreateUser');

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /* TODO*/
  createIndividual = async params => {
    var details = {
      Id: 1,
      UserId: 2,
      CompanyOrIndividual: 'sample string 3',
      BranchName: 'sample string 4',
      AccountTypeId: 5,
      AccountNumber: 'sample string 6',
      AccountOpeniningDate: '2020-06-24T13:11:39.9138892+04:00',
      CurrencyId: 7,
      LegalStatusId: 8,
      LegaStatus_Other: 'sample string 9',
      ProfessionBusinessActivity: 'sample string 10',
      AccountOpeningReason: 'sample string 11',
      CustomerInformation: {
        Id: 1,
        AccountDetailsId: 2,
        FullName: 'sample string 3',
        FullNameAr: 'sample string 4',
        MontherName: 'sample string 5',
        MotherNameAr: 'sample string 6',
        DateOfBirth: '2020-06-24T13:11:39.9148778+04:00',
        PlaceOfBirth: 'sample string 8',
        NationalityId: 9,
        HasAnotherNationality: true,
        NationalIdNumber: 'sample string 11',
        IdDateOfIssue: 'sample string 12',
        IdPlaceOfIssue: 'sample string 13',
        CivilIdNumber: 'sample string 14',
        CivilIdDateOfIssue: 'sample string 15',
        CivilIdPlaceOfIssue: 'sample string 16',
        PassportNumber: 'sample string 17',
        PassportIsueDate: 'sample string 18',
        PassportIssuePlace: 'sample string 19',
        MaritalStatusId: 20,
        SpouseName: 'sample string 21',
        EducationLevelId: 22,
        EducationLevel_Other: 'sample string 23',
        JobDetailId: 24,
        JobDetail_Other: 'sample string 25',
        TheLastAuditedFinancialStatement: 26.1,
      },
      CustomerAddressAndContactInformation: {
        Id: 1,
        AccountDetailsId: 2,
        ResidentAddress: 'sample string 3',
        NearestPoint: 'sample string 4',
        ResideInOtherCountry: true,
        AccommodationTypeId: 6,
        HomePhone: 'sample string 7',
        Mobile: 'sample string 8',
        Email: 'sample string 9',
        OrganizationOwnerName: 'sample string 10',
        OrganizationActivity: 'sample string 11',
        JobTitle: 'sample string 12',
        OrganizationAddress: 'sample string 13',
        OganizatonNationalityId: 14,
        OrganizationPhone: 'sample string 15',
        OrganizationFax: 'sample string 16',
      },
      FinancialMatter: {
        Id: 1,
        AccountDetailsId: 2,
        BankName: 'sample string 3',
        DateofFirstDealing: '2020-06-24T13:11:39.9173774+04:00',
        ObtainedAmount: 5.1,
        FundSourceId: 6,
        AdditionalIncome: 'sample string 7',
        MonthlyIncomeId: 8,
        MonthlyCommercialTransactionEstimate: 9.1,
        AnnualCommercialTransactionEstimate: 10.1,
        NatureofBuissinessWithBank: 'sample string 11',
      },
    };

    var formBody = [];
    for (var property in params) {
      var encodedKey = decodeURIComponent(property);
      var encodedValue = decodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const restApi = new RestApi({
      controller: 'api/users/AccountDetailsIndividual',
    });
    try {
      let response = await restApi.post({
        url: '',
        body: formBody,
        cancelable: true,
        showAlerts: true,
      });
      console.log(response, 'CreateIndividual');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /* TODO*/
  createCompany = async params => {
    var details = {
      Id: 1,
      UserId: 2,
      CompanyOrIndividual: 'sample string 3',
      BranchName: 'sample string 4',
      AccountTypeId: 5,
      AccountNumber: 'sample string 6',
      AccountOpeniningDate: '2020-06-24T13:14:05.5073158+04:00',
      CurrencyId: 7,
      LegalStatusId: 8,
      LegaStatus_Other: 'sample string 9',
      ProfessionBusinessActivity: 'sample string 10',
      AccountOpeningReason: 'sample string 11',
      CompanyInformation: {
        Id: 1,
        AccountDetailsId: 2,
        CommercialName: 'sample string 3',
        CommercialNameAr: 'sample string 4',
        AuthorizedPersonName: 'sample string 5',
        AuthorizedPersonAddress: 'sample string 6',
        ManagingDirectorName: 'sample string 7',
        ChairmanofBoard: 'sample string 8',
        BoardMembers: [
          {
            Id: 1,
            CompanyId: 2,
            Name: 'sample string 3',
            NameAr: 'sample string 4',
            Status: 'sample string 5',
          },
          {
            Id: 1,
            CompanyId: 2,
            Name: 'sample string 3',
            NameAr: 'sample string 4',
            Status: 'sample string 5',
          },
        ],
        StackHolders: [
          {
            Id: 1,
            CompanyId: 2,
            Name: 'sample string 3',
            NameAr: 'sample string 4',
            Status: 'sample string 5',
          },
          {
            Id: 1,
            CompanyId: 2,
            Name: 'sample string 3',
            NameAr: 'sample string 4',
            Status: 'sample string 5',
          },
        ],
        CommercialRegister: 'sample string 9',
        CompanyNationality: 10,
        TotalBranches: 11,
        CorrespondenceAddress: 'sample string 12',
        AuthorozedToWithdrawDeposits: [
          {
            Id: 1,
            CompanyId: 2,
            PersonName: 'sample string 3',
            PersonNameAr: 'sample string 4',
            CanDeposit: true,
            CanWithdraw: true,
            Status: 'sample string 7',
          },
          {
            Id: 1,
            CompanyId: 2,
            PersonName: 'sample string 3',
            PersonNameAr: 'sample string 4',
            CanDeposit: true,
            CanWithdraw: true,
            Status: 'sample string 7',
          },
        ],
        CompanyActivityId: 13,
        EstablishmentDate: '2020-06-24T13:14:05.5108099+04:00',
        NominalCapital: 15.1,
        PaidCapital: 16.1,
        IncorporationPlace: 'sample string 17',
        TelephoneNumber: 'sample string 18',
        FaxNumber: 'sample string 19',
        Email: 'sample string 20',
        LatestAuditedFinancialStatementofCompany: 21.1,
        ExternalAuditorName: 'sample string 22',
      },
      BeneficiaryInformation: {
        Id: 1,
        AccountDetailsId: 2,
        FullName: 'sample string 3',
        FullNameAr: 'sample string 4',
        WhyAccountNotManagedByBeneficiary: 'sample string 5',
        MontherName: 'sample string 6',
        MotherNameAr: 'sample string 7',
        DateOfBirth: '2020-06-24T13:14:05.5118082+04:00',
        PlaceOfBirth: 'sample string 9',
        NationalityId: 10,
        HasAnotherNationality: true,
        NationalIdNumber: 'sample string 12',
        IdDateOfIssue: 'sample string 13',
        IdPlaceOfIssue: 'sample string 14',
        CivilIdNumber: 'sample string 15',
        CivilIdDateOfIssue: 'sample string 16',
        CivilIdPlaceOfIssue: 'sample string 17',
        PassportNumber: 'sample string 18',
        PassportIsueDate: 'sample string 19',
        PassportIssuePlace: 'sample string 20',
        MaritalStatusId: 21,
        EducationalLevelId: 22,
        EducationLevel_Other: 'sample string 23',
        JobDetailsId: 24,
        JobDetails_Other: 'sample string 25',
        TheLastAuditedStatement: 26.1,
        ResidentAddress: 'sample string 27',
        Mobile: 'sample string 28',
        Email: 'sample string 29',
      },
      FinancialMatter: {
        Id: 1,
        AccountDetailsId: 2,
        BankName: 'sample string 3',
        DateofFirstDealing: '2020-06-24T13:14:05.5128099+04:00',
        ObtainedAmount: 5.1,
        FundSourceId: 6,
        AdditionalIncome: 'sample string 7',
        MonthlyIncomeId: 8,
        MonthlyCommercialTransactionEstimate: 9.1,
        AnnualCommercialTransactionEstimate: 10.1,
        NatureofBuissinessWithBank: 'sample string 11',
      },
    };

    var formBody = [];
    for (var property in params) {
      var encodedKey = decodeURIComponent(property);
      var encodedValue = decodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const restApi = new RestApi({
      controller: 'api/users/AccountDetailsCompany',
    });
    try {
      let response = await restApi.post({
        url: '',
        body: formBody,
        cancelable: true,
        showAlerts: true,
      });
      console.log(response, 'CreateComapny');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  confirmsmsTocken = async params => {
    const restApi = new RestApi({controller: 'Inspection'});
    try {
      let response = await restApi.post({
        url: 'GetVehicleViolator',
        body: {
          plateSource: params.plateSource,
          plateNumber: params.plateNumber,
          chassisNumber: params.chassisNumber,
          plateKind: params.plateKind,
          plateColor: params.plateColor,
        },
        cancelable: true,
        showAlerts: true,
      });
      return response.data.result;
    } catch (error) {
      throw error;
    }
  };


  /* Booking Services */

  createBooking = async params => {
    var formBody = [];
    for (var property in params) {
      var encodedKey = decodeURIComponent(property);
      var encodedValue = decodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const restApi = new RestApi({controller: 'api/booking/createbooking'});
    try {
      let response = await restApi.post({
        url: '',
        body: formBody,
        cancelable: true,
        showAlerts: true,
      });
  
      console.log(response, 'CreateBooking');
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  uploadProfilepicture = async uri => {};
}



