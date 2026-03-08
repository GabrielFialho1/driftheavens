import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const { tableName } = await request.json()
    
    if (!tableName) {
      // Lista todas as tabelas
      const tables = await query('SHOW TABLES')
      return NextResponse.json({ success: true, tables })
    }
    
    // Mostra estrutura da tabela específica
    const structure = await query(`DESCRIBE ${tableName}`)
    const sampleData = await query(`SELECT * FROM ${tableName} LIMIT 5`)
    
    return NextResponse.json({ 
      success: true, 
      tableName,
      structure,
      sampleData 
    })
  } catch (error) {
    console.error('Error exploring database:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
