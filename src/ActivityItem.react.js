import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import styles from './styles';
import hoursBetween from './utils/hoursBetween';

class ActivityItem extends Component {
  render() {
    const { id, title, lastAction, frequencyHours } = this.props.activity;
    const frequencyDays = frequencyHours / 24;
    const hoursSince = hoursBetween(lastAction, new Date());
    const hoursUntil = frequencyHours - hoursSince;

    console.log(title, 'days until:', hoursUntil);

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
    const innerPlusButtonStyle = `${urgency}RoundButtonInner`;
    const titleStyle = `${urgency}Title`;

    const onPress = () => {
      this.props.onPress(id);
    };

    let lastActionString = `${hoursSince} hours ago`;

    if (hoursSince >= 24) {
      const days = hoursSince / 24;
      lastActionString = `${days} days ago`;
    }

    const maxHeightOfBubble = 30;
    const heightOfBubble = maxHeightOfBubble - (maxHeightOfBubble * (hoursUntil / frequencyHours));

    return (
      <View style={styles[itemStyle]}>
        <TouchableHighlight style={styles[plusButtonStyle]} onPress={onPress}>
          <Text style={[styles[innerPlusButtonStyle], styles.centeredText25]}>+</Text>
        </TouchableHighlight>
        <View style={styles[titleStyle]}>
          <Text style={{ flex: 0, fontWeight: 'bold', color: 'white' }}>
            {title}
          </Text>
          <Text style={{ flex: 0, color: 'white' }}>
            {lastActionString}
          </Text>
        </View>
        <View style={[styles.roundButton, { backgroundColor: 'transparent' }]}>
          <View style={[styles[mainBgColor], { width: 30, height: heightOfBubble, bottom: 0, left: 0, position: 'absolute' }]} />
          <View style={[{ width: 30, height: 30, top: 0, left: 0 }]}>
            <Text style={styles.frequencyText}>{frequencyDays}</Text>
          </View>
        </View>
      </View>
    );
  }
}

ActivityItem.propTypes = {
  activity: React.PropTypes.object,
  onPress: React.PropTypes.func,
};

export default ActivityItem;
