import {createSelector} from 'reselect';
import {Dimensions} from 'react-native';

import en from '../../locales/en';
import ar from '../../locales/ar';

const {width, height} = Dimensions.get('screen');
export default (strings = createSelector(
  [state => state.key, state => state.language],
  (key, language) => {
    return language == 'English' ? en[key] : ar[key];
  },
));
export const localString = createSelector(
  [state => state.object, state => state.name, state => state.language],
  (object, name, language) => {
    return language == 'English'
      ? state.object[name]
      : state.object[name + 'A'];
  },
);

export const alignment = createSelector(
  [state => state],
  language => {
    return language == 'English' ? 'left' : 'right';
  },
);

export const normalizeFont = createSelector(
  [state => state],
  size => {
    return size * (width * 0.0025);
  },
);
