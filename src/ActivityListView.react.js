import React, { Component } from 'react';
import { ListView, View, Text, TouchableOpacity } from 'react-native';

import ActivityItem from './ActivityItem.react';
import EmptyActivityItem from './EmptyActivityItem.react';
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
    const initialEditMode = false;

    this.state = {
      editMode: initialEditMode,
      dataSource: ds.cloneWithRows(this.getActivitiesForDataSource(this.props.activities, initialEditMode)),
    };
  }

  // This is the place to update state
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.getActivitiesForDataSource(nextProps.activities, this.state.editMode)),
    });
  }

  getActivitiesForDataSource(activities, editMode) {
    return orderActivities(activities).map(activity => Object.assign({}, activity, { editMode }));
  }

  toggleEditMode() {
    const newEditMode = !this.state.editMode;
    this.setState({
      editMode: newEditMode,
      dataSource: this.state.dataSource.cloneWithRows(this.getActivitiesForDataSource(this.props.activities, newEditMode)),
    });
  }

  render() {
    let mainView;
    const debug = false;

    if (this.state.dataSource.getSectionLengths()[0] > 0) {
      mainView = (
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={activity => <ActivityItem onPress={this.props.onIncrementButtonPress} onDelete={this.props.onDeleteButtonPress} editMode={this.state.editMode} activity={activity} android={this.props.android} />}
        />
      );
    } else {
      mainView = (<View>
        <EmptyActivityItem onPress={this.props.onSample} android={this.props.android} />
      </View>);
    }

    const toggleEditMode = this.toggleEditMode.bind(this);

    const editButtonText = this.state.editMode ? 'Done' : 'Edit';

    let resetButton;

    if (debug) {
      resetButton = (<TouchableOpacity><Text style={styles.toolbarItem} onPress={this.props.onResetButtonPress}>Reset</Text></TouchableOpacity>);
    }

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity><Text style={styles.toolbarItem} onPress={toggleEditMode}>{editButtonText}</Text></TouchableOpacity>
          {resetButton}
          <TouchableOpacity><Text style={styles.toolbarItem} onPress={this.props.onAddButtonPress}>Add</Text></TouchableOpacity>
        </View>
        {mainView}
      </View>
    );
  }
}

ActivityListView.propTypes = {
  activities: React.PropTypes.array,
  children: React.PropTypes.node,
  onIncrementButtonPress: React.PropTypes.func.isRequired,
  onDeleteButtonPress: React.PropTypes.func.isRequired,
  onAddButtonPress: React.PropTypes.func.isRequired,
  onResetButtonPress: React.PropTypes.func.isRequired,
  onSample: React.PropTypes.func,
  android: React.PropTypes.bool,
};

export default ActivityListView;
