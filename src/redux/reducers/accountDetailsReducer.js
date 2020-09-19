// Initial State
const initialState = {
  AccountDetails: {
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
  },
  CustomerInformation: {
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
    TheLastAuditedFinancialStatement: ""
  },
  CustomerAddressAndContactInformation: {
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
    OrganizationPhone: "",
    OrganizationFax: ""
  },
  FinancialMatter: {
    BankName: "",
    DateofFirstDealing: "",
    ObtainedAmount: 0,
    FundSourceId: 0,
    AdditionalIncome: "",
    MonthlyIncomeId: 0,
    MonthlyCommercialTransactionEstimate: 0,
    AnnualCommercialTransactionEstimate: 0,
    NatureofBuissinessWithBank: ""
  },
  CompanyInformation: {
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
    ExternalAuditorName: ""
  },
  BeneficiaryInformation: {
    FullName: "",
    FullNameAr: "",
    WhyAccountNotManagedByBeneficiary: "",
    MontherName: "",
    DateOfBirth: "",
    PlaceOfBirth: "",
    NationalityId: 0,
    HasAnotherNationality: true,
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
    EducationalLevelId: 0,
    EducationLevel_Other: "",
    JobDetailsId: 0,
    JobDetails_Other: "",
    TheLastAuditedStatement: 0,
    ResidentAddress: "",
    BeneficiaryMobile: "",
    BeneficiaryEmail: ""
  }
};

// Reducers (Modifies The State And Returns A New State)
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ACCOUNT_INFO': {
      return {
        // State
        ...state,
        // Redux Store
        [action.payload.property]: action.payload.propertyvalue,
      }
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default accountReducer;