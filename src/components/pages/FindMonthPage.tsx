import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {BUDGET_API_URL} from '@env';
import {MonthStatResponse} from '../../../types/MonthStatResponse';
import {MonthStats} from './MonthStats';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const FindMonthPage: React.FC = () => {
  const [monthStatData, setMonthStatData] = useState<MonthStatResponse[]>([]);
  const [selectListData, setSelectListData] = useState<
    {key: number; value: string}[]
  >([]);
  const [selected, setSelected] = React.useState<number | null>(null);

  const getMonthStat = async () => {
    const token = await EncryptedStorage.getItem('login_token');
    axios
      .get(BUDGET_API_URL + '/get_month_stats', {params: {token: token}})
      .then(response => {
        const data: MonthStatResponse[] = response.data;
        console.log('data: ' + data);
        setMonthStatData(data);
        setSelectListData(
          data.map((row, index) => {
            return {key: index, value: row.month_id + '/' + row.year_num};
          }),
        );
      })
      .catch(error => {
        console.log('error: ' + error.response.data.error);
      });
  };

  useEffect(() => {
    getMonthStat();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>Select Month: </Text>
        {monthStatData ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <SelectList
            data={selectListData}
            save="key"
            onSelect={() => console.log(selected)}
            setSelected={(val: React.SetStateAction<number | null>) =>
              setSelected(val)
            }
            defaultOption={{key: null, value: null}}
            dropdownTextStyles={styles.inputStyles}
            inputStyles={styles.inputStyles}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <View style={styles.monthContainer}>
        {selected != null ? (
          <View>
            <Text style={styles.monthLabel}>
              Month: {monthStatData[selected].month_id.toString()} Year:{' '}
              {monthStatData[selected].year_num.toString()}
            </Text>
            <MonthStats selectedMonthStats={monthStatData[selected]} />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10,
  },
  headerLabel: {
    alignSelf: 'center',
    marginRight: 5,
    color: 'black',
  },
  monthContainer: {
    flex: 8,
  },
  monthLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputStyles: {
    color: 'black',
  },
});
