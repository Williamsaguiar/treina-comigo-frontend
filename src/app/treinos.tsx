import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

export default function Treinos() {

  const [treinos,
    setTreinos] =
    useState<any[]>([]);

  useEffect(() => {

    buscarTreinos();

  }, []);

  async function buscarTreinos() {

    try {

      const response =
        await fetch(
          'https://treina-comigo-api.onrender.com/treinos'
        );

      const data =
        await response.json();

      setTreinos(data);

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        🧠 Treinos
      </Text>

      {treinos.map((treino) => (

        <View
          key={treino.id}
          style={styles.card}
        >

          <Text style={styles.nome}>
            {treino.nome}
          </Text>

          <Text style={styles.info}>
            🎯 {treino.objetivo}
          </Text>

          <Text style={styles.info}>
            📈 {treino.nivel}
          </Text>

          <Text style={styles.descricao}>
            {treino.descricao}
          </Text>

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
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  nome: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  info: {
    color: '#9FE870',
    marginTop: 10,
    fontSize: 16,
  },

  descricao: {
    color: '#CCC',
    marginTop: 15,
    fontSize: 16,
  },
});