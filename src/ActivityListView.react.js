import React, { Component } from 'react';
import { ListView, View } from 'react-native';

import ActivityItem from './ActivityItem.react';

class ActivityListView extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.activities),
    };
  }

  // This is the place to update state
  componentWillReceiveProps(nextProps) {
    console.log('Updating state');
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.activities),
    });
  }

  render() {
    return (
      <View>
        <View style={{ height: 30 }}>{this.props.children}</View>
        <ListView
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
