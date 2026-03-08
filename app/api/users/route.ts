import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Estrutura da tabela users
    const structure = await query('DESCRIBE users')
    
    // Dados de exemplo
    const sampleData = await query('SELECT * FROM users LIMIT 5')
    
    // Contagem total
    const count = await query('SELECT COUNT(*) as total FROM users')
    
    return NextResponse.json({ 
      success: true, 
      table: 'users',
      structure,
      sampleData,
      totalUsers: (count as any[])[0]?.total || 0
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
