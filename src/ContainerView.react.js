import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import ActivityListView from './ActivityListView.react';
import ActivityFormView from './ActivityFormView.react';
import daysAgo from './utils/daysAgo';
import hoursAgo from './utils/hoursAgo';
import { saveActivities, getActivities, clearActions, getActions, saveAction } from './storage';
import { colors } from './styles';

export default class ContainerView extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    const activities = [];

    this.state = {
      activities: activities || [],
      currentView: 'listView',
      newFrequencyDays: 7,
      debugNewDaysAgo: 0,
    };
  }

  componentWillMount() {
    getActivities()
      .then(activities => {
        this.setState({
          activities: activities || [],
        });
      });
    getActions()
      .then(actions => {
        console.log('Existing actions:');
        console.log(actions);
      });

    StatusBar.setBarStyle('light-content', true);
  }

  handleIncrement(id) {
    let activities = [];
    activities = this.state.activities.slice();
    const foundIndex = activities.findIndex(x => x.id === id);
    const lastAction = new Date();
    activities[foundIndex] = Object.assign({}, activities[foundIndex], {
      lastAction,
    });
    saveAction(id, lastAction);
    saveActivities(activities)
      .then(() => this.setState({ activities }));
  }

  handleDelete(id) {
    let activities = [];
    activities = this.state.activities.slice();
    const foundIndex = activities.findIndex(x => x.id === id);
    if (foundIndex < 0) return;
    activities.splice(foundIndex, 1);
    saveActivities(activities)
      .then(() => this.setState({ activities }));
  }

  render() {
    const handleIncrement = this.handleIncrement.bind(this);
    const handleDelete = this.handleDelete.bind(this);
    let view;

    const saveAndGoToListView = ({ newTitle, newFrequencyDays, newHoursAgo, debugNewDaysAgo }) => {
      const activities = this.state.activities.slice();
      let newLastAction;
      if (newHoursAgo) {
        newLastAction = hoursAgo(newHoursAgo);
      } else if (debugNewDaysAgo) {
        newLastAction = daysAgo(debugNewDaysAgo);
      } else {
        newLastAction = new Date();
      }
      activities.push({
        id: activities.reduce((nextId, activity) => Math.max(nextId, activity.id + 1), 1),
        title: newTitle,
        lastAction: newLastAction,
        frequencyHours: (+newFrequencyDays) * 24,
      });
      this.setState({
        activities,
        currentView: 'listView',
      });
      saveActivities(activities)
        .then(() => this.setState({ activities }));
    };

    const goToListView = () => {
      this.setState({
        currentView: 'listView',
      });
    };

    const goToFormView = () => {
      this.setState({
        sampleActivity: undefined,
        currentView: 'formView',
      });
    };

    const goToSampleForm = () => {
      this.setState({
        sampleActivity: {
          title: 'Water plants',
          frequencyHours: 7 * 24,
        },
        currentView: 'formView',
      });
    };

    const reset = async () => {
      clearActions();
      return saveActivities([]).then(() => this.setState({ activities: [] }));
    };

    if (this.state.currentView === 'listView') {
      view = (
        <ActivityListView
          onSample={goToSampleForm}
          activities={this.state.activities}
          onIncrementButtonPress={handleIncrement}
          onDeleteButtonPress={handleDelete}
          onAddButtonPress={goToFormView}
          onResetButtonPress={reset}
          android={this.props.android}
        />
      );
    } else {
      view = (
        <ActivityFormView sampleActivity={this.state.sampleActivity} onSave={saveAndGoToListView} onCancel={goToListView} activities={this.state.activities} />
      );
    }

    const viewStyle = {
      flex: 1,
      backgroundColor: colors.mainBackgroundColor,
    };

    if (!this.props.android) {
      viewStyle.paddingTop = 22;
    }

    return (
      <View style={viewStyle}>
        {view}
      </View>
    );
  }
}

ContainerView.propTypes = {
  android: React.PropTypes.bool,
};

ContainerView.defaultProps = {
  android: false,
};
