import {
  flureeBlue,
  flurple,
  twilight,
  white,
  lightGrey,
  transparent,
} from '../color';

const contained = (color) => ({
  backgroundColor: color,
  border: `2px solid ${color}`,
  fontSize: '1rem',
  color: white,
  '&:hover': {
    backgroundColor: white,
    color: color,
  },
  '&$disabled': {
    borderColor: transparent,
  },
});

const outlined = (color) => ({
  border: `2px solid ${color}`,
  padding: '8px 15px',
  fontSize: '1rem',
  color: color,
  '&:hover': {
    backgroundColor: color,
    color: white,
    borderWidth: '2px',
  },
  '&$disabled': {
    borderWidth: '2px',
    borderColor: lightGrey,
  },
});

const button = {
  root: {
    fontSize: '1rem',
    padding: '8px 15px',
    lineHeight: '16px',
    '&$disabled': {
      borderColor: '#979797',
    },
  },
  text: {
    fontWeight: 'bold',
  },
  textPrimary: {
    color: flureeBlue,
  },
  textSecondary: {
    color: flurple,
  },
  contained: contained(twilight),
  containedPrimary: contained(flureeBlue),
  containedSecondary: contained(flurple),
  outlined: outlined(twilight),
  outlinedPrimary: outlined(flureeBlue),
  outlinedSecondary: outlined(flurple),
  sizeSmall: {
    padding: '2px 10px',
    fontSize: '0.875rem',
  },
  sizeLarge: {
    padding: '14px 20px',
    fontSize: '1.25rem',
  },
};

export default button;
