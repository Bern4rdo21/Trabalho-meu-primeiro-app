import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalhesUsuario({ navigation, route }) {
  const { nomeUsuario = 'Visitante' } = route.params ?? {};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Perfil</Text>
      <Text style={styles.texto}>Bem-vindo, {nomeUsuario}!</Text>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Voltar para a tela anterior"
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
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
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#14325A', marginBottom: 10 },
  texto: { fontSize: 18, color: '#555' },
  botaoVoltar: {
    backgroundColor: '#14325A',
    borderRadius: 8,
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  textoBotao: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
