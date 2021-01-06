/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Colors} from './src/theme/Colors';

const App: React.FC = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.sectionTitle}>HELLO WORLD!</Text>
        <Text style={styles.subtitle}>
          This will soon be a Minesweeper game :)
        </Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PINK,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.MUSTARD,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.LIGHT_BLUE,
  },
});

export default App;
