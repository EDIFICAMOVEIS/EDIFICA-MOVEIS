function AddFurniture() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      image: '',
      price: '',
      description: '',
      room: '',
      brand: '',
      notes: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.price) {
        alert('Nome e valor são obrigatórios');
        return;
      }

      setLoading(true);
      try {
        await trickleCreateObject('furniture', {
          ...formData,
          price: parseFloat(formData.price)
        });
        
        setFormData({
          name: '',
          image: '',
          price: '',
          description: '',
          room: '',
          brand: '',
          notes: ''
        });
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        alert('Erro ao salvar móvel');
      }
      setLoading(false);
    };

    return (
      <div className="max-w-2xl mx-auto" data-name="add-furniture" data-file="components/AddFurniture.js">
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-[var(--primary-color)] animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Móvel adicionado com sucesso!</p>
            </div>
          </div>
        )}

        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-[var(--text-dark)]">Adicionar Novo Móvel</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Móvel *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                placeholder="Ex: Guarda-roupa 3 portas"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Imagem (URL)</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="input-field"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Valor da Montagem (R$) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="input-field"
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Cômodo</label>
              <select
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
                className="input-field"
              >
                <option value="">Selecione o cômodo</option>
                <option value="Quarto">Quarto</option>
                <option value="Sala">Sala</option>
                <option value="Cozinha">Cozinha</option>
                <option value="Banheiro">Banheiro</option>
                <option value="Escritório">Escritório</option>
                <option value="Área de Serviço">Área de Serviço</option>
                <option value="Varanda">Varanda</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Marca</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="input-field"
                placeholder="Ex: Madesa, Tok&Stok, Casas Bahia"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Observações</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="input-field"
                rows="3"
                placeholder="Informações adicionais sobre a montagem"
              />
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? (
                <>
                  <div className="icon-loader text-xl animate-spin"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <div className="icon-plus text-xl"></div>
                  <span>Adicionar Móvel</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AddFurniture component error:', error);
    return null;
  }
}