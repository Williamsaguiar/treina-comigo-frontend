import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import {
  useLocalSearchParams,
  router,
} from 'expo-router';

export default function Personal() {

  const params = useLocalSearchParams();

  const nome = String(params.nome);

  const foto = String(params.foto);

  const especialidade = String(params.especialidade);

  const descricao = String(params.descricao);

  const valor = String(params.valor);

  const [avaliacoes, setAvaliacoes] =
    useState<any[]>([]);

  useEffect(() => {

    buscarAvaliacoes();

  }, []);

  async function buscarAvaliacoes() {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/avaliacoes/${nome}`
      );

      const data = await response.json();

      setAvaliacoes(data);

    } catch (error) {

      console.log(error);
    }
  }

  async function favoritar() {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/favoritos',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            aluno: 'Will',
            personal: nome,
            foto,
            especialidade,
          }),
        }
      );

      const data = await response.json();

      Alert.alert(
        'Favoritos ❤️',
        data.message || data.error
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao favoritar'
      );
    }
  }

  async function avaliar() {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/avaliacoes',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            aluno: 'Will',
            personal: nome,
            nota: 5,
            comentario:
              'Excelente personal 🚀',
          }),
        }
      );

      const data = await response.json();

      Alert.alert(
        'Avaliação',
        data.message
      );

      buscarAvaliacoes();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Erro ao avaliar'
      );
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Image
        source={{
          uri: foto
        }}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text style={styles.name}>
          {nome}
        </Text>

        <Text style={styles.specialty}>
          {especialidade}
        </Text>

        <Text style={styles.description}>
          {descricao}
        </Text>

        <Text style={styles.price}>
          R$ {valor}/hora
        </Text>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={favoritar}
        >

          <Text style={styles.favoriteText}>
            ❤️ Favoritar
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avaliarButton}
          onPress={avaliar}
        >

          <Text style={styles.avaliarText}>
            ⭐ Avaliar
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/agendamento',

              params: {
                nome,
              },
            })
          }
        >

          <Text style={styles.buttonText}>
            Contratar Personal
          </Text>

          <TouchableOpacity
          style={styles.chatButton}
          onPress={() =>
            router.push({
              pathname: '/chat',
              params: {
                nome,
              },
            })
            }
          >
            <Text style={styles.chatText}>
               💬 Conversar
               </Text>
            </TouchableOpacity>


            <TouchableOpacity
            style={styles.paymentButton}
            onPress={() =>
              router.push({
                pathname: '/pagamento',
                
                params: {
                  nome,
                  valor,
                },
              })
            }
          >
            <Text style={styles.paymentText}>
              💳 Pagar Treino
              </Text>
          </TouchableOpacity>

        </TouchableOpacity>

        <Text style={styles.reviewTitle}>
          Avaliações ⭐
        </Text>

        {avaliacoes.map((item) => (

          <View
            key={item.id}
            style={styles.reviewCard}
          >

            <Text style={styles.reviewNota}>
              ⭐ {item.nota}
            </Text>

            <Text style={styles.reviewComment}>
              {item.comentario}
            </Text>

          </View>

        ))}

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

  specialty: {
    color: '#9FE870',
    fontSize: 18,
    marginTop: 10,
  },

  description: {
    color: '#AAA',
    fontSize: 16,
    marginTop: 20,
    lineHeight: 24,
  },

  price: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
  },

  favoriteButton: {
    backgroundColor: '#FF4D6D',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  favoriteText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  avaliarButton: {
    backgroundColor: '#FFD54F',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  avaliarText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#9FE870',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },

  reviewTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },

  reviewCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
  },

  reviewNota: {
    color: '#FFD54F',
    fontWeight: 'bold',
    fontSize: 18,
  },

  reviewComment: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 15,
  },

  chatButton: {
  backgroundColor: '#3B82F6',
  padding: 16,
  borderRadius: 14,
  alignItems: 'center',
  marginTop: 20,
},

chatText: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 16,
},

paymentButton: {
  backgroundColor: '#22C55E',
  padding: 16,
  borderRadius: 14,
  alignItems: 'center',
  marginTop: 20,
},

paymentText: {
  color: '#FFF',
  fontWeight: 'bold',
  fontSize: 16,
},
});