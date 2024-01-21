import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import PropTypes from 'prop-types'
import axios from 'axios'

export default function SectionSelect({room, item, type, parametersCallback}) {
  let [currentValue, setCurrentValue] = useState(item.value)

  const changeValue = index => {
    let body = { name: item.name, value: parseInt(index) }
    if (item.name === "pattern") {
      parametersCallback && parametersCallback()
    }
    axios.post("http://" + room.ip + "/form" + type + "Value?name=" + body.name + "&value=" + body.value, body)
      .then(() => {
        setCurrentValue(body.value)
      })
      .catch((err) => {
        console.log("Select post failed: " + err)
      })
  }

  return (
    <Picker //style={styles.container}
      selectedValue={currentValue}
      style={{width: 200}}
      onValueChange={changeValue}
    >
      {item.options.map((name, index) => (
        <Picker.Item label={name} value={index} key={index}/>
      ))}
    </Picker>
  )
}

SectionSelect.propTypes = {
  room: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  parametersCallback: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
