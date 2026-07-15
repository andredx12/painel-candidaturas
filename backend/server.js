const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'candidaturas.json');

app.use(cors());
app.use(express.json());

// Funções auxiliares pra ler e escrever no "banco" (arquivo JSON)
function lerCandidaturas() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, '[]');
  }
  const dados = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(dados);
}

function salvarCandidaturas(candidaturas) {
  fs.writeFileSync(DB_PATH, JSON.stringify(candidaturas, null, 2));
}

// GET - listar todas
app.get('/candidaturas', (req, res) => {
  const candidaturas = lerCandidaturas();
  res.json(candidaturas);
});

// POST - criar nova
app.post('/candidaturas', (req, res) => {
  const candidaturas = lerCandidaturas();
  const nova = {
    id: Date.now(),
    empresa: req.body.empresa,
    vaga: req.body.vaga,
    status: req.body.status || 'Aplicado',
    data: req.body.data || new Date().toISOString().split('T')[0]
  };
  candidaturas.push(nova);
  salvarCandidaturas(candidaturas);
  res.status(201).json(nova);
});

// PUT - atualizar status
app.put('/candidaturas/:id', (req, res) => {
  const candidaturas = lerCandidaturas();
  const id = Number(req.params.id);
  const index = candidaturas.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Candidatura não encontrada' });
  }

  candidaturas[index] = { ...candidaturas[index], ...req.body };
  salvarCandidaturas(candidaturas);
  res.json(candidaturas[index]);
});

// DELETE - remover
app.delete('/candidaturas/:id', (req, res) => {
  const candidaturas = lerCandidaturas();
  const id = Number(req.params.id);
  const filtradas = candidaturas.filter(c => c.id !== id);
  salvarCandidaturas(filtradas);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});