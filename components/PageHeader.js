import { Header } from 'react-native-elements'

class PageHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    // Display the page header

    return (
    <View style={{flex: 1}}>
      <Header centerComponent={{text: 'The Lighthouse'}} /> 
    </View>
    )
  }
}

export default PageHeader