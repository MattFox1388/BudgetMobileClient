import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as RootNavigation from '../navigation/RootNavigation';

const LoginIcon: React.FC = () => {
  const navigateToLogin = () => {
    RootNavigation.navigate('LoginPage', {});
  };
  return (
    <>
      <Icon
        name="sign-in"
        size={30}
        style={{paddingTop: 10}}
        onPress={navigateToLogin}
      />
    </>
  );
};

export default LoginIcon;
