import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import {
  router,
} from 'expo-router';

import {
  useEffect,
  useState,
} from 'react';

export default function Home() {

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

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() =>
            router.push('/perfil' as any)
          }
        >

          <Text style={styles.profileText}>
            👤
          </Text>

        </TouchableOpacity>

      </View>

      {/* BANNER */}

      <View style={styles.banner}>

        <View style={styles.bannerContent}>

          <Text style={styles.bannerTitle}>
            Seu treino começa hoje 🚀
          </Text>

          <Text style={styles.bannerText}>
            Encontre academias,
            personais e treinos
            personalizados perto de você.
          </Text>

          <TouchableOpacity
            style={styles.bannerButton}
          >

            <Text style={styles.bannerButtonText}>
              Explorar
            </Text>

          </TouchableOpacity>

        </View>

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
            router.push('/personal' as any)
          }
        >

          <Text style={styles.menuEmoji}>
            🧑‍🏫
          </Text>

          <Text style={styles.menuText}>
            Personais
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

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            router.push('/favoritos' as any)
          }
        >

          <Text style={styles.menuEmoji}>
            ❤️
          </Text>

          <Text style={styles.menuText}>
            Favoritos
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

        <View style={styles.gymCard}>

          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
            }}
            style={styles.gymImage}
          />

          <View style={styles.gymContent}>

            <Text style={styles.gymName}>
              Smart Gym Recife
            </Text>

            <Text style={styles.gymInfo}>
              ⭐ 4.9 • Boa Viagem
            </Text>

          </View>

        </View>

        <View style={styles.gymCard}>

          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
            }}
            style={styles.gymImage}
          />

          <View style={styles.gymContent}>

            <Text style={styles.gymName}>
              Power Fit
            </Text>

            <Text style={styles.gymInfo}>
              ⭐ 4.8 • Pina
            </Text>

          </View>

        </View>

      </ScrollView>

      {/* PERSONAIS */}

      <Text style={styles.sectionTitle}>
        🧑‍🏫 Personais populares
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >

        <View style={styles.personalCard}>

          <Image
            source={{
              uri:
                'https://randomuser.me/api/portraits/men/32.jpg',
            }}
            style={styles.personalImage}
          />

          <Text style={styles.personalName}>
            Carlos Henrique
          </Text>

          <Text style={styles.personalType}>
            Hipertrofia
          </Text>

        </View>

        <View style={styles.personalCard}>

          <Image
            source={{
              uri:
                'https://randomuser.me/api/portraits/women/44.jpg',
            }}
            style={styles.personalImage}
          />

          <Text style={styles.personalName}>
            Amanda Silva
          </Text>

          <Text style={styles.personalType}>
            Emagrecimento
          </Text>

        </View>

      </ScrollView>

      {/* TREINOS */}

      <Text style={styles.sectionTitle}>
        🔥 Treinos populares
      </Text>

      {loading ? (

        <Text style={styles.loadingText}>
          Carregando treinos...
        </Text>

      ) : (

        Array.isArray(treinos)
        && treinos.length > 0 ? (

          treinos.map((treino) => (

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

          ))

        ) : (

          <Text style={styles.loadingText}>
            Nenhum treino encontrado.
          </Text>

        )

      )}

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          🚀 Treina Comigo Fitness App
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

  header: {
    marginTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: '#FFF',
    fontSize: 22,
  },

  banner: {
    backgroundColor: '#9FE870',
    margin: 20,
    borderRadius: 28,
    padding: 25,
  },

  bannerContent: {},

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

  bannerButton: {
    backgroundColor: '#000',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 16,
    width: 140,
    alignItems: 'center',
  },

  bannerButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  menuCard: {
    width: '47%',
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

  loadingText: {
    color: '#AAA',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
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