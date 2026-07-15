import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001/candidaturas';

function App() {
  const [candidaturas, setCandidaturas] = useState([]);
  const [empresa, setEmpresa] = useState('');
  const [vaga, setVaga] = useState('');
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    buscarCandidaturas();
  }, []);

  async function buscarCandidaturas() {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    setCandidaturas(dados);
  }

  async function criarCandidatura(e) {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ empresa, vaga })
    });
    setEmpresa('');
    setVaga('');
    buscarCandidaturas();
  }

  async function atualizarStatus(id, novoStatus) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });
    buscarCandidaturas();
  }

  async function deletarCandidatura(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    buscarCandidaturas();
  }

  const candidaturasFiltradas = filtro === 'Todos'
    ? candidaturas
    : candidaturas.filter(c => c.status === filtro);

  return (
    <div className="container">
      <h1>Painel de Candidaturas</h1>

      <form onSubmit={criarCandidatura} className="form">
        <input
          type="text"
          placeholder="Empresa"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Vaga"
          value={vaga}
          onChange={(e) => setVaga(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="filtro">
        <label>Filtrar por status: </label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="Todos">Todos</option>
          <option value="Aplicado">Aplicado</option>
          <option value="Entrevista">Entrevista</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Rejeitado">Rejeitado</option>
        </select>
      </div>

      <ul className="lista">
        {candidaturasFiltradas.map((c) => (
          <li key={c.id} className="item">
            <div>
              <strong>{c.empresa}</strong> — {c.vaga}
              <br />
              <span className={`status status-${c.status.toLowerCase()}`}>{c.status}</span>
              <span className="data"> ({c.data})</span>
            </div>
            <div className="acoes">
              <select
                value={c.status}
                onChange={(e) => atualizarStatus(c.id, e.target.value)}
              >
                <option value="Aplicado">Aplicado</option>
                <option value="Entrevista">Entrevista</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Rejeitado">Rejeitado</option>
              </select>
              <button onClick={() => deletarCandidatura(c.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;