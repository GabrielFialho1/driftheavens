import { query } from './database'

export interface MarketplaceListing {
  id: number
  vehicle_id: number
  seller_id: number
  name: string
  price: number
  description: string
  images: string
  listed_at: string
  status: 'active' | 'sold' | 'cancelled'
}

export async function createMarketplaceListing(
  vehicleId: number,
  sellerId: number,
  name: string,
  price: number,
  description: string,
  images: string[]
): Promise<{ success: boolean; message: string }> {
  try {
    // Primeiro, verificar se o veículo existe e pertence ao usuário
    const vehicleCheckResult = await query(
      'SELECT _id FROM vehicles WHERE _id = ? AND owner_id = ?',
      [vehicleId, sellerId]
    ) as { _id: number }[]

    // Verificação mais robusta
    if (!vehicleCheckResult || vehicleCheckResult.length === 0) {
      return { success: false, message: 'Veículo não encontrado ou não pertence a você' }
    }

    // Verificar se já não está à venda
    const existingListing = await query(
      'SELECT id FROM marketplace_listings WHERE vehicle_id = ? AND status = "active"',
      [vehicleId]
    ) as { id: number }[]

    if (existingListing && existingListing.length > 0) {
      return { success: false, message: 'Este veículo já está à venda' }
    }

    // Inserir novo anúncio
    const result = await query(
      'INSERT INTO marketplace_listings (vehicle_id, seller_id, name, price, description, images, listed_at, status) VALUES (?, ?, ?, ?, ?, ?, NOW(), "active")',
      [vehicleId, sellerId, name, price, description, JSON.stringify(images)]
    ) as { insertId: number; affectedRows: number }

    if (result.affectedRows > 0) {
      return { success: true, message: 'Veículo colocado à venda com sucesso!' }
    } else {
      return { success: false, message: 'Erro ao criar anúncio' }
    }

  } catch (error) {
    console.error('Error creating marketplace listing:', error)
    return { success: false, message: 'Erro ao colocar veículo à venda' }
  }
}

export async function getMarketplaceListings(): Promise<(MarketplaceListing & { model: string; mileage: number; seller_name: string })[]> {
  try {
    const sql = `
      SELECT 
        ml.*,
        v.model,
        v.mileage,
        v.stickers,
        u.username as seller_name
      FROM marketplace_listings ml
      JOIN vehicles v ON ml.vehicle_id = v._id
      JOIN users u ON ml.seller_id = u._id
      WHERE ml.status = 'active'
      ORDER BY ml.listed_at DESC
    `
    
    const listings = await query(sql) as (MarketplaceListing & { model: string; mileage: number; seller_name: string })[]
    
    // Parse images JSON
    return listings.map(listing => ({
      ...listing,
      images: JSON.parse(listing.images || '[]')
    }))
  } catch (error) {
    console.error('Error fetching marketplace listings:', error)
    return []
  }
}

export async function purchaseMarketplaceListing(
  listingId: number,
  buyerId: number
): Promise<{ success: boolean; message: string }> {
  try {
    // Get listing details
    const listing = await query(
      'SELECT * FROM marketplace_listings WHERE id = ? AND status = "active"',
      [listingId]
    ) as MarketplaceListing[]
    
    if (!listing.length) {
      throw new Error('Anúncio não encontrado ou não está mais disponível')
    }
    
    const sellerId = listing[0].seller_id
    const price = listing[0].price
    const vehicleId = listing[0].vehicle_id
    
    if (sellerId === buyerId) {
      throw new Error('Você não pode comprar seu próprio veículo')
    }
    
    // Check buyer has enough money
    const buyerResult = await query(
      'SELECT money FROM users WHERE _id = ?',
      [buyerId]
    ) as { money: number }[]
    
    if (!buyerResult || buyerResult.length === 0 || buyerResult[0].money < price) {
      throw new Error('Saldo insuficiente')
    }
    
    // Transfer money
    await query(
      'UPDATE users SET money = money - ? WHERE _id = ?',
      [price, buyerId]
    )
    
    await query(
      'UPDATE users SET money = money + ? WHERE _id = ?',
      [price, sellerId]
    )
    
    // Transfer vehicle ownership
    await query(
      'UPDATE vehicles SET owner_id = ? WHERE _id = ?',
      [buyerId, vehicleId]
    )
    
    // Update listing status
    await query(
      'UPDATE marketplace_listings SET status = "sold" WHERE id = ?',
      [listingId]
    )
    
    return { success: true, message: 'Veículo comprado com sucesso!' }
    
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export async function removeMarketplaceListing(
  listingId: number,
  sellerId: number
): Promise<{ success: boolean; message: string }> {
  try {
    const result = await query(
      'UPDATE marketplace_listings SET status = "cancelled" WHERE id = ? AND seller_id = ? AND status = "active"',
      [listingId, sellerId]
    ) as { affectedRows: number }
    
    if (result.affectedRows > 0) {
      return { success: true, message: 'Anúncio removido com sucesso!' }
    } else {
      return { success: false, message: 'Anúncio não encontrado ou não pertence a você' }
    }
  } catch (error) {
    console.error('Error removing marketplace listing:', error)
    return { success: false, message: 'Erro ao remover anúncio' }
  }
}
