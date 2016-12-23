import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Text, TextInput, View, Slider, TouchableOpacity } from 'react-native';

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

    const goToListView = () => {
      const activities = this.state.activities.slice();
      let newLastAction;
      if (this.state.debugNewDaysAgo) {
        newLastAction = daysAgo(this.state.debugNewDaysAgo);
      } else {
        newLastAction = new Date();
      }
      activities.push({
        id: activities.reduce((nextId, activity) => Math.max(nextId, activity.id + 1), 1),
        title: this.state.newTitle,
        lastAction: newLastAction,
        frequencyHours: (+this.state.newFrequencyDays) * 24,
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

    const debugDayAgo = () => {
      let debugNewDaysAgo = this.state.debugNewDaysAgo;
      if (!debugNewDaysAgo) debugNewDaysAgo = 1;
      else if (debugNewDaysAgo === 15) debugNewDaysAgo = 0;
      else debugNewDaysAgo += 1;
      this.setState({
        debugNewDaysAgo,
      });
    };

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
          <TouchableOpacity onPress={goToListView} disabled={!this.state.newTitle}><Text style={styles.toolbarItem}>Save</Text></TouchableOpacity>
          <View>
            <View style={{ marginBottom: 12 }}>
              <Text style={{ marginLeft: 12, fontSize: 10, color: 'white', height: 15 }}>Activity title</Text>
              <TextInput
                style={{
                  marginTop: 3,
                  padding: 12,
                  height: 40,
                  backgroundColor: '#5f5f5f',
                  color: 'white',
                }}
                placeholder="e.g. Water plants, wash curtains, vaccum"
                placeholderTextColor="#d4d4d4"
                onChangeText={(newTitle) => this.setState({ newTitle })}
              />
            </View>
            <View style={{ marginBottom: 12, justifyContent: 'center' }}>
              <Text style={{ marginLeft: 12, fontSize: 10, color: 'white', height: 15 }}>Frequency</Text>
              <View
                style={{
                  marginTop: 3,
                  paddingLeft: 12,
                  paddingRight: 12,
                  height: 40,
                  backgroundColor: '#5f5f5f',
                  flexGrow: 1,
                  flexDirection: 'row',
                }}
              >
                <Slider
                  style={{ flexGrow: 1 }}
                  minimumTrackTintColor={'white'}
                  maximumTrackTintColor={'white'}
                  step={1}
                  minimumValue={1}
                  value={this.state.newFrequencyDays}
                  maximumValue={14}
                  onValueChange={(newFrequencyDays) => this.setState({ newFrequencyDays })}
                />
                <Text style={[styles.centeredText25, styles.fontWhite, { width: 40, lineHeight: 40, textAlign: 'right' }]}>{this.state.newFrequencyDays}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 12, justifyContent: 'center' }}>
              <TouchableOpacity onPress={debugDayAgo}>
                <Text style={[styles.fontWhite, { paddingLeft: 12 }]}>(Debug) days ago (max 15): {this.state.debugNewDaysAgo}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
