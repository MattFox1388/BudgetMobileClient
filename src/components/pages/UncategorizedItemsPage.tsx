import {BUDGET_API_URL} from '@env';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { convertToTableFormat, convertToUncategorizedItem, UncategorizedItem } from '../../shared/UncategorizedItem';
import * as _ from 'underscore'
import { DataTable } from 'react-native-paper';


const tableColumns = [
  'date',
  'description',
  'options'
];

export const UncategorizedItemsPage: React.FC = () => {
  const [uncategorizedItems, setUncategorizedItems] = React.useState<
  Array<UncategorizedItem>
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
      <View style={{flex: 1}}>
        {showSpinner && <ActivityIndicator size="large" />}
      </View>
      <View style={styles.uncatItemsContainer}>
        {(uncategorizedItems.length === 0) ? (
            <Text style={styles.dataText}>No Uncategorized Items</Text>
        ) : (
          <ScrollView>
            <Text style={styles.dataText}>Uncategorized Items</Text>
            <DataTable>
              <DataTable.Header>
                {tableColumns.map((column, index) => {
                  return (
                    <DataTable.Title textStyle={styles.dataText} key={index}>{column}</DataTable.Title>
                  );
                })}
              </DataTable.Header>
              {uncategorizedItems.map((row, index) => {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={styles.dataText}>{row.date}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.dataText}>{row.month_description}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.dataText}></DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </ScrollView>
        )
} 
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
    fontSize: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncatItemsContainer: {
    flex: 15,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5
  },
  head: { height: 40, color: 'black', backgroundColor: '#f1f8ff'},
  tableStyle: {width: '100%'},
  tableText: { color: 'black', fontSize: 10, textAlign: 'center' },
  tableTitle: { marginBottom: 10 },
});
