import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import axios from 'axios'
import { colors } from '../../styles/globalStyles';

export default function SectionBoolean ({room, item, type}) {
  let [currentValue, setCurrentValue] = useState(item.value);
  
  const onPressOn = () => {
    let body = { name: item.name, value: 1 };
    axios.post("http://" + room.ip + "/form" + type + "Value?name=" + body.name + "&value=" + body.value, body)
      .then((response) => {
        setCurrentValue(1)
      })
      .catch((err) => {
        console.log("Boolean post failed: " + err)
      })
  }
  const onPressOff = () => {
    let body = { name: item.name, value: 0 };
    axios.post("http://" + room.ip + "/form" + type + "Value?name=" + body.name + "&value=" + body.value, body)
      .then((response) => {
        setCurrentValue(0)
      })
      .catch((err) => {
        console.log("Boolean post failed: " + err)
      })
  }
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={onPressOn}
        title="On"
        color={ currentValue != 0 ? colors.primary : colors.secondary }
        accessibilityLabel={"Turn " + item.name  + " on"}
      />
      <Button
        onPress={onPressOff}
        title="Off"
        color={ currentValue == 0 ? colors.primary : colors.secondary }
        accessibilityLabel={"Turn " + item.name  + " off"}
      />
    </View>
  )
}

SectionBoolean.propTypes = {
  room: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  }
});
