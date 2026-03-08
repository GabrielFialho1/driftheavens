import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Estrutura da tabela vehicles
    const structure = await query('DESCRIBE vehicles')
    
    // Dados de exemplo
    const sampleData = await query('SELECT * FROM vehicles LIMIT 5')
    
    // Contagem total
    const count = await query('SELECT COUNT(*) as total FROM vehicles')
    
    return NextResponse.json({ 
      success: true, 
      table: 'vehicles',
      structure,
      sampleData,
      totalVehicles: (count as any[])[0]?.total || 0
    })
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
