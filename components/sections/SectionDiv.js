import React from 'react';
import {View, Text, StyleSheet, Slider} from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
//?import * from './sections'

class SectionDiv extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.item.label}</Text>
        <View style={styles.lineStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0F0F0'
  },
  text: {
    textAlign: 'center',
    fontSize: 14
  },
  lineStyle:{
    borderWidth: 2,
    borderColor:'#007BFF'
  }
});
SectionDiv.propTypes = {
  item: PropTypes.object.isRequired
}
export default SectionDiv
