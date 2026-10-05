import React, { useState } from 'react';

export default function App() {
  // Estado inicial com alguns membros de exemplo (você pode apagar depois)
  const [membros, setMembros] = useState([
    { id: 1, nome: 'Samyr Vilanova', cargo: 'Assessor', area: 'Projetos', status: 'Ativo' },
    { id: 2, nome: 'João Silva', cargo: 'Diretor', area: 'Comercial', status: 'Ativo' },
  ]);

  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('Trainee');
  const [area, setArea] = useState('Projetos');

  // Função para adicionar novo membro
  const handleAdicionarMembro = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;

    const novoMembro = {
      id: Date.now(),
      nome,
      cargo,
      area,
      status: 'Ativo'
    };

    setMembros([...membros, novoMembro]);
    setNome(''); // Limpa o campo de nome após adicionar
  };

  // Função para remover membro
  const handleRemover = (id) => {
    setMembros(membros.filter(membro => membro.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Cabeçalho */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Portal da Empresa Júnior</h1>
          <p className="text-slate-500">Gerenciamento de Membros e Diretorias</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda: Formulário de Cadastro */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-xl font-semibold mb-6 border-b pb-2">Novo Membro</h2>
            
            <form onSubmit={handleAdicionarMembro} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Maria Clara"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Área / Diretoria</label>
                <select 
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Projetos">Projetos</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Presidência">Presidência</option>
                  <option value="Gestão de Pessoas">Gestão de Pessoas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cargo</label>
                <select 
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Trainee">Trainee</option>
                  <option value="Assessor">Assessor</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Diretor">Diretor</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
              >
                Cadastrar Membro
              </button>
            </form>
          </div>

          {/* Coluna da Direita: Lista de Membros */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Equipe Atual</h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {membros.length} membros
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Membro</th>
                    <th className="p-4 font-medium">Área</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {membros.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-500">
                        Nenhum membro cadastrado ainda.
                      </td>
                    </tr>
                  ) : (
                    membros.map((membro) => (
                      <tr key={membro.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <p className="font-semibold text-slate-800">{membro.nome}</p>
                          <p className="text-sm text-slate-500">{membro.cargo}</p>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-sm">
                            {membro.area}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {membro.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleRemover(membro.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}