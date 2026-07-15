# Painel de Candidaturas

Aplicação full stack para gerenciar candidaturas de estágio/emprego, com controle de status (Aplicado, Entrevista, Aprovado, Rejeitado).

## Tecnologias

**Backend:** Node.js, Express, armazenamento em arquivo JSON
**Frontend:** React (Vite)

## Funcionalidades

- Cadastrar candidatura (empresa, vaga)
- Listar todas as candidaturas
- Atualizar status via dropdown
- Filtrar por status
- Excluir candidatura

## Como rodar

### Backend
\`\`\`bash
cd backend
npm install
node server.js
\`\`\`
Roda em `http://localhost:3001`

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Roda em `http://localhost:5173`

## Motivação

Projeto criado para resolver um problema real: acompanhar o status de múltiplas candidaturas de estágio durante um processo de busca ativa por vaga.