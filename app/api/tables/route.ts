import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Lista todas as tabelas do banco
    const tables = await query('SHOW TABLES')
    
    return NextResponse.json({ 
      success: true, 
      tables 
    })
  } catch (error) {
    console.error('Error fetching tables:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro ao buscar tabelas',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
