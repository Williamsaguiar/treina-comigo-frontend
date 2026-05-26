import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import {
  useLocalSearchParams,
} from 'expo-router';

export default function Chat() {

  const { nome } =
    useLocalSearchParams();

  const [mensagens, setMensagens] =
    useState<any[]>([]);

  const [texto, setTexto] =
    useState('');

  useEffect(() => {

    buscarMensagens();

  }, []);

  async function buscarMensagens() {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/mensagens/${nome}`
      );

      const data = await response.json();

      setMensagens(data);

    } catch (error) {

      console.log(error);
    }
  }

  async function enviarMensagem() {

    if (!texto) return;

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/mensagens',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            aluno: 'Will',
            personal: nome,
            mensagem: texto,
          }),
        }
      );

      await response.json();

      setTexto('');

      buscarMensagens();

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        💬 Chat com {nome}
      </Text>

      <ScrollView
        style={styles.chatContainer}
      >

        {mensagens.map((item) => (

          <View
            key={item.id}
            style={styles.message}
          >

            <Text style={styles.user}>
              Você
            </Text>

            <Text style={styles.text}>
              {item.mensagem}
            </Text>

          </View>

        ))}

      </ScrollView>

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Digite uma mensagem"
          placeholderTextColor="#777"
          value={texto}
          onChangeText={setTexto}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={enviarMensagem}
        >

          <Text style={styles.sendText}>
            Enviar
          </Text>

        </TouchableOpacity>

      </View>

    </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },

  chatContainer: {
    flex: 1,
  },

  message: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
  },

  user: {
    color: '#9FE870',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  text: {
    color: '#FFF',
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },

  input: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 15,
    color: '#FFF',
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: '#9FE870',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 14,
  },

  sendText: {
    fontWeight: 'bold',
    color: '#000',
  },
});