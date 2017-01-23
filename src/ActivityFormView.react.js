import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Animated } from 'react-native';
// import { Motion, spring } from 'react-motion';
import Slider from 'react-native-slider';

import styles, { standardMargin } from './styles';

class ActivityFormView extends Component {
  constructor(props) {
    super(props);

    if (this.props.sampleActivity) {
      this.state = {
        newTitle: this.props.sampleActivity.title,
        newFrequencyDays: this.props.sampleActivity.frequencyHours / 24,
        errorMessage: '',
        errorMessageColour: new Animated.Value(0),
      };
    } else {
      this.state = {
        newTitle: '',
        newFrequencyDays: 7,
        errorMessage: '',
        errorMessageColour: new Animated.Value(0),
      };
    }
  }

  handleSave = () => {
    const { newTitle, newFrequencyDays, debugNewDaysAgo } = this.state;
    if (!newTitle) {
      this.setState({
        errorMessage: 'Please enter a title',
      });
      return;
    }
    this.props.onSave({
      newTitle,
      newFrequencyDays,
      debugNewDaysAgo,
    });
  }

  handleCancel = () => {
    this.props.onCancel();
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

    const { errorMessage } = this.state;
    let errorMessageElement;

    if (errorMessage) {
      Animated.timing(this.state.errorMessageColour, {
        toValue: 1,
        duration: 900,
      }).start();
      const color = this.state.errorMessageColour.interpolate({
        inputRange: [0, 0.1, 1],
        outputRange: ['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0.7)'],
      });
      errorMessageElement = (<Animated.Text style={{ paddingLeft: standardMargin, color }}>({this.state.errorMessage})</Animated.Text>);
    }

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={this.handleCancel}><Text style={styles.toolbarItem}>Cancel</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.handleSave}><Text style={styles.toolbarItem}>Save</Text></TouchableOpacity>
        </View>
        <View>
          <View style={{ marginBottom: standardMargin }}>
            <Text style={{ marginLeft: standardMargin, fontSize: 12, color: 'white', height: 16 }}>Activity title {errorMessageElement}</Text>
            <TextInput
              style={{
                marginTop: 3,
                padding: standardMargin,
                height: 50,
                backgroundColor: '#5f5f5f',
                color: 'white',
              }}
              underlineColorAndroid="rgba(0,0,0,0)"
              autoCapitalize="sentences"
              value={this.state.newTitle}
              placeholder="e.g. Water plants, wash curtains, vaccum"
              placeholderTextColor="#d4d4d4"
              onChangeText={(newTitle) => this.setState({ newTitle })}
            />
          </View>
          <View style={{ marginBottom: standardMargin, justifyContent: 'center' }}>
            <Text style={{ marginLeft: standardMargin, fontSize: 12, color: 'white', height: 16 }}>Frequency</Text>
            <View
              style={{
                marginTop: standardMargin / 2,
                paddingLeft: standardMargin,
                paddingRight: standardMargin,
                height: 50,
                backgroundColor: '#5f5f5f',
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Slider
                style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', marginTop: standardMargin / 2 }}
                trackStyle={{ alignItems: 'center', justifyContent: 'center' }}
                minimumTrackTintColor={'white'}
                maximumTrackTintColor={'white'}
                step={1}
                minimumValue={1}
                value={this.state.newFrequencyDays}
                maximumValue={30}
                onValueChange={(newFrequencyDays) => this.setState({ newFrequencyDays })}
              />
              <Text style={[styles.text20, styles.fontWhite, { width: 80, textAlign: 'right' }]}>{this.state.newFrequencyDays} days</Text>
            </View>
          </View>
          <View style={{ marginBottom: standardMargin, justifyContent: 'center' }}>
            <TouchableOpacity onPress={debugDayAgo}>
              <Text style={[styles.fontWhite, { paddingLeft: standardMargin }]}>(Debug) days ago (max 15): {this.state.debugNewDaysAgo}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ActivityFormView.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  sampleActivity: React.PropTypes.object,
};

export default ActivityFormView;
