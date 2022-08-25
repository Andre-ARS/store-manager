# Projeto Store Manager

# Contexto

Este projeto trata-se da criação de uma API de um CRUD dos produtos e vendas de uma loja, utilizando queries MySql para manipular as informações, a partir dos endpoints da API. Foi feito com base na arquitetura MSC (models, services, controllers), sendo implementado testes unitários para cada camada. Foi utilizado também o Swagger Ui para criar uma documentação. Esse projeto foi feito no módulo de back-end do curso da Trybe, em um ambiente node.

## Tecnologias usadas

Back-end:

> Desenvolvido usando: Docker, JavaScript, Node.js, Express.js, MySQL, Swagger.io;

Testes:

> Implementados com: Mocha, Chai e Sinon

## Testando Localmente

> Clone o Repositório

```bash
git clone git@github.com:Andre-ARS/store-manager.git
```

> Dentro do diretório do projeto, instale as dependencias

```bash
npm install
```

> Na raiz do projeto suba as imagens do docker

```bash
docker-compose up -d
```

> Depois rode o container

```bash
docker exec -it store_manager sh 
```

> Dentro do container rode os testes

```shell
npm test
```

> Popule o Banco 

```bash
npm run migration && npm run seed
```

> Dentro do container rode a API

```bash
npm start
```

> Use o seu API client preferido e rode o endpoint na porta 3000 do seu localhost

Url base da api rodando no vercel [store-manager-ars-api.vercel.app](https://store-manager-ars-api.vercel.app/)

Visite a documentação no swagger [aqui](https://app.swaggerhub.com/apis/ANDRE360ARS/store-manager/1.0.0)
