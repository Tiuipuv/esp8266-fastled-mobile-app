import staticRooms from '../rooms.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getRooms() {
  try {
    const rooms = await AsyncStorage.getItem('rooms');
    let roomsFinal = staticRooms;
    if (rooms)
      roomsFinal = JSON.parse(rooms);
    roomsFinal.sort((a, b) => a.name.localeCompare(b.name));

    return roomsFinal;
  }
  catch(e) {return []}
}

export async function saveRooms(rooms)
{
  try 
  {
    console.log('attempted to save rooms:')
    console.log(rooms)
    await AsyncStorage.setItem('rooms', JSON.stringify(rooms))
    return true;
  }
  catch (e) { return false }
}