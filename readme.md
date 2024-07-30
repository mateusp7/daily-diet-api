## Summary About the Project

The Daily Diet API is a RESTful API that allows users to register their daily meals and track their progress towards a healthy diet. The API provides endpoints for creating, retrieving, updating, and deleting meals, as well as retrieving statistics about the user's diet.

## Daily Diet API Requirements

### RF

- [ ] Deve ser possível criar um usuário
- [ ] Deve ser possível identificar um usuário entre as requisições
- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e hora
  - Está dentro ou não da dieta
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário:
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### RN

- [ ] O sistema deve garantir que apenas o usuário autenticado possa visualizar, editar e apagar suas próprias refeições
