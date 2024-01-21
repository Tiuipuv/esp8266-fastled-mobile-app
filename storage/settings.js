import staticRooms from '../rooms.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getRooms() {
  try {
    const rooms = await AsyncStorage.getItem('rooms');
    if (rooms)
      return JSON.parse(rooms);
    else
    {
      return staticRooms;
    }
  }
  catch(e) {return []}
}

export async function setRooms(rooms)
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