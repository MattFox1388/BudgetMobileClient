import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {BUDGET_API_URL} from '@env';
import {fetchWithRetries} from '../../shared/FetchUtility';
import {MonthStatResponse} from '../../../types/MonthStatResponse';

export const FindMonthPage: React.FC = () => {
  const [monthStatData, setMonthStatData] = useState<MonthStatResponse[]>([]);
  const [selected, setSelected] = React.useState([]);
  let selectListData: {key: number; value: string}[] = [];

  const getMonthStat = () => {
    fetchWithRetries(BUDGET_API_URL + '/get_month_stats', {}, 1).then(
      (data: MonthStatResponse[]) => {
        console.log(data);
        setMonthStatData(data);
        selectListData = data.map((row, index) => {
          return {key: index, value: row.date_val + row.year_num};
        });
      },
    );
  };

  useEffect(() => {
    getMonthStat();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {monthStatData ? (
        <SelectList
          data={selectListData}
          save="key"
          onSelect={() => console.log(selected)}
          setSelected={(val: React.SetStateAction<never[]>) => setSelected(val)}
          defaultOption={{key: null, value: null}}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};
