# User API - Desafio Backend

## Sumário

1. [Introdução](#introdução)
2. [Montando o Docker do Banco](#montando-o-docker-do-banco)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Funcionalidades](#funcionalidades)
5. [Instalação](#instalação)
6. [Executando o Projeto](#executando-o-projeto)
7. [Testes](#testes)
8. [Endpoints Principais](#endpoints-principais)
   - [Autenticação](#autenticação)
   - [Usuários](#usuários)

## Introdução

Este projeto foi desenvolvido como parte de um teste técnico, utilizando os padrões de projeto Restful para a criação de APIs e JWT para garantir a autenticação e autorização segura dos usuários. A camada de persistência dos dados foi implementada com o banco de dados relacional MySQL, executado em um contêiner Docker.

## Montando o Docker do Banco

1. Baixe a imagem do MySQL:
   ```sh
   docker pull mysql
   ```

2. Execute o contêiner do MySQL:
   ```sh
   docker run -p 3306:3306 --name nome-do-banco -e MYSQL_ROOT_PASSWORD=senhaRoot -d mysql
   ```

## Tecnologias Utilizadas

- Node.js 🟢: Plataforma de execução de código JavaScript.
- Prisma 🔍: ORM (Object-Relational Mapping) para banco de dados.
- Fastify ⚡: Framework web utilizado para criar uma API REST.
- Swagger 📚: Ferramenta para documentar APIs RESTful.
- Zod 🛡️: Biblioteca para validação de esquemas de dados em JavaScript.
- Jest 🧪: Framework de testes em JavaScript, utilizado para escrever e rodar testes automatizados.

## Funcionalidades

- **CRUD de Usuários**: Criação, leitura, atualização e remoção de usuários.
- **Autenticação e Autorização**: Utilização de JWT para garantir a segurança do sistema.
- **Documentação de API**: Documentação automática utilizando Swagger.
- **Validação de Dados**: Utilização de Zod para validação de esquemas de dados.

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/ksguimaraes/user-api.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd user-api
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure o banco de dados no arquivo `.env`:
   ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome-do-banco"
   JWT_SECRET="sua_chave_secreta"
   ```
5. Execute as migrações do Prisma:
   ```sh
   npm run db:migrate
   ```
6. Execute a seed para popular o banco:
   ```sh
   npx prisma db seed
   ```

## Executando o Projeto

1. Inicie o servidor:
   ```sh
   npm run dev
   ```
2. Acesse a documentação da API no navegador:
   ```
   http://localhost:3333/docs
   ```

![image](https://github.com/ksguimaraes/user-api/assets/39937365/05f5e3b3-b6d1-4334-b9a4-ff40f9040547)

## Testes

Para executar os testes, utilize o comando:

```sh
npm run test
```

## Endpoints Principais

### Autenticação

- **POST /login**: Realiza a autenticação do usuário e retorna um token JWT.

### Usuários

- **POST /users**: Cria um novo usuário.
- **GET /users/:id**: Retorna os detalhes de um usuário específico.
- **PUT /users/:id**: Atualiza os dados de um usuário.
- **DELETE /users/:id**: Remove um usuário.
