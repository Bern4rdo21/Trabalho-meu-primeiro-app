# Prática 04: Simulador de votação

1. **Configuração:** reutilizamos o projeto Expo. A branch `feature/pratica-04` foi criada a partir de `main`. As atividades anteriores continuam nas respectivas branches.
2. **Estados:** em `App.js`, `votosA`, `votosB` e `votosC` começam em zero com `useState(0)`. Estado é um dado que muda e provoca nova renderização; props são dados recebidos do componente pai.
3. **Votação segura:** cada botão usa um callback, como `setVotosA((prev) => prev + 1)`, para considerar o estado anterior mesmo quando o React agrupa atualizações.
4. **Total derivado:** `totalVotos = votosA + votosB + votosC`, sem outro estado.
5. **Zerar urna:** os três setters recebem zero.
6. **Desafio de porcentagem:** calculamos `(votos / totalVotos) * 100`. Quando o total é zero, exibimos 0,0%, evitando divisão por zero.
7. **Desafio do mesário:** o TextInput usa `value={nomeMesario}` e `onChangeText={setNomeMesario}`. A mensagem acompanha a digitação.

## Executar

No terminal do projeto:

```powershell
npm.cmd install
npm.cmd start
```

Abra no Expo Go compatível com SDK 54, com celular e computador na mesma rede, ou pressione `w` para a versão web.

## Conferir o funcionamento

1. No início: três candidatos com zero votos, 0,0% e total zero.
2. Digite um nome: a mensagem do mesário deve mudar em tempo real.
3. Vote duas vezes em A, uma em B e uma em C: total 4 e porcentagens 50,0%, 25,0% e 25,0%.
4. Clique rapidamente em um candidato e confira os incrementos.
5. Zere a urna: votos, total e porcentagens voltam a zero, mantendo o nome do mesário.

Os dados ficam em memória e voltam aos valores iniciais ao reiniciar o aplicativo.

## Entrega

O roteiro pede versionamento e envio para a branch `feature/pratica-04`. Após revisar:

```powershell
git add App.js PRATICA-04.md
git commit -m "feat: implementa simulador de votacao da pratica 04"
git push -u origin feature/pratica-04
```

Confira também o acesso do professor ao repositório pela plataforma Git da dupla. O desafio TypeScript é opcional e não foi incluído nesta implementação JavaScript.
