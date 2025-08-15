function Navigation({ currentPage, setCurrentPage }) {
  try {
    const menuItems = [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'add-furniture', label: 'Adicionar Móvel', icon: 'plus-circle' },
      { id: 'furniture-list', label: 'Lista de Móveis', icon: 'grid' },
      { id: 'new-quote', label: 'Novo Orçamento', icon: 'file-text' },
      { id: 'quote-history', label: 'Histórico', icon: 'clock' },
      { id: 'about', label: 'Sobre', icon: 'info' }
    ];

    return (
      <nav className="bg-white shadow-md sticky top-0 z-40" data-name="navigation" data-file="components/Navigation.js">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  currentPage === item.id 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className={`icon-${item.icon} text-lg`}></div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error('Navigation component error:', error);
    return null;
  }
}