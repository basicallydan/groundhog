import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import styles from './styles';

function EmptyActivityItem(props) {
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={[styles.itemContainer]}>
        <TouchableHighlight style={styles.roundButton}>
          <Text style={[styles.urgentRoundButtonInner, styles.centeredText25]}>+</Text>
        </TouchableHighlight>
        <View style={styles.itemTitle}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            You haven't added any activities
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
};

export default EmptyActivityItem;
