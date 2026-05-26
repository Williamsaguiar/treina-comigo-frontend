import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function Mapa() {

  const academias = [

    {
      id: 1,
      nome: 'IronFit Academia',
      endereco: 'Boa Viagem - Recife',
      distancia: '2.1 km',
    },

    {
      id: 2,
      nome: 'Blue Gym',
      endereco: 'Pina - Recife',
      distancia: '3.4 km',
    },
  ];

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        📍 Academias próximas
      </Text>

      {academias.map((academia) => (

        <View
          key={academia.id}
          style={styles.card}
        >

          <Text style={styles.name}>
            {academia.nome}
          </Text>

          <Text style={styles.info}>
            {academia.endereco}
          </Text>

          <Text style={styles.distance}>
            {academia.distancia}
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  name: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  info: {
    color: '#AAA',
    marginTop: 10,
    fontSize: 16,
  },

  distance: {
    color: '#9FE870',
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});