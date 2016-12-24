import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Text, View, TouchableOpacity } from 'react-native';

import ActivityListView from './src/ActivityListView.react';
import ActivityFormView from './src/ActivityFormView.react';
import styles from './src/styles';
import daysAgo from './src/utils/daysAgo';

class GroundhogView extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    const activities = [];

    this.state = {
      activities: activities || [],
      currentView: 'formView',
      newFrequencyDays: 7,
      debugNewDaysAgo: 0,
    };
  }

  componentWillMount() {
    this.getActivities()
      .then(activities => {
        this.setState({
          activities: activities || [],
        });
      });
  }

  async getActivities() {
    return AsyncStorage.getItem('@groundhog:activities')
      .then(activities => (JSON.parse(activities) || [])
          .map(({ id, title, lastAction, frequencyHours }) => {
            const activity = {
              id,
              title,
              lastAction: new Date(lastAction),
              frequencyHours,
            };
            return activity;
          })
      );
  }

  async saveActivities(activities) {
    return AsyncStorage.setItem('@groundhog:activities', JSON.stringify(activities))
      .then(() => {
        this.setState({
          activities,
        });
      });
  }

  handleIncrement(id) {
    let activities = [];
    activities = this.state.activities.slice();
    const foundIndex = activities.findIndex(x => x.id === id);
    activities[foundIndex] = Object.assign({}, activities[foundIndex], {
      lastAction: new Date(),
    });
    this.setState({
      activities,
    });
  }

  render() {
    const handleIncrement = this.handleIncrement.bind(this);
    let view;

    const goToListView = ({ newTitle, newFrequencyDays, debugNewDaysAgo }) => {
      const activities = this.state.activities.slice();
      let newLastAction;
      if (debugNewDaysAgo) {
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
      this.saveActivities(activities);
    };

    const goToFormView = () => {
      this.setState({
        currentView: 'formView',
      });
    };

    const reset = async () => this.saveActivities([]);

    if (this.state.currentView === 'listView') {
      view = (
        <ActivityListView activities={this.state.activities} handleIncrement={handleIncrement}>
          <TouchableOpacity><Text style={styles.toolbarItem} onPress={goToFormView}>Add</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.toolbarItem} onPress={reset}>Reset</Text></TouchableOpacity>
        </ActivityListView>
      );
    } else {
      view = (
        <ActivityFormView onSave={goToListView} />
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
