# URL Shortener

[README in English](README-eng.md)  

Um encurtador de URLs simples e funcional, desenvolvido como um projeto pessoal para demonstrar estudos e habilidades em arquitetura de software e desenvolvimento fullstack. Este projeto é destinado a análises técnicas por recrutadores e não para uso público.

## Tabela de Conteúdos
- [Descrição](#descrição)
- [Arquitetura](#arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Dependências](#Dependências)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Decisões de Desenvolvimento](#decisões-de-desenvolvimento)
- [Partes a Melhorar](#partes-a-melhorar)
- [Considerações Finais](#considerações-finais)

## Descrição

Este projeto implementa um encurtador de URLs com as seguintes funcionalidades:
- Encurtar uma URL fornecida, retornando outra com um código único no servidor local.
- Redirecionar URLs encurtadas para os links originais.
- Registrar e salvar o número de acessos às URLs encurtadas.

O objetivo é demonstrar boas práticas de desenvolvimento, incluindo:
- Organização de código em arquitetura MVC e separação de responsabilidades.
- Tratamento centralizado de erros com middlewares.
- Segurança básica, como sanitização de entradas do usuário.

## Arquitetura

O projeto segue a arquitetura MVC (Model-View-Controller), estruturado da seguinte forma:

- **Models:** Definem os modelos de dados usando Sequelize, incluindo a tabela `Url` com os campos `originalUrl`, `code` e `accessCount`.
- **Controllers:** Contêm a lógica de negócios, incluindo:
  - Encurtar URLs (`shortenUrl`).
  - Redirecionar para URLs originais (`redirectUrl`).
- **Routes:** Mapeiam as rotas para os controladores.
- **Middleware:** Inclui middlewares para tratamento centralizado de erros e limitador de encurtamentos por IP.
- **Utils:** Contém funções auxiliares, como validação de URLs e geração de códigos únicos.

  ### Estrutura de pastas:
```plaintext
URLshortener/ 
├── frontend/ 
│ ├── css/ 
│ │ ├── styles.css 
│ │ └── styles.css.map 
│ ├── js/ 
│ │ └── script.js 
│ ├── scss/ 
│ │ └── styles.scss 
│ └── index.html 
├── url-shortener-backend/ 
│ ├── config/ 
│ │ └── database.js 
│ ├── controllers/ 
│ │ └── urlController.js 
│ ├── middleware/ 
│ │ ├── errorHandler.js 
│ │ └── rateLimiter.js 
│ ├── models/ 
│ │ └── url.js 
│ ├── node_modules/ 
│ ├── routes/ 
│ │ └── urlRoutes.js 
│ ├── utils/ 
│ │ ├── CustomError.js 
│ │ ├── generateCode.js 
│ │ └── validateUrls.js 
│ ├── .env 
│ ├── app.js 
│ ├── package-lock.json 
│ └── package.json
```

## Tecnologias Utilizadas

- **HTML:** Para desenvolver a página inicial.
- **Javascript:** Cuidando da dinâmina entre o frontend e o backend.
- **SCSS:** Para gerar a estilização inicial CSS.
- **Node.js:** Runtime para o backend.
- **Express:** Framework para construir a API.
- **Sequelize:** ORM para comunicação com o banco de dados.
- **PostgreSQL:** Banco de dados relacional usado no ambiente local.

## Dependências

- **dotenv:** Gerenciamento de variáveis de ambiente.
- **sanitize-html:** Sanitização de entradas do usuário para evitar injeções.
- **cors:** Ativando o cross origin resource sharing para todas as fontes.
- **express-rate-limit:** Para limitar o número de requisições de uma mesma origem.
- **helmet:** Lida com os cabeçalhos das requisições, com uma configuração segura padronizada.
- **morgan:** Aplica logs personalizados e completos de depuração na linha de comando.
- **pg:** Client do postgres para o node.
- **valid-url:** Verifica se a URL inserida no formulário é válida.
- **sass:** Inicializadora do SASS, como dependência de desenvolvimento.

## Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado (versão 16 ou superior).
- Gerenciador de pacotes npm ou yarn.
- PostgreSQL instalado.

### Passo a Passo

1. Clone o repositório em alguma pasta:
   ```bash
   git clone https://github.com/Athen0001/urlrename.git
   cd urlrename
   cd url-shortener-backend
   ```

2. Instale as dependências (a pasta node_modules será criada após o comando):
```bash
   npm install express sequelize dotenv sanitize-html cors express-rate-limit helmet morgan pg valid-url
```

3. Crie um banco de dados no PostgreSQL.

4. Crie um arquivo .env em url-shortener-backend e configure as variáveis de ambiente:
```text
   DB_NAME=nome do banco de dados
   DB_USER=nome do usuário administrador do banco de dados
   DB_PASSWORD=senha do banco de dados
   DB_HOST=localhost para servidores locais
   DB_PORT=5432 (porta padrão para o postgres)
   BASE_URL=http:localhost:3000 (ou outra porta não utilizada)
   PORT=3000
```

5. Inicie o servidor:
```bash
   npm run start
```

6. Acesse http://localhost:3000 e teste a aplicação, insira uma URL no campo e clique em "short", uma linha de texto devera retornar algo como "http:localhost:3000/aUg60uiF".

7. Insira a nova URL no campo do navegador e deverá ser redirecionado para a página original da URL.

## Decisões de Desenvolvimento

- **Arquitetura MVC:** Escolhida para separar responsabilidades e facilitar a manutenção.
- **Tratamento de erros com middleware:** Centralizado para reduzir redundância nos controladores. O utilitário CustomError foi mantido como classe por estar encapsulado, sendo uma classe derivada da classe pura error do javascript, portanto, sem maiores repercursões ainda que o projeto seja majoritariamente funcional.
- **Sanitização de entradas:** Implementada com `sanitize-html` e javascript para evitar injeções de HTML ou JavaScript. O sequelize trata das injeções SQL.
- **Colisão de códigos:** Um simples loop com verificação foi implementado, gerando outro código caso o banco de dados retorne erro de duplicidade.
- **Banco de dados PostgreSQL:** Escolhido pela simplicidade de instalação e utilização local, dada a finalidade pessoal do projeto.
- **Limitação de requisições:** Para impedir negação de serviço através da sobrecarga de requisições vindas de um mesmo usuário.
- **Frontend com HTML, CSS e Javascript:** Dada a simplicidade do projeto, com única página, não houve razão para desenvolver em frameworks mais complexos.

## Partes a Melhorar

- **Melhorar a verificação de colisão de códigos:**
  A aplicação pode receber 218 trilhões de códigos no banco de dados identificando as URLs encurtadas armazenadas. 66.829 códigos representa a chance de 1% de colisão, e acima de 1.4 milhões de URLs armazenada, a chance de colisão pode chegar a 99% (de acordo com a fórmula do paradoxo do aniversário).
  Em caso de escalar a aplicação, a forma de armazenamento, quantidade de possibilidades de códigos e mapeamento das colisões poderiam ser necessárias modificações. Atualmente, utiliza-se um loop simples que captura um erro de duplicidade, deixando o banco de dados lidar com o mapeamento de índices. Em um ambiente com alta escala, seria melhor usar algoritmos mais complexos como mapeamentos hash ou semelhantes.

- **Testes automatizados:**
  O projeto ainda não possui cobertura de testes. Seria interessante implementar testes unitários (ex.: Jest) e de integração.

- **Sanitização:**
  Apesar de haver prevenção contra SQL injection e XSS, o ideal seria validar no frontend, pois dependendo da maneira com que a API é distribuída, seria impossível determinar como cada customer estaria manipulando os dados (qual linguagem, se usa ou não raw queries), assim a processo de sanitização do backend poderia, em tese, ser infinito.

- **Serve dos arquivos estáticos:**
  Dada uma inconsistência e erros com a utilização do método static do express, provisoriamente o backend está servindo os arquivos estáticos do front "manualmente" através de rotas.

## Considerações Finais

Este projeto foi desenvolvido com o intuito de demonstrar estudos e práticas de desenvolvimento web, não se objetivando uma aplicação robusta ou de aplicabilidade real. Sugestões e críticas são bem-vindas!

Obrigado pela oportunidade de analisar meu trabalho.
