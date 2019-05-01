import React from 'react';
import { FlatList, ScrollView, View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types'
import Axios from 'axios'
import Section from './sections/Section'
//?import * from './sections'

class Body extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true
    }
  }

  componentDidMount(){
    console.log(`mounted: http://${this.props.ip}/all`)
    Axios.get(`http://${this.props.ip}/all`)
      .then((response) => {
        this.setState({
          dataSource: response.data,
          isLoading: false
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  render () {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    else {
      return(
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View>
              <View style={styles.lineStyle} />
              <Section item={item} />
            </View>
          )}
          keyExtractor={item => item.name}
        />
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
