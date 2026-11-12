import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '../services/api';

export default function NovoUsuario({ onVoltar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async () => {
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();
    if (!nomeLimpo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
      Alert.alert('Dados incompletos', 'Informe um nome e um email válido.');
      return;
    }

    setEnviando(true);
    try {
      await api.post('/users', { name: nomeLimpo, email: emailLimpo });
      Alert.alert('Sucesso', 'Cadastro simulado com sucesso.');
      setNome('');
      setEmail('');
    } catch (erro) {
      console.error('Erro ao cadastrar usuário:', erro.message);
      Alert.alert('Erro', 'Não foi possível enviar o cadastro. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onVoltar} accessibilityRole="button">
        <Text style={styles.voltar}>‹ Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Novo Usuário</Text>
      <Text style={styles.rotulo}>Nome</Text>
      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome completo"
        autoCapitalize="words"
        accessibilityLabel="Nome"
      />
      <Text style={styles.rotulo}>Email</Text>
      <TextInput
        style={styles.campo}
        value={email}
        onChangeText={setEmail}
        placeholder="nome@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Email"
      />
      <TouchableOpacity
        style={[styles.botaoEnviar, enviando && styles.botaoDesabilitado]}
        onPress={enviar}
        disabled={enviando}
        accessibilityRole="button"
      >
        {enviando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>Enviar</Text>}
      </TouchableOpacity>
      <Text style={styles.nota}>A API confirma o envio, mas não guarda o usuário permanentemente.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 50, paddingHorizontal: 20 },
  voltar: { color: '#14325A', fontSize: 16, marginBottom: 24 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#14325A', marginBottom: 24 },
  rotulo: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  campo: {
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  botaoEnviar: { backgroundColor: '#14325A', padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoDesabilitado: { opacity: 0.6 },
  textoBotao: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  nota: { color: '#666', fontSize: 13, marginTop: 16 },
});
