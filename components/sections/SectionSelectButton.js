import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
//?import * from './sections'

class SectionSelectButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentValue: props.item.value
    }
    this.onPress = this.onPress.bind(this)
    this.generateButtons = this.generateButtons.bind(this)
    this.generateButtonColor = this.generateButtonColor.bind(this)
  }
  onPress (index) {
    let body = { name: this.props.item.name, value: index };
    Axios.post("http://" + global.ip + "/formGeneralValue?name=" + body.name + "&value=" + body.value, body)
      .then((response) => {
        console.log("On")
        this.setState({currentValue: index})
        console.log(response)
      })
      .catch((err) => {
        console.log("Boolean post failed: " + err)
      })
  }
  generateButtonColor (index) {
    console.log(index + ", " + this.state.currentValue)
    if (index === this.state.currentValue) return global.colors.primary
    else return global.colors.secondary
  }
  generateButtons() {
    return this.props.item.options.map(
      (type, index) => {
        return <Button key={index}
          onPress={() => {this.onPress(index)}}
          title={type}
          color={this.generateButtonColor(index)}
          accessibilityLabel={"Turn off"}
        />
      }
    )
  }
  
  render () {
    let color = ['#FFFFFF', '#007BFF']
    if (this.state.currentValue) {
      color = ['#007BFF', '#FFFFFF']
    }
    const { selectedIndex } = this.state
    return (
      <View style={styles.buttonContainer}>
        {this.generateButtons()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  }
});
SectionSelectButton.propTypes = {
  item: PropTypes.object.isRequired
}
export default SectionSelectButton
