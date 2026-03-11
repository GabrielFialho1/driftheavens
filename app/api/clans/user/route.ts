import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(request: Request) {
  try {
    // Pegar ID do usuário logado da sessão
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'ID do usuário não fornecido'
      }, { status: 400 })
    }

    // Verificar se o usuário tem um clan
    const userClan = await query(`
      SELECT c.*, u.username as owner_name 
      FROM clans c 
      LEFT JOIN users u ON c.owner = u._id 
      WHERE c.owner = ?
    `, [userId])

    if (userClan && Array.isArray(userClan) && userClan.length > 0) {
      return NextResponse.json({
        success: true,
        data: userClan[0]
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Usuário não possui clan'
      })
    }

  } catch (error) {
    console.error('Erro ao verificar clan do usuário:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao verificar clan do usuário'
    }, { status: 500 })
  }
}
