import React, { Component } from 'react';
import { ListView, View } from 'react-native';

import ActivityItem from './ActivityItem.react';
import EmptyActivityItem from './EmptyActivityItem.react';

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
      mainView = (
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={activity => <ActivityItem onPress={this.props.handleIncrement} activity={activity} android={this.props.android} />}
        />
      );
    } else {
      mainView = (<View>
        <EmptyActivityItem onPress={this.props.onSample} android={this.props.android} />
      </View>);
    }

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
  android: React.PropTypes.bool,
};

export default ActivityListView;
