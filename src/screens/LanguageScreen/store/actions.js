import * as actionTypes from './constants';

export const changeLanguage = () => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
  };
};

export const storeLanguage = value => {
  return {
    type: actionTypes.SAVE_LANGUAGE,
    languageValue: value,
  };
};
