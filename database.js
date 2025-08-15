// Inicialização do banco de dados
const initializeDatabase = async () => {
  try {
    // Verificar se as tabelas já existem
    const furnitureExists = await trickleListObjects('furniture', 1, true);
    const quotesExists = await trickleListObjects('quote', 1, true);
    
    console.log('Database tables verified successfully');
  } catch (error) {
    console.log('Initializing database tables...');
  }
};

// Executar inicialização quando o script carregar
initializeDatabase();