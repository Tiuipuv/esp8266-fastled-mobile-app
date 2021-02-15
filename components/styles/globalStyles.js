import { StyleSheet } from 'react-native';

const colors = {
  primary: '#0062CC',
  secondary: '#007BFF'
}

const globalStyles = StyleSheet.create({
  secondaryBG: {
    backgroundColor: colors.secondary
  },
  secondary: {
    color: colors.secondary
  },
  primary: {
    color: colors.primary
  },
  sectionHeader: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.primary
  },
  mainFont: { color: '#fff', fontSize: 20, paddingBottom: 10 }
});

export {globalStyles, colors}