import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {
  useLocalSearchParams,
  router,
} from 'expo-router';

import {
  useEffect,
  useState,
} from 'react';

import * as Notifications
from 'expo-notifications';

Notifications.setNotificationHandler({

  handleNotification: async () => ({

    shouldShowAlert: true,

    shouldPlaySound: true,

    shouldSetBadge: false,
  }),
});

export default function Agendamento() {

  const { nome } =
    useLocalSearchParams();

  const [horariosOcupados,
    setHorariosOcupados] =
    useState<string[]>([]);

  const horarios = [
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];

  useEffect(() => {

    buscarHorarios();

  }, []);

  async function buscarHorarios() {

    try {

      const response = await fetch(
        'https://treina-comigo-api.onrender.com/agendamentos'
      );

      const data = await response.json();

      const ocupados =
        data
          .filter(
            (item: any) =>
              item.personal === nome
          )
          .map(
            (item: any) =>
              item.horario
          );

      setHorariosOcupados(ocupados);

    } catch (error) {

      console.log(error);
    }
  }

  async function agendarTreino(
    horario: string
  ) {

    if (
      horariosOcupados.includes(
        horario
      )
    ) {

      Alert.alert(
        'Horário ocupado',
        'Esse horário já foi reservado.'
      );

      return;
    }

    try {

      const response = await fetch(
        'https://treina-comigo-api.onrender.com/agendamentos',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            aluno: 'Will',
            personal: nome,
            horario,
          }),
        }
      );

      const data =
        await response.json();

      if (data.error) {

        Alert.alert(
          'Erro',
          data.error
        );

        return;
      }

      await Notifications
        .scheduleNotificationAsync({

          content: {

            title:
              'Treino confirmado 🚀',

            body:
              `Seu treino com ${nome} foi agendado.`,
          },

          trigger: null,
        });

      Alert.alert(
        'Sucesso',
        'Treino agendado 🚀'
      );

      buscarHorarios();

      router.push(
        '/meus-agendamentos'
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao agendar treino'
      );
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Agendar treino
      </Text>

      <Text style={styles.personal}>
        {nome}
      </Text>

      <View style={styles.grid}>

        {horarios.map((horario) => {

          const ocupado =
            horariosOcupados.includes(
              horario
            );

          return (

            <TouchableOpacity
              key={horario}

              style={[

                styles.card,

                ocupado &&
                  styles.cardDisabled,
              ]}

              disabled={ocupado}

              onPress={() =>
                agendarTreino(
                  horario
                )
              }
            >

              <Text
                style={[
                  styles.hour,

                  ocupado &&
                    styles.hourDisabled,
                ]}
              >

                {horario}

              </Text>

            </TouchableOpacity>
          );
        })}

      </View>

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
    marginTop: 50,
  },

  personal: {
    color: '#9FE870',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 30,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: '#1A1A1A',
    width: '30%',
    paddingVertical: 25,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
  },

  cardDisabled: {
    backgroundColor: '#444',
  },

  hour: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

  hourDisabled: {
    color: '#999',
  },
});