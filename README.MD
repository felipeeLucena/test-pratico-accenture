## Desafio QA Automation – DemoQA (API + UI)

Projeto de automação de testes criado para o desafio técnico, utilizando **Cypress + Cucumber (BDD)** em **JavaScript**, com foco em **boas práticas de 2025**, arquitetura limpa e separação clara entre **API** e **UI**.

### Tecnologias e recursos

- **Cypress 15** – framework principal de automação
- **Cucumber (`@badeball/cypress-cucumber-preprocessor`)** – BDD com cenários em Gherkin
- **Cypress Plugin API (`cy.api`)** – melhoria de DX para testes de API
- **Page Object Model (POM)** – para APIs e (futuro) telas de UI
- **Geradores de dados** – usuários dinâmicos para evitar massa estática
- **JavaScript (ES6+)** – código simples, limpo e reutilizável

### Estrutura do projeto

```text
cypress/
  e2e/
    api/
      bookstore.feature      # Cenários BDD da Parte 1 (API)
      bookstore.js           # Step definitions dos cenários de API
  pageObject/
    api/
      BookstoreApi.js        # POM de serviços da API BookStore/Account
src/
  utils/
    userGenerator.js         # Generator de credenciais de usuário
cypress.config.js            # Configuração Cypress + Cucumber
```

- **API (`cypress/e2e/api`)**
  - Contém toda a automação da **Parte 1 – API** do desafio.
  - Fluxo coberto:
    1. Criar usuário (`POST /Account/v1/User`)
    2. Gerar token de acesso (`POST /Account/v1/GenerateToken`)
    3. Validar autorização do usuário (`POST /Account/v1/Authorized`)
    4. Listar livros disponíveis (`GET /BookStore/v1/Books`)
    5. Alugar dois livros para o usuário (`POST /BookStore/v1/Books`)
    6. Listar detalhes do usuário com os livros alugados (`GET /Account/v1/User/{userId}`)

- **Front/UI (planejado)**
  - Os testes E2E de interface serão organizados em `cypress/e2e/front` (ou `ui`),
  - com Page Objects em `cypress/pageObject/pages` e `cypress/pageObject/forms`,
  - mantendo a mesma filosofia de reutilização e arquitetura da camada de API.

### Padrões adotados

- **Cenários BDD em Português Brasileiro**  
  Ex.: `Cenário: Deve alugar dois livros e validar no usuário`
- **Código em inglês** (variáveis, funções, classes)  
  Ex.: `generateUserCredentials`, `BookstoreApi`, `rentBooks`
- **Page Object Model para API**
  - `BookstoreApi` encapsula todas as chamadas HTTP (createUser, generateToken, listBooks, rentBooks, getUserDetails).
- **Separação de responsabilidades**
  - Steps BDD apenas orquestram o fluxo,
  - lógica de request fica no POM,
  - geração de dados em `utils`.

### Como executar o projeto

1. Instalar dependências:

```bash
npm install
```

2. Abrir o Cypress (modo interativo):

```bash
npx cypress open
```

- Selecionar o spec `bookstore.feature` dentro de `cypress/e2e/api`.

3. Executar testes em modo headless (CI):

```bash
npx cypress run
```

### Pipelines de CI (GitHub Actions)

O repositório possui dois workflows independentes em `.github/workflows`:

- **`ci-api.yml` – CI de API**
  - Executa apenas cenários marcados com a tag **`@api`**.
  - Roda em `push` e `pull_request` para a branch `main`.
  - Comando principal:
    ```bash
    npx cypress run --env TAGS='@api'
    ```
- **`ci-front.yml` – CI de Front/UI**
  - Pensado para quando os testes de UI forem adicionados em `cypress/e2e/front`.
  - Executa apenas cenários marcados com a tag **`@ui`**.
  - Comando principal:
    ```bash
    npx cypress run --env TAGS='@ui'
    ```

### Observações sobre o fluxo de negócio

- Cada cenário BDD pode criar seu próprio usuário/token para manter independência entre testes.
- O cenário completo de aluguel de livros valida o fluxo fim-a-fim:
  - criação de usuário → token → autorização → aluguel de livros → consulta do usuário com livros associados.

---

Esse README já deixa claro **tecnologias, arquitetura, onde está API e onde ficará o front**, e passa bem a imagem de um projeto pensado com cuidado. Se quiser, posso complementar com uma seção de “Decisões técnicas” explicando por que escolheu Cypress + Cucumber + POM.