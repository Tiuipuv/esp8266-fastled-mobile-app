/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// global ip for every axios call to use. dont modify!?
//global.ip = "192.168.1.253"
global.ip = "10.0.2.2" // to access my 'spoof' express server (API emulation)
global.colors = {
  primary: '#0062CC',
  secondary: '#007BFF'
}
AppRegistry.registerComponent(appName, () => App);
