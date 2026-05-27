import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import {
  useState,
} from 'react';

import * as Notifications
from 'expo-notifications';

Notifications.setNotificationHandler({

  handleNotification: async () => ({

    shouldShowAlert: true,

    shouldPlaySound: true,

    shouldSetBadge: false,

    shouldShowBanner: true,

    shouldShowList: true,

  }),

});

export default function Agendamentos() {

  const [nome,
    setNome] =
    useState('');

  const [horario,
    setHorario] =
    useState('');

  async function agendarTreino() {

    try {

      const response =
        await fetch(
          'https://treina-comigo-api.onrender.com/agendamentos',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({

              nome,

              horario,

            }),
          }
        );

      const data =
        await response.json();

      Alert.alert(
        'Sucesso',
        data.mensagem
      );

      await Notifications.scheduleNotificationAsync({

        content: {

          title:
            '🏋️ Agendamento criado',

          body:
            `Treino marcado para ${horario}`,

        },

        trigger: null,

      });

      setNome('');

      setHorario('');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível agendar'
      );
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        📅 Agendamentos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do treino"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário"
        placeholderTextColor="#999"
        value={horario}
        onChangeText={setHorario}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={agendarTreino}
      >

        <Text style={styles.buttonText}>
          Agendar
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 20,
  },

  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#9FE870',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

});