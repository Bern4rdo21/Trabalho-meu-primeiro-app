# Trabalho-meu-primeiro-app

# Bernardo e Pedro
- Bernardo Bellozi - Matrícula: 25132
- Pedro Queiroz - Matrícula: 27501

## Prática 06 - Roteamento Múltiplo

Este projeto implementa navegação por abas (`Inicio` e `Ajustes`) aninhada em uma pilha. A tela inicial abre `Detalhes` e envia o parâmetro `nomeUsuario`; a tela de destino mostra o nome recebido e oferece um botão para voltar. As abas têm cores e ícones próprios.

As telas estão em `src/screens/` e os navegadores em `src/routes/`. O arquivo `App.js` contém somente o provedor global de navegação e a pilha principal.

### Executar e conferir

```bash
npm ci
npm start
```

No Expo Go, confira as abas **Início** e **Ajustes**. Na aba Início, toque em **Ver Perfil do Usuário**, confirme a saudação `Bem-vindo, Turma INF204!` e use **Voltar** para retornar.
