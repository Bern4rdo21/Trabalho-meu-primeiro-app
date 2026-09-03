import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const combinacoesVencedoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function encontrarVencedor(tabuleiro) {
  for (const [a, b, c] of combinacoesVencedoras) {
    if (
      tabuleiro[a] &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[a] === tabuleiro[c]
    ) {
      return tabuleiro[a];
    }
  }

  return null;
}

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [jogadorAtual, setJogadorAtual] = useState("X");
  const vencedor = encontrarVencedor(tabuleiro);
  const empate = !vencedor && tabuleiro.every(Boolean);

  function jogar(indice) {
    if (tabuleiro[indice] || vencedor) {
      return;
    }

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = jogadorAtual;
    setTabuleiro(novoTabuleiro);
    setJogadorAtual((jogador) => (jogador === "X" ? "O" : "X"));
  }

  function reiniciar() {
    setTabuleiro(Array(9).fill(null));
    setJogadorAtual("X");
  }

  let mensagem = `Vez do jogador ${jogadorAtual}`;

  if (vencedor) {
    mensagem = `Jogador ${vencedor} venceu!`;
  } else if (empate) {
    mensagem = "A partida terminou em empate!";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.status}>{mensagem}</Text>

      <View style={styles.tabuleiro}>
        {[0, 1, 2].map((linha) => (
          <View key={linha} style={styles.linha}>
            {[0, 1, 2].map((coluna) => {
              const indice = linha * 3 + coluna;

              return (
                <TouchableOpacity
                  key={indice}
                  style={styles.celula}
                  activeOpacity={0.65}
                  onPress={() => jogar(indice)}
                  accessibilityRole="button"
                  accessibilityLabel={`Linha ${linha + 1}, coluna ${coluna + 1}`}
                >
                  <Text
                    style={[
                      styles.simbolo,
                      tabuleiro[indice] === "O" && styles.simboloO,
                    ]}
                  >
                    {tabuleiro[indice]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botaoReiniciar}
        activeOpacity={0.7}
        onPress={reiniciar}
        accessibilityRole="button"
      >
        <Text style={styles.textoBotao}>Reiniciar partida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    elevation: 5,
    maxWidth: 420,
    padding: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
  },
  titulo: {
    color: "#14325A",
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    color: "#505050",
    fontSize: 16,
    marginBottom: 18,
    marginTop: 6,
  },
  tabuleiro: {
    borderColor: "#14325A",
    borderWidth: 1,
    flexDirection: "column",
    marginBottom: 22,
    maxWidth: 240,
    width: "100%",
  },
  linha: {
    flexDirection: "row",
  },
  celula: {
    alignItems: "center",
    aspectRatio: 1,
    borderColor: "#14325A",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
  },
  simbolo: {
    color: "#0064A0",
    fontSize: 38,
    fontWeight: "bold",
  },
  simboloO: {
    color: "#D35400",
  },
  botaoReiniciar: {
    backgroundColor: "#0064A0",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 11,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
