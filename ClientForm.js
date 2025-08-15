function ClientForm({ onClientSaved }) {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
      document: '',
      plan: ''
    });
    const [clients, setClients] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [editingClient, setEditingClient] = React.useState(null);
    const [showCross, setShowCross] = React.useState(false);

    React.useEffect(() => {
      loadClients();
    }, []);

    const loadClients = async () => {
      try {
        const result = await trickleListObjects('client', 50, true);
        setClients(result.items);
      } catch (error) {
        alert('Erro ao carregar clientes');
      }
    };

    const editClient = (client) => {
      setFormData(client.objectData);
      setEditingClient(client);
    };

    const deleteClient = async (id) => {
      if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
      
      try {
        await trickleDeleteObject('client', id);
        loadClients();
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      } catch (error) {
        alert('Erro ao excluir cliente');
      }
    };

    const cancelEdit = () => {
      setEditingClient(null);
      setFormData({ name: '', email: '', phone: '', whatsapp: '', address: '', document: '', plan: '' });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email) {
        alert('Nome e email são obrigatórios');
        return;
      }

      setLoading(true);
      try {
        if (editingClient) {
          await trickleUpdateObject('client', editingClient.objectId, formData);
          setEditingClient(null);
        } else {
          await trickleCreateObject('client', formData);
        }
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
        setFormData({ name: '', email: '', phone: '', whatsapp: '', address: '', document: '', plan: '' });
        loadClients();
        onClientSaved && onClientSaved();
      } catch (error) {
        alert(editingClient ? 'Erro ao atualizar cliente' : 'Erro ao salvar cliente');
      }
      setLoading(false);
    };

    return (
      <div className="space-y-6" data-name="client-form" data-file="components/ClientForm.js">
        {showCross && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-blue-600 animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Operação realizada com sucesso!</p>
            </div>
          </div>
        )}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">
            {editingClient ? 'Editar Cliente' : 'Cadastro de Cliente'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="input-field"
                placeholder="Ex: 11999999999"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Endereço</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="input-field"
                rows="3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">CPF/CNPJ</label>
              <input
                type="text"
                value={formData.document}
                onChange={(e) => setFormData({...formData, document: e.target.value})}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Plano de Assistência Técnica</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({...formData, plan: e.target.value})}
                className="input-field"
              >
                <option value="">Selecione um plano</option>
                <option value="Básico - R$ 229,90/mês">📦 Plano Básico - R$ 229,90/mês</option>
                <option value="Premium - R$ 379,80/mês">⚡ Plano Premium - R$ 379,80/mês</option>
                <option value="Pró - R$ 879,90/mês">🔧 Plano Pró - R$ 879,90/mês</option>
                <option value="Plus - R$ 1.229,90/mês">🛠 Plano Plus - R$ 1.229,90/mês</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Salvando...' : editingClient ? 'Atualizar Cliente' : 'Salvar Cliente'}
              </button>
              {editingClient && (
                <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Clientes Cadastrados</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {clients.map(client => (
              <div key={client.objectId} className="p-3 bg-gray-50 rounded border flex justify-between items-center">
                <div>
                  <div className="font-medium">{client.objectData.name}</div>
                  <div className="text-sm text-gray-600">{client.objectData.email}</div>
                  {client.objectData.plan && (
                    <div className="text-xs text-blue-600">{client.objectData.plan}</div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editClient(client)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <div className="icon-edit text-lg"></div>
                  </button>
                  <button
                    onClick={() => deleteClient(client.objectId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <div className="icon-trash-2 text-lg"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ClientForm component error:', error);
    return null;
  }
}