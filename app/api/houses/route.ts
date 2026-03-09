import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Estrutura da tabela houses
    const structure = await query('DESCRIBE houses')
    
    // Dados de exemplo
    const sampleData = await query('SELECT * FROM houses LIMIT 5')
    
    // Contagem total
    const count = await query('SELECT COUNT(*) as total FROM houses')
    
    return NextResponse.json({ 
      success: true, 
      table: 'houses',
      structure,
      sampleData,
      totalHouses: (count as { total: number }[])[0]?.total || 0
    })
  } catch (error) {
    console.error('Error fetching houses:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
