import { query } from './database'
import { Vehicle } from '@/types/database'

export async function getUserVehicles(userId: number): Promise<Vehicle[]> {
  try {
    console.log('Buscando veículos para o usuário ID:', userId)
    
    // Verificar estrutura da tabela primeiro
    const structure = await query('DESCRIBE vehicles') as any[]
    console.log('Estrutura da tabela vehicles:', structure.map(col => col.Field))
    
    // Buscar veículos do usuário usando owner_id (baseado na imagem)
    const sql = 'SELECT * FROM vehicles WHERE owner_id = ? ORDER BY id DESC'
    const results = await query(sql, [userId]) as Vehicle[]
    console.log('Resultados com owner_id:', results.length, 'veículos')
    console.log('Veículos encontrados:', results)
    
    // Se não encontrar com owner_id, tentar com outros nomes possíveis
    if (results.length === 0) {
      console.log('Tentando outros nomes de coluna...')
      
      const sql2 = 'SELECT * FROM vehicles WHERE user_id = ? ORDER BY id DESC'
      const results2 = await query(sql2, [userId]) as Vehicle[]
      console.log('Resultados com user_id:', results2.length, 'veículos')
      
      if (results2.length > 0) {
        return results2
      }
    }
    
    return results
  } catch (error) {
    console.error('Erro em getUserVehicles:', error)
    return []
  }
}

export async function getVehiclesForSale(): Promise<Vehicle[]> {
  // Por enquanto, retorna todos os veículos até criarmos as colunas for_sale
  const sql = `
    SELECT v.*, u.username as seller_name 
    FROM vehicles v 
    LEFT JOIN users u ON v.owner_id = u._id 
    ORDER BY v._id DESC
  `
  const results = await query(sql) as any[]
  return results
}

export async function listVehicleForSale(
  vehicleId: number, 
  price: number, 
  userId: number
): Promise<boolean> {
  const sql = `
    UPDATE vehicles 
    SET for_sale = 1, price = ?, listed_at = NOW() 
    WHERE id = ? AND owner_id = ?
  `
  const result = await query(sql, [price, vehicleId, userId])
  return (result as any).affectedRows > 0
}

export async function purchaseVehicle(
  vehicleId: number, 
  buyerId: number, 
  price: number
): Promise<{ success: boolean; message: string }> {
  const connection = await (await import('./database')).getConnection()
  
  try {
    await connection.beginTransaction()
    
    // Get vehicle and seller info
    const [vehicleResult] = await connection.execute(
      'SELECT * FROM vehicles WHERE id = ? AND for_sale = 1',
      [vehicleId]
    ) as any[]
    
    if (!vehicleResult.length) {
      throw new Error('Veículo não encontrado ou não está à venda')
    }
    
    const vehicle = vehicleResult[0]
    const sellerId = vehicle.owner_id
    
    if (sellerId === buyerId) {
      throw new Error('Você não pode comprar seu próprio veículo')
    }
    
    // Check buyer has enough money
    const [buyerResult] = await connection.execute(
      'SELECT money FROM users WHERE _id = ?',
      [buyerId]
    ) as any[]
    
    if (!buyerResult.length || buyerResult[0].money < price) {
      throw new Error('Saldo insuficiente')
    }
    
    // Transfer money
    await connection.execute(
      'UPDATE users SET money = money - ? WHERE _id = ?',
      [price, buyerId]
    )
    
    await connection.execute(
      'UPDATE users SET money = money + ? WHERE _id = ?',
      [price, sellerId]
    )
    
    // Transfer vehicle ownership
    await connection.execute(
      'UPDATE vehicles SET owner_id = ?, for_sale = 0, price = NULL, listed_at = NULL WHERE id = ?',
      [buyerId, vehicleId]
    )
    
    await connection.commit()
    
    return { success: true, message: 'Veículo comprado com sucesso!' }
    
  } catch (error) {
    await connection.rollback()
    return { success: false, message: (error as Error).message }
  } finally {
    connection.release()
  }
}

export async function removeVehicleFromSale(vehicleId: number, userId: number): Promise<boolean> {
  const sql = `
    UPDATE vehicles 
    SET for_sale = 0, price = NULL, listed_at = NULL 
    WHERE id = ? AND owner_id = ?
  `
  const result = await query(sql, [vehicleId, userId])
  return (result as any).affectedRows > 0
}
