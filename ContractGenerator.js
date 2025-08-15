function ContractGenerator() {
  try {
    const [clients, setClients] = React.useState([]);
    const [company, setCompany] = React.useState(null);
    const [selectedClient, setSelectedClient] = React.useState('');
    const [contractData, setContractData] = React.useState({
      service: '',
      value: '',
      duration: '',
      terms: ''
    });
    const [showCross, setShowCross] = React.useState(false);

    React.useEffect(() => {
      loadData();
    }, []);

    const loadData = async () => {
      try {
        const [clientsResult, companyResult] = await Promise.all([
          trickleListObjects('client', 50, true),
          trickleListObjects('company', 1, true)
        ]);
        
        setClients(clientsResult.items);
        if (companyResult.items.length > 0) {
          setCompany(companyResult.items[0]);
        }
      } catch (error) {
        alert('Erro ao carregar dados');
      }
    };

    const generateContract = () => {
      const client = clients.find(c => c.objectId === selectedClient);
      if (!client) {
        alert('Selecione um cliente');
        return;
      }

      const contract = `🛡 CONTRATO DE PRESTAÇÃO DE SERVIÇOS ASSISTENCIAIS – PROTEÇÃO DO REINO

CONTRATANTE:
${client.objectData.name}
Documento: ${client.objectData.document || 'N/A'}
Endereço: ${client.objectData.address || 'N/A'}

CONTRATADA:
Alexandro Monteiro – MEI
CNPJ: 55.276.743/0001-80
Nome Fantasia: Proteção do Reino
Cidade: São João de Meriti – RJ
Telefone/WhatsApp: (21) 97155-0633
E-mail: rotinadeumtrabalhador@gmail.com

PLANO CONTRATADO: ${client.objectData.plan || contractData.service}
VALOR: R$ ${contractData.value}
DURAÇÃO: ${contractData.duration}

Data: ${new Date().toLocaleDateString('pt-BR')}

_____________________        _____________________
    CONTRATANTE                 CONTRATADA
      `;

      const blob = new Blob([contract], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contrato_${client.objectData.name.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setShowCross(true);
      setTimeout(() => setShowCross(false), 3000);
    };

    const sendContract = (method) => {
      const client = clients.find(c => c.objectId === selectedClient);
      if (!client) {
        alert('Selecione um cliente');
        return;
      }

      const contractText = `🛡 CONTRATO - PROTEÇÃO DO REINO

Cliente: ${client.objectData.name}
Plano: ${client.objectData.plan || contractData.service}
Valor: R$ ${contractData.value}
Duração: ${contractData.duration}

Proteção Do Reino - Sua segurança é nossa prioridade!
Telefone/WhatsApp: (21) 97155-0633
Email: rotinadeumtrabalhador@gmail.com`;

      if (method === 'whatsapp') {
        const whatsappNumber = client.objectData.whatsapp;
        if (!whatsappNumber) {
          alert('Cliente não possui WhatsApp cadastrado');
          return;
        }
        const message = encodeURIComponent(contractText);
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        window.location.href = `https://wa.me/55${cleanNumber}?text=${message}`;
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      } else if (method === 'email') {
        if (!client.objectData.email) {
          alert('Cliente não possui email cadastrado');
          return;
        }
        const subject = encodeURIComponent('Contrato de Prestação de Serviços - Proteção Do Reino');
        const body = encodeURIComponent(contractText);
        window.location.href = `mailto:${client.objectData.email}?subject=${subject}&body=${body}`;
        setShowCross(true);
        setTimeout(() => setShowCross(false), 3000);
      }
    };

    return (
      <div className="card" data-name="contract-generator" data-file="components/ContractGenerator.js">
        {showCross && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <div className="text-6xl text-blue-600 animate-pulse mb-4">✝</div>
              <p className="text-lg font-semibold text-gray-800">Operação realizada com sucesso!</p>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6">Gerador de Contratos</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Selecionar Cliente</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="input-field"
            >
              <option value="">Selecione um cliente</option>
              {clients.map(client => (
                <option key={client.objectId} value={client.objectId}>
                  {client.objectData.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Serviço</label>
            <input
              type="text"
              value={contractData.service}
              onChange={(e) => setContractData({...contractData, service: e.target.value})}
              className="input-field"
              placeholder="Descrição do serviço"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Valor (R$)</label>
            <input
              type="number"
              value={contractData.value}
              onChange={(e) => setContractData({...contractData, value: e.target.value})}
              className="input-field"
              placeholder="0.00"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Duração</label>
            <input
              type="text"
              value={contractData.duration}
              onChange={(e) => setContractData({...contractData, duration: e.target.value})}
              className="input-field"
              placeholder="Ex: 12 meses"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Termos e Condições</label>
            <textarea
              value={contractData.terms}
              onChange={(e) => setContractData({...contractData, terms: e.target.value})}
              className="input-field"
              rows="3"
              placeholder="Termos adicionais do contrato"
            />
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={generateContract}
              className="btn btn-success"
              disabled={!selectedClient}
            >
              <div className="icon-download text-xl mr-2"></div>
              Baixar Contrato
            </button>
            
            <button 
              onClick={() => sendContract('whatsapp')}
              className="btn btn-primary"
              disabled={!selectedClient}
            >
              <div className="icon-message-circle text-xl mr-2"></div>
              Enviar via WhatsApp
            </button>
            
            <button 
              onClick={() => sendContract('email')}
              className="btn btn-secondary"
              disabled={!selectedClient}
            >
              <div className="icon-mail text-xl mr-2"></div>
              Enviar por Email
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ContractGenerator component error:', error);
    return null;
  }
}