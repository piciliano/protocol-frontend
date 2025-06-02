# Protocol Frontend

Frontend desenvolvido em React para exibir solicitações recentes com informações geográficas, integrando mapas e cards informativos.

---

## Tecnologias usadas

- React 19  
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
Scripts disponíveis
npm run dev: Inicia o servidor de desenvolvimento com hot reload

npm run build: Compila o projeto para produção

npm run preview: Preview do build de produção localmente

npm run lint: Executa o ESLint para análise de código

Descrição do projeto
Este frontend exibe uma lista de solicitações recentes obtidas de uma API, apresentadas em cards que mostram fotos, nome, descrição, localização e status. Também possui um mapa geocodificado que marca a localização das solicitações.

Funcionalidades principais:

Listagem das solicitações mais recentes, com opção de mostrar todas ou apenas as 3 últimas

Loading spinner enquanto os dados carregam

Mensagem de erro se a API não responder

Mapa interativo que exibe as solicitações com base nos dados geográficos

Seções adicionais de informações (Info e About)

Estrutura básica
src/pages/HomePage.tsx: página principal que orquestra o carregamento e exibição das solicitações

src/components/InfoCard: componente de card para cada solicitação

src/components/GeocodeMap: componente do mapa que recebe as solicitações para plotar

src/api/routes/getRequest.ts: hook React Query para buscar solicitações da API

src/assets: imagens estáticas usadas no projeto

src/styled.ts: estilos via styled-components

Requisitos
Node.js 18+

NPM 9+




