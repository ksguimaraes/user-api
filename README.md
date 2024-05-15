# Teste Prático para Desenvolvedor Backend
 
**Objetivo:** Avaliar as habilidades técnicas e práticas de um desenvolvedor backend
 
### Desafio:
Fornecer um cadastro de usuários com todas a operações
 
#### Requisitos:
- Utilizar o padrão de projeto Restful para os micros serviços
- Utilizar o padrão de projeto JWT para implementação da camada de segurança no processo de autenticação e autorização
- Utilizar na camada de persistência o banco de dados relacional MySQL
 
#### Modelo:
- Entidade Usuário
    - Identificadores únicos
        - Chave artificial administrada pelo sistema
        - Chave de negócio, por exemplo: cpf
- Campos obrigatórios
    - Nome
    - Data de nascimento
    - Endereço (Rua, número, complemento, bairro, cidade, estado, cep)
- Campos não funcionais
    - Status do registro: Ativo ou Removido
    - Data e hora de criação do registro
    - Usuário utilizado na criação do registro
    - Data e hora de atualização do registro
    - Usuário utilizado na atualização do registro
    - Data e hora de remoção do registro
    - Usuário utilizado na remoção do registro
 
#### Entrega do Teste:
- Entregar o código fonte em um repositório git público
- Instruções claras para:
    - Montar o ambiente
    - Rodar os testes
    - Rodar a aplicação
 
#### Avaliação:
- Organização e estrutura do código.
- Adesão às melhores práticas de desenvolvimento, seja Node.js ou Java.
- Eficiência na resolução dos desafios propostos.
- Cobertura de testes adequada.
- Documentação clara e completa.


### Rotas
- POST /user
- GET /user/{id}
- PUT /user/{id}
- DELETE /user/{id}

- POST /login
- POST /logout