import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AuthScreen from './components/AuthScreen';
import VideoScreen from './components/VideoScreen';
import CreateScreen from './components/CreateScreen';
// import CreateScreenArabic from './components/CreateScreen/CreateScreenArabic';
import Attachments from './components/dialog/Attachments';
import OTPScreen from './components/OTPScreen';
// import OTPScreenArabic from './components/OTPScreen/OTPArabicScreen';
import ScanDocumentScreen from './components/ScanRequired';
// import ScanRequiredArabic from './components/ScanRequired/ScanRequiredArabic';
import ProfileScreen from './components/ProfileImage';
// import ProfileScreenArabic from './components/ProfileImage/ProfileImageArabic';
import DigitalScreen from './components/DigitalScreen';
// import DigitalScreenArabic from './components/DigitalScreen/DigitalScreenArabic';
import FormScreen from './components/FormScreen';
import TermsCondition from './screens/TermsConditionScreen';
import FormScreenArabic from './components/FormScreen/FormScreenArabic';
import ConcratzScreen from './components/ConcratzScreen';
import ConcratzScreenArabic from './components/ConcratzScreen/ConcratzScreenArabic';
import LoginScreen from './screens/LoginScreen';
import VideoCall from './components/CallScreen';
import LanguageScreen from './screens/LanguageScreen';
import BookYourAppointment from './screens/BookYourAccount';
import ScheduleScreen from './screens/SheduleYourAppointment';
import BookingConcratz from './screens/BookingConcratz';
import TryAnotherCall from './screens/TryAnotherCall';
import ScheduleAppointmentOther from './screens/ScheduleAppointmentOther';
import {connect} from 'react-redux';
const AuthStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    BookAppoint: {screen: BookYourAppointment},
    Schedule: {screen: ScheduleScreen},
    BookingConcratz: {screen: BookingConcratz},
    Create: {
      screen: CreateScreen,
    },
    Otp: {
      screen: OTPScreen,
    },
    ScanDocument: {
      screen: ScanDocumentScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Digital: {screen: DigitalScreen},
    Form: {screen: FormScreen},
    Terms: {screen: TermsCondition},
    TryAnotherCall: {screen: TryAnotherCall},
    ScheduleOtherAppointment: {screen: ScheduleAppointmentOther},
    VideoCall: {screen: VideoCall},
    Concratz: {screen: ConcratzScreen},
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const AuthStack_AR = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    CreateArabic: {
      screen: CreateScreen,
    },
    OTPScreenArabic: {
      screen: OTPScreen,
    },
    ScanRequiredArabic: {
      screen: ScanDocumentScreen,
    },
    ProfileScreenArabic: {
      screen: ProfileScreen,
    },
    DigitalScreenArabic: {screen: DigitalScreen},
    FormScreenArabic: {screen: FormScreenArabic},
    VideoCall: {screen: VideoCall},
    ConcratzScreenArabic: {screen: ConcratzScreenArabic},
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const StackNavigator = createStackNavigator(
  {
    Language: {
      screen: LanguageScreen,
    },
    AuthScreen: {
      screen: AuthStack,
    },
    AuthStack_AR: {screen: AuthStack_AR},
    VideoScreen: {
      screen: VideoScreen,
    },
    attachments: {
      screen: Attachments,
    },
  },
  {
    initialRouteName: 'Language',
    headerMode: 'none',
  },
);

export default connect(null)(createAppContainer(StackNavigator));
