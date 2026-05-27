import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

export default function Treinos() {

  const [treinos,
    setTreinos] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    buscarTreinos();

  }, []);

  async function buscarTreinos() {

    try {

      setLoading(true);

      const response =
        await fetch(
          'https://treina-comigo-api.onrender.com/treinos'
        );

      const data =
        await response.json();

      if (Array.isArray(data)) {

        setTreinos(data);

      } else {

        setTreinos([]);
      }

    } catch (error) {

      console.log(error);

      setTreinos([]);

    } finally {

      setLoading(false);
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        🧠 Treinos
      </Text>

      {loading ? (

        <View style={styles.loadingContainer}>

          <ActivityIndicator
            size="large"
            color="#9FE870"
          />

          <Text style={styles.loadingText}>
            Carregando treinos...
          </Text>

        </View>

      ) : (

        Array.isArray(treinos)
        && treinos.length > 0 ? (

          treinos.map((treino) => (

            <View
              key={treino.id}
              style={styles.card}
            >

              <Text style={styles.nome}>
                {treino.nome || 'Treino'}
              </Text>

              <Text style={styles.info}>
                🎯 {treino.objetivo || ''}
              </Text>

              <Text style={styles.info}>
                📈 {treino.nivel || ''}
              </Text>

              <Text style={styles.descricao}>
                {treino.descricao || ''}
              </Text>

            </View>

          ))

        ) : (

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyText}>
              Nenhum treino encontrado.
            </Text>

          </View>

        )

      )}

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

  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  loadingText: {
    color: '#CCC',
    marginTop: 15,
    fontSize: 16,
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyText: {
    color: '#999',
    fontSize: 16,
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
    marginBottom: 10,
  },

  info: {
    color: '#9FE870',
    fontSize: 16,
    marginBottom: 6,
  },

  descricao: {
    color: '#CCC',
    fontSize: 15,
    marginTop: 10,
    lineHeight: 22,
  },

});
