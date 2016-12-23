import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, TouchableHighlight } from 'react-native';

import styles from './src/styles';
import ActivityItem from './src/ActivityItem.react';

function daysAgo(days) {
  var d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

class ListViewBasics extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.rows = [
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
      dataSource: ds.cloneWithRows(this.rows)
    };
  }

  handleIncrement(id) {
    let newDS = [];
    newDS = this.rows.slice();
    console.log(this.rows[0].lastAction);
    const foundIndex = newDS.findIndex(x => x.id === id);
    newDS[foundIndex] = Object.assign({}, newDS[foundIndex], {
      lastAction: new Date()
    });
    console.log(this.rows[0].lastAction);
    this.rows = newDS;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDS)
    });
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22, backgroundColor: '#303030'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={activity => <ActivityItem onPress={this.handleIncrement.bind(this)} activity={activity} />}
        />
      </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('groundhog', () => ListViewBasics);