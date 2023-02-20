import {BUDGET_API_URL} from '@env';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  convertToTableFormat,
  convertToUncategorizedItem,
  UncategorizedItem,
} from '../../shared/UncategorizedItem';
import * as _ from 'underscore';
import {
  DataTable,
  Button,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
import { CategoryType } from '../../shared/CategoryEnum';

const tableColumns = ['date', 'description', 'options'];

export const UncategorizedItemsPage: React.FC = () => {
  const [uncategorizedItems, setUncategorizedItems] = React.useState<
    Array<UncategorizedItem>
  >([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = React.useState(CategoryType.Need);
  const [modalTitle, setModalTitle] = useState('');

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

        const uncategorizedItems: UncategorizedItem[] = response.data[
          'month_records'
        ].map((row: any) => {
          return convertToUncategorizedItem(row);
        });
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

  const openModal = (index: number) => {
    console.log('index: ' + index);
    setModalTitle('Set Category');
    setModalValue(CategoryType.Need);
    setModalVisible(true);
  };

  const hideModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Uncategorized Items</Text>
      <View style={{flex: 1}}>
        {showSpinner && <ActivityIndicator size="large" />}
      </View>
      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <RadioButton.Group
              onValueChange={newValue => setModalValue(CategoryType[newValue as keyof typeof CategoryType])}
              value={CategoryType[modalValue]}>
              <View>
                <Text>Need</Text>
                <RadioButton.IOS value={CategoryType[CategoryType.Need]} />
              </View>
              <View>
                <Text>Want</Text>
                <RadioButton.IOS value={ CategoryType[CategoryType.Want] } />
              </View>
              <View>
                <Text>Saving</Text>
                <RadioButton.IOS value={ CategoryType[CategoryType.Saving] } />
              </View>
              <View>
                <Text>Income</Text>
                <RadioButton.IOS value={ CategoryType[CategoryType.Income] } />
              </View>
              <View>
                <Text>Other</Text>
                <RadioButton.IOS value={ CategoryType[CategoryType.Other] } />
              </View>
              <View>
                <Text>Ignore</Text>
                <RadioButton.IOS value={ CategoryType[CategoryType.Ignore] } />
              </View>
            </RadioButton.Group>
            <Button mode="contained">Submit</Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.uncatItemsContainer}>
        {uncategorizedItems.length === 0 ? (
          <Text style={styles.dataText}>No Uncategorized Items</Text>
        ) : (
          <ScrollView>
            <Text style={styles.dataText}>Uncategorized Items</Text>
            <DataTable>
              <DataTable.Header>
                {tableColumns.map((column, index) => {
                  return (
                    <DataTable.Title textStyle={styles.dataText} key={index}>
                      {column}
                    </DataTable.Title>
                  );
                })}
              </DataTable.Header>
              {uncategorizedItems.map((row, index) => {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell textStyle={styles.dataText}>
                      {row.date}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.dataText}>
                      {row.month_description}
                    </DataTable.Cell>
                    <View style={styles.dataText}>
                      <Button
                        mode="text"
                        icon="ballot"
                        onPress={() => openModal(index)}>
                        {' '}
                      </Button>
                    </View>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </ScrollView>
        )}
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
    marginRight: 5,
  },
  head: {height: 40, color: 'black', backgroundColor: '#f1f8ff'},
  tableStyle: {width: '100%'},
  tableText: {color: 'black', fontSize: 10, textAlign: 'center'},
  tableTitle: {marginBottom: 10},
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
