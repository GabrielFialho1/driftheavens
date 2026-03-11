import { query } from '@/lib/database'

export async function syncAutoIncrement() {
  try {
    // Verificar último ID existente
    const lastUserResult = await query('SELECT _id FROM users ORDER BY _id DESC LIMIT 1')
    const lastId = (lastUserResult as any[])[0]?._id || 0
    
    // Verificar AUTO_INCREMENT atual
    const currentStatus = await query('SHOW TABLE STATUS LIKE "users"')
    const currentAutoIncrement = (currentStatus as any[])[0]?.Auto_increment
    
    // Calcular próximo ID correto
    const nextCorrectId = lastId + 1
    
    // Ajustar se necessário
    if (currentAutoIncrement !== nextCorrectId) {
      await query('ALTER TABLE users AUTO_INCREMENT = ?', [nextCorrectId])
      console.log(`AUTO_INCREMENT ajustado de ${currentAutoIncrement} para ${nextCorrectId}`)
    }
    
    return nextCorrectId
  } catch (error) {
    console.error('Erro ao sincronizar AUTO_INCREMENT:', error)
    return null
  }
}
