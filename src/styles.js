import { StyleSheet } from 'react-native';

const red = '#8B0909';
const darkRed = '#670606';

const orange = '#AC6600';
const darkOrange = '#7F4C00';

const green = '#417505';
const darkGreen = '#305603';

export const roundButtonWidth = 40;

export const standardMargin = 14;

const itemContainerShared = {
  flexDirection: 'row',
  padding: standardMargin / 2,
  paddingLeft: standardMargin,
  paddingRight: standardMargin,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 1,
};
const roundButtonShared = {
  borderRadius: roundButtonWidth / 2,
  width: roundButtonWidth,
  height: roundButtonWidth,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: '#5f5f5f',
};
const roundButtonInnerShared = {
  width: roundButtonWidth,
};
const titleShared = {
  flex: 1,
  padding: 10,
};

export default StyleSheet.create({
  // Toolbar
  toolbarItem: {
    padding: standardMargin,
    color: 'white',
  },
  marginStandard: {
    margin: standardMargin,
  },
  // Activity List
  itemContainer: itemContainerShared,
  roundButton: roundButtonShared,
  roundButtonInner: roundButtonInnerShared,
  roundButtonInnerVariableHeight: {
    width: roundButtonWidth,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  itemTitle: titleShared,
  centeredText12: {
    fontSize: 12,
    lineHeight: 12,
  },
  centeredText16: {
    fontSize: 16,
    lineHeight: 16,
    justifyContent: 'center',
    textAlign: 'center',
  },
  centeredText20: {
    fontSize: 20,
    lineHeight: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  centeredText25: {
    fontSize: 25,
    lineHeight: 26,
    justifyContent: 'center',
    textAlign: 'center',
  },
  centeredText40: {
    fontSize: 40,
    lineHeight: 40,
    justifyContent: 'center',
    textAlign: 'center',
  },
  frequencyText: {
    width: roundButtonWidth,
    height: roundButtonWidth,
    color: 'white',
    lineHeight: roundButtonWidth,
    textAlign: 'center',
  },
  fontWhite: {
    color: 'white',
  },

  urgentBackgroundColor: {
    backgroundColor: darkRed,
  },
  urgentItem: Object.assign({}, itemContainerShared, {
    backgroundColor: red,
  }),
  urgentRoundButton: Object.assign({}, roundButtonShared, {
    backgroundColor: darkRed,
  }),
  urgentTitle: Object.assign({}, titleShared),

  soonBackgroundColor: {
    backgroundColor: darkOrange,
  },
  soonItem: Object.assign({}, itemContainerShared, {
    backgroundColor: orange,
  }),
  soonRoundButton: Object.assign({}, roundButtonShared, {
    backgroundColor: darkOrange,
  }),
  soonTitle: Object.assign({}, titleShared),

  recentBackgroundColor: {
    backgroundColor: darkGreen,
  },
  recentItem: Object.assign({}, itemContainerShared, {
    backgroundColor: green,
  }),
  recentRoundButton: Object.assign({}, roundButtonShared, {
    backgroundColor: darkGreen,
  }),
  recentTitle: Object.assign({}, titleShared),
});
