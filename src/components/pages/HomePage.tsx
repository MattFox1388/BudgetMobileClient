import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import { LabelHelpers } from 'victory-core';

export const HomePage: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View style={styles.ingestContainer}>
        <View style={styles.ingestRow}>
          <Text style={styles.labelText}>Ingest Edu Checking: </Text>
          <Button title={'Select'} style={styles.buttonStyle}/>
        </View>
        <View style={styles.ingestRow}>
          <Text style={styles.labelText}>Ingest Edu Savings: </Text>
        </View>
        <View style={styles.ingestRow}>
          <Text style={styles.labelText}>Ingest Discover: </Text>
        </View>
      </View>
      <View style={{flex: 6}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  ingestContainer: {
    flex: 1,
  },
  ingestRow: {
    flex: 1,
  },
  labelText: {
    color: 'black'
  },
  buttonStyle: {
    width: 40
  }
});
