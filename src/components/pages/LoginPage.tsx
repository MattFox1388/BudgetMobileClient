import {BUDGET_API_URL} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as qs from 'querystringify';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as RootNavigation from '../../navigation/RootNavigation';
import Spinner from 'react-native-loading-spinner-overlay';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [bufferScreen, setBufferScreen] = useState(false);

  const showError = (error: string) => {
    Alert.alert('Login Error', error);
  };

  const backendLogin = () => {
    console.log('login started...');
    setBufferScreen(true);
    axios
      .post(
        BUDGET_API_URL + '/login',
        qs.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          timeout: 2000
        },
      )
      .then(async response => {
        console.log(response.data.token);
        //store token
        try {
          await EncryptedStorage.setItem('login_token', response.data.token);
          RootNavigation.navigate('HomePage', {});
        } catch (error) {
          const {message} = error as Error;
          console.error('err:' + error);
          setBufferScreen(false);
          showError(message);
        }
      })
      .catch(error => {
        if (error.response) {
          const errorJson = JSON.stringify(error.response.data);
          console.log('err1: ' + errorJson);
          showError(errorJson);
        } else if (error.request) {
          const requestJSON = JSON.stringify(error.request);
          console.log('err2: ' + requestJSON);
          showError(requestJSON);
        } else {
          const messageJson = JSON.stringify(error.message);
          console.log('err3: ' + messageJson);
        }
        setBufferScreen(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Spinner textContent={'Loading...'} visible={bufferScreen} />
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={backendLogin} />
      </View>
      <View style={{flex: 8}} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    color: 'black',
    marginTop: 18,
    paddingLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
    width: 80,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
