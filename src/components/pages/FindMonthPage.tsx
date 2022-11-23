import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {BUDGET_API_URL} from '@env';
import {fetchWithRetries} from '../../shared/FetchUtility';
import {MonthStatResponse} from '../../../types/MonthStatResponse';
import {VictoryPie} from 'victory-native';
import { MonthStats } from './MonthStats';

export const FindMonthPage: React.FC = () => {
  const [monthStatData, setMonthStatData] = useState<MonthStatResponse[]>([]);
  const [selectListData, setSelectListData] = useState<
    {key: number; value: string}[]
  >([]);
  const [selected, setSelected] = React.useState<number | null>(null);

  // const graphicColor =  ['red', 'blue', 'cyan', 'green', 'gold'];

  const getMonthStat = () => {
    fetchWithRetries(BUDGET_API_URL + '/get_month_stats', {}, 1).then(
      (data: MonthStatResponse[]) => {
        console.log(data);
        setMonthStatData(data);
        setSelectListData(
          data.map((row, index) => {
            return {key: index, value: row.month_id + '/' + row.year_num};
          }),
        );
      },
    );
  };

  useEffect(() => {
    getMonthStat();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabel}>Select Month: </Text>
        {monthStatData ? (
          <SelectList
            data={selectListData}
            save="key"
            onSelect={() => console.log(selected)}
            setSelected={(val: React.SetStateAction<number | null>) =>
              setSelected(val)
            }
            defaultOption={{key: null, value: null}}
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
            <MonthStats selectedMonthStats={monthStatData[selected]}/> 
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
  },
  monthContainer: {
    flex: 8,
  },
  monthLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
