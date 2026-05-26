import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  useEffect,
  useState,
  useContext,
} from 'react';

import { router } from 'expo-router';

import { AuthContext } from '../contexts/AuthContext';

export default function Home() {

  const { usuario } = useContext(AuthContext);

  const [academias, setAcademias] = useState<any[]>([]);

  const [personais, setPersonais] = useState<any[]>([]);

  const [busca, setBusca] = useState('');

  const [
    categoriaSelecionada,
    setCategoriaSelecionada
  ] = useState('');

  useEffect(() => {

    buscarAcademias();

    buscarPersonais();

  }, []);

  const categorias = [
    'Musculação',
    'Funcional',
    'Crossfit',
    'Emagrecimento',
    'Hipertrofia',
  ];

  async function buscarAcademias() {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/academias'
      );

      const data = await response.json();

      setAcademias(data);

    } catch (error) {

      console.log(error);
    }
  }

  async function buscarPersonais() {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/personais'
      );

      const data = await response.json();

      setPersonais(data);

    } catch (error) {

      console.log(error);
    }
  }

  const academiasFiltradas =
    academias.filter((academia) =>

      academia.nome
        .toLowerCase()
        .includes(
          busca.toLowerCase()
        )
    );

  const personaisFiltrados =
    personais.filter((personal) => {

      const matchBusca =
        personal.nome
          .toLowerCase()
          .includes(
            busca.toLowerCase()
          );

      const matchCategoria =

        categoriaSelecionada === ''

        ||

        personal.especialidade
          ?.toLowerCase()
          .includes(
            categoriaSelecionada.toLowerCase()
          );

      return (
        matchBusca &&
        matchCategoria
      );
    });

  return (

    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.location}>
          📍 Recife, PE
        </Text>

        <Text style={styles.title}>
          Olá, {usuario?.nome} 👋
        </Text>

        <Text style={styles.subtitle}>
          Vamos treinar hoje?
        </Text>

        <TextInput
          placeholder="Buscar personal ou academia"
          placeholderTextColor="#777"
          value={busca}
          onChangeText={setBusca}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/perfil')}
        >

          <Text style={styles.profileText}>
            Ver Perfil
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() =>
            router.push('/meus-agendamentos')
          }
        >

          <Text style={styles.profileText}>
            Meus Treinos
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
        style={styles.profileButton}
        onPress={() =>
            router.push('/favoritos')
            }
        >
            <Text style={styles.profileText}>
                Favoritos ❤️
            </Text>
        </TouchableOpacity>


        <TouchableOpacity
        style={styles.profileButton}
        onPress={() =>
          router.push('/mapa')
          }
        >
          
          <Text style={styles.profileText}>
            📍 Ver mapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.profileButton}
        onPress={() =>
          router.push('/admin')
          }
        >
          <Text style={styles.profileText}>
            👑 Painel Admin
          </Text>
        </TouchableOpacity>


      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >

        <TouchableOpacity
          style={[
            styles.categoryButton,

            categoriaSelecionada === '' &&
              styles.categorySelected
          ]}
          onPress={() =>
            setCategoriaSelecionada('')
          }
        >

          <Text style={styles.categoryText}>
            Todos
          </Text>

        </TouchableOpacity>

        {categorias.map((categoria) => (

          <TouchableOpacity
            key={categoria}
            style={[
              styles.categoryButton,

              categoriaSelecionada === categoria &&
                styles.categorySelected
            ]}
            onPress={() =>
              setCategoriaSelecionada(categoria)
            }
          >

            <Text style={styles.categoryText}>
              {categoria}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

      <Text style={styles.sectionTitle}>
        Academias próximas
      </Text>

      {academiasFiltradas.map((academia) => (

        <TouchableOpacity
          key={academia.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/academia',

              params: {
                nome: academia.nome,
                imagem: academia.imagem,
                avaliacao: academia.avaliacao,
                distancia: academia.distancia,
                diaria: academia.diaria,
              },
            })
          }
        >

          <Image
            source={{
              uri: academia.imagem
            }}
            style={styles.image}
          />

          <View style={styles.cardContent}>

            <Text style={styles.gymName}>
              {academia.nome}
            </Text>

            <Text style={styles.gymInfo}>
              ⭐ {academia.avaliacao} • {academia.distancia}
            </Text>

            <Text style={styles.price}>
              Diária R$ {academia.diaria}
            </Text>

          </View>

        </TouchableOpacity>

      ))}

      <Text style={styles.sectionTitle}>
        Personais em destaque
      </Text>

      {personaisFiltrados.map((personal) => (

        <TouchableOpacity
          key={personal.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/personal',

              params: {
                nome: personal.nome,
                foto: personal.foto,
                especialidade: personal.especialidade,
                descricao: personal.descricao,
                valor: personal.valor_hora,
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

          <View style={styles.cardContent}>

            <Text style={styles.gymName}>
              {personal.nome}
            </Text>

            <Text style={styles.gymInfo}>
              {personal.especialidade}
            </Text>

            <Text style={styles.gymInfo}>
              {personal.descricao}
            </Text>

            <Text style={styles.price}>
              R$ {personal.valor_hora}/hora
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
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 60,
    marginBottom: 25,
  },

  location: {
    color: '#9FE870',
    fontSize: 14,
    marginBottom: 10,
  },

  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#AAA',
    fontSize: 16,
    marginTop: 5,
  },

  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
    color: '#FFF',
    marginTop: 20,
    marginBottom: 15,
  },

  profileButton: {
    backgroundColor: '#9FE870',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    width: 150,
    alignItems: 'center',
  },

  profileText: {
    color: '#000',
    fontWeight: 'bold',
  },

  categoryContainer: {
    marginTop: 10,
    marginBottom: 20,
  },

  categoryButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
  },

  categorySelected: {
    backgroundColor: '#9FE870',
  },

  categoryText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },

  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 180,
  },

  cardContent: {
    padding: 15,
  },

  gymName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  gymInfo: {
    color: '#AAA',
    marginTop: 5,
  },

  price: {
    color: '#9FE870',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});