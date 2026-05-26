import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useContext } from 'react';

import { router } from 'expo-router';

import { AuthContext } from '../contexts/AuthContext';

export default function Perfil() {

  const {
    usuario,
    logout,
  } = useContext(AuthContext);

  async function sair() {

    await logout();

    router.replace('/login');
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Meu Perfil
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Nome
        </Text>

        <Text style={styles.value}>
          {usuario?.nome}
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.label}>
          Tipo de conta
        </Text>

        <Text style={styles.value}>
          {usuario?.tipo}
        </Text>

      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={sair}
      >

        <Text style={styles.logoutText}>
          Sair da conta
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 25,
    justifyContent: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  label: {
    color: '#9FE870',
    fontSize: 14,
    marginBottom: 10,
  },

  value: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#FF4D4D',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },

  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});