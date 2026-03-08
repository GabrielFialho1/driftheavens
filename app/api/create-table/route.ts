import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS marketplace_listings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_id INT NOT NULL,
        seller_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT NOT NULL,
        images JSON,
        listed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('active', 'sold', 'cancelled') DEFAULT 'active',
        
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(_id) ON DELETE CASCADE,
        FOREIGN KEY (seller_id) REFERENCES users(_id) ON DELETE CASCADE,
        
        INDEX idx_status (status),
        INDEX idx_seller (seller_id),
        INDEX idx_listed_at (listed_at)
      )
    `;
    
    await query(sql);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tabela marketplace_listings criada com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
