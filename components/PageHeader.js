import { Header } from 'react-native-elements'
import React from 'react'
import { View, Image, Platform } from 'react-native'

class PageHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    // Display the page header

    return (
    <View>
      <Header backgroundColor={global.colors.secondary}
        containerStyle={{marginTop: Platform.OS === 'ios' ? 0 : - 24}}
        leftComponent={
        <Image
          style={{width: 35, height: 35}}
          source={require('./images/lighthouse.png')}
        />}
        centerComponent={{text: 'The Lighthouse', style: {color: '#fff', fontSize: 20}}}
      />
    </View>
    )
  }
}

export default PageHeader