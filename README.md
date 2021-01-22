<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
  API para o gerenciamento de Registros de Ponto dos colaboradores de uma empresa.
</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/goncadanilo/brainny-register-api.svg">

  <a href="https://github.com/goncadanilo/brainny-register-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/goncadanilo/brainny-register-api.svg">
  </a>

  <a href="https://github.com/goncadanilo/brainny-register-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/goncadanilo/brainny-register-api.svg">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

  <a href="https://github.com/goncadanilo/">
    <img alt="Author" src="https://img.shields.io/badge/author-Danilo%20Gon%C3%A7alves-blue">
  </a>
</p>

<p align="center">
  <a href="#-projeto">Sobre o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias Utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

---

## 💻 Sobre o Projeto

Esse projeto é uma API para o gerenciamento de Registros de Ponto dos colaboradores de uma empresa, no qual cada colaborador efetuará autenticação e realizará o registro do seu ponto diariamente.

### Requisitos Funcionais
- [**RF01**] - Gerenciar registros de horários;
- [**RF02**] - Registrar horário de entrada e saída do colaborador;
- [**RF03**] - O usuário com permissão de administrador poderá visualizar em tempo real os registros dos colaboradores, sem a necessidade refresh de página.

### Requisitos Não Funcionais
- [**RNF01**] - Apenas os colaboradores podem bater o ponto;
- [**RNF02**] - Apenas o administrador do sistema poderá visualizar a lista com os registros dos colaboradores;
- [**RNF03**] - Apenas o administrador do sistema poderá cadastrar novos colaboradores;
- [**RNF04**] - Desenvolvimento de API em NestJS e GraphQL com Apollo;
- [**RNF05**] - O sistema utilizará autenticação com JWT;

## 🚀 Tecnologias Utilizadas

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQl](https://graphql.org/)
- [Apollo](https://www.apollographql.com/)
- [TypeOrm](https://typeorm.io)

## ⚡ Como rodar

Neste projeto estou utilizando o [yarn](https://yarnpkg.com/), mas se preferir pode usar o **npm**

### Requisitos

- [NestJS CLI](https://docs.nestjs.com/first-steps).
- [Docker](https://www.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/install/).

### Intalar as dependências

- instale as dependências: `yarn`.

### Subir o banco

- crie uma cópia do `.env.example` como `.env` e defina suas variáveis do banco.
- suba o banco de dados com docker: `docker-compose up -d`.
- rode as migrations: `yarn typeorm migration:run`.

### Rodar a aplicação

- para rodar a aplicação: `yarn start`.
- para rodar a aplicação em modo watch: `yarn start:dev`.
- a aplicação estará disponível no endereço: `http://localhost:3333/graphql`.

### Rodar os testes

- para rodar os testes unitários: `yarn test`.
- para ver a cobertura dos testes unitários: `yarn test:cov`.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by [Danilo Gonçalves](https://github.com/goncadanilo). Me adicione no [LinkedIn](https://www.linkedin.com/in/goncadanilo/) :wave:
