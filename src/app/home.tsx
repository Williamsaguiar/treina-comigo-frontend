import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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

      setTreinos(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  return (

    <ScrollView style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.logo}>
          🏋️ Treina Comigo
        </Text>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() =>
            router.push('/perfil')
          }
        >

          <Text style={styles.profileText}>
            👤 Perfil
          </Text>

        </TouchableOpacity>

      </View>

      {/* BANNER */}

      <View style={styles.banner}>

        <Text style={styles.bannerTitle}>
          Evolua seu corpo 🚀
        </Text>

        <Text style={styles.bannerText}>
          Personais, treinos,
          avaliações e acompanhamento
          completo em um só lugar.
        </Text>

      </View>

      {/* MENU */}

      <View style={styles.menuGrid}>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            router.push('/personal')
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
            router.push('/treinos')
          }
        >

          <Text style={styles.menuEmoji}>
            🧠
          </Text>

          <Text style={styles.menuText}>
            Treinos
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            router.push('/agendamentos')
          }
        >

          <Text style={styles.menuEmoji}>
            📅
          </Text>

          <Text style={styles.menuText}>
            Agendamentos
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuCard}
          onPress={() =>
            router.push('/favoritos')
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

      {/* TREINOS */}

      <Text style={styles.sectionTitle}>
        🔥 Treinos
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
              style={styles.highlightCard}
            >

              <Text style={styles.highlightTitle}>
                {treino.nome || 'Treino'}
              </Text>

              <Text style={styles.highlightText}>
                🎯 {treino.objetivo || ''}
              </Text>

              <Text style={styles.highlightText}>
                📈 {treino.nivel || ''}
              </Text>

              <Text style={styles.highlightText}>
                {treino.descricao || ''}
              </Text>

            </View>

          ))

        ) : (

          <Text style={styles.loadingText}>
            Nenhum treino encontrado.
          </Text>

        )

      )}

      {/* FOOTER */}

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

  logo: {
    color: '#9FE870',
    fontSize: 28,
    fontWeight: 'bold',
  },

  profileButton: {
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },

  profileText: {
    color: '#FFF',
    fontWeight: '600',
  },

  banner: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    borderRadius: 24,
    padding: 24,
  },

  bannerTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  bannerText: {
    color: '#CCC',
    fontSize: 16,
    lineHeight: 24,
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
    borderRadius: 22,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 18,
  },

  menuEmoji: {
    fontSize: 34,
    marginBottom: 12,
  },

  menuText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  highlightCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
  },

  highlightTitle: {
    color: '#9FE870',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  highlightText: {
    color: '#CCC',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
  },

  loadingText: {
    color: '#CCC',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },

  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },

  footerText: {
    color: '#666',
    fontSize: 14,
  },
});