import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text } from 'react-native-elements';
import { VictoryPie } from 'victory-native';
import {MonthStatResponse} from '../../../types/MonthStatResponse';

interface MonthStatsProps {
  selectedMonthStats: MonthStatResponse;
}

export const MonthStats: React.FC<MonthStatsProps> = ({selectedMonthStats}) => {
  const graphicData = [
    {y: 10, x: '0%'},
    {y: 90, x: '0%'},
    {y: 50, x: '0%'},
    {y: 20, x: '0%'},
    {y: 70, x: '0%'},
  ];

  return (
    <View>
      <Text style={styles.pieChartLabel}>Planned: </Text>
      <VictoryPie
        data={graphicData}
        width={250}
        height={250}
        innerRadius={50}
        colorScale="cool"
        style={{
          labels: {
            fill: 'black',
            fontSize: 15,
            padding: 7,
          },
        }}
      />
      <Text style={styles.pieChartLabel}>Actual: </Text>
      <VictoryPie
        data={graphicData}
        width={250}
        height={250}
        innerRadius={50}
        colorScale="cool"
        style={{
          labels: {
            fill: 'black',
            fontSize: 15,
            padding: 7,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    pieChartLabel: {
        fontSize: 15
      }
});