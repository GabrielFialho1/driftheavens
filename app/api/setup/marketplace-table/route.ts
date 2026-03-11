import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Criar tabela marketplace_listings
    const createTable = await query(`
      CREATE TABLE IF NOT EXISTS marketplace_listings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_id INT NOT NULL,
        seller_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        images JSON,
        listed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('active', 'sold', 'cancelled') DEFAULT 'active',
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(_id) ON DELETE CASCADE,
        FOREIGN KEY (seller_id) REFERENCES users(_id) ON DELETE CASCADE,
        INDEX idx_status (status),
        INDEX idx_vehicle_id (vehicle_id),
        INDEX idx_seller_id (seller_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    console.log('Tabela marketplace_listings criada com sucesso')

    // Verificar se a tabela foi criada
    const tableCheck = await query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'marketplace_listings'
    `) as { TABLE_NAME: string }[]

    // Inserir alguns dados de teste (opcional)
    const sampleVehicles = await query(`
      SELECT _id, owner_id, model FROM vehicles LIMIT 3
    `) as { _id: number; owner_id: number; model: string }[]

    if (sampleVehicles.length > 0) {
      for (const vehicle of sampleVehicles) {
        await query(`
          INSERT INTO marketplace_listings (vehicle_id, seller_id, name, price, description, images, status)
          VALUES (?, ?, ?, ?, ?, ?, 'active')
        `, [
          vehicle._id,
          vehicle.owner_id,
          `${vehicle.model} - Venda`,
          50000 + Math.floor(Math.random() * 50000),
          `Veículo ${vehicle.model} em excelente estado, pouca quilometragem.`,
          JSON.stringify([])
        ])
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Tabela marketplace_listings criada com sucesso',
      tableExists: tableCheck.length > 0,
      sampleDataInserted: sampleVehicles.length
    })

  } catch (error) {
    console.error('Erro ao criar tabela marketplace_listings:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
