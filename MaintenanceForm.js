function MaintenanceForm({ onMaintenanceSaved }) {
  try {
    const [clients, setClients] = React.useState([]);
    const [formData, setFormData] = React.useState({
      clientId: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      items: [],
      totalValue: 0,
      status: 'Pendente'
    });
    const [currentItem, setCurrentItem] = React.useState({
      description: '',
      quantity: 1,
      unitPrice: 0
    });
    const [loading, setLoading] = React.useState(false);
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

    const addItem = () => {
      if (!currentItem.description) {
        alert('Descrição do item é obrigatória');
        return;
      }

      const item = {
        ...currentItem,
        total: currentItem.quantity * currentItem.unitPrice
      };

      const newItems = [...formData.items, item];
      const newTotal = newItems.reduce((sum, item) => sum + item.total, 0);

      setFormData({
        ...formData,
        items: newItems,
        totalValue: newTotal
      });

      setCurrentItem({ description: '', quantity: 1, unitPrice: 0 });
    };

    const removeItem = (index) => {
      const newItems = formData.items.filter((_, i) => i !== index);
      const newTotal = newItems.reduce((sum, item) => sum + item.total, 0);
      
      setFormData({
        ...formData,
        items: newItems,
        totalValue: newTotal
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.clientId || !formData.description) {
        alert('Cliente e descrição são obrigatórios');
        return;
      }

      setLoading(true);
      try {
        await trickleCreateObject('maintenance', formData);
        setFormData({
          clientId: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          items: [],
          totalValue: 0,
          status: 'Pendente'
        });
        onMaintenanceSaved && onMaintenanceSaved();
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      } catch (error) {
        alert('Erro ao salvar manutenção');
      }
      setLoading(false);
    };

    return (
      <div className="card" data-name="maintenance-form" data-file="components/MaintenanceForm.js">
        {showCross && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-blue-600 animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Manutenção salva com sucesso!</p>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6">Nova Manutenção</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cliente *</label>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData({...formData, clientId: e.target.value})}
              className="input-field"
              required
            >
              <option value="">Selecione um cliente</option>
              {clients.map(client => (
                <option key={client.objectId} value={client.objectId}>
                  {client.objectData.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Data</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Descrição *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field"
              rows="3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="input-field"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Itens da Manutenção</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="Descrição do item"
                  value={currentItem.description}
                  onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={currentItem.quantity}
                  onChange={(e) => setCurrentItem({...currentItem, quantity: Number(e.target.value)})}
                  className="input-field"
                  min="1"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Preço unitário"
                  value={currentItem.unitPrice}
                  onChange={(e) => setCurrentItem({...currentItem, unitPrice: Number(e.target.value)})}
                  className="input-field"
                  step="0.01"
                />
              </div>
              <div>
                <button type="button" onClick={addItem} className="btn btn-secondary w-full">
                  Adicionar
                </button>
              </div>
            </div>

            {formData.items.length > 0 && (
              <div className="space-y-2 mb-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{item.description}</span>
                      <span className="text-gray-600 ml-2">
                        {item.quantity}x R$ {item.unitPrice.toFixed(2)} = R$ {item.total.toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <div className="icon-trash-2 text-lg"></div>
                    </button>
                  </div>
                ))}
                <div className="text-right font-bold text-lg">
                  Total: R$ {formData.totalValue.toFixed(2)}
                </div>
              </div>
            )}
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Salvando...' : 'Salvar Manutenção'}
          </button>
        </form>
      </div>
    );
  } catch (error) {
    console.error('MaintenanceForm component error:', error);
    return null;
  }
}