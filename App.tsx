import React from 'react';
import {Text, View} from 'react-native';
import { Header } from 'react-native-elements';
import HamburgerIcon from './src/components/svgs/hamburger';


const App:React.FC = () => {
  return (
  <>
   <Header
    leftComponent={<HamburgerIcon/>}
    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
    rightComponent={{ icon: 'home', color: '#fff' }}
  />
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  </>
  );
};
export default App;
