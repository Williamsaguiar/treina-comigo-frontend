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

export default function Admin() {

  const [usuarios, setUsuarios] =
    useState<any[]>([]);

  const [agendamentos,
    setAgendamentos] =
    useState<any[]>([]);

  const [favoritos,
    setFavoritos] =
    useState<any[]>([]);

  const [avaliacoes,
    setAvaliacoes] =
    useState<any[]>([]);

  const [mensagens,
    setMensagens] =
    useState<any[]>([]);

  useEffect(() => {

    buscarDados();

  }, []);

  async function buscarDados() {

    try {

      const usuariosResponse =
        await fetch(
          'http://127.0.0.1:8000/usuarios'
        );

      const usuariosData =
        await usuariosResponse.json();

      setUsuarios(usuariosData);

      const agendamentosResponse =
        await fetch(
          'http://127.0.0.1:8000/agendamentos'
        );

      const agendamentosData =
        await agendamentosResponse.json();

      setAgendamentos(
        agendamentosData
      );

      const favoritosResponse =
        await fetch(
          'http://127.0.0.1:8000/favoritos'
        );

      const favoritosData =
        await favoritosResponse.json();

      setFavoritos(
        favoritosData
      );

      const mensagensResponse =
        await fetch(
          'http://127.0.0.1:8000/mensagens/Carlos'
        );

      const mensagensData =
        await mensagensResponse.json();

      setMensagens(
        mensagensData
      );

      const avaliacoesResponse =
        await fetch(
          'http://127.0.0.1:8000/avaliacoes/Carlos'
        );

      const avaliacoesData =
        await avaliacoesResponse.json();

      setAvaliacoes(
        avaliacoesData
      );

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        👑 Painel Admin
      </Text>

      <View style={styles.card}>

        <Text style={styles.number}>
          {usuarios.length}
        </Text>

        <Text style={styles.label}>
          Usuários
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.number}>
          {agendamentos.length}
        </Text>

        <Text style={styles.label}>
          Agendamentos
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.number}>
          {favoritos.length}
        </Text>

        <Text style={styles.label}>
          Favoritos
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.number}>
          {avaliacoes.length}
        </Text>

        <Text style={styles.label}>
          Avaliações
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.number}>
          {mensagens.length}
        </Text>

        <Text style={styles.label}>
          Mensagens
        </Text>

      </View>

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
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
  },

  number: {
    color: '#9FE870',
    fontSize: 42,
    fontWeight: 'bold',
  },

  label: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 10,
  },
});