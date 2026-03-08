import { query } from './database'

export async function getUserVehicles(userId: number): Promise<any[]> {
  try {
    // Buscar todos os veículos do usuário
    const sql = 'SELECT * FROM vehicles WHERE owner_id = ? ORDER BY _id DESC'
    const results = await query(sql, [userId])
    
    return results as any[]
  } catch (error) {
    console.error('Erro em getUserVehicles:', error)
    return []
  }
}

export async function getVehiclesForSale(): Promise<any[]> {
  try {
    // Por enquanto, retorna array vazio até criarmos sistema de marketplace
    // Quando um veículo for colocado à venda, vamos adicioná-lo a uma tabela separada
    
    // TODO: Criar tabela vehicle_listings com:
    // - vehicle_id (referência para vehicles._id)
    // - seller_id (referência para users._id) 
    // - price
    // - listed_at
    
    return []
  } catch (error) {
    console.error('Erro em getVehiclesForSale:', error)
    return []
  }
}

export async function listVehicleForSale(
  vehicleId: number, 
  price: number, 
  userId: number
): Promise<{ success: boolean; message: string }> {
  try {
    // TODO: Implementar quando criarmos a tabela vehicle_listings
    // Por agora, vamos apenas simular sucesso
    
    return { 
      success: true, 
      message: 'Funcionalidade de marketplace será implementada em breve!' 
    }
  } catch (error) {
    console.error('Erro em listVehicleForSale:', error)
    return { success: false, message: 'Erro ao listar veículo' }
  }
}

export async function purchaseVehicle(
  vehicleId: number, 
  buyerId: number, 
  price: number
): Promise<{ success: boolean; message: string }> {
  try {
    // TODO: Implementar quando tivermos marketplace funcional
    return { 
      success: false, 
      message: 'Marketplace não está ativo ainda' 
    }
  } catch (error) {
    console.error('Erro em purchaseVehicle:', error)
    return { success: false, message: 'Erro ao comprar veículo' }
  }
}

export async function removeVehicleFromSale(vehicleId: number, userId: number): Promise<boolean> {
  try {
    // TODO: Implementar quando criarmos a tabela vehicle_listings
    return true
  } catch (error) {
    console.error('Erro em removeVehicleFromSale:', error)
    return false
  }
}
