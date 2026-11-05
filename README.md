# Trabalho-meu-primeiro-app

# Bernardo e Pedro
- Bernardo Bellozi - Matrícula: 25132
- Pedro Queiroz - Matrícula: 27501

## Prática 05 - Agenda Telefônica

A aplicação usa `FlatList` para exibir 15 contatos iniciais. Cada contato tem uma chave estável, e a lista inclui separadores e uma mensagem para o estado vazio. O botão **Limpar Tudo** esvazia a agenda.

Os desafios extras também foram implementados: puxar a lista para baixo restaura os contatos após 2 segundos; ao chegar ao fim da lista, são acrescentados 3 contatos fictícios. A geração de contatos fica suspensa quando a agenda está vazia, para que o botão de limpar continue funcionando.

### Executar e conferir

```bash
npm ci
npm start
```

Abra o QR code no Expo Go. Role até o fim para ver mais 3 contatos, toque em **Limpar Tudo** para ver a mensagem de agenda vazia e puxe a lista para baixo para restaurar os 15 contatos.
