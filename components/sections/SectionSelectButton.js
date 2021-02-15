import React, { useState } from 'react';
import {View, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types'
import axios from 'axios'
import { colors } from '../styles/globalStyles';

export default function SectionSelectButton({room, item, type}) {
  let [currentValue, setCurrentValue] = useState(item.value)

  const onPress = index => {
    console.log('pressed')
    let body = { name: item.name, value: index };
    axios.post("http://" + room.ip + "/form" + type + "Value?name=" + body.name + "&value=" + body.value, body)
      .then(() => {
        setCurrentValue(index)
      })
      .catch((err) => {
        console.log("Boolean post failed: " + err)
      })
  }
  
  return (
    <View style={styles.buttonContainer}>
      {item.options.map((type, index) => (
        <Button key={index}
          onPress={() => {onPress(index)}}
          title={type}
          color={index === currentValue ? colors.primary: colors.secondary}
          accessibilityLabel={"Turn off"}
        />
      )
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  }
});

SectionSelectButton.propTypes = {
  room: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}