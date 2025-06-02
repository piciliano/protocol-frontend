---

## 📝Protocol Frontend

Frontend desenvolvido em React para exibir solicitações recentes com informações geográficas, integrando mapas e cards informativos.

---

## 📝Tecnologias usadas

- React 
- TypeScript  
- Vite (bundler e servidor de desenvolvimento)  
- Material UI (componentes e estilos)  
- React Query (requisições e cache de dados)  
- Styled Components (CSS-in-JS)  
- React Leaflet + Leaflet (mapas)  
- Axios (requisições HTTP)  
- Zod (validação)  
- Swiper (carrossel)  
- JWT Decode, Crypto-js (segurança e autenticação)  
- React Hook Form (formulários)  
- React Router Dom (navegação)  

---

## Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/piciliano/protocol-frontend
cd protocol-frontend
```
Instale as dependências:

```bash
npm install
```
Inicie o servidor de desenvolvimento:

```bash
npm run dev
```
Abra no navegador:

```bash
http://localhost:5173
```

## Scripts disponíveis

- `npm run dev` - Inicia o servidor com hot reload
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Preview do build de produção localmente
- `npm run lint` - Executa o ESLint para análise de código

📝 Descrição do Projeto
Este frontend exibe uma lista de solicitações recentes obtidas de uma API, apresentadas em cards com:

- 📸 Fotos
- 🏷 Nome
- 📝 Descrição
-📍 Localização
- 🔖 Status

## Estrutura do Projeto

```plaintext
├── public
│   ├── favicon.ico
│   └── vite.svg
├── src
│   ├── api
│   │   ├── apiConfig
│   │   │   ├── apiClient.ts
│   │   │   └── gemini.ts
│   │   └── routes
│   │       ├── auth.ts
│   │       ├── forgotPassword.ts
│   │       ├── getRequest.ts
│   │       ├── getRequestByUserLogged.ts
│   │       ├── patchStatusForRequest.ts
│   │       ├── pathRoleByEmail.ts
│   │       ├── postRequest.ts
│   │       ├── register.ts
│   │       ├── resetPassword.ts
│   │       └── validateCode.ts
│   ├── assets
│   │   ├── acceptedremove.png
│   │   ├── atalaiaaleatorio.jpg
│   │   ├── atalaiahd-remove.png
│   │   ├── atalaiahd.jpg
│   │   ├── descreverremove.png
│   │   ├── localizacaoremove.png
│   │   ├── maosremovebg.png
│   │   ├── mapa.jpg
│   │   └── semarquivosemfundo.png
│   ├── components
│   │   ├── about
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── button
│   │   │   ├── index.tsx
│   │   │   ├── styled.ts
│   │   │   └── types.d.ts
│   │   ├── card
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── chat
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── drawer
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── expandedText
│   │   │   └── index.tsx
│   │   ├── footer
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── formRequest
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── geocodeMap
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── header
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── info
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── input
│   │   │   ├── index.tsx
│   │   │   ├── styled.ts
│   │   │   └── types.ts
│   │   ├── layout
│   │   │   └── index.tsx
│   │   ├── loginMenu
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── mapView
│   │   │   └── index.tsx
│   │   └── menu
│   │       ├── index.tsx
│   │       └── styled.ts
│   ├── pages
│   │   ├── home
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── login
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── moderator
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── recovery
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   ├── register
│   │   │   ├── index.tsx
│   │   │   └── styled.ts
│   │   └── request
│   │       ├── index.tsx
│   │       └── styled.ts
│   ├── routes
│   │   ├── protectRoute.tsx
│   │   ├── publicRoute.tsx
│   │   └── routes.tsx
│   ├── schemas
│   │   ├── login.ts
│   │   └── register.ts
│   ├── styles
│   │   ├── globalStyles.ts
│   │   └── theme.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── styled.d.ts
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Descrição resumida das principais pastas e arquivos:

- **public/**: Arquivos públicos estáticos, como ícones e imagens usadas no app.  
- **src/api/**: Configurações da API e rotas para comunicação com o backend.  
- **src/assets/**: Imagens e ícones usados na interface.  
- **src/components/**: Componentes React reutilizáveis organizados por funcionalidade.  
- **src/pages/**: Páginas da aplicação, organizadas por rotas.  
- **src/routes/**: Definição das rotas públicas e protegidas da aplicação.  
- **src/schemas/**: Esquemas de validação (ex: formulários de login e registro).  
- **src/styles/**: Estilos globais e tema do projeto.  
- **src/App.tsx**: Componente principal da aplicação.  
- **src/main.tsx**: Ponto de entrada da aplicação React.  

---

