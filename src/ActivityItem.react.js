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
    const innerPlusButtonSmallStyle = `${urgency}RoundButtonInnerSmall`;
    const titleStyle = `${urgency}Title`;

    const onPress = () => {
      this.props.onPress(id);
    };

    let lastActionString = `${hoursSince} hours ago`;

    if (hoursSince >= 24) {
      let days = hoursSince / 24;
      lastActionString = `${days} days ago`;
    }

    const maxHeightOfBubble = 30;
    const heightOfBubble = maxHeightOfBubble - (maxHeightOfBubble * (hoursUntil / frequencyHours));

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
        <View style={[styles[plusButtonStyle], {backgroundColor: 'transparent'}]}>
          <View style={[styles[innerPlusButtonSmallStyle], {alignItems: 'center', justifyContent:'center',}]}>
            <View style={[styles[mainBgColor], {width: 30, height: heightOfBubble, bottom: 0, left: 0, position: 'absolute'}]}></View>
            <View style={{width: 30, height: 30, top: 0, left: 0}}>
              <Text style={{color: 'white', width: 30, height: 30, lineHeight: 30, textAlign: 'center'}}>{frequencyDays}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ActivityItem;