import { query } from './lib/database'

async function quickTest() {
  try {
    console.log('=== Teste Rápido de Veículos ===')
    
    // 1. Verificar estrutura da tabela
    const structure = await query('DESCRIBE vehicles')
    console.log('Colunas da tabela vehicles:', (structure as any[]).map(col => col.Field))
    
    // 2. Verificar todos os veículos
    const allVehicles = await query('SELECT * FROM vehicles LIMIT 3')
    console.log('Sample de veículos:', allVehicles)
    
    // 3. Verificar usuários
    const users = await query('SELECT _id, username FROM users LIMIT 3')
    console.log('Sample de usuários:', users)
    
  } catch (error) {
    console.error('Erro:', error)
  }
}

quickTest()
