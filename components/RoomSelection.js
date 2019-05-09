import React from 'react'
import {View, Picker} from 'react-native'

class RoomSelection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      allRooms: [],
      selectedRoom: '',
      isLoadingRoomList: true

    }
  }

  render () {
    // Returns the drop down list in a Picker Tag

    return (
      <View style={{flex: 1}}>
        <Picker
          selectedValue = {this.state.allRooms}
          onValueChange={(itemValue, itemPosition) => this.setState({selectedRoom: itemValue})}>

          <Picker.Item label="lab0" value="val0" />
          <Picker.Item label="lab1" value="val1" />
        </Picker>
      </View>
    )
  }
}

export default RoomSelection