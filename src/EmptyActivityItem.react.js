import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import styles from './styles';

function EmptyActivityItem(props) {
  const addButtonInnerStyles = [styles.roundButtonInner, styles.fontWhite, styles.centeredText25];

  if (props.android) {
    addButtonInnerStyles.push({ top: -2 });
  }

  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={[styles.itemContainer]}>
        <View style={styles.roundButton}>
          <Text style={addButtonInnerStyles}>+</Text>
        </View>
        <View style={styles.itemTitle}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            You don't have any activities yet
          </Text>
          <Text style={{ color: 'white' }}>
            Tap here to add a sample activity
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

EmptyActivityItem.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  android: React.PropTypes.bool,
};

export default EmptyActivityItem;
