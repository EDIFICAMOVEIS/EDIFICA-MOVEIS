function CompanyForm() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      cnpj: '',
      address: '',
      phone: '',
      email: ''
    });
    const [company, setCompany] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [showCross, setShowCross] = React.useState(false);

    React.useEffect(() => {
      loadCompany();
    }, []);

    const loadCompany = async () => {
      try {
        const result = await trickleListObjects('company', 1, true);
        if (result.items.length > 0) {
          const companyData = result.items[0];
          setCompany(companyData);
          setFormData(companyData.objectData);
        }
      } catch (error) {
        console.log('Nenhuma empresa cadastrada ainda');
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.cnpj) {
        alert('Nome e CPF/CNPJ são obrigatórios');
        return;
      }

      setLoading(true);
      try {
        if (company) {
          await trickleUpdateObject('company', company.objectId, formData);
        } else {
          await trickleCreateObject('company', formData);
        }
        loadCompany();
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      } catch (error) {
        alert('Erro ao salvar dados da empresa');
      }
      setLoading(false);
    };

    return (
      <div className="card" data-name="company-form" data-file="components/CompanyForm.js">
        {showCross && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-blue-600 animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Dados salvos com sucesso!</p>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6">Dados da Empresa</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome da Empresa *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">CPF/CNPJ *</label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
              className="input-field"
              placeholder="Digite CPF ou CNPJ"
              required
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
            <label className="block text-sm font-medium mb-2">Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="input-field"
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Salvando...' : company ? 'Atualizar Empresa' : 'Salvar Empresa'}
          </button>
        </form>
      </div>
    );
  } catch (error) {
    console.error('CompanyForm component error:', error);
    return null;
  }
}