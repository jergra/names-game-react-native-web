import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {colors} from './constants'
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
});

ReactDOM.render(
  <React.StrictMode >
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

