import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import { router } from 'expo-router';

export default function Favoritos() {

  const [favoritos, setFavoritos] =
    useState<any[]>([]);

  useEffect(() => {

    buscarFavoritos();

  }, []);

  async function buscarFavoritos() {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/favoritos'
      );

      const data = await response.json();

      setFavoritos(data);

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Meus Favoritos ❤️
      </Text>

      {favoritos.map((personal) => (

        <TouchableOpacity
          key={personal.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/personal',

              params: {
                nome: personal.personal,
                foto: personal.foto,
                especialidade: personal.especialidade,
                descricao:
                  'Personal favoritado',
                valor: '80',
              },
            })
          }
        >

          <Image
            source={{
              uri: personal.foto
            }}
            style={styles.image}
          />

          <View style={styles.content}>

            <Text style={styles.name}>
              {personal.personal}
            </Text>

            <Text style={styles.specialty}>
              {personal.especialidade}
            </Text>

          </View>

        </TouchableOpacity>

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
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: 15,
  },

  name: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  specialty: {
    color: '#AAA',
    marginTop: 8,
    fontSize: 16,
  },
});