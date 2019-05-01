import React from 'react';
import {View, Text, StyleSheet, Slider} from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
//?import * from './sections'

class SectionNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.item.value,
    };
  }

  change(val) {
    this.setState({
        currentValue: parseInt(val)
    })
  }
  changeSend(val) {
    newVal = parseInt(val)
    let body = { name: this.props.item.name, value: newVal };
    Axios.post("http://" + global.ip + "/formGeneralValue?name=" + body.name + "&value=" + body.value, body)
      .then((response) => {
        console.log(val)
        this.setState({currentValue: newVal})
        console.log(response)
      })
      .catch((err) => {
        console.log("Number post failed: " + err)
        console.log
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{String(this.state.currentValue)}</Text>
        <Slider
          step={1}
          minimumValue={this.props.item.min}
          maximumValue={this.props.item.max}
          minimumTrackTintColor={'#007BFF'}
          maximumTrackTintColor={'#007BFF'}
          thumbTintColor={'#007BFF'}
          onValueChange={this.change.bind(this)}
          onSlidingComplete={this.changeSend.bind(this)}
          value={this.props.item.value}
        />
      </View>
    );
  }
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
  item: PropTypes.object.isRequired
}
export default SectionNumber
