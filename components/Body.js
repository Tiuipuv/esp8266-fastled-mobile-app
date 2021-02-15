import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types'
import axios from 'axios'
import Section from './sections/Section'
import { colors } from 'react-native-elements';
import rooms from '../rooms.json'

export default function Body({ roomId }) {
  let [dataGeneral, setDataGeneral] = useState([])
  let [dataParameters, setDataParameters] = useState([])
  let [generalError, setGeneralError] = useState(false)
  let [parametersError, setParametersError] = useState(false)
  let [loadingGeneral, setLoadingGeneral] = useState(true)
  let [loadingParameters, setLoadingParameters] = useState(true)

  useEffect(() => {
    console.log(`body mounted: using http://${rooms[roomId].ip}/`)
    setDataGeneral([])
    setLoadingGeneral(true)
    setGeneralError(false)
    axios.get(`http://${rooms[roomId].ip}/all`)
      .then((response) => {
        let modifiedData = [];
        response.data.forEach(element => {
          element.section = "General"
          modifiedData.push(element)
        });
        setDataGeneral(modifiedData)
        setLoadingGeneral(false)
      })
      .catch((err) => {
        setLoadingGeneral(false)
        setGeneralError(true)
      })
    refreshParameters()
  }, [roomId])

  const refreshParameters = () => {
    setDataParameters([])
    setLoadingParameters(true)
    setParametersError(false)
    axios.get(`http://${rooms[roomId].ip}/parameters`)
      .then((response) => {
        let modifiedData = [];
        response.data.forEach(element => {
          element.section = "Parameters"
          modifiedData.push(element)
        });
        setDataParameters(modifiedData)
        setLoadingParameters(false)
      })
      .catch((err) => {
        setLoadingParameters(false)
        setParametersError(true)
      })
  }

  if (loadingGeneral) {
    //general is not loaded, who cares about params...
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }
  else if (generalError) {
    //general attemped and failed loading
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Failed to load '{rooms[roomId].name}' at ip '{rooms[roomId].ip}'. Are the LED's turned on?</Text>
      </View>
    )
  }
  else if (!loadingGeneral && loadingParameters) {
    // general is loaded, parameters isnt
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataGeneral}
          renderItem={({ item }) => (
            <View>
              <View style={styles.lineStyle} />
              <Section item={item} type={item.section} room={rooms[roomId]} />
            </View>
          )}
          keyExtractor={item => item.name}
        />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }
  else if (parametersError) {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataGeneral}
          renderItem={({ item }) => (
            <View>
              <View style={styles.lineStyle} />
              <Section item={item} type={item.section} room={rooms[roomId]} />
            </View>
          )}
          keyExtractor={item => item.name}
        />
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Failed to load parameters for '{rooms[roomId].name}' at ip '{rooms[roomId].ip}'. Are the LED's turned on?</Text>
        </View>
      </View>
    )
  }
  else {
    // both datasets are 'supposedly' loaded
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataGeneral.concat(dataParameters)}
          renderItem={({ item }) => (
            <View>
              <View style={styles.lineStyle} />
              <Section item={item} type={item.section} room={rooms[roomId]} parametersCallback={refreshParameters} />
            </View>
          )}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 2,
    borderColor: '#F0F0F0'
  }
})

Body.propTypes = {
  roomId: PropTypes.number.isRequired
}
