import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';

import { router } from 'expo-router';

import {
  useEffect,
  useState,
} from 'react';

export default function Home() {

  const [treinos, setTreinos] = useState<any[]>([]);
  const [academias, setAcademias] = useState<any[]>([]);
  const [personais, setPersonais] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    carregarDados();

  }, []);

  async function carregarDados() {

    try {

      setLoading(true);

      await Promise.all([
        buscarTreinos(),
        buscarAcademias(),
        buscarPersonais(),
      ]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  async function buscarTreinos() {

    try {

      const response = await fetch(
        'https://treina-comigo-api.onrender.com/treinos'
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar treinos');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setTreinos(data);
      }

    } catch (error) {

      console.log(error);
    }
  }

  async function buscarAcademias() {

    try {

      const response = await fetch(
        'https://treina-comigo-api.onrender.com/academias'
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar academias');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setAcademias(data);
      }

    } catch (error) {

      console.log(error);
    }
  }

  async function buscarPersonais() {

    try {

      const response = await fetch(
        'https://treina-comigo-api.onrender.com/personais'
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar personais');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setPersonais(data);
      }

    } catch (error) {

      console.log(error);
    }
  }

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#9FE870"
        />

        <Text style={styles.loadingText}>
          Carregando...
        </Text>

      </View>
    );
  }

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <View>

          <Text style={styles.welcome}>
            Bem-vindo 👋
          </Text>

          <Text style={styles.logo}>
            Treina Comigo
          </Text>

        </View>

      </View>

      {/* BANNER */}

      <View style={styles.banner}>

        <Text style={styles.bannerTitle}>
          Seu treino começa hoje 🚀
        </Text>

        <Text style={styles.bannerText}>
          Encontre academias, personais
          e treinos personalizados.
        </Text>

      </View>

      {/* MENU */}

      <View style={styles.menuGrid}>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            router.push('/academia' as any)
          }
        >

          <Text style={styles.menuEmoji}>
            🏋️
          </Text>

          <Text style={styles.menuText}>
            Academias
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            router.push('/agendamentos' as any)
          }
        >

          <Text style={styles.menuEmoji}>
            📅
          </Text>

          <Text style={styles.menuText}>
            Agenda
          </Text>

        </TouchableOpacity>

      </View>

      {/* ACADEMIAS */}

      <Text style={styles.sectionTitle}>
        🏋️ Academias próximas
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >

        {academias.map((academia) => (

          <View
            key={academia.id}
            style={styles.gymCard}
          >

            <Image
              source={{
                uri: academia.imagem,
              }}
              style={styles.gymImage}
            />

            <View style={styles.gymContent}>

              <Text style={styles.gymName}>
                {academia.nome}
              </Text>

              <Text style={styles.gymInfo}>
                ⭐ {academia.nota} • {academia.bairro}
              </Text>

            </View>

          </View>

        ))}

      </ScrollView>

      {/* PERSONAIS */}

      <Text style={styles.sectionTitle}>
        🧑‍🏫 Personais
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >

        {personais.map((personal) => (

          <View
            key={personal.id}
            style={styles.personalCard}
          >

            <Image
              source={{
                uri: personal.foto,
              }}
              style={styles.personalImage}
            />

            <Text style={styles.personalName}>
              {personal.nome}
            </Text>

            <Text style={styles.personalType}>
              {personal.especialidade}
            </Text>

          </View>

        ))}

      </ScrollView>

      {/* TREINOS */}

      <Text style={styles.sectionTitle}>
        🔥 Treinos populares
      </Text>

      {treinos.map((treino) => (

        <View
          key={treino.id}
          style={styles.treinoCard}
        >

          <Text style={styles.treinoNome}>
            {treino.nome}
          </Text>

          <Text style={styles.treinoInfo}>
            🎯 {treino.objetivo}
          </Text>

          <Text style={styles.treinoInfo}>
            📈 {treino.nivel}
          </Text>

          <Text style={styles.treinoDescricao}>
            {treino.descricao}
          </Text>

        </View>

      ))}

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          🚀 Treina Comigo Fitness
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

  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 16,
  },

  header: {
    marginTop: 60,
    paddingHorizontal: 20,
  },

  welcome: {
    color: '#999',
    fontSize: 15,
  },

  logo: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 4,
  },

  banner: {
    backgroundColor: '#9FE870',
    margin: 20,
    borderRadius: 28,
    padding: 25,
  },

  bannerTitle: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  bannerText: {
    color: '#222',
    fontSize: 16,
    lineHeight: 24,
  },

  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  menuCard: {
    width: '48%',
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    paddingVertical: 28,
    alignItems: 'center',
    marginBottom: 18,
  },

  menuEmoji: {
    fontSize: 34,
    marginBottom: 10,
  },

  menuText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  gymCard: {
    width: 260,
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    marginRight: 16,
    overflow: 'hidden',
  },

  gymImage: {
    width: '100%',
    height: 160,
  },

  gymContent: {
    padding: 16,
  },

  gymName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  gymInfo: {
    color: '#AAA',
    marginTop: 8,
  },

  personalCard: {
    width: 170,
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginRight: 16,
  },

  personalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 14,
  },

  personalName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  personalType: {
    color: '#9FE870',
    marginTop: 8,
  },

  treinoCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 22,
    padding: 20,
  },

  treinoNome: {
    color: '#FFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  treinoInfo: {
    color: '#9FE870',
    marginBottom: 6,
    fontSize: 15,
  },

  treinoDescricao: {
    color: '#CCC',
    marginTop: 10,
    lineHeight: 22,
  },

  footer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },

  footerText: {
    color: '#666',
    fontSize: 14,
  },

});