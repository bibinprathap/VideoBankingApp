// Imports: Dependencies
import {combineReducers} from 'redux';
import bankProfileReducer from './bankProfileReducer';
import environmentReducer from './environmentReducer';
import bookingReducer from './bookingReducer';
import attachmentReducer from './attachmentReducer';
import accountReducer from './accountDetailsReducer'
import languageReducer from '../../screens/LanguageScreen/store/reducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  language: languageReducer,
  bankProfileReducer: bankProfileReducer,
  bookingReducer: bookingReducer,
  environmentReducer: environmentReducer,
  attachments:attachmentReducer,
  accountReducer: accountReducer
});

// Exports
export default rootReducer;
