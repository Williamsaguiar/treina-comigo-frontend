import {
  View,
  Text,
 StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

export default function MeusAgendamentos() {

  const [agendamentos, setAgendamentos] = useState<any[]>([]);

  useEffect(() => {

    buscarAgendamentos();

  }, []);

  async function buscarAgendamentos() {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/agendamentos'
      );

      const data = await response.json();

      setAgendamentos(data);

    } catch (error) {

      console.log(error);
    }
  }

  async function cancelarAgendamento(id: number) {

    try {

      await fetch(
        `http://127.0.0.1:8000/agendamentos/${id}`,
        {
          method: 'DELETE',
        }
      );

      Alert.alert(
        'Sucesso 🚀',
        'Treino cancelado'
      );

      buscarAgendamentos();

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Meus Agendamentos
      </Text>

      {agendamentos.map((item) => (

        <View
          key={item.id}
          style={styles.card}
        >

          <Text style={styles.personal}>
            {item.personal}
          </Text>

          <Text style={styles.info}>
            📅 {item.data}
          </Text>

          <Text style={styles.info}>
            ⏰ {item.horario}
          </Text>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              cancelarAgendamento(item.id)
            }
          >

            <Text style={styles.cancelText}>
              Cancelar treino
            </Text>

          </TouchableOpacity>

        </View>

      ))}

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
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  personal: {
    color: '#9FE870',
    fontSize: 22,
    fontWeight: 'bold',
  },

  info: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 10,
  },

  cancelButton: {
    backgroundColor: '#FF4D4D',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },

  cancelText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});