import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import api from './src/services/api';
import NovoUsuario from './src/screens/NovoUsuario';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const buscarUsuarios = useCallback(async ({ atualizacao = false, signal } = {}) => {
    if (atualizacao) {
      setAtualizando(true);
    } else {
      setLoading(true);
    }
    setErro(null);

    try {
      const resposta = await api.get('/users', { signal });
      if (!signal?.aborted) setUsuarios(resposta.data);
    } catch (falha) {
      if (falha.code !== 'ERR_CANCELED' && !signal?.aborted) {
        console.error('Erro ao buscar dados:', falha.message);
        setErro('Não foi possível carregar os usuários. Tente novamente.');
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
        setAtualizando(false);
      }
    }
  }, []);

  useEffect(() => {
    const controlador = new AbortController();
    buscarUsuarios({ signal: controlador.signal });
    return () => controlador.abort();
  }, [buscarUsuarios]);

  if (mostrarFormulario) {
    return <NovoUsuario onVoltar={() => setMostrarFormulario(false)} />;
  }

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#14325A" />
        <Text style={styles.textoCarregando}>A carregar utilizadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Lista de Utilizadores</Text>
        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => setMostrarFormulario(true)}
          accessibilityRole="button"
          accessibilityLabel="Abrir formulário de novo usuário"
        >
          <Text style={styles.textoBotao}>Novo</Text>
        </TouchableOpacity>
      </View>
      {erro && (
        <View style={styles.aviso}>
          <Text style={styles.textoErro}>{erro}</Text>
          <TouchableOpacity onPress={() => buscarUsuarios()} accessibilityRole="button">
            <Text style={styles.tentarNovamente}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        refreshing={atualizando}
        onRefresh={() => buscarUsuarios({ atualizacao: true })}
        ListEmptyComponent={erro ? null : (
          <Text style={styles.textoVazio}>Nenhum usuário encontrado.</Text>
        )}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 50 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  textoCarregando: { marginTop: 12, color: '#555' },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titulo: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#14325A' },
  botaoNovo: { marginLeft: 12, backgroundColor: '#14325A', padding: 10, borderRadius: 8 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  lista: { paddingHorizontal: 20, paddingBottom: 24, flexGrow: 1 },
  cartao: { backgroundColor: '#FFF', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  email: { color: '#666', marginTop: 5 },
  aviso: { marginHorizontal: 20, marginBottom: 16, padding: 12, backgroundColor: '#FDECEC', borderRadius: 8 },
  textoErro: { color: '#9A2424' },
  tentarNovamente: { color: '#14325A', fontWeight: 'bold', marginTop: 8 },
  textoVazio: { textAlign: 'center', color: '#808080', marginTop: 40 },
});
