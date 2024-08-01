## Summary About the Project / Resumo sobre o projeto

[PT-BR](readme-pt-br.md)

A API de dieta diária é uma API RESTFul que permite que os usuários registrem suas refeições diárias e obtenham um progresso. A API fornece endpoints para criar, recuperar, atualizar e apagar refeições, bem como recuperar estatísticas sobre o seu dieta.

[EN](readme.md)

The Daily Diet API is a RESTful API that allows users to register their daily meals and track their progress towards a healthy diet. The API provides endpoints for creating, retrieving, updating, and deleting meals, as well as retrieving statistics about the user's diet.

## Daily Diet API Requirements / Requisitos da API de dieta diária

### RF - Requisitos Funcionais

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível logar no sistema
- [x] Deve ser possível recuperar um usuário por ID
- [x] Deve ser possível identificar um usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  - Nome
  - Descrição
  - Data e hora
  - Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário:
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### RN - Requisitos Não Funcionais

- [x] O sistema deve garantir que apenas o usuário autenticado possa visualizar, editar e apagar suas próprias refeições
- [x] O sistema deve verificar o usuário que está tentando logar no sistema
- [x] O sistema deve verificar se o usuário está autenticado antes de executar qualquer operação nas rotas de refeições
