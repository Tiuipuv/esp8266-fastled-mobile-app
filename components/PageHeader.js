import { Header } from '@rneui/themed';
import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import icon from './images/lighthouse.png';
import { globalStyles, colors } from './styles/globalStyles';

const panelMap = {
  room: 'The Lighthouse',
  settings: 'Room Settings'
}
export default function PageHeader({ panel, rooms, changeValueCBFN, panelCBFN }) {

  const changed = (val) => {
    console.log('room id updated to ' + val)
    changeValueCBFN && changeValueCBFN(val)
  }

  return (
    <Header backgroundColor={colors.secondary}
      leftComponent={
        <Image
          style={{ width: 30, height: 30 }}
          source={icon}
        />}
      centerComponent={panel === 'room' ?
        (
          <>
            <Text style={globalStyles.mainFont}>{panelMap[panel]}</Text>
            <Picker
              style={{ width: 380, color: '#fff', paddingTop: 0 }}
              dropdownIconColor='#ffffff'
              onValueChange={changed}
            >
              {rooms.map((room, index) => (
                <Picker.Item label={room.name} value={index} key={index} />
              ))}
            </Picker>
          </>) : <Text style={globalStyles.mainFont}>{panelMap[panel]}</Text>}
      rightComponent={renderSettings(panel, panelCBFN)}
    />
  )
}

function renderSettings(panel, panelCBFN) {
  if (panel === 'room')
    return { icon: "settings", color: "#fff", onPress: () => openSettings(panelCBFN) }
  else
    return null;
}

function openSettings(panelCBFN) {
  console.log('open settings');
  panelCBFN('settings');
}