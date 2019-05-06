import React from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
//?import * from './sections'

class SectionSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentValue: props.item.value
    }
    this.changeValue = this.changeValue.bind(this)
  }
  
  changeValue (index) {
    newIndex = parseInt(index)
    let body = { name: this.props.item.name, value: newIndex }
    Axios.post("http://" + global.ip + "/form" + this.props.type + "Value?name=" + body.name + "&value=" + body.value, body)
      .then((response) => {
        this.setState({currentValue: newIndex})
      })
      .catch((err) => {
        console.log("Select post failed: " + err)
      })
  }

  generatePickerItems () {
    return this.props.item.options.map(
      (name, index) => {
        return <Picker.Item label={name} value={index} key={index}/>
      }
    )
  }

  render () {
    let color = [global.colors.secondary, global.colors.primary]
    if (this.state.currentValue) {
      color = [global.colors.primary, global.colors.secondary]
    }
    const { selectedIndex } = this.state
    return (
      <Picker style={styles.container}
        selectedValue={this.state.currentValue}
        style={{width: 200}}
        onValueChange={(itemValue) => {
          this.changeValue(itemValue)
        }}>
        {this.generatePickerItems()}
      </Picker>
    )
  }
}

SectionSelect.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default SectionSelect
