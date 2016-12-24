import { StyleSheet } from 'react-native';

const red = '#8B0909';
const darkRed = '#670606';

const orange = '#AC6600';
const darkOrange = '#7F4C00';

const green = '#417505';
const darkGreen = '#305603';

const itemContainerShared = {
  flex: 1,
  flexDirection: 'row',
  padding: 2,
  paddingLeft: 12,
  paddingRight: 12,
  alignItems: 'center',
};
const roundButtonShared = {
  borderRadius: 15,
  width: 30,
  height: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};
const titleShared = {
  flex: 1,
  padding: 10,
};

export default StyleSheet.create({
  // Toolbar
  toolbarItem: {
    padding: 12,
    color: 'white',
  },
  marginStandard: {
    margin: 12,
  },
  // Activity List
  roundButton: roundButtonShared,
  centeredText12: {
    fontSize: 12,
    lineHeight: 12,
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
    width: 30,
    height: 30,
    color: 'white',
    lineHeight: 30,
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
  urgentRoundButtonInner: Object.assign({}, {
    color: 'white',
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
  soonRoundButtonInner: Object.assign({}, {
    color: 'white',
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
  recentRoundButtonInner: Object.assign({}, {
    color: 'white',
  }),
  recentTitle: Object.assign({}, titleShared),
});
