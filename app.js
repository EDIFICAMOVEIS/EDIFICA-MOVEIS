class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Algo deu errado</h1>
            <p className="text-gray-600 mb-4">Pedimos desculpas pelo inconveniente.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentPage, setCurrentPage] = React.useState('home');

    const renderPage = () => {
      switch (currentPage) {
        case 'home':
          return <Home />;
        case 'add-furniture':
          return <AddFurniture />;
        case 'furniture-list':
          return <FurnitureList />;
        case 'new-quote':
          return <NewQuote />;
        case 'quote-history':
          return <QuoteHistory />;
        case 'about':
          return <About />;
        default:
          return <Home />;
      }
    };

    return (
      <div className="min-h-screen bg-[var(--bg-light)]" data-name="app" data-file="app.js">
        <Header />
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container mx-auto px-4 py-6">
          {renderPage()}
        </main>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);