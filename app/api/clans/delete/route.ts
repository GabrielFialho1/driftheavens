import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tag, userId } = body

    console.log('API Delete - Dados recebidos:', { tag, userId })

    if (!tag || !userId) {
      return NextResponse.json(
        { success: false, message: 'Parâmetros obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Verificar se o usuário é dono do clan
    const clan = await query('SELECT * FROM clans WHERE tag = ? AND owner = ?', [tag, userId])
    if (!clan || !Array.isArray(clan) || clan.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Você não é dono deste clan!' },
        { status: 403 }
      )
    }

    // Excluir o clan
    await query('DELETE FROM clans WHERE tag = ? AND owner = ?', [tag, userId])

    console.log('API Delete - Clan excluído:', tag)
    
    return NextResponse.json({
      success: true,
      message: 'Clan excluído com sucesso!'
    })

  } catch (error) {
    console.error('Erro ao excluir clan:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao excluir clan',
      error: (error as Error).message
    }, { status: 500 })
  }
}
