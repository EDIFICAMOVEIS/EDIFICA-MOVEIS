function NewQuote() {
  try {
    const [furniture, setFurniture] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [clientData, setClientData] = React.useState({
      name: '',
      phone: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    React.useEffect(() => {
      loadFurniture();
    }, []);

    const loadFurniture = async () => {
      try {
        const result = await trickleListObjects('furniture', 50, true);
        setFurniture(result.items);
      } catch (error) {
        console.error('Erro ao carregar móveis:', error);
      }
    };

    const addToQuote = (item) => {
      const existing = selectedItems.find(selected => selected.id === item.objectId);
      if (existing) {
        setSelectedItems(selectedItems.map(selected => 
          selected.id === item.objectId 
            ? {...selected, quantity: selected.quantity + 1}
            : selected
        ));
      } else {
        setSelectedItems([...selectedItems, {
          id: item.objectId,
          name: item.objectData.name,
          price: item.objectData.price,
          image: item.objectData.image,
          quantity: 1
        }]);
      }
    };

    const removeFromQuote = (id) => {
      setSelectedItems(selectedItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
      if (newQuantity <= 0) {
        removeFromQuote(id);
        return;
      }
      setSelectedItems(selectedItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      ));
    };

    const getTotalValue = () => {
      return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const generateQuote = async () => {
      if (!clientData.name || !clientData.phone || selectedItems.length === 0) {
        alert('Preencha os dados do cliente e selecione pelo menos um móvel');
        return;
      }

      setLoading(true);
      try {
        const quoteData = {
          clientName: clientData.name,
          clientPhone: clientData.phone,
          items: selectedItems,
          totalValue: getTotalValue(),
          createdAt: new Date().toISOString()
        };

        await trickleCreateObject('quote', quoteData);
        
        setSelectedItems([]);
        setClientData({ name: '', phone: '' });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        alert('Erro ao salvar orçamento');
      }
      setLoading(false);
    };

    return (
      <div className="space-y-6" data-name="new-quote" data-file="components/NewQuote.js">
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-[var(--primary-color)] animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Orçamento criado com sucesso!</p>
            </div>
          </div>
        )}

        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-dark)]">Novo Orçamento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Cliente *</label>
              <input
                type="text"
                value={clientData.name}
                onChange={(e) => setClientData({...clientData, name: e.target.value})}
                className="input-field"
                placeholder="Nome completo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefone/WhatsApp *</label>
              <input
                type="tel"
                value={clientData.phone}
                onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                className="input-field"
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Selecionar Móveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {furniture.map(item => (
              <div key={item.objectId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {item.objectData.image && (
                  <img 
                    src={item.objectData.image} 
                    alt={item.objectData.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                )}
                <h4 className="font-semibold mb-2">{item.objectData.name}</h4>
                <p className="text-[var(--accent-color)] font-bold mb-3">
                  R$ {item.objectData.price.toFixed(2)}
                </p>
                <button
                  onClick={() => addToQuote(item)}
                  className="btn btn-primary w-full"
                >
                  <div className="icon-plus text-lg"></div>
                  <span>Adicionar</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Itens Selecionados</h3>
            <div className="space-y-3">
              {selectedItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)} cada</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                    >
                      <div className="icon-minus text-sm"></div>
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                    >
                      <div className="icon-plus text-sm"></div>
                    </button>
                    <span className="font-bold text-[var(--accent-color)] ml-4">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromQuote(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <div className="icon-trash-2 text-lg"></div>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-[var(--accent-color)]">
                  R$ {getTotalValue().toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={generateQuote}
                disabled={loading}
                className="btn btn-accent w-full"
              >
                {loading ? (
                  <>
                    <div className="icon-loader text-xl animate-spin"></div>
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <div className="icon-file-text text-xl"></div>
                    <span>Gerar Orçamento</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('NewQuote component error:', error);
    return null;
  }
}