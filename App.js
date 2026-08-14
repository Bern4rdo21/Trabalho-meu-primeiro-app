import React, { useRef, useState } from "react";
import { Animated, Text, View, TouchableOpacity, StyleSheet } from "react-native";

function BotaoContador({ titulo, onPress, cor, disabled = false }) {
return (
<TouchableOpacity
style={[
styles.botao,
{ backgroundColor: cor },
disabled && styles.botaoDesabilitado
]}
onPress={onPress}
disabled={disabled}
activeOpacity={0.75}
>
<Text style={styles.textoBotao}>{titulo}</Text>
</TouchableOpacity>
);
}

export default function Contador() {
const [contagem, setContagem] = useState(0);
const animacaoMaisUm = useRef(new Animated.Value(0)).current;
const animacaoMenosUm = useRef(new Animated.Value(0)).current;

const incrementar = () => {
animacaoMaisUm.stopAnimation();
animacaoMaisUm.setValue(0);
setContagem((valorAtual) => valorAtual + 1);

Animated.timing(animacaoMaisUm, {
toValue: 1,
duration: 850,
useNativeDriver: true
}).start();
};

const subtrair = () => {
animacaoMenosUm.stopAnimation();
animacaoMenosUm.setValue(0);
setContagem((valorAtual) => Math.max(0, valorAtual - 1));

Animated.timing(animacaoMenosUm, {
toValue: 1,
duration: 850,
useNativeDriver: true
}).start();
};

const movimentoMaisUm = animacaoMaisUm.interpolate({
inputRange: [0, 1],
outputRange: [0, -70]
});

const opacidadeMaisUm = animacaoMaisUm.interpolate({
inputRange: [0, 0.15, 0.7, 1],
outputRange: [0, 1, 0.8, 0]
});

const escalaMaisUm = animacaoMaisUm.interpolate({
inputRange: [0, 0.3, 1],
outputRange: [0.8, 1.15, 1]
});

const movimentoMenosUm = animacaoMenosUm.interpolate({
inputRange: [0, 1],
outputRange: [0, -70]
});

const opacidadeMenosUm = animacaoMenosUm.interpolate({
inputRange: [0, 0.15, 0.7, 1],
outputRange: [0, 1, 0.8, 0]
});

const escalaMenosUm = animacaoMenosUm.interpolate({
inputRange: [0, 0.3, 1],
outputRange: [0.8, 1.15, 1]
});

return (
<View style={styles.container}>
<Text style={styles.titulo}>Contagem Atual:</Text>
<View style={styles.areaContador}>
<Text style={styles.numero}>{contagem}</Text>
<Animated.Text
pointerEvents="none"
style={[
styles.maisUm,
{
opacity: opacidadeMaisUm,
transform: [
{ translateY: movimentoMaisUm },
{ scale: escalaMaisUm }
]
}
]}
>
+1
</Animated.Text>
<Animated.Text
pointerEvents="none"
style={[
styles.menosUm,
{
opacity: opacidadeMenosUm,
transform: [
{ translateY: movimentoMenosUm },
{ scale: escalaMenosUm }
]
}
]}
>
-1
</Animated.Text>
</View>
<View style={styles.listaBotoes}>
<BotaoContador
titulo="Incrementar +1"
onPress={incrementar}
cor="#4caf50"
/>
<BotaoContador
titulo="Subtrair -1"
onPress={subtrair}
disabled={contagem === 0}
cor="#ff9800"
/>
<BotaoContador
titulo="Zerar"
onPress={() => setContagem(0)}
cor="#f44336"
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
areaContador: {
width: 180,
alignItems: "center",
position: "relative"
},
maisUm: {
position: "absolute",
top: 18,
left: 120,
fontSize: 24,
fontWeight: "bold",
color: "#66bb6a"
},
menosUm: {
position: "absolute",
top: 18,
right: 120,
fontSize: 24,
fontWeight: "bold",
color: "#ff9800"
},
listaBotoes: {
gap: 12
},
botao: {
width: 180,
height: 48,
alignItems: "center",
justifyContent: "center",
borderRadius: 12,
elevation: 3,
shadowColor: "#000000",
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.2,
shadowRadius: 3
},
botaoDesabilitado: {
backgroundColor: "#bdbdbd",
opacity: 0.65,
elevation: 0
},
textoBotao: {
color: "#ffffff",
fontSize: 16,
fontWeight: "bold"
}
});
