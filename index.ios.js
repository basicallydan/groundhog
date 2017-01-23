import React, { Component } from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';

import ActivityListView from './src/ActivityListView.react';
import ActivityFormView from './src/ActivityFormView.react';
import daysAgo from './src/utils/daysAgo';
import hoursAgo from './src/utils/hoursAgo';
import { saveActivities, getActivities, clearActions, getActions, saveAction } from './src/storage';

class GroundhogView extends Component {
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
        />
      );
    } else {
      view = (
        <ActivityFormView sampleActivity={this.state.sampleActivity} onSave={saveAndGoToListView} onCancel={goToListView} activities={this.state.activities} />
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 22, backgroundColor: '#303030' }}>
        {view}
      </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('groundhog', () => GroundhogView);
