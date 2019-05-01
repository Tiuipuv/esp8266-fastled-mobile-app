import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
//?import * from './sections'

class SectionBoolean extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentValue: props.item.value
    }
    this.onPressOn = this.onPressOn.bind(this)
    this.onPressOff = this.onPressOff.bind(this)
  }
  onPressOn () {
    let body = { name: this.props.item.name, value: 1 };
    Axios.post("http://" + global.ip + "/formGeneralValue?name=" + body.name + "&value=" + body.value, body)
      .then((response) => {
        console.log("On")
        this.setState({currentValue: 1})
        console.log(response)
      })
      .catch((err) => {
        console.log("Boolean post failed: " + err)
        console.log
      })
  }
  onPressOff () {
    let body = { name: this.props.item.name, value: 0 };
    Axios.post("http://" + global.ip + "/formGeneralValue?name=" + body.name + "&value=" + body.value, body)
      .then((response) => {
        this.setState({currentValue: 0})
        console.log("Off")
        console.log(response)
      })
      .catch((err) => {
        console.log("Boolean post failed: " + err)
        console.log
      })
  }
  
  render () {
    let color = ['#FFFFFF', '#007BFF']
    if (this.state.currentValue) {
      color = ['#007BFF', '#FFFFFF']
    }
    const { selectedIndex } = this.state
    return (
      <View style={styles.buttonContainer}>
        <Button
          onPress={this.onPressOn}
          title="On"
          color={color[0]}
          accessibilityLabel={"Turn " + this.props.name  + " on"}
        />
        <Button
          onPress={this.onPressOff}
          title="Off"
          color={color[1]}
          accessibilityLabel={"Turn " + this.props.name  + " off"}
        />
      </View>
    )
  }
}

SectionBoolean.propTypes = {
  item: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  }
});

export default SectionBoolean
