import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import SectionBoolean from './SectionBoolean'
import SectionNumber from './SectionNumber'
import SectionDiv from './SectionDiv'
import SectionSelectButton from './SectionSelectButton'
import SectionSelect from './SectionSelect'

export default function Section({ item, room, type, parametersCallback }) {

  /* FROM Arduino:
  const String NumberFieldType = "Number";
  const String BooleanFieldType = "Boolean";
  const String SelectFieldType = "Select";
  const String SelectHeaderFieldType = "SelectHeader";
  const String SelectButtonFieldType = "SelectButton";
  const String ColorFieldType = "Color";
  const String SectionFieldType = "Section";
  */
  const componentType = () => {
    if (item.type == "Number") return (
      <SectionNumber
        room={room}
        item={item}
        type={type}
      />
    )
    else if (item.type == "Boolean") return (
      <SectionBoolean
        room={room}
        item={item}
        type={type}
      />
    )
    else if (item.type == "SelectHeader") return (
      <SectionSelectButton
        room={room}
        item={item}
        type={type}
      />
    )
    else if (item.type == "Select") return (
      <SectionSelect
        room={room}
        item={item}
        type={type}
        parametersCallback={parametersCallback}
      />
    )
    return (
      <Text>Missing Component Type!! Yes, this is an error</Text>
    )
  }

  if (item.type == "Section") {
    return (
      <SectionDiv item={item} />
    )
  }
  else {
    return (
      <View style={styles.sectionContainer}>
        <Text>{item.label}</Text>
        {componentType()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

Section.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  parametersCallback: PropTypes.func
}