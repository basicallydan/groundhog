import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Text, View, TouchableOpacity } from 'react-native';

import ActivityListView from './src/ActivityListView.react';
import styles from './src/styles';

function daysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

class GroundhogView extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    // const activities = [
    //   {
    //     // 7 days ago
    //     id: 1,
    //     title: 'Water the peace lily',
    //     lastAction: daysAgo(7.5),
    //     // Hours
    //     frequencyHours: 8 * 24,
    //   },
    //   {
    //     // 9 days ago
    //     id: 2,
    //     title: 'Deep-clean the bathroom',
    //     lastAction: daysAgo(13),
    //     // Hours
    //     frequencyHours: 14 * 24,
    //   },
    //   {
    //     // 0 days ago
    //     id: 3,
    //     title: 'Shave',
    //     lastAction: daysAgo(0),
    //     // Hours
    //     frequencyHours: 3 * 24,
    //   },
    //   {
    //     // 11 days ago
    //     id: 4,
    //     title: 'Clean shoes',
    //     lastAction: daysAgo(11),
    //     // Hours
    //     frequencyHours: 14 * 24,
    //   },
    //   {
    //     // 0.5 days ago
    //     id: 5,
    //     title: 'Call mum',
    //     lastAction: daysAgo(0.5),
    //     // Hours
    //     frequencyHours: 7 * 24,
    //   },
    // ];

    const activities = [];

    this.state = {
      activities: activities || [],
      currentView: 'listView',
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

    const goToListView = () => {
      const activities = this.state.activities.slice();
      activities.push({
        id: activities.reduce((nextId, activity) => Math.max(nextId, activity.id + 1), 1),
        title: 'Do the thing',
        lastAction: new Date(),
        frequencyHours: 7 * 24,
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
        <View>
          <TouchableOpacity><Text style={styles.toolbarItem} onPress={goToListView}>Save</Text></TouchableOpacity>
        </View>
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
