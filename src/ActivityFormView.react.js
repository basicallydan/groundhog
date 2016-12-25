import React, { Component } from 'react';
import { Text, TextInput, View, Slider, TouchableOpacity } from 'react-native';

import styles from './styles';

class ActivityFormView extends Component {
  constructor(props) {
    super(props);

    if (this.props.sampleActivity) {
      this.state = {
        newTitle: this.props.sampleActivity.title,
        newFrequencyDays: this.props.sampleActivity.frequencyHours / 24,
      };
    } else {
      this.state = {
        newTitle: '',
        newFrequencyDays: 7,
      };
    }
  }

  handleSave = () => {
    const { newTitle, newFrequencyDays, debugNewDaysAgo } = this.state;
    this.props.onSave({
      newTitle,
      newFrequencyDays,
      debugNewDaysAgo,
    });
  }

  render() {
    const debugDayAgo = () => {
      let debugNewDaysAgo = this.state.debugNewDaysAgo;
      if (!debugNewDaysAgo) debugNewDaysAgo = 1;
      else if (debugNewDaysAgo === 15) debugNewDaysAgo = 0;
      else debugNewDaysAgo += 1;
      this.setState({
        debugNewDaysAgo,
      });
    };

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={this.handleSave} disabled={!this.state.newTitle}><Text style={styles.toolbarItem}>Save</Text></TouchableOpacity>
        </View>
        <View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ marginLeft: 12, fontSize: 12, color: 'white', height: 16 }}>Activity title</Text>
            <TextInput
              style={{
                marginTop: 3,
                padding: 12,
                height: 40,
                backgroundColor: '#5f5f5f',
                color: 'white',
              }}
              value={this.state.newTitle}
              placeholder="e.g. Water plants, wash curtains, vaccum"
              placeholderTextColor="#d4d4d4"
              onChangeText={(newTitle) => this.setState({ newTitle })}
            />
          </View>
          <View style={{ marginBottom: 12, justifyContent: 'center' }}>
            <Text style={{ marginLeft: 12, fontSize: 12, color: 'white', height: 16 }}>Frequency</Text>
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
                maximumValue={30}
                onValueChange={(newFrequencyDays) => this.setState({ newFrequencyDays })}
              />
              <Text style={[styles.centeredText25, styles.fontWhite, { width: 100, lineHeight: 40, textAlign: 'right' }]}>{this.state.newFrequencyDays} days</Text>
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
}

ActivityFormView.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  sampleActivity: React.PropTypes.object,
};

export default ActivityFormView;
