function QuoteHistory() {
  try {
    const [quotes, setQuotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [showSuccess, setShowSuccess] = React.useState(false);

    React.useEffect(() => {
      loadQuotes();
    }, []);

    const loadQuotes = async () => {
      try {
        const result = await trickleListObjects('quote', 50, true);
        setQuotes(result.items);
      } catch (error) {
        console.error('Erro ao carregar orçamentos:', error);
      }
      setLoading(false);
    };

    const deleteQuote = async (id) => {
      if (!confirm('Tem certeza que deseja excluir este orçamento?')) return;
      
      try {
        await trickleDeleteObject('quote', id);
        loadQuotes();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        alert('Erro ao excluir orçamento');
      }
    };

    const sendToWhatsApp = (quote) => {
      const itemsText = quote.objectData.items.map(item => 
        `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const message = `🏠 *ORÇAMENTO EDIFICA*

*Cliente:* ${quote.objectData.clientName}
*Data:* ${new Date(quote.objectData.createdAt).toLocaleDateString('pt-BR')}

*MÓVEIS SELECIONADOS:*
${itemsText}

*VALOR TOTAL: R$ ${quote.objectData.totalValue.toFixed(2)}*

_"Com sabedoria se edifica a casa, e com entendimento ela permanece firme"_ - Provérbios 24:3

📞 Entre em contato para agendar a montagem!`;

      const cleanPhone = quote.objectData.clientPhone.replace(/\D/g, '');
      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://wa.me/55${cleanPhone}?text=${encodedMessage}`;
    };

    if (loading) {
      return (
        <div className="text-center py-8" data-name="quote-history-loading" data-file="components/QuoteHistory.js">
          <div className="icon-loader text-4xl text-[var(--primary-color)] animate-spin mb-4"></div>
          <p>Carregando orçamentos...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6" data-name="quote-history" data-file="components/QuoteHistory.js">
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-[var(--primary-color)] animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Operação realizada com sucesso!</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--text-dark)]">Histórico de Orçamentos</h2>
          <button onClick={loadQuotes} className="btn btn-secondary">
            <div className="icon-refresh-cw text-lg"></div>
            <span>Atualizar</span>
          </button>
        </div>

        {quotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="icon-file-text text-6xl text-gray-400 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum orçamento encontrado</h3>
            <p className="text-gray-500">Crie seu primeiro orçamento na aba "Novo Orçamento"</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map(quote => (
              <div key={quote.objectId} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-dark)]">
                      {quote.objectData.clientName}
                    </h3>
                    <p className="text-gray-600">
                      📞 {quote.objectData.clientPhone}
                    </p>
                    <p className="text-gray-500 text-sm">
                      📅 {new Date(quote.objectData.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[var(--accent-color)]">
                      R$ {quote.objectData.totalValue.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {quote.objectData.items.length} item(s)
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold">Móveis:</h4>
                  {quote.objectData.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                      <span>{item.name} ({item.quantity}x)</span>
                      <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => sendToWhatsApp(quote)}
                    className="btn btn-primary flex-1"
                  >
                    <div className="icon-message-circle text-lg"></div>
                    <span>Enviar WhatsApp</span>
                  </button>
                  <button
                    onClick={() => deleteQuote(quote.objectId)}
                    className="btn bg-red-500 text-white hover:bg-red-600"
                  >
                    <div className="icon-trash-2 text-lg"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('QuoteHistory component error:', error);
    return null;
  }
}