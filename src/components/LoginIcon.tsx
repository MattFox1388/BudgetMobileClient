import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as RootNavigation from '../navigation/RootNavigation';

const LoginIcon: React.FC = () => {
  const navigateToLogin = () => {
    RootNavigation.navigate('LoginPage', {});
  };
  return (
    <div className='login-btn'>
      {/*<Icon*/}
      {/*  name="sign-in"*/}
      {/*  size={30}*/}
      {/*  style={{paddingTop: 10}}*/}
      {/*  onPress={navigateToLogin}*/}
      {/*/>*/}
        <AntDesign name="login" size={24} color="black" onPress={navigateToLogin}/>
    </div>
  );
};

export default LoginIcon;
