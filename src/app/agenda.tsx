import { View, Text, StyleSheet } from 'react-native';

export default function Agenda() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 28,
  },
});