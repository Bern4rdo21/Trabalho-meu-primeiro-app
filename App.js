import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const contatosIniciais = [
  { id: '1', nome: 'Alice Silva', telefone: '(31) 99999-1111' },
  { id: '2', nome: 'Bruno Costa', telefone: '(31) 98888-2222' },
  { id: '3', nome: 'Carlos Souza', telefone: '(31) 97777-3333' },
  { id: '4', nome: 'Diana Rocha', telefone: '(31) 96666-4444' },
  { id: '5', nome: 'Eduardo Lima', telefone: '(31) 95555-5555' },
  { id: '6', nome: 'Fernanda Alves', telefone: '(31) 94444-6666' },
  { id: '7', nome: 'Gabriel Mendes', telefone: '(31) 93333-7777' },
  { id: '8', nome: 'Helena Martins', telefone: '(31) 92222-8888' },
  { id: '9', nome: 'Igor Ferreira', telefone: '(31) 91111-9999' },
  { id: '10', nome: 'Julia Pereira', telefone: '(31) 98765-1000' },
  { id: '11', nome: 'Karina Oliveira', telefone: '(31) 98765-1001' },
  { id: '12', nome: 'Lucas Almeida', telefone: '(31) 98765-1002' },
  { id: '13', nome: 'Mariana Ribeiro', telefone: '(31) 98765-1003' },
  { id: '14', nome: 'Nicolas Barbosa', telefone: '(31) 98765-1004' },
  { id: '15', nome: 'Olivia Carvalho', telefone: '(31) 98765-1005' },
];

const nomesAdicionais = ['Patricia Gomes', 'Rafael Teixeira', 'Sofia Nunes'];

export default function Agenda() {
  const [contatos, setContatos] = useState(contatosIniciais);
  const [carregando, setCarregando] = useState(false);
  const proximoId = useRef(contatosIniciais.length + 1);
  const fimAlcancadoNesteGesto = useRef(true);
  const temporizadorAtualizacao = useRef(null);

  useEffect(() => () => clearTimeout(temporizadorAtualizacao.current), []);

  const renderizarContato = ({ item }) => (
    <View style={styles.cardContato}>
      <Text style={styles.nomeText}>{item.nome}</Text>
      <Text style={styles.telefoneText}>{item.telefone}</Text>
    </View>
  );

  const renderizarSeparador = () => <View style={styles.separador} />;

  const renderizarVazio = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.textoVazio}>Agenda Vazia.</Text>
      <Text style={styles.dicaVazio}>Puxe a lista para baixo para restaurar os contatos.</Text>
    </View>
  );

  const atualizarContatos = () => {
    if (carregando) return;

    setCarregando(true);
    fimAlcancadoNesteGesto.current = true;
    temporizadorAtualizacao.current = setTimeout(() => {
      proximoId.current = contatosIniciais.length + 1;
      setContatos(contatosIniciais);
      setCarregando(false);
      temporizadorAtualizacao.current = null;
    }, 2000);
  };

  const adicionarContatos = () => {
    if (fimAlcancadoNesteGesto.current || carregando || contatos.length === 0) return;

    fimAlcancadoNesteGesto.current = true;
    const novosContatos = nomesAdicionais.map((nome) => {
      const id = proximoId.current++;
      return {
        id: String(id),
        nome: `${nome} ${Math.floor((id - 16) / 3) + 1}`,
        telefone: `(31) 9${String(80000000 + id * 1234).slice(-8)}`,
      };
    });
    setContatos((atuais) => [...atuais, ...novosContatos]);
  };

  const limparContatos = () => {
    fimAlcancadoNesteGesto.current = true;
    setContatos([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minha Agenda</Text>
        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparContatos}
          accessibilityRole="button"
          accessibilityLabel="Limpar todos os contatos"
        >
          <Text style={styles.textoBotao}>Limpar Tudo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarContato}
        ItemSeparatorComponent={renderizarSeparador}
        ListEmptyComponent={renderizarVazio}
        refreshing={carregando}
        onRefresh={atualizarContatos}
        onScrollBeginDrag={() => { fimAlcancadoNesteGesto.current = false; }}
        onEndReached={adicionarContatos}
        onEndReachedThreshold={0.2}
        contentContainerStyle={contatos.length === 0 ? styles.listaVazia : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 50 },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#14325A' },
  botaoLimpar: { backgroundColor: '#D32F2F', padding: 10, borderRadius: 8 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
  cardContato: { padding: 20, backgroundColor: '#FFF' },
  nomeText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  telefoneText: { fontSize: 16, color: '#666', marginTop: 5 },
  separador: { height: 1, backgroundColor: '#E0E0E0' },
  listaVazia: { flexGrow: 1 },
  containerVazio: { alignItems: 'center', marginTop: 50, paddingHorizontal: 24 },
  textoVazio: { fontSize: 18, color: '#808080', fontStyle: 'italic' },
  dicaVazio: { fontSize: 14, color: '#808080', marginTop: 12, textAlign: 'center' },
});
