import * as actionTypes from './constants';

const initialState = {
  defaultLanguage: 'English',
  loading: false,
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SAVE_LANGUAGE:
      return {
        ...state,
        loading: false,
        defaultLanguage: action.languageValue,
      };
    default:
      return state;
  }
};

export default languageReducer;
