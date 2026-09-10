import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function UrnaEletronica() {
  // Passo 1: estados independentes para os candidatos.
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);
  const [votosC, setVotosC] = useState(0);
  const [nomeMesario, setNomeMesario] = useState("");

  // Passo 3: dados derivados, sem criar estados adicionais.
  const totalVotos = votosA + votosB + votosC;
  const porcentagem = (votos) =>
    (totalVotos === 0 ? 0 : (votos / totalVotos) * 100).toFixed(1).replace(".", ",");

  function zerarUrna() {
    setVotosA(0);
    setVotosB(0);
    setVotosC(0);
  }

  // Passo 2: callbacks para incrementar com base no estado anterior.
  const candidatos = [
    { nome: "A", votos: votosA, votar: () => setVotosA((prev) => prev + 1) },
    { nome: "B", votos: votosB, votar: () => setVotosB((prev) => prev + 1) },
    { nome: "C", votos: votosC, votar: () => setVotosC((prev) => prev + 1) },
  ];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.painel}>
        <Text style={styles.titulo}>Painel de Votação</Text>
        <Text style={styles.rotulo}>Nome do mesário</Text>
        <TextInput style={styles.input} value={nomeMesario} onChangeText={setNomeMesario}
          placeholder="Digite o nome do mesário" placeholderTextColor="#666666"
          accessibilityLabel="Nome do mesário" autoCapitalize="words" />
        <Text style={styles.mesario}>Mesário atual: {nomeMesario}</Text>
        {candidatos.map(({ nome, votos, votar }) => (
          <View key={nome} style={styles.candidatoContainer}>
            <Text style={styles.nomeCandidato}>Candidato {nome}: {votos} votos ({porcentagem(votos)}%)</Text>
            <TouchableOpacity style={styles.botaoVotar} onPress={votar} accessibilityRole="button">
              <Text style={styles.textoBotao}>Votar em {nome}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.rodape}>
          <Text style={styles.totalTexto} accessibilityLiveRegion="polite">Total de Votos: {totalVotos}</Text>
          <TouchableOpacity style={styles.botaoZerar} onPress={zerarUrna} accessibilityRole="button">
            <Text style={styles.textoBotao}>Zerar Urna</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#F5F5F5" },
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20, paddingVertical: 56 },
  painel: { width: "100%", maxWidth: 480 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 30, color: "#14325A", textAlign: "center" },
  rotulo: { fontSize: 16, color: "#14325A", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#808080", borderRadius: 8, padding: 12, fontSize: 16, color: "#202020", backgroundColor: "#FFFFFF" },
  mesario: { fontSize: 16, color: "#333333", marginTop: 10, marginBottom: 24 },
  candidatoContainer: { width: "100%", backgroundColor: "#FFFFFF", padding: 15, borderRadius: 8, marginBottom: 10, alignItems: "center", elevation: 2 },
  nomeCandidato: { fontSize: 18, marginBottom: 10, color: "#202020", textAlign: "center" },
  botaoVotar: { backgroundColor: "#0064A0", padding: 12, borderRadius: 5, width: "80%", alignItems: "center", minHeight: 44, justifyContent: "center" },
  textoBotao: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  rodape: { marginTop: 30, alignItems: "center", width: "100%", borderTopWidth: 1, borderColor: "#CCCCCC", paddingTop: 20 },
  totalTexto: { fontSize: 20, fontWeight: "bold", marginBottom: 15, color: "#202020" },
  botaoZerar: { backgroundColor: "#666666", padding: 15, borderRadius: 5 },
});
