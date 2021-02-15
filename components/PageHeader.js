import { Header } from 'react-native-elements'
import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import icon from './images/lighthouse.png';
import rooms from '../rooms.json';
import { globalStyles, colors } from './styles/globalStyles'

export default function PageHeader({ changeValueCBFN }) {
  let [currentValue, setCurrentValue] = useState(0)

  const changed = (val) => {
    setCurrentValue(val)
    changeValueCBFN && changeValueCBFN(val)
  }

  return (
    <View>
      <Header backgroundColor={colors.secondary}
        containerStyle={{ marginTop: Platform.OS === 'ios' ? 0 : 24 }}
        leftComponent={
          <Image
            style={{ width: 35, height: 35 }}
            source={icon}
          />}
        centerComponent={
          <>
            <Text style={globalStyles.mainFont}> The Lighthouse</Text>
            <Picker
              selectedValue={currentValue}
              style={{ width: 380, color: '#fff', paddingTop: 0 }}
              dropdownIconColor='#ffffff'
              onValueChange={changed}
            >
              {rooms.map((room, index) => (
                <Picker.Item label={room.name} value={index} key={index} />
              ))}
            </Picker>
          </>
        }
      />
    </View>
  )
}