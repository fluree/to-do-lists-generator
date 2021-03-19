import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  flureeBlue,
  flurple,
  twilight,
  alert,
  warning,
  positive,
  darkGrey,
  lightGrey,
  blizzard,
  white,
  defaultBackground,
  fieldBackground,
} from './styles/FlureeTheme/color';
import buttonGroup from './styles/FlureeTheme/overrides/buttonGroup';
import button from './styles/FlureeTheme/overrides/button';
import filledInput from './styles/FlureeTheme/overrides/filledInput';
import { typography } from './styles/FlureeTheme/typography';
import App from './App';
import reportWebVitals from './reportWebVitals';

const flureeBasic = {
  palette: {
    background: {
      default: defaultBackground,
      paper: fieldBackground,
    },
    primary: {
      main: flureeBlue,
      contrastText: white,
    },
    secondary: {
      main: flurple,
      contrastText: white,
    },
    info: {
      main: twilight,
    },
    error: {
      main: alert,
    },
    success: {
      main: positive,
    },
    warning: {
      main: warning,
    },
    text: {
      primary: twilight,
      secondary: twilight,
      disabled: darkGrey,
      hint: lightGrey,
    },
    divider: blizzard,
    action: { disabled: lightGrey },
  },
  shape: {
    borderRadius: '2px',
  },
  typography: { ...typography },
  overrides: {
    MuiButtonGroup: { ...buttonGroup },
    MuiButton: { ...button },
    MuiInputBase: {
      root: {
        '&$focused': {
          backgroundColor: '#F3F3F3',
        },
      },
      input: {
        fontFamily: 'Open Sans',
        fontSize: '0.875rem',
        lineHeight: '24px',
      },
      focused: {},
    },
    MuiInputLabel: {
      root: {
        fontFamily: 'Open Sans',
        fontSize: '0.875rem',
        '&$focused': {
          lineHeight: '12px',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        fontFamily: 'Open Sans',
        lineHeight: '12px',
        color: darkGrey,
        '&$error': {},
      },
    },
    MuiFilledInput: filledInput,
    MuiRadio: {
      root: {
        '&$disabled': {
          color: '#C1C1C1',
        },
      },
      // primaryColor: {
      //   "&$disabled": {
      //     color: "#C1C1C1",
      //   },
      // },
      // secondaryColor: {
      //   "&$disabled": {
      //     color: "#C1C1C1",
      //   },
      // },
    },
    MuiDialogTitle: {
      root: {
        fontSize: '1.25rem',
        fontStyle: 'normal',
        fontWeight: 'bold',
        letterSpacing: '0.0015em',
      },
    },
    MuiDialogContentText: {
      root: {
        fontFamily: 'Open Sans',
        lineHeight: '28px',
        fontSize: '0.875rem',
        color: darkGrey,
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      },
    },
    MuiCardHeader: {
      root: {
        backgroundColor: flureeBlue,
        alignItems: 'flex-end',
      },
      title: {
        color: white,
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontStyle: 'normal',
        bottom: '20px',
        alignItem: 'flex-end',
      },
      subheader: {
        color: white,
      },
      content: {
        justifyContent: 'flex-end',
      },
    },
  },
};

const flureeTheme = createMuiTheme(flureeBasic);

ReactDOM.render(
  <ThemeProvider theme={flureeTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
