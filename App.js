import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import Body from './components/Body'
import PageHeader from './components/PageHeader.js'
import { colors } from './components/styles/globalStyles'

export default function App() {
  let [roomId, setRoomId] = useState(0)

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      <PageHeader changeValueCBFN={val => {setRoomId(val); console.log('updated')}}/>
      <Body style={{flex: 1}} roomId={roomId}/>
    </View>
  );
}

const styles = StyleSheet.create({
  rooms: {
    backgroundColor: '#F5FCFF',
  },
});
