import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  useContext,
  useEffect,
} from 'react';

import { router } from 'expo-router';

import { AuthContext } from '../contexts/AuthContext';

export default function Index() {

  const {
    usuario,
    carregando,
  } = useContext(AuthContext);

  useEffect(() => {

    if (carregando) return;

    if (usuario) {

      router.replace('/home');

    } else {

      router.replace('/login');
    }

  }, [usuario, carregando]);

  return (

    <View style={styles.container}>

      <ActivityIndicator
        size="large"
        color="#9FE870"
      />

      <Text style={styles.text}>
        Carregando...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#FFF',
    marginTop: 20,
    fontSize: 18,
  },
});