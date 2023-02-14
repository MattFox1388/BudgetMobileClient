import {BUDGET_API_URL} from '@env';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { convertToTableFormat, convertToUncategorizedItem, UncategorizedItem } from '../../shared/UncategorizedItem';
import { Table, Row, Rows } from 'react-native-table-component';


const tableColumns = [
  'id',
  'month_id',
  'date',
  'description',
  'options'
];

export const UncategorizedItemsPage: React.FC = () => {
  const [uncategorizedItems, setUncategorizedItems] = React.useState<
    UncategorizedItem[]
  >([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const setUncategorizedItemsFn = async () => {
      const token = await EncryptedStorage.getItem('login_token');
      // get uncategorized items
      setShowSpinner(true);
      try {
        const response = await axios.get(
          BUDGET_API_URL + '/get_month_records_uncat',
          {
            params: {token: token},
            timeout: 8000,
          },
        );

        const uncategorizedItems: UncategorizedItem[] = response.data['month_records'].map(
          (row: any) => {
           return convertToUncategorizedItem(row);
          },
        );
        setUncategorizedItems(uncategorizedItems);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log('axios error: ' + axiosError);
        }
      }
      setShowSpinner(false);
    };
    setUncategorizedItemsFn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Uncategorized Items</Text>
      <View style={styles.uncatItemsContainer}>
        {uncategorizedItems !== undefined ? (
          uncategorizedItems.length === 0 && (
            <Text style={styles.dataText}>No Uncategorized Items</Text>
          )
        ) : (
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableColumns} style={styles.head} textStyle={styles.text}/>
            <Rows data={convertToTableFormat(uncategorizedItems)} textStyle={styles.text}/>
          </Table>
        )
} 
      </View>

      <View style={{flex: 6}}>
        {showSpinner && <ActivityIndicator size="large" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    flex: 1,
    color: 'black',
    alignSelf: 'flex-start',
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataText: {
    flex: 1,
    color: 'black',
    alignSelf: 'flex-start',
    paddingLeft: 5,
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncatItemsContainer: {
    flex: 10,
    flexDirection: 'row',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
