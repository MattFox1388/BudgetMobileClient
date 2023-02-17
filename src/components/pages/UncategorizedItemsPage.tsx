import {BUDGET_API_URL} from '@env';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { convertToTableFormat, convertToUncategorizedItem, UncategorizedItem } from '../../shared/UncategorizedItem';
import { Table, Row, Rows, Cell, TableWrapper } from 'react-native-table-component';
import * as _ from 'underscore'
import { CheckBox } from 'react-native-elements';


const tableColumns = [
  'date',
  'description',
  'options'
];

export const UncategorizedItemsPage: React.FC = () => {
  const [uncategorizedItems, setUncategorizedItems] = React.useState<
  Array<Array<String>>
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
        setUncategorizedItems(convertToTableFormat(uncategorizedItems));
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
            <Table style={styles.tableStyle} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={tableColumns} style={styles.head} textStyle={styles.text} flexArr={[1, 1, 1]}/>
              //TODO: add cells
              {/* data.map((rowData, index) =>   
                        (
                            <TableWrapper key={index}  style={styles.row}>
                                 <Cell key={0} data = {<CheckBox value={this.checkIfChecked(rowData[0],selectedItems)} onValueChange={()=>this.setSelection(rowData[0])} />} />
                                 <Cell key={1} data = {rowData[1]} textStyle={styles.text}/>
                                 <Cell key={2} data = {rowData[2]} textStyle={styles.text}/>
                            </TableWrapper>
                        )
                        ) */}
            </Table>
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
    fontSize: 15,
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
  text: { margin: 6 , color: 'black'},
  tableStyle: {width: '100%'},
});
