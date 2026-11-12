import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

const CHAVE_USUARIO = '@AppTarefas:Usuario';
const USUARIO_INICIAL = { nome: 'Visitante', logado: true };

async function iniciarBanco(db) {
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER NOT NULL DEFAULT 0
    );
  `);
}

export default function App() {
  return (
    <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

function EcraPrincipal() {
  const db = useSQLiteContext();
  const [usuario, setUsuario] = useState(USUARIO_INICIAL);
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvandoNome, setSalvandoNome] = useState(false);

  const carregarTarefas = useCallback(async () => {
    try {
      const resultados = await db.getAllAsync(
        'SELECT id, descricao, concluida FROM tarefas ORDER BY id DESC;'
      );
      setTarefas(resultados);
    } catch (erro) {
      console.error('Falha ao ler tarefas:', erro);
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    } finally {
      setCarregando(false);
    }
  }, [db]);

  useEffect(() => {
    let ativo = true;

    async function carregarPreferencias() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE_USUARIO);
        if (salvo && ativo) {
          const perfil = JSON.parse(salvo);
          if (typeof perfil.nome === 'string' && typeof perfil.logado === 'boolean') {
            setUsuario(perfil);
          }
        }
      } catch (erro) {
        console.error('Falha ao ler preferência:', erro);
      }
    }

    carregarPreferencias();
    carregarTarefas();
    return () => { ativo = false; };
  }, [carregarTarefas]);

  const salvarNome = async () => {
    const novoUsuario = { ...usuario, nome: 'Estudante INF204', logado: true };
    setSalvandoNome(true);
    try {
      await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);
    } catch (erro) {
      console.error('Falha ao salvar preferência:', erro);
      Alert.alert('Erro', 'Não foi possível salvar o nome.');
    } finally {
      setSalvandoNome(false);
    }
  };

  const adicionarTarefa = async () => {
    const descricao = novaTarefa.trim();
    if (!descricao) return;

    try {
      await db.runAsync(
        'INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);',
        [descricao, 0]
      );
      setNovaTarefa('');
      await carregarTarefas();
    } catch (erro) {
      console.error('Falha ao adicionar tarefa:', erro);
      Alert.alert('Erro', 'Não foi possível adicionar a tarefa.');
    }
  };

  const alternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 1 ? 0 : 1;
    try {
      await db.runAsync('UPDATE tarefas SET concluida = ? WHERE id = ?;', [novoStatus, id]);
      await carregarTarefas();
    } catch (erro) {
      console.error('Falha ao atualizar tarefa:', erro);
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  };

  const eliminarTarefa = async (id) => {
    try {
      await db.runAsync('DELETE FROM tarefas WHERE id = ?;', [id]);
      await carregarTarefas();
    } catch (erro) {
      console.error('Falha ao eliminar tarefa:', erro);
      Alert.alert('Erro', 'Não foi possível eliminar a tarefa.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Olá, {usuario.nome}!</Text>
        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={salvarNome}
          disabled={salvandoNome}
          accessibilityRole="button"
          accessibilityLabel="Mudar nome de usuário"
        >
          <Text style={styles.textoBotao}>Mudar Nome</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          onSubmitEditing={adicionarTarefa}
          returnKeyType="done"
          accessibilityLabel="Descrição da nova tarefa"
        />
        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionarTarefa}
          accessibilityRole="button"
          accessibilityLabel="Adicionar tarefa"
        >
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>
      {carregando ? (
        <ActivityIndicator size="large" color="#14325A" />
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa ainda.</Text>}
          renderItem={({ item }) => (
            <View style={styles.cartao}>
              <TouchableOpacity
                style={styles.corpoTarefa}
                onPress={() => alternarStatus(item.id, item.concluida)}
                accessibilityRole="button"
                accessibilityLabel={`Alternar conclusão: ${item.descricao}`}
              >
                <Text style={[styles.textoTarefa, item.concluida === 1 && styles.textoConcluido]}>
                  {item.descricao}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoEliminar}
                onPress={() => eliminarTarefa(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Eliminar tarefa: ${item.descricao}`}
              >
                <Text style={styles.textoEliminar}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 50, paddingHorizontal: 20 },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  titulo: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#14325A' },
  botaoAcao: { backgroundColor: '#808080', padding: 10, borderRadius: 8, marginLeft: 10 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 10, backgroundColor: '#FFF' },
  botaoAdd: { backgroundColor: '#0064A0', padding: 15, borderRadius: 8, marginLeft: 10, justifyContent: 'center' },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  cartao: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginBottom: 10, borderRadius: 8, elevation: 2 },
  corpoTarefa: { flex: 1, padding: 15 },
  textoTarefa: { fontSize: 18, color: '#333' },
  textoConcluido: { textDecorationLine: 'line-through', color: '#999' },
  botaoEliminar: { paddingHorizontal: 18, paddingVertical: 15 },
  textoEliminar: { color: '#D32F2F', fontWeight: 'bold', fontSize: 18 },
  vazio: { textAlign: 'center', color: '#808080', marginTop: 40 },
});
