# Trabalho-meu-primeiro-app

# Bernardo e Pedro
- Bernardo Bellozi - Matrícula: 25132
- Pedro Queiroz - Matrícula: 27501

## Prática 08 - Persistência híbrida

O aplicativo salva o perfil `{ nome, logado }` no AsyncStorage como JSON e guarda as tarefas em SQLite. `SQLiteProvider` inicializa a tabela `tarefas`; a tela usa `useSQLiteContext` para listar, adicionar, alternar o status e eliminar tarefas. As operações com valores fornecidos pelo usuário usam parâmetros SQL (`?`).

### Executar e conferir

```bash
npm ci
npm start
```

No Expo Go, adicione uma tarefa, toque nela para marcar como concluída e use **X** para eliminá-la. Toque em **Mudar Nome** para salvar o perfil. Feche e abra o aplicativo novamente para confirmar que o nome e as tarefas permanecem salvos no dispositivo.
