import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types'
import axios from 'axios'

export default function SectionNumber({room, item, type}) {
  let [currentValue, setCurrentValue] = useState(item.value)

  const change = (val) => {
    setCurrentValue(parseInt(val))
  }

  const changeSend = (val) => {
    newVal = parseInt(val)
    let body = { name: item.name, value: newVal };
    axios.post("http://" + room.ip + "/form" + type + "Value?name=" + body.name + "&value=" + body.value, body)
      .then(() => {
        setCurrentValue(newVal)
      })
      .catch((err) => {
        console.log("Number post failed: " + err)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentValue}</Text>
      <Slider
        step={1}
        minimumValue={item.min}
        maximumValue={item.max}
        minimumTrackTintColor={'#007BFF'}
        maximumTrackTintColor={'#007BFF'}
        thumbTintColor={'#007BFF'}
        onValueChange={change}
        onSlidingComplete={changeSend}
        value={item.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    textAlign: 'center',
    fontSize: 14
  },
});

SectionNumber.propTypes = {
  room: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}
