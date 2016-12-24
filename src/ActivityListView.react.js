import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';

import ActivityItem from './ActivityItem.react';
import styles from './styles';

function orderActivities(activities) {
  if (activities.length < 1) {
    return activities;
  }

  return activities.sort((activityA, activityB) => {
    const nextExpectedA = new Date();
    nextExpectedA.setTime(activityA.lastAction.getTime() + (activityA.frequencyHours * 60 * 60 * 1000));

    const nextExpectedB = new Date();
    nextExpectedB.setTime(activityB.lastAction.getTime() + (activityB.frequencyHours * 60 * 60 * 1000));

    if (nextExpectedB.getTime() < nextExpectedA.getTime()) {
      return 1;
    } else if (nextExpectedB.getTime() > nextExpectedA.getTime()) {
      return -1;
    }

    return 0;
  });
}

class ActivityListView extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(orderActivities(this.props.activities)),
    };
  }

  // This is the place to update state
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(orderActivities(nextProps.activities)),
    });
  }

  render() {
    let mainView;

    if (this.state.dataSource.getSectionLengths()[0] > 0) {
      mainView = (<ListView
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={activity => <ActivityItem onPress={this.props.handleIncrement} activity={activity} />}
      />);
    } else {
      mainView = (<View>
        <Text style={[styles.marginStandard, styles.centeredText20, styles.fontWhite]}>You don't have any activities yet.</Text>
        <Text style={[styles.marginStandard, styles.centeredText40, styles.fontWhite]}>¯\_(ツ)_/¯</Text>
        <Text onPress={this.props.onSample} style={[styles.marginStandard, styles.centeredText20, styles.fontWhite]}>Tap here to create a sample activity.</Text>
      </View>);
    }

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          {this.props.children}
        </View>
        {mainView}
      </View>
    );
  }
}

ActivityListView.propTypes = {
  activities: React.PropTypes.array,
  children: React.PropTypes.node,
  handleIncrement: React.PropTypes.func,
  onSample: React.PropTypes.func,
};

export default ActivityListView;
