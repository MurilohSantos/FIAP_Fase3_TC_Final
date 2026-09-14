Plataforma Educacional

Front-end da plataforma educacional desenvolvido com React, TypeScript e Vite.

Tecnologias
React
TypeScript
Vite
Axios
React Router DOM
Styled Components
Setup

Instale as dependências:

npm install


Execute o projeto em desenvolvimento:

npm run dev


A aplicação será executada, por padrão, em:

http://localhost:5173

API

O projeto utiliza uma API REST executando em:

http://localhost:3000/api


Principais endpoints utilizados:

POST /users/login
GET /posts
GET /posts/:id
POST /posts
PUT /posts/:id
DELETE /posts/:id
Estrutura
src/
├── components/
├── pages/
├── reducers/
├── api.ts
├── types.ts
├── App.tsx
└── App.css

## Hooks utilizados

- `useState` — gerenciamento de estados locais, como curtidas e campos de busca.
- `useEffect` — execução de chamadas à API durante o ciclo de vida dos componentes.
- `useReducer` — gerenciamento do estado dos posts e suas ações.
- `useNavigate` — navegação entre páginas utilizando React Router.

Funcionalidades
Login de usuários
Área do professor
Área do aluno
Listagem de posts
Busca de posts por título
Criação de posts
Edição de posts
Exclusão de posts
Curtidas
Visualização completa dos posts
Rotas
/login — Login
/ — Feed do professor
/new-post — Novo post
/edit-post/:id — Editar post
/aluno — Área do aluno
/post/:id — Detalhes do post
Scripts
Desenvolvimento
npm run dev

Build
npm run build

Preview
npm run preview

Acessar a fase2 e executar o seguinte comando:
1- npm install
2- npm  start

Após feito isso será inicializado o web service