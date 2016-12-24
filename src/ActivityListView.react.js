import React, { Component } from 'react';
import { ListView, View } from 'react-native';

import ActivityItem from './ActivityItem.react';

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
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          {this.props.children}
        </View>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={activity => <ActivityItem onPress={this.props.handleIncrement} activity={activity} />}
        />
      </View>
    );
  }
}

ActivityListView.propTypes = {
  activities: React.PropTypes.array,
  children: React.PropTypes.node,
  handleIncrement: React.PropTypes.func,
};

export default ActivityListView;
