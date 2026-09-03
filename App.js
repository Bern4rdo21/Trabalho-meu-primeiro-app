import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import JogoDaVelha from "./JogoDaVelha";

const perfis = [
  {
    id: 1,
    nome: "João Vitor",
    profissao: "Engenheiro de Software",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    nome: "Mariana Costa",
    profissao: "Designer de Produto",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    nome: "Lucas Almeida",
    profissao: "Desenvolvedor Mobile",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

function CartaoPerfil({ nomeInicial, profissao, avatar }) {
  const [nome, setNome] = useState(nomeInicial);
  const [seguindo, setSeguindo] = useState(false);
  const nomeExibido = nome.trim() || "Sem nome";

  return (
    <View style={styles.cartao}>
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <Text style={styles.nomeUsuario}>{nomeExibido}</Text>
      <Text style={styles.profissao}>{profissao}</Text>

      <TouchableOpacity
        style={[styles.botao, seguindo && styles.botaoDesativado]}
        activeOpacity={0.7}
        onPress={() => setSeguindo((valorAtual) => !valorAtual)}
        accessibilityRole="button"
        accessibilityState={{ selected: seguindo }}
      >
        <Text style={styles.textoBotao}>
          {seguindo ? "Já seguindo" : "Seguir"}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Alterar nome..."
        placeholderTextColor="#777777"
        value={nome}
        onChangeText={setNome}
        maxLength={40}
      />
    </View>
  );
}

export default function App() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Perfis da comunidade</Text>
      <Text style={styles.subtitulo}>
        Conheça pessoas e personalize os nomes dos perfis.
      </Text>

      {perfis.map((perfil) => (
        <CartaoPerfil
          key={perfil.id}
          nomeInicial={perfil.nome}
          profissao={perfil.profissao}
          avatar={perfil.avatar}
        />
      ))}

      <JogoDaVelha />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  conteudo: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 48,
  },
  titulo: {
    color: "#14325A",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    color: "#505050",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
    marginTop: 6,
    textAlign: "center",
  },
  cartao: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    elevation: 5,
    marginBottom: 24,
    maxWidth: 420,
    padding: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
  },
  avatar: {
    borderRadius: 60,
    height: 120,
    marginBottom: 15,
    width: 120,
  },
  nomeUsuario: {
    color: "#14325A",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  profissao: {
    color: "#505050",
    fontSize: 16,
    marginBottom: 20,
    marginTop: 4,
    textAlign: "center",
  },
  botao: {
    alignItems: "center",
    backgroundColor: "#0064A0",
    borderRadius: 8,
    marginBottom: 20,
    minWidth: 140,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  botaoDesativado: {
    backgroundColor: "#777777",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#CCCCCC",
    borderRadius: 8,
    borderWidth: 1,
    color: "#202020",
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
});
