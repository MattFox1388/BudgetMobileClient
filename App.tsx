import React, { useState } from 'react';
import { Header, Icon} from 'react-native-elements';
import HomeDropdown from './src/components/HomeDropdown';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomePage} from '../BudgetMobileClient/src/components/pages/HomePage';
import {UncategorizedItemsPage} from '../BudgetMobileClient/src/components/pages/UncategorizedItemsPage';
import {FindMonthPage} from '../BudgetMobileClient/src/components/pages/FindMonthPage';
import {YtdStatsPage} from '../BudgetMobileClient/src/components/pages/YtdStatsPage';
import {SettingsPage} from '../BudgetMobileClient/src/components/pages/SettingsPage';
import { navigationRef } from './src/navigation/RootNavigation';



const Stack = createNativeStackNavigator();

const App:React.FC = () => {

  return (
  <NavigationContainer ref={navigationRef}>
    <Header
    leftComponent={<HomeDropdown/>}
    centerComponent={{ text: 'Budget Mobile', style: { color: '#fff' } }}
    rightComponent={{ icon: 'home', color: '#fff'}}
    />
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: 'Home Page' }}
        />
       <Stack.Screen name="UncategorizedItemsPage" component={UncategorizedItemsPage} />
       <Stack.Screen name="FindMonthPage" component={FindMonthPage} />
       <Stack.Screen name="YtdStatsPage" component={YtdStatsPage} />
       <Stack.Screen name="SettingsPage" component={SettingsPage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};
export default App;
