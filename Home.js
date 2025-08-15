function Home() {
  try {
    return (
      <div className="space-y-8" data-name="home" data-file="components/Home.js">
        <div className="verse-card">
          <div className="mb-4">
            <div className="icon-book-open text-4xl mb-3"></div>
            <h2 className="text-2xl font-bold mb-2">Provérbios 24:3-4</h2>
          </div>
          <blockquote className="text-lg leading-relaxed italic">
            "Com sabedoria se edifica a casa, e com entendimento ela permanece firme;<br/>
            pelo conhecimento suas salas se encherão de todas as riquezas preciosas e agradáveis."
          </blockquote>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
            Bem-vindo ao Edifica
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Seu sistema completo para criar orçamentos profissionais de montagem de móveis. 
            Gerencie seus móveis, crie orçamentos personalizados e envie diretamente para seus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
              <div className="icon-plus-circle text-2xl text-white"></div>
            </div>
            <h4 className="text-lg font-semibold mb-2">Adicionar Móveis</h4>
            <p className="text-gray-600 text-sm">
              Cadastre móveis com imagens, valores e descrições detalhadas
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent-color)] rounded-full flex items-center justify-center">
              <div className="icon-file-text text-2xl text-white"></div>
            </div>
            <h4 className="text-lg font-semibold mb-2">Criar Orçamentos</h4>
            <p className="text-gray-600 text-sm">
              Monte orçamentos personalizados com cálculo automático de valores
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--secondary-color)] rounded-full flex items-center justify-center">
              <div className="icon-send text-2xl text-[var(--text-dark)]"></div>
            </div>
            <h4 className="text-lg font-semibold mb-2">Enviar via WhatsApp</h4>
            <p className="text-gray-600 text-sm">
              Envie orçamentos em PDF diretamente para o WhatsApp dos clientes
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Home component error:', error);
    return null;
  }
}