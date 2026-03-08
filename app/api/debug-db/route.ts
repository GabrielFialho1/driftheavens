import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
  try {
    // Testa diferentes configurações de conexão
    const configs = [
      { user: 'root', password: '', message: 'Root sem senha' },
      { user: '', password: '', message: 'Usuário vazio' },
      { user: 'root', password: 'root', message: 'Root com senha root' }
    ]

    const results = []

    for (const config of configs) {
      try {
        const connection = await mysql.createConnection({
          host: 'localhost',
          port: 3306,
          user: config.user,
          password: config.password,
          database: 'drift_heavens'
        })
        
        await connection.execute('SELECT 1')
        await connection.end()
        
        results.push({
          config: config.message,
          success: true,
          details: `Usuário: ${config.user || '(vazio)'}`
        })
      } catch (error) {
        results.push({
          config: config.message,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      results 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
