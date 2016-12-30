import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';

import styles, { roundButtonWidth } from './styles';
import hoursBetween from './utils/hoursBetween';
import roundHalf from './utils/roundHalf';

const maskSources = {
  urgent: require('./img/urgent-round-mask-40.png'),
  soon: require('./img/soon-round-mask-40.png'),
  recent: require('./img/recent-round-mask-40.png'),
};

class ActivityItem extends Component {
  render() {
    const { id, title, lastAction, frequencyHours, editMode } = this.props.activity;
    const frequencyDays = frequencyHours / 24;
    const hoursSince = hoursBetween(lastAction, new Date());
    const hoursUntil = frequencyHours - hoursSince;

    let urgency = 'recent';

    if (hoursUntil < 48) {
      urgency = 'soon';
    }

    if (hoursUntil < 24) {
      urgency = 'urgent';
    }

    const mainBgColor = `${urgency}BackgroundColor`;
    const itemStyle = `${urgency}Item`;
    const plusButtonStyle = `${urgency}RoundButton`;
    const titleStyle = `${urgency}Title`;

    const onPress = () => {
      this.props.onPress(id);
    };

    let lastActionString = `${hoursSince} hours ago`;

    if (hoursSince === 1) {
      lastActionString = 'An hour ago';
    }

    if (hoursSince >= 24) {
      const days = roundHalf(hoursSince / 24);
      if (days === 1) {
        lastActionString = `${days} day ago`;
      } else {
        lastActionString = `${days} days ago`;
      }
    } else if (hoursSince < 1) {
      lastActionString = 'In the last hour';
    }

    const maxHeightOfBubble = roundButtonWidth;
    const heightOfBubble = maxHeightOfBubble - (maxHeightOfBubble * (hoursUntil / frequencyHours));

    let itemStyles = [styles[itemStyle]];
    let titleStyles = [styles[titleStyle]];
    const addButtonInnerStyles = [styles.roundButtonInner, styles.fontWhite, styles.centeredText25];
    const frequencyTextContainerStyles = [styles.roundButtonInner, styles.fontWhite, styles.centeredText16];

    let firstColumn = (
      <TouchableHighlight style={[styles[plusButtonStyle]]} onPress={onPress}>
        <Text style={addButtonInnerStyles}>+</Text>
      </TouchableHighlight>
    );
    let finalColumn = (
      <View style={[styles.roundButton, { backgroundColor: 'transparent' }]}>
        <Image
          style={{ position: 'absolute', zIndex: 100 }}
          source={maskSources[urgency]}
        />
        <View style={[styles.roundButtonInnerVariableHeight, styles[mainBgColor], { height: heightOfBubble }]} />
        <Text style={[frequencyTextContainerStyles]}>{frequencyDays}</Text>
      </View>
    );

    if (editMode) {
      const deleteItem = () => {
        this.props.onDelete(id);
      };
      firstColumn = null;
      itemStyles = [styles.itemContainer];
      titleStyles.push({ paddingLeft: 0 });
      finalColumn = (
        <TouchableHighlight style={[styles.urgentRoundButton, { alignItems: 'center', backgroundColor: 'transparent', borderColor: '#5f5f5f', borderWidth: 1, borderStyle: 'solid' }]} onPress={deleteItem}>
          <Text style={[styles.roundButtonInner, styles.fontWhite, styles.text20, { textAlign: 'center', color: 'red' }]}>✕</Text>
        </TouchableHighlight>
      );
    }

    if (this.props.android) {
      addButtonInnerStyles.push({ top: -2 });
      frequencyTextContainerStyles.push({ top: -2 });
    }

    return (
      <View style={itemStyles}>
        {firstColumn}
        <View style={titleStyles}>
          <Text style={{ flex: 0, fontWeight: 'bold', color: 'white' }}>
            {title}
          </Text>
          <Text style={{ flex: 0, color: 'white' }}>
            {lastActionString}
          </Text>
        </View>
        {finalColumn}
      </View>
    );
  }
}

ActivityItem.propTypes = {
  activity: React.PropTypes.object,
  onPress: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  android: React.PropTypes.bool,
  editMode: React.PropTypes.bool.isRequired,
};

export default ActivityItem;
