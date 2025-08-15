function Sidebar({ activeSection, setActiveSection }) {
  try {
    const menuItems = [
      { id: 'clients', label: 'Clientes', icon: 'users' },
      { id: 'company', label: 'Empresa', icon: 'building' },
      { id: 'contracts', label: 'Contratos', icon: 'file-text' },
      { id: 'maintenance', label: 'Manutenção', icon: 'wrench' },
      { id: 'receipts', label: 'Recibos', icon: 'receipt' }
    ];

    return (
      <div className="w-64 bg-gray-900 text-white min-h-screen p-4" data-name="sidebar" data-file="components/Sidebar.js">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="icon-shield text-2xl text-white"></div>
          </div>
          <h1 className="text-lg font-bold text-blue-400">Proteção Do Reino</h1>
          <p className="text-sm text-gray-400">Sistema de Gestão</p>
        </div>
        
        <nav>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeSection === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <div className={`icon-${item.icon} text-xl`}></div>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}