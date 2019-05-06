import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
import SectionBoolean from './SectionBoolean'
import SectionNumber from './SectionNumber'
import SectionDiv from './SectionDiv'
import SectionSelectButton from './SectionSelectButton'
import SectionSelect from './SectionSelect'
class Section extends React.Component {
  constructor(props){
    super(props);
  }

  /* FROM Arduino:
  const String NumberFieldType = "Number";
  const String BooleanFieldType = "Boolean";
  const String SelectFieldType = "Select";
  const String SelectHeaderFieldType = "SelectHeader";
  const String SelectButtonFieldType = "SelectButton";
  const String ColorFieldType = "Color";
  const String SectionFieldType = "Section";
  */
  componentType(item) {
    if (item.type == "Number") return (<SectionNumber item={item} type={this.props.type}/>)
    else if (item.type == "Boolean") return (<SectionBoolean item={item} type={this.props.type}/>)
    else if (item.type == "SelectHeader") return (<SectionSelectButton item={item} type={this.props.type}/>)
    else if (item.type == "Select") return (<SectionSelect item={item} type={this.props.type} parametersCallback={this.props.parametersCallback}/>)
    return (<Text>Missing Component Type!! Yes, this is an error</Text>)
  }

  render () {
    if (this.props.item.type == "Section") {
      return (
        <SectionDiv item={this.props.item}/>
      )
    }
    else {
      return(
        <View style={styles.sectionContainer}>
          <Text>{this.props.item.label}</Text>
          {this.componentType(this.props.item)}
        </View>
      )
    }
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
export default Section