import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: 'ID do usuário é obrigatório' 
      }, { status: 400 })
    }

    // Atualizar status offline
    await query('UPDATE users SET online = 0, lastseen = NOW() WHERE _id = ?', [userId])

    return NextResponse.json({ 
      success: true, 
      message: 'Logout realizado com sucesso!'
    })

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro no servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
