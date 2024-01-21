import { Button, Icon, Card, Input } from '@rneui/base';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ScrollView } from "react-native"
import { colors } from '../styles/globalStyles';

export default function Settings({ rooms, doneCBFN }) {
  const [localRooms, setLocalRooms] = useState(rooms)

  const updateFieldChanged = (index, property, value) => {
    let newArr = localRooms.map((room, i) => {
      if (i === index) {
        return { ...room, [property]: value }
      }
      else
        return room
    })
    console.log(`Updated room ${index + 1}'s ${property} to ${value}`)
    setLocalRooms(newArr);
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {rooms.map((r, i) => (
            <Card key={i}>
              <Card.Title>Room {i + 1}</Card.Title>
              <Card.Divider />
              <TextInput
                placeholder="Room Name"
                style={styles.inputStyle}
                defaultValue={r.name}
                onChangeText={(v) => updateFieldChanged(i, 'name', v)} />
              <TextInput
                placeholder="IP Address"
                style={styles.inputStyle}
                defaultValue={r.ip}
                onChangeText={(v) => updateFieldChanged(i, 'ip', v)}
              />
            </Card>))}
        </ScrollView>
      </View>
      <View style={{ flexDirection: "row", padding: 20, justifyContent: 'space-around' }}>
        <Button buttonStyle={styles.save} onPress={() => doneCBFN(localRooms)}>
          Save
          <Icon name="save" color="white" />
        </Button>
        <Button buttonStyle={styles.cancel} onPress={() => doneCBFN()}>Cancel</Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cancel: {
    minWidth: 140,
    backgroundColor: colors.cancel,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  save: {
    minWidth: 140,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formLabel: {
    fontSize: 24,
  },
  inputStyle: {
    marginTop: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#DDD',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});