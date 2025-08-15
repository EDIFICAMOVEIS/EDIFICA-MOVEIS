function ReceiptGenerator() {
  try {
    const [maintenances, setMaintenances] = React.useState([]);
    const [clients, setClients] = React.useState([]);
    const [company, setCompany] = React.useState(null);
    const [selectedMaintenance, setSelectedMaintenance] = React.useState('');
    const [sendData, setSendData] = React.useState({
      whatsapp: '',
      email: ''
    });
    const [showCross, setShowCross] = React.useState(false);

    React.useEffect(() => {
      loadData();
    }, []);

    const loadData = async () => {
      try {
        const [maintenanceResult, clientsResult, companyResult] = await Promise.all([
          trickleListObjects('maintenance', 50, true),
          trickleListObjects('client', 50, true),
          trickleListObjects('company', 1, true)
        ]);
        
        setMaintenances(maintenanceResult.items);
        setClients(clientsResult.items);
        if (companyResult.items.length > 0) {
          setCompany(companyResult.items[0]);
        }
      } catch (error) {
        alert('Erro ao carregar dados');
      }
    };

    const getClientName = (clientId) => {
      const client = clients.find(c => c.objectId === clientId);
      return client ? client.objectData.name : 'Cliente não encontrado';
    };

    const getClient = (clientId) => {
      return clients.find(c => c.objectId === clientId);
    };

    const generateReceipt = () => {
      const maintenance = maintenances.find(m => m.objectId === selectedMaintenance);
      const client = getClient(maintenance.objectData.clientId);
      
      if (!maintenance || !client || !company) {
        alert('Selecione uma manutenção e configure os dados da empresa');
        return;
      }

      const itemsText = maintenance.objectData.items.map(item => 
        `${item.description} - Qtd: ${item.quantity} - Valor Unit: R$ ${item.unitPrice.toFixed(2)} - Total: R$ ${item.total.toFixed(2)}`
      ).join('\n');

      const receipt = `
🛡️ PROTEÇÃO DO REINO - RECIBO DE SERVIÇOS

PRESTADOR DE SERVIÇOS:
Proteção Do Reino
CNPJ: ${company.objectData.cnpj}
Endereço: ${company.objectData.address}
Telefone: ${company.objectData.phone}
Email: ${company.objectData.email}

CLIENTE:
${client.objectData.name}
Documento: ${client.objectData.document || 'N/A'}
Endereço: ${client.objectData.address || 'N/A'}
Telefone: ${client.objectData.phone || 'N/A'}
Email: ${client.objectData.email}

DATA DO SERVIÇO: ${new Date(maintenance.objectData.date).toLocaleDateString('pt-BR')}
DESCRIÇÃO: ${maintenance.objectData.description}

ITENS:
${itemsText}

VALOR TOTAL: R$ ${maintenance.objectData.totalValue.toFixed(2)}

Recebi de ${client.objectData.name} a quantia de R$ ${maintenance.objectData.totalValue.toFixed(2)} 
referente aos serviços de manutenção acima descritos.

Data: ${new Date().toLocaleDateString('pt-BR')}

_____________________
Proteção Do Reino
Sua segurança é nossa prioridade!
      `;

      const blob = new Blob([receipt], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recibo_${client.objectData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setShowCross(true);
      setTimeout(() => setShowCross(false), 3000);
    };

    const sendReceipt = (method) => {
      const maintenance = maintenances.find(m => m.objectId === selectedMaintenance);
      const client = getClient(maintenance.objectData.clientId);
      
      if (!maintenance || !client) {
        alert('Selecione uma manutenção válida');
        return;
      }

      const receiptText = `🛡️ PROTEÇÃO DO REINO - RECIBO DE SERVIÇOS

Cliente: ${client.objectData.name}
Data: ${new Date(maintenance.objectData.date).toLocaleDateString('pt-BR')}
Serviço: ${maintenance.objectData.description}
Valor Total: R$ ${maintenance.objectData.totalValue.toFixed(2)}

Obrigado pela confiança!
Proteção Do Reino - Sua segurança é nossa prioridade!

Telefone/WhatsApp: (21) 97155-0633
Email: rotinadeumtrabalhador@gmail.com`;

      if (method === 'whatsapp') {
        const whatsappNumber = sendData.whatsapp || client.objectData.whatsapp;
        if (!whatsappNumber) {
          alert('Digite o WhatsApp do cliente');
          return;
        }
        const message = encodeURIComponent(receiptText);
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        window.location.href = `https://wa.me/55${cleanNumber}?text=${message}`;
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      } else if (method === 'email') {
        const emailAddress = sendData.email || client.objectData.email;
        if (!emailAddress) {
          alert('Digite o email do cliente');
          return;
        }
        const subject = encodeURIComponent('Recibo de Serviços - Proteção Do Reino');
        const body = encodeURIComponent(receiptText);
        window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      }
    };

    return (
      <div className="card" data-name="receipt-generator" data-file="components/ReceiptGenerator.js">
        {showCross && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-blue-600 animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Operação realizada com sucesso!</p>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6">Gerador de Recibos</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Selecionar Manutenção</label>
            <select
              value={selectedMaintenance}
              onChange={(e) => setSelectedMaintenance(e.target.value)}
              className="input-field"
            >
              <option value="">Selecione uma manutenção</option>
              {maintenances.map(maintenance => (
                <option key={maintenance.objectId} value={maintenance.objectId}>
                  {getClientName(maintenance.objectData.clientId)} - 
                  {new Date(maintenance.objectData.date).toLocaleDateString('pt-BR')} - 
                  R$ {maintenance.objectData.totalValue.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {selectedMaintenance && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold mb-2">Detalhes da Manutenção Selecionada:</h3>
              {(() => {
                const maintenance = maintenances.find(m => m.objectId === selectedMaintenance);
                const client = getClient(maintenance?.objectData.clientId);
                return maintenance ? (
                  <div className="space-y-3">
                    <div>
                      <p><strong>Cliente:</strong> {getClientName(maintenance.objectData.clientId)}</p>
                      <p><strong>Data:</strong> {new Date(maintenance.objectData.date).toLocaleDateString('pt-BR')}</p>
                      <p><strong>Descrição:</strong> {maintenance.objectData.description}</p>
                      <p><strong>Total:</strong> R$ {maintenance.objectData.totalValue.toFixed(2)}</p>
                    </div>
                    
                    <div className="border-t pt-3">
                      <h4 className="font-medium mb-2">Dados para Envio:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">WhatsApp</label>
                          <input
                            type="tel"
                            placeholder={client?.objectData.whatsapp || "Digite o WhatsApp"}
                            value={sendData.whatsapp}
                            onChange={(e) => setSendData({...sendData, whatsapp: e.target.value})}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            placeholder={client?.objectData.email || "Digite o email"}
                            value={sendData.email}
                            onChange={(e) => setSendData({...sendData, email: e.target.value})}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
          
          <div className="flex space-x-4">
            <button 
              onClick={generateReceipt}
              className="btn btn-success"
              disabled={!selectedMaintenance}
            >
              <div className="icon-download text-xl mr-2"></div>
              Baixar Recibo
            </button>
            
            <button 
              onClick={() => sendReceipt('whatsapp')}
              className="btn btn-primary"
              disabled={!selectedMaintenance}
            >
              <div className="icon-message-circle text-xl mr-2"></div>
              Enviar via WhatsApp
            </button>
            
            <button 
              onClick={() => sendReceipt('email')}
              className="btn btn-secondary"
              disabled={!selectedMaintenance}
            >
              <div className="icon-mail text-xl mr-2"></div>
              Enviar por Email
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ReceiptGenerator component error:', error);
    return null;
  }
}