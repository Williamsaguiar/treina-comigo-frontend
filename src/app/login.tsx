import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

export default function Login() {

  const [email, setEmail] = useState('');

  const [senha, setSenha] = useState('');

  const { login } = useContext(AuthContext);

  async function fazerLogin() {

    try {

      const response = await fetch(
        'https://treina-comigo-api.onrender.com/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        Alert.alert(data.error);
        return;
      }

      await login(
        data.token,
        data.usuario
      );

      Alert.alert('Login realizado 🚀');

      router.replace('/home');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro ao conectar com servidor'
      );
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        Treina Comigo
      </Text>

      <Text style={styles.subtitle}>
        Entre na sua conta
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={fazerLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    padding: 25,
  },

  logo: {
    color: '#9FE870',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    color: '#AAA',
    fontSize: 16,
    marginBottom: 40,
  },

  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 18,
    color: '#FFF',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#9FE870',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});