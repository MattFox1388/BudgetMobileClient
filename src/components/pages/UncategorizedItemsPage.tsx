import {BUDGET_API_URL} from '@env';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

interface UncategorizedItem {
  id: number;
  month_id: number;
  month_description: string;
  is_want_or_expense: boolean;
  is_need_want_saving: boolean;
  is_should_be_ignored: boolean;
  is_expense_or_ignore: boolean;
}

export const UncategorizedItemsPage: React.FC = () => {
  const [uncategorizedItems, setUncategorizedItems] = React.useState<
    UncategorizedItem[]
  >([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const setUncategorizedItems = async () => {
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

        console.log('response data: ' + response.data);
        const uncategorizedItems: UncategorizedItem[] = response.data.map(
          (row: any) => {
            console.log(row);
            const uncategorizedItem = row['uncategorizedItems'][0];
            // return {
            //   month_id: uncategorizedItem['id'],
            //   // month_id: uncategorizedItem['month_record_id'],
            //   month_description: row['descr'],
            //   // is_want_or_expense: uncategorizedItem['is_want_or_expense'],
            //   // is_need_want_saving: uncategorizedItem['is_need_want_saving'],
            //   // is_should_be_ignored: uncategorizedItem['is_should_be_ignored'],
            //   // is_expense_or_ignore: uncategorizedItem['is_expense_or_ignore'],
            // }
          },
        );
        for (const uncatItem of uncategorizedItems) {
          console.log(uncatItem);
        }
        // get month records
        // set uncategorized items objects
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log('axios error: ' + axiosError);
        }
      }

      setShowSpinner(false);
    };
    setUncategorizedItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Uncategorized Items</Text>
      <View style={styles.uncatItemsContainer}>
        {uncategorizedItems !== undefined &&
          uncategorizedItems.length === 0 && (
            <Text style={styles.dataText}>No uncategorized items</Text>
          )}
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
  }
});
