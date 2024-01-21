import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import Room from './components/panels/Room.js'
import Settings from './components/panels/Settings.js';
import PageHeader from './components/PageHeader.js'
import { colors } from './components/styles/globalStyles'
import { getRooms, setRooms } from './storage/settings';

export default function App() {
  let [roomId, setRoomId] = useState(0);
  let [rooms, setRooms] = useState([]);
  let [panel, setPanel] = useState('room');
  useEffect(() => {
    getRooms().then(rooms => setRooms(rooms))
  }, []);
  useEffect(() => {
    console.log('rooms changed')
    setPanel('room');
  }, [rooms]);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      <PageHeader panel={panel} rooms={rooms} panelCBFN={val=> setPanel(val)} changeValueCBFN={val => {setRoomId(val)}}/>
      {giveBody(panel, rooms, roomId, (rooms) => setRooms(rooms), (panel) => setPanel(panel))}
    </View>
  );
}

function giveBody(panel, rooms, roomId, roomsChangeCBFN, panelChangeCBFN)
{
  function saveRooms(rooms)
  {
    if (rooms)
      setRooms(rooms).then(() => roomsChangeCBFN(rooms))
    else
      panelChangeCBFN('room')
  }
  if (rooms.length > 0 && panel === 'room')
  {
    return <Room style={{flex: 1}} room={rooms[roomId]}/>
  }
  else if (panel === 'settings')
    return <Settings rooms={rooms} doneCBFN={saveRooms}/>
  else
    return null
}

const styles = StyleSheet.create({
  rooms: {
    backgroundColor: '#F5FCFF',
  },
});
