# Desafio Técnico Fullstack - Cotabox

Este projeto é uma aplicação Fullstack completa desenvolvida como parte do desafio técnico para a vaga de Desenvolvedor Estágio ou Júnior na Cotabox. A aplicação permite o cadastro de participantes e a visualização de suas participações em uma tabela e um gráfico interativo.

## 📸 Screenshot

![Aqui vai uma imagem da aplicação final] ![Capturar](https://github.com/user-attachments/assets/bcf825b0-e1a3-43f4-ad67-bc906e0afb78)

---

## ✨ Funcionalidades

- **Cadastro de Participantes:** Formulário para adicionar novos participantes com nome, sobrenome e porcentagem de participação.
- **Visualização de Dados em Tempo Real:** Tabela e gráfico de rosca (Doughnut) que se atualizam instantaneamente após cada novo cadastro.
- **Validação Robusta:**
  - **Frontend:** Todos os campos do formulário são obrigatórios.
  - **Backend:** A API valida se os campos são obrigatórios e garante que a soma total das participações não ultrapasse 100%, retornando um erro `400` claro em caso de falha.
- **Interatividade UI/UX:**
  - Animações suaves ao adicionar e exibir dados.
  - Feedback de loading nos botões durante as operações.
  - Efeito de *hover* sincronizado entre a tabela e o gráfico para destacar dados relacionados.
- **Reset de Dados:** Funcionalidade para limpar todos os dados do banco de dados para facilitar os testes.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído como um monorepo, com o frontend e o backend separados em suas próprias pastas.

**Backend:**
- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework para a construção do servidor.
- **Apollo Server:** Para criar a API GraphQL.
- **GraphQL:** Linguagem de consulta para a API.
- **MongoDB:** Banco de dados NoSQL para armazenar os dados.
- **Mongoose:** ODM para modelar os dados do MongoDB.
- **Jest & mongodb-memory-server:** Para testes unitários da API.

**Frontend:**
- **Vue.js 2:** Framework principal para a interface.
- **Vue Apollo:** Cliente para conectar o Vue com a API GraphQL.
- **Element UI:** Biblioteca de componentes para a UI.
- **Vue Chart.js:** Para a criação do gráfico de rosca.
- **Vue Test Utils & Jest:** Para testes unitários dos componentes.

**DevOps:**
- **Docker & Docker Compose:** Para containerizar a aplicação e garantir um ambiente de desenvolvimento e execução consistente.

---

## ⚙️ Como Rodar o Projeto

Existem duas maneiras de rodar o projeto: usando Docker (recomendado) ou manualmente.

### 1. Usando Docker (Recomendado)

Este é o método mais simples. Você só precisa ter o Docker e o Docker Compose instalados.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/NatanaelNeves/cotabox-challenge.git)
    cd cotabox-challenge
    ```

2.  **Crie o arquivo de ambiente do backend:**
    - Na pasta `backend`, crie um arquivo chamado `.env`.
    - Adicione sua string de conexão do MongoDB Atlas:
      ```
      MONGO_URI=mongodb+srv://natanaelnevesalves:ICD0nT7SmsGOrQTC@cotabox.hp0c7fi.mongodb.net/?retryWrites=true&w=majority&appName=Cotabox
      ```

3.  **Suba os containers:**
    - Na raiz do projeto, execute o comando:
      ```bash
      docker-compose up --build
      ```

4.  **Acesse a aplicação:**
    - Frontend estará disponível em: `http://localhost:8080`
    - A API GraphQL estará em: `http://localhost:4000/graphql`

### 2. Manualmente (Sem Docker)

Você precisará ter o Node.js (v16+) instalado.

1.  **Clone o repositório** e entre na pasta.

2.  **Configure e rode o Backend:**
    ```bash
    cd backend
    npm install
    # Crie o arquivo .env com sua MONGO_URI
    npm run dev 
    # O servidor backend estará rodando na porta 4000
    ```

3.  **Configure e rode o Frontend (em outro terminal):**
    ```bash
    cd frontend
    npm install
    npm run serve
    # O servidor frontend estará rodando na porta 8080
    ```

---

## ✅ Como Rodar os Testes

Para garantir a qualidade e a estabilidade do código, o projeto conta com uma suíte de testes unitários.

- **Para rodar os testes do Backend:**
  ```bash
  cd backend
  npm test

Para rodar os testes do Frontend:

cd frontend
npm run test:unit

👨‍💻 Autor
Feito com muito zelo e dedicação por Natanael Neves.

LinkedIn: https://linkedin.com/in/natanaelnevesalves

GitHub: https://github.com/NatanaelNeves

</markdown>
