function About() {
  try {
    return (
      <div className="space-y-8" data-name="about" data-file="components/About.js">
        <div className="verse-card">
          <div className="mb-4">
            <div className="icon-heart text-4xl mb-3"></div>
            <h2 className="text-2xl font-bold mb-2">Sobre o Edifica</h2>
          </div>
          <p className="text-lg leading-relaxed">
            Criado com amor e dedicação para facilitar o trabalho de montadores de móveis, 
            unindo tecnologia e fé para edificar lares com sabedoria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mr-4">
                <div className="icon-target text-2xl text-white"></div>
              </div>
              <h3 className="text-xl font-bold">Nossa Missão</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Capacitar profissionais da montagem de móveis com ferramentas simples e eficazes, 
              permitindo que foquem no que realmente importa: construir lares felizes e organizados.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[var(--accent-color)] rounded-full flex items-center justify-center mr-4">
                <div className="icon-eye text-2xl text-white"></div>
              </div>
              <h3 className="text-xl font-bold">Nossa Visão</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Ser a ferramenta preferida de montadores em todo o Brasil, 
              promovendo profissionalismo, organização e crescimento no setor.
            </p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-2xl font-bold mb-6 text-center">Funcionalidades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                <div className="icon-plus-circle text-2xl text-white"></div>
              </div>
              <h4 className="font-semibold mb-2">Cadastro de Móveis</h4>
              <p className="text-sm text-gray-600">
                Adicione móveis com fotos, preços e descrições completas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[var(--accent-color)] rounded-full flex items-center justify-center">
                <div className="icon-calculator text-2xl text-white"></div>
              </div>
              <h4 className="font-semibold mb-2">Cálculo Automático</h4>
              <p className="text-sm text-gray-600">
                Valores totais calculados automaticamente conforme seleção
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-[var(--secondary-color)] rounded-full flex items-center justify-center">
                <div className="icon-file-text text-2xl text-[var(--text-dark)]"></div>
              </div>
              <h4 className="font-semibold mb-2">Orçamentos Profissionais</h4>
              <p className="text-sm text-gray-600">
                Gere orçamentos organizados e bem apresentados
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                <div className="icon-message-circle text-2xl text-white"></div>
              </div>
              <h4 className="font-semibold mb-2">Envio Direto</h4>
              <p className="text-sm text-gray-600">
                Compartilhe orçamentos via WhatsApp instantaneamente
              </p>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <div className="mb-6">
            <div className="icon-book-open text-4xl text-[var(--primary-color)] mb-4"></div>
            <h3 className="text-xl font-bold mb-4">Versículo de Inspiração</h3>
          </div>
          <blockquote className="text-lg italic text-gray-700 mb-4">
            "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os homens."
          </blockquote>
          <cite className="text-sm text-gray-500">Colossenses 3:23</cite>
        </div>

        <div className="card bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Edifica v1.0</h3>
          <p className="mb-4">
            Desenvolvido com dedicação para a comunidade de montadores de móveis
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <div>
              <div className="icon-users text-2xl mb-2"></div>
              <p>Para Profissionais</p>
            </div>
            <div>
              <div className="icon-smartphone text-2xl mb-2"></div>
              <p>Mobile Friendly</p>
            </div>
            <div>
              <div className="icon-zap text-2xl mb-2"></div>
              <p>Rápido e Simples</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}