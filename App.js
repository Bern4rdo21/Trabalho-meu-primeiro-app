import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
export default function Contador() {
const [contagem, setContagem] = useState(0);
return (
<View style={styles.container}>
<Text style={styles.titulo}>"Contagem Atual:"</Text>
<Text style={styles.numero}>{contagem}</Text>
<Button
title="Incrementar +1"
onPress={() => setContagem((valorAtual) => valorAtual + 1)}
/>
<View style={styles.espacoBotao}>
<Button
title="Subtrair -1"
onPress={() => setContagem((valorAtual) => Math.max(0, valorAtual - 1))}
disabled={contagem === 0}
/>
</View>
<View style={styles.espacoBotao}>
<Button
title="Zerar"
onPress={() => setContagem(0)}
color="#f44336"
/>
</View>
</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#ffffff"
},
titulo: {
fontSize: 20,
color: "#333333"
},
numero: {
fontSize: 48,
fontWeight: "bold",
color: "#4caf50",
marginBottom: 20
},
espacoBotao: {
marginTop: 12
}
});
