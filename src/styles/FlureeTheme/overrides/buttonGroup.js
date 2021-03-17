import { flureeBlue, flurple, twilight, white } from '../color';

const contained = (color) => ({
  color: white,
  background: color,
  border: `2px solid ${color}`,
  '&:not(:last-child)': {
    borderColor: color,
  },
  '&:hover': {
    background: '#FFFFFF',
    color: color,
    borderColor: color,
    // borderWidth: "2px"
  },
});

const buttonGroup = {
  groupedContained: contained(twilight),
  groupedContainedHorizontal: {
    // "&:not(:last-child)": {
    //   borderRight: `2px solid ${white}`,
    // },
  },
  groupedOutlined: {
    color: twilight,
    background: 'rgba(0, 0, 0, 0)',
    '&:hover': {
      background: twilight,
      color: '#FFFFFF',
    },
  },
  groupedContainedPrimary: contained(flureeBlue),
  groupedOutlinedPrimary: {
    color: flureeBlue,
    background: 'rgba(0, 0, 0, 0)',
    '&:hover': {
      background: flureeBlue,
      color: '#FFFFFF',
    },
  },
  groupedContainedSecondary: contained(flurple),
  groupedOutlinedSecondary: {
    color: flurple,
    background: 'rgba(0, 0, 0, 0)',
    '&:hover': {
      background: flurple,
      color: '#FFFFFF',
    },
  },
};

export default buttonGroup;
