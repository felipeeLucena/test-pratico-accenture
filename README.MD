## Desafio QA Automation – DemoQA (API + UI)

Projeto de automação de testes criado para o desafio técnico, utilizando **Cypress + Cucumber (BDD)** em **JavaScript**, com foco em **boas práticas de 2025**, arquitetura limpa e separação clara entre **API** e **UI**.

### Tecnologias e recursos

- **Cypress 15** – framework principal de automação
- **Cucumber (`@badeball/cypress-cucumber-preprocessor`)** – BDD com cenários em Gherkin
- **Cypress Plugin API (`cy.api`)** – melhoria de DX para testes de API
- **@4tw/cypress-drag-drop** – biblioteca para drag and drop em Cypress
- **Allure Report** – relatórios detalhados e visuais dos testes
- **Page Object Model (POM)** – para APIs e telas de UI
- **Geradores de dados** – usuários dinâmicos para evitar massa estática
- **JavaScript (ES6+)** – código simples, limpo e reutilizável

### Estrutura do projeto

```text
cypress/
  e2e/
    api/
      bookstore.feature      # Cenários BDD da Parte 1 (API)
      bookstore.js           # Step definitions dos cenários de API
    front/
      practice-form.feature  # Cenário 1: Practice Form
      practice-form.js
      browser-windows.feature # Cenário 2: Browser Windows
      browser-windows.js
      web-tables.feature     # Cenários 3 e 4: Web Tables (CRUD + Bônus)
      web-tables.js
      progress-bar.feature   # Cenário 5: Progress Bar
      progress-bar.js
      sortable.feature       # Cenário 6: Sortable (Drag and Drop)
      sortable.js
  pageObject/
    api/
      BookstoreApi.js        # POM de serviços da API BookStore/Account
    pages/
      HomePage.js            # Navegação principal
      FormsPage.js           # Página de Forms
      ElementsPage.js        # Página de Elements
      AlertsFrameWindowsPage.js
      BrowserWindowsPage.js
      WebTablesPage.js
      WidgetsPage.js
      ProgressBarPage.js
      InteractionsPage.js
      SortablePage.js
    forms/
      PracticeForm.js        # POM do formulário de prática
src/
  utils/
    userGenerator.js         # Generator de credenciais de usuário
    practiceFormDataGenerator.js  # Generator de dados do formulário
    webTablesDataGenerator.js     # Generator de dados para tabelas
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

- **Front/UI (`cypress/e2e/front`)**
  - Testes E2E de interface organizados com Page Objects em `cypress/pageObject/pages` e `cypress/pageObject/forms`.
  - Cenários implementados:
    1. **Practice Form** – Preenchimento e submissão de formulário com dados dinâmicos
    2. **Browser Windows** – Abertura de nova janela e validação de conteúdo
    3. **Web Tables** – CRUD completo de registros + Bônus (criação/deleção de 12 registros dinâmicos)
    4. **Progress Bar** – Controle da barra de progresso (parar antes de 25%, validar e completar até 100%)
    5. **Sortable** – Ordenação de elementos em ordem decrescente usando drag and drop

### Padrões adotados

- **Cenários BDD em Português Brasileiro**  
  Ex.: `Cenário: Deve alugar dois livros e validar no usuário`
- **Código em inglês** (variáveis, funções, classes)  
  Ex.: `generateUserCredentials`, `BookstoreApi`, `rentBooks`
- **Page Object Model (POM)**
  - **API**: `BookstoreApi` encapsula todas as chamadas HTTP (createUser, generateToken, listBooks, rentBooks, getUserDetails).
  - **UI**: Page Objects organizados por página (`HomePage`, `FormsPage`, `WebTablesPage`, etc.) e formulários (`PracticeForm`).
  - **Padronização de seletores**: Todos os Page Objects utilizam objeto `selectors` no construtor para centralizar seletores CSS, facilitando manutenção e evitando repetição de código.
- **Separação de responsabilidades**
  - Steps BDD apenas orquestram o fluxo,
  - lógica de request/interação fica no POM,
  - geração de dados em `utils`.
- **Dados dinâmicos**
  - Geração automática de credenciais, dados de formulários e registros de tabelas para evitar massa estática e conflitos entre testes.

### Como executar o projeto

1. Instalar dependências:

```bash
npm install
```

2. Abrir o Cypress (modo interativo):

```bash
npx cypress open
```

- Selecionar o spec desejado dentro de `cypress/e2e/api` (testes de API) ou `cypress/e2e/front` (testes de UI).

3. Executar testes em modo headless (CI):

```bash
# Todos os testes
npx cypress run

# Apenas testes de API
npx cypress run --env TAGS='@api'

# Apenas testes de UI
npx cypress run --env TAGS='@ui'
```

4. Gerar e visualizar relatório Allure localmente:

```bash
# Gerar relatório após executar os testes
npm run allure:generate

# Abrir relatório no navegador
npm run allure:open

# Ou gerar e abrir em um servidor temporário
npm run allure:serve
```

### Pipeline de CI (GitHub Actions)

O repositório possui um workflow unificado em `.github/workflows/ci.yml`:

- **`ci.yml` – CI Completo**
  - Executa **todos os testes** (API e UI) em uma única execução.
  - Roda em `push` e `pull_request` para a branch `main`.
  - Possui o gatilho manual **`workflow_dispatch`**, permitindo rodar a esteira direto pela aba **Actions** do GitHub (botão **Run workflow**) mesmo sem novos commits.
  - **Gera e publica relatório Allure** automaticamente após a execução dos testes.
  - O relatório fica disponível como artefato na aba **Actions** do GitHub, podendo ser baixado e visualizado localmente.
  - Comando principal:
    ```bash
    npx cypress run
    ```

### Configurações do Cypress

- **Timeout padrão**: 15 segundos para comandos e assertions (`defaultCommandTimeout: 15000`)
- **Retries**: 
  - Modo headless (`cypress run`): 2 tentativas em caso de falha
  - Modo interativo (`cypress open`): sem retries (0 tentativas)

### Relatórios Allure

O projeto utiliza **Allure Report** para gerar relatórios detalhados dos testes:

- **Integração com BDD**: Exibe cenários, steps e resultados do Cucumber de forma organizada
- **Screenshots e vídeos**: Capturas automáticas de falhas integradas ao relatório
- **Métricas e estatísticas**: Taxa de sucesso, duração dos testes, histórico de execuções
- **CI/CD**: Relatório gerado automaticamente no GitHub Actions e disponível como artefato
- **Visualização local**: Use `npm run allure:open` para abrir o relatório após gerar com `npm run allure:generate`

### Observações sobre o fluxo de negócio

- Cada cenário BDD pode criar seu próprio usuário/token para manter independência entre testes.
- O cenário completo de aluguel de livros valida o fluxo fim-a-fim:
  - criação de usuário → token → autorização → aluguel de livros → consulta do usuário com livros associados.