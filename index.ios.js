import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import ActivityListView from './src/ActivityListView.react';

function daysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

class GroundhogView extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const activities = [
      {
        // 7 days ago
        id: 1,
        title: 'Water the peace lily',
        lastAction: daysAgo(7.5),
        // Hours
        frequencyHours: 8 * 24,
      },
      {
        // 9 days ago
        id: 2,
        title: 'Deep-clean the bathroom',
        lastAction: daysAgo(13),
        // Hours
        frequencyHours: 14 * 24,
      },
      {
        // 0 days ago
        id: 3,
        title: 'Shave',
        lastAction: daysAgo(0),
        // Hours
        frequencyHours: 3 * 24,
      },
      {
        // 11 days ago
        id: 4,
        title: 'Clean shoes',
        lastAction: daysAgo(11),
        // Hours
        frequencyHours: 14 * 24,
      },
      {
        // 0.5 days ago
        id: 5,
        title: 'Call mum',
        lastAction: daysAgo(0.5),
        // Hours
        frequencyHours: 7 * 24,
      },
    ];

    this.state = {
      activities,
      currentView: 'listView',
    };
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
    };

    const goToFormView = () => {
      this.setState({
        currentView: 'formView',
      });
    };

    if (this.state.currentView === 'listView') {
      view = (
        <ActivityListView activities={this.state.activities} handleIncrement={handleIncrement}>
          <Text onPress={goToFormView}>Add</Text>
        </ActivityListView>
      );
    } else {
      view = (
        <View>
          <Text onPress={goToListView}>Save</Text>
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
