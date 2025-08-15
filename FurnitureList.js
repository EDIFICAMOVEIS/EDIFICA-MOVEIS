function FurnitureList() {
  try {
    const [furniture, setFurniture] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [editingItem, setEditingItem] = React.useState(null);
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
      setLoading(false);
    };

    const deleteFurniture = async (id) => {
      if (!confirm('Tem certeza que deseja excluir este móvel?')) return;
      
      try {
        await trickleDeleteObject('furniture', id);
        loadFurniture();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        alert('Erro ao excluir móvel');
      }
    };

    if (loading) {
      return (
        <div className="text-center py-8" data-name="furniture-list-loading" data-file="components/FurnitureList.js">
          <div className="icon-loader text-4xl text-[var(--primary-color)] animate-spin mb-4"></div>
          <p>Carregando móveis...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6" data-name="furniture-list" data-file="components/FurnitureList.js">
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-[var(--primary-color)] animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Operação realizada com sucesso!</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">Lista de Móveis</h2>
          <button onClick={loadFurniture} className="btn btn-secondary">
            <div className="icon-refresh-cw text-lg"></div>
            <span>Atualizar</span>
          </button>
        </div>

        {furniture.length === 0 ? (
          <div className="text-center py-12">
            <div className="icon-package text-6xl text-gray-400 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum móvel cadastrado</h3>
            <p className="text-gray-500">Comece adicionando seu primeiro móvel</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {furniture.map(item => (
              <div key={item.objectId} className="card hover:shadow-xl transition-shadow">
                {item.objectData.image && (
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={item.objectData.image} 
                      alt={item.objectData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center" style={{display: 'none'}}>
                      <div className="icon-image text-4xl text-gray-400"></div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-[var(--text-dark)]">{item.objectData.name}</h3>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[var(--accent-color)]">
                      R$ {item.objectData.price.toFixed(2)}
                    </span>
                    {item.objectData.room && (
                      <span className="px-2 py-1 bg-[var(--secondary-color)] text-xs rounded-full">
                        {item.objectData.room}
                      </span>
                    )}
                  </div>
                  
                  {item.objectData.brand && (
                    <p className="text-sm text-gray-600">
                      <strong>Marca:</strong> {item.objectData.brand}
                    </p>
                  )}
                  
                  {item.objectData.notes && (
                    <p className="text-sm text-gray-600">{item.objectData.notes}</p>
                  )}
                  
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => deleteFurniture(item.objectId)}
                      className="flex-1 btn bg-red-500 text-white hover:bg-red-600"
                    >
                      <div className="icon-trash-2 text-lg"></div>
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('FurnitureList component error:', error);
    return null;
  }
}