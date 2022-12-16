import React, { useCallback, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker, {DocumentPickerResponse, types}  from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';

export const HomePage: React.FC = () => {
  const onIngestEduCheckingPress = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.csv] 
      });
      console.log('Selected file: ', response.pop()?.uri);
      readFile(response.pop()?.uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const readFile = async (path: string | undefined) => {
    if (path === undefined) return;
    const response = await RNFS.readFile(path);
    console.log('Read file: ', response);
    console.log('response type', typeof(response));
  };

  const onIngestEduSavingPress = () => {
    return;
  };

  const onIngestDiscPress = () => {
    return;
  };


  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.ingestContainer}>
        <View style={styles.ingestRow}>
          <Text style={styles.labelText}>Ingest Edu Checking: </Text>
          <TouchableOpacity  style={styles.buttonStyle} onPress={onIngestEduCheckingPress}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ingestRow}>
          <Text style={styles.labelText}>Ingest Edu Savings: </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={onIngestEduSavingPress}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ingestRow}>
          <Text style={styles.labelText}>Ingest Discover: </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={onIngestDiscPress}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 6}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  ingestContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  ingestRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labelText: {
    flex: 2,
    color: 'black',
    alignSelf: 'center'
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#24a0ed',
    marginLeft: 10,
    activeOpacity: 0.8
  },
});
