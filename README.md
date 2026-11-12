# Trabalho-meu-primeiro-app

# Bernardo e Pedro
- Bernardo Bellozi - Matrícula: 25132
- Pedro Queiroz - Matrícula: 27501

## Prática 07 - Consumo de API

O aplicativo consulta `/users` da JSONPlaceholder com Axios, configurado em `src/services/api.js`. A URL base está em `.env` como `EXPO_PUBLIC_API_URL`. O estado inicial mostra um indicador de carregamento; a lista pode ser atualizada puxando para baixo. Em caso de falha, aparece uma mensagem com opção de tentar novamente.

O botão **Novo** abre o formulário de Nome e Email. O envio usa `POST /users` e mostra um alerta de sucesso ou erro. A JSONPlaceholder simula o cadastro, mas não persiste os dados no servidor.

### Executar e conferir

```bash
npm ci
npm start
```

No Expo Go, confira os usuários carregados, puxe a lista para atualizar e abra **Novo** para testar o formulário. O telefone precisa de acesso à internet para consultar a API.
