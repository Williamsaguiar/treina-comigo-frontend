import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  useLocalSearchParams,
  router,
} from 'expo-router';

export default function Pagamento() {

  const { nome, valor } =
    useLocalSearchParams();

  function confirmarPagamento() {

    Alert.alert(
      'Pagamento aprovado 🚀',
      'Treino contratado com sucesso!'
    );

    router.push('/');
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        💳 Pagamento
      </Text>

      <Text style={styles.personal}>
        Personal:
      </Text>

      <Text style={styles.nome}>
        {nome}
      </Text>

      <Text style={styles.valor}>
        R$ {valor}
      </Text>

      <Image
        source={{
          uri:
            'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PIX-TREINA-COMIGO'
        }}
        style={styles.qrcode}
      />

      <Text style={styles.pixText}>
        Escaneie o QRCode Pix
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={confirmarPagamento}
      >

        <Text style={styles.buttonText}>
          Confirmar Pagamento
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
  },

  personal: {
    color: '#AAA',
    fontSize: 18,
    marginTop: 30,
  },

  nome: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },

  valor: {
    color: '#9FE870',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },

  qrcode: {
    width: 250,
    height: 250,
    marginTop: 40,
    borderRadius: 20,
  },

  pixText: {
    color: '#AAA',
    marginTop: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#9FE870',
    padding: 18,
    borderRadius: 16,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});