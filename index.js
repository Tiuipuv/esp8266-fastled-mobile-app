/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// global ip for every axios call to use. dont modify!?
global.ip = "192.168.1.253"

AppRegistry.registerComponent(appName, () => App);
