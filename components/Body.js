import React from 'react';
import { FlatList, ScrollView, View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
import Section from './sections/Section'

class Body extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataGeneral: [],
      isLoadingGeneral: true,
      isLoadingParameters: true
    }
    this.refreshParameters = this.refreshParameters.bind(this)
  }

  componentDidMount () {
    console.log(`body mounted: using http://${this.props.ip}/`)
    Axios.get(`http://${this.props.ip}/all`)
      .then((response) => {
        let modifiedData = [];
        response.data.forEach(element => {
          element.section = "General"
          modifiedData.push(element)
        });
        this.setState({
          dataGeneral: modifiedData,
          isLoadingGeneral: false
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    this.refreshParameters()
  }

  refreshParameters () {
    this.setState({
      dataParameters: [],
      isLoadingParameters: true
    })
    Axios.get(`http://${this.props.ip}/parameters`)
      .then((response) => {
        let modifiedData = [];
        response.data.forEach(element => {
          element.section = "Parameters"
          modifiedData.push(element)
        });
        this.setState({
          dataParameters: modifiedData,
          isLoadingParameters: false
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  render () {
    if(this.state.isLoadingGeneral) {
      //general is not loaded, who cares about params...
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    else if (!this.state.isLoadingGeneral && this.state.isLoadingParameters) {
      // general is loaded, parameters isnt
      return (
        <View style={{flex: 1}}>
        <FlatList
          data={this.state.dataGeneral}
          renderItem={({item}) => (
            <View>
              <View style={styles.lineStyle} />
              <Section item={item} type={item.section}/>
            </View>
          )}
          keyExtractor={item => item.name}
        />
        <ActivityIndicator/>
        </View>
      )
    }
    else {
      // both datasets are 'supposedly' loaded
      console.log(this.state.dataGeneral.concat(this.state.dataParameters))
      return (
        <View style={{flex: 1}}>
        <FlatList
          data={this.state.dataGeneral.concat(this.state.dataParameters)}
          renderItem={({item}) => (
            <View>
              <View style={styles.lineStyle} />
              <Section item={item} type={item.section} parametersCallback={this.refreshParameters}/>
            </View>
          )}
          keyExtractor={item => item.name}
        />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  lineStyle:{
    borderWidth: 2,
    borderColor:'#F0F0F0'
  }
})

Body.propTypes = {
  ip: PropTypes.string.isRequired
}
export default Body
