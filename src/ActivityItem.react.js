import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, TouchableHighlight } from 'react-native';

import styles from './styles';

function hoursBetween(firstDate, secondDate) {
  // The number of milliseconds in one day
  var ONE_HOUR = 1000 * 60 * 60;

  // Convert both dates to milliseconds
  var firstDateMilliseconds = firstDate.getTime();
  var secondDateMilliseconds = secondDate.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(firstDateMilliseconds - secondDateMilliseconds);

  // Convert back to hours and return
  return Math.round(difference_ms/ONE_HOUR)
}

class ActivityItem extends Component {
  render() {
    const { id, title, lastAction, frequencyHours } = this.props.activity;
    const frequencyDays = frequencyHours / 24;
    const copiedDate = new Date(lastAction.getTime());
    const nextDateExpected = copiedDate.setDate(lastAction.getDate() + frequencyDays);
    const hours = hoursBetween(lastAction, new Date());
    const hoursUntil = frequencyHours - hours;

    console.log(title, 'days until:', hoursUntil);

    let urgency = 'recent';

    if (hoursUntil < 48) {
      urgency = 'soon';
    }

    if (hoursUntil < 24) {
      urgency = 'urgent';
    }

    const itemStyle = `${urgency}Item`;
    const plusButtonStyle = `${urgency}RoundButton`;
    const innerPlusButtonStyle = `${urgency}RoundButtonInner`;
    const innerPlusButtonSmallStyle = `${urgency}RoundButtonInnerSmall`;
    const titleStyle = `${urgency}Title`;

    const onPress = () => {
      this.props.onPress(id);
    };

    let lastActionString = `${hours} hours ago`;

    if (hours >= 24) {
      let days = hours / 24;
      lastActionString = `${days} days ago`;
    }

    return (
      <View style={styles[itemStyle]}>
        <TouchableHighlight style={styles[plusButtonStyle]} onPress={onPress}>
          <Text style={styles[innerPlusButtonStyle]}>+</Text>
        </TouchableHighlight>
        <View style={styles[titleStyle]}>
          <Text style={{flex: 0, fontWeight: 'bold', color: 'white'}}>
            {title}
          </Text>
          <Text style={{flex: 0, color: 'white'}}>
            {lastActionString}
          </Text>
        </View>
        <View style={styles[plusButtonStyle]}><Text style={styles[innerPlusButtonSmallStyle]}>{frequencyDays}</Text></View>
      </View>
    );
  }
}

export default ActivityItem;