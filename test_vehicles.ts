import { query } from './lib/database'

async function testVehiclesQuery() {
  try {
    console.log('Testando consulta de veículos...')
    
    // Primeiro, vamos ver todos os veículos na tabela
    const allVehicles = await query('SELECT * FROM vehicles LIMIT 10')
    console.log('Todos os veículos (limit 10):', allVehicles)
    
    // Agora vamos ver os usuários para verificar IDs
    const users = await query('SELECT _id, username FROM users LIMIT 5')
    console.log('Usuários:', users)
    
    // Testar consulta específica para owner_id
    const testUserId = 1 // Ajuste conforme necessário
    const userVehicles = await query('SELECT * FROM vehicles WHERE owner_id = ?', [testUserId])
    console.log(`Veículos do usuário ${testUserId}:`, userVehicles)
    
    // Verificar estrutura da tabela
    const tableStructure = await query('DESCRIBE vehicles')
    console.log('Estrutura da tabela vehicles:', tableStructure)
    
  } catch (error) {
    console.error('Erro na consulta:', error)
  }
}

testVehiclesQuery()
