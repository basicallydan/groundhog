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
const roundButtonInnerShared = {
  fontSize: 25,
  lineHeight: 25,
};
const titleShared = {
  flex: 1,
  padding: 10,
};

export default StyleSheet.create({
  urgentBackgroundColor: {
    backgroundColor: darkRed,
  },
  urgentItem: Object.assign({}, itemContainerShared, {
    backgroundColor: red,
  }),
  urgentRoundButton: Object.assign({}, roundButtonShared, {
    backgroundColor: darkRed,
  }),
  urgentRoundButtonInner: Object.assign({}, roundButtonInnerShared, {
    color: 'white',
  }),
  urgentRoundButtonInnerSmall: Object.assign({}, roundButtonInnerShared, {
    color: 'white',
    fontSize: 12,
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
  soonRoundButtonInner: Object.assign({}, roundButtonInnerShared, {
    color: 'white',
  }),
  soonRoundButtonInnerSmall: Object.assign({}, roundButtonInnerShared, {
    color: 'white',
    fontSize: 12,
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
  recentRoundButtonInner: Object.assign({}, roundButtonInnerShared, {
    color: 'white',
  }),
  recentRoundButtonInnerSmall: Object.assign({}, roundButtonInnerShared, {
    color: 'white',
    fontSize: 12,
  }),
  recentTitle: Object.assign({}, titleShared),
});
