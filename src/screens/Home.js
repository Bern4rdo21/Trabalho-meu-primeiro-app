import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela Inicial</Text>
      <Button
        title="Ver Perfil do Usuário"
        color="#14325A"
        onPress={() => navigation.navigate('Detalhes', { nomeUsuario: 'Turma INF204' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 24,
  },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#14325A', marginBottom: 20 },
});
