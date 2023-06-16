import axios from 'axios';
import React, { useCallback, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker, {types}  from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';
import { ActivityIndicator } from 'react-native-paper';
import { csvJSON, filterDiscResults, filterEduResults } from '../../shared/CsvToJsonUtility';
import {BUDGET_API_URL} from '@env';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomePage: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const onIngestEduCheckingPress = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.csv] 
      });
      const path = response.pop()?.uri;
      setShowSpinner(true);
      const json = readFile(path, false);
      const token = await AsyncStorage.getItem('login_token');
      const amountProcessed = await axios.post(BUDGET_API_URL + `/ingest_edu_checking?token=${token}`, json, {timeout: 10000}); 
      console.log(`amountProcessed: ${JSON.stringify(amountProcessed.data)}`);
      Toast.show({
        type: 'success',  
        text1: 'Success',
        text2: `Ingested ${amountProcessed.data["amount_processed"]} records`,
      });
      setShowSpinner(false);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      console.warn(err);
    }
  }, []);

  const readFile = async (path: string | undefined, isDiscover: boolean): Promise<{}[] | null>=> {
    if (typeof path === 'undefined') {
      console.log(`wrong path, path: ${path}`);
      return null;
    }
    const response = await RNFS.readFile(path);
    let jsonifiedResponse = csvJSON(response);
    if (!isDiscover) {
      jsonifiedResponse = filterEduResults(jsonifiedResponse);
    } else {
      jsonifiedResponse = filterDiscResults(jsonifiedResponse);
    }
    return jsonifiedResponse;
  };

  const onIngestEduSavingPress = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.csv] 
      });
      const path = response.pop()?.uri;
      setShowSpinner(true);
      const json = readFile(path, false);
      const token = await AsyncStorage.getItem('login_token');
      const amountProcessed = await axios.post(BUDGET_API_URL + `/ingest_edu_saving?token=${token}`, json, {timeout: 10000}); 
      console.log(`amountProcessed: ${JSON.stringify(amountProcessed.data)}`);
      Toast.show({
        type: 'success',  
        text1: 'Success',
        text2: `Ingested ${amountProcessed.data["amount_processed"]} records`,
      });
      setShowSpinner(false);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      console.warn(err);
    }
  }, []);    

  const onIngestDiscPress = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.csv] 
      });
      const path = response.pop()?.uri;
      setShowSpinner(true);
      const json = readFile(path, true);
      const token = await AsyncStorage.getItem('login_token');
      const amountProcessed = await axios.post(BUDGET_API_URL + `/ingest_disc?token=${token}`, json, {timeout: 10000}); 
      console.log(`amountProcessed: ${JSON.stringify(amountProcessed.data)}`);
      Toast.show({
        type: 'success',  
        text1: 'Success',
        text2: `Ingested ${amountProcessed.data["amount_processed"]} records`,
      });
      setShowSpinner(false);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      console.warn(err);
    }
  }, []); 


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
      <View style={{flex: 6}}>
        {showSpinner && <ActivityIndicator size="large" />}
      </View>
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
