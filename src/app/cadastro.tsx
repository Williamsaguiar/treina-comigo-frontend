import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Cadastro() {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        Criar Conta
      </Text>

      <Text style={styles.subtitle}>
        Escolha como deseja usar o app
      </Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#777"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.typeButton}>
        <Text style={styles.typeText}>
          👤 Sou Aluno
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.typeButton}>
        <Text style={styles.typeText}>
          💪 Sou Personal
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.typeButton}>
        <Text style={styles.typeText}>
          🏋️ Sou Academia
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Criar Conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 25,
    justifyContent: 'center',
  },

  logo: {
    color: '#9FE870',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    color: '#AAA',
    marginBottom: 35,
    fontSize: 16,
  },

  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 18,
    color: '#FFF',
    marginBottom: 20,
  },

  typeButton: {
    backgroundColor: '#1A1A1A',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  typeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#9FE870',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});