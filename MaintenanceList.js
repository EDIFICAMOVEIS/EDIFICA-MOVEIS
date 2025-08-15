function MaintenanceList() {
  try {
    const [maintenances, setMaintenances] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [editingMaintenance, setEditingMaintenance] = React.useState(null);
    const [showCross, setShowCross] = React.useState(false);

    React.useEffect(() => {
      loadData();
    }, []);

    const loadData = async () => {
      setLoading(true);
      try {
        const [maintenanceResult, clientsResult] = await Promise.all([
          trickleListObjects('maintenance', 50, true),
          trickleListObjects('client', 50, true)
        ]);
        
        setMaintenances(maintenanceResult.items);
        setClients(clientsResult.items);
      } catch (error) {
        alert('Erro ao carregar dados');
      }
      setLoading(false);
    };

    const getClientName = (clientId) => {
      const client = clients.find(c => c.objectId === clientId);
      return client ? client.objectData.name : 'Cliente não encontrado';
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'Pendente': return 'bg-yellow-100 text-yellow-800';
        case 'Em andamento': return 'bg-blue-100 text-blue-800';
        case 'Concluída': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const editMaintenance = (maintenance) => {
      setEditingMaintenance(maintenance);
    };

    const updateMaintenanceStatus = async (id, newStatus) => {
      try {
        const maintenance = maintenances.find(m => m.objectId === id);
        await trickleUpdateObject('maintenance', id, {
          ...maintenance.objectData,
          status: newStatus
        });
        loadData();
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      } catch (error) {
        alert('Erro ao atualizar status');
      }
    };

    const deleteMaintenance = async (id) => {
      if (!confirm('Tem certeza que deseja excluir esta manutenção?')) return;
      
      try {
        await trickleDeleteObject('maintenance', id);
        loadData();
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      } catch (error) {
        alert('Erro ao excluir manutenção');
      }
    };

    if (loading) {
      return (
        <div className="card" data-name="maintenance-list" data-file="components/MaintenanceList.js">
          <div className="text-center">Carregando...</div>
        </div>
      );
    }

    return (
      <div className="space-y-6" data-name="maintenance-list" data-file="components/MaintenanceList.js">
        {showCross && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-blue-600 animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Operação realizada com sucesso!</p>
            </div>
          </div>
        )}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Lista de Manutenções</h2>
            <button onClick={loadData} className="btn btn-secondary">
              <div className="icon-refresh-cw text-lg mr-2"></div>
              Atualizar
            </button>
          </div>

          {maintenances.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Nenhuma manutenção cadastrada ainda.
            </div>
          ) : (
            <div className="space-y-4">
              {maintenances.map(maintenance => (
                <div key={maintenance.objectId} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {getClientName(maintenance.objectData.clientId)}
                      </h3>
                      <p className="text-gray-600">
                        Data: {new Date(maintenance.objectData.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={maintenance.objectData.status}
                        onChange={(e) => updateMaintenanceStatus(maintenance.objectId, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${getStatusColor(maintenance.objectData.status)}`}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Concluída">Concluída</option>
                      </select>
                      <button
                        onClick={() => deleteMaintenance(maintenance.objectId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <div className="icon-trash-2 text-lg"></div>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{maintenance.objectData.description}</p>
                  
                  <div className="text-right">
                    <span className="font-bold text-lg text-green-600">
                      Total: R$ {maintenance.objectData.totalValue.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('MaintenanceList component error:', error);
    return null;
  }
}