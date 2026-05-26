import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

export default function Academia() {

  const params = useLocalSearchParams();

  return (

    <ScrollView style={styles.container}>

      <Image
        source={{
          uri: String(params.imagem)
        }}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text style={styles.name}>
          {params.nome}
        </Text>

        <Text style={styles.info}>
          ⭐ {params.avaliacao}
        </Text>

        <Text style={styles.info}>
          📍 {params.distancia}
        </Text>

        <Text style={styles.price}>
          Diária R$ {params.diaria}
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },

  image: {
    width: '100%',
    height: 320,
  },

  content: {
    padding: 25,
  },

  name: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  info: {
    color: '#AAA',
    fontSize: 18,
    marginTop: 10,
  },

  price: {
    color: '#9FE870',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
  },
});