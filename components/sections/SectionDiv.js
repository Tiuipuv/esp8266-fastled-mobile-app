import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'

export default function SectionDiv({item}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.label}</Text>
      <View style={styles.lineStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0F0F0'
  },
  text: {
    textAlign: 'center',
    fontSize: 16
  },
  lineStyle:{
    borderWidth: 3,
    borderColor:'#007BFF'
  }
});

SectionDiv.propTypes = {
  item: PropTypes.object.isRequired
}