function Header() {
  try {
    return (
      <header className="bg-white shadow-lg border-b-4 border-[var(--primary-color)]" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] rounded-lg flex items-center justify-center">
              <div className="icon-home text-2xl text-white"></div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[var(--text-dark)]">Edifica</h1>
              <p className="text-sm text-gray-600">Orçamentos de Montagem de Móveis</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-color)] to-[var(--primary-color)] rounded-lg flex items-center justify-center">
              <div className="icon-book-open text-2xl text-white"></div>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}