import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import Room from './components/panels/Room.js'
import Settings from './components/panels/Settings.js';
import PageHeader from './components/PageHeader.js'
import { colors } from './components/styles/globalStyles'
import { getRooms, saveRooms } from './storage/settings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

// Set global timeout to 3 seconds
axios.defaults.timeout = 3000; 

export default function App() {
  let [roomId, setRoomId] = useState(0);
  let [rooms, setRooms] = useState([]);
  let [panel, setPanel] = useState('room');
  useEffect(() => {
    getRooms().then(rooms => setRooms(rooms))
  }, []);

  function giveBody(panel, rooms, roomId)
  {
    async function saveAndClose(rooms)
    {
      if (rooms) {
        await saveRooms(rooms)
        setRooms(rooms)
      }
      setPanel('room')
    }
    if (rooms.length > 0 && panel === 'room')
      return <Room style={{flex: 1}} room={rooms[roomId]}/>
    else if (panel === 'settings')
      return <Settings rooms={rooms} doneCBFN={saveAndClose}/>
    else
      return null
  }

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      <PageHeader panel={panel} rooms={rooms} panelCBFN={val=> setPanel(val)} changeValueCBFN={val => {setRoomId(val)}}/>
      {giveBody(panel, rooms, roomId)}
    </SafeAreaProvider>
  );
}
