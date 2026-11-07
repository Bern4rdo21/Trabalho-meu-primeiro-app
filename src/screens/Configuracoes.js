import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Configuracoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#14325A' },
});
