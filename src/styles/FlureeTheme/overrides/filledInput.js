import {
  flureeBlue,
  flurple,
  textFieldBack,
  darkGrey,
  twilight,
  alert,
  fieldBackground,
} from '../color.js';

const filledInput = {
  root: {
    backgroundColor: textFieldBack,
    caretColor: flureeBlue,
    color: darkGrey,
    '&$focused': {
      color: twilight,
      backgroundColor: fieldBackground,
    },
    '&$error': {
      caretColor: alert,
    },
    '&$disabled': {
      color: 'rgba(0, 0, 0, 0.54)',
      backgroundColor: textFieldBack,
    },
  },
  colorSecondary: {
    caretColor: flurple,
  },
  underline: {
    '&$disabled:before': {
      borderBottomStyle: 'solid',
    },
  },
};

export default filledInput;
