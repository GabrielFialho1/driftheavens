import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { currentTag, newTag, chat_text, chat_color, userId } = body

    console.log('API Update - Dados recebidos:', { currentTag, newTag, chat_text, chat_color, userId })

    if (!currentTag || !userId) {
      return NextResponse.json(
        { success: false, message: 'Parâmetros obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Verificar se o usuário é dono do clan
    const clan = await query('SELECT * FROM clans WHERE tag = ? AND owner = ?', [currentTag, userId])
    if (!clan || !Array.isArray(clan) || clan.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Você não é dono deste clan!' },
        { status: 403 }
      )
    }

    // Se a tag foi alterada, verificar se a nova tag já existe
    if (newTag !== currentTag) {
      const existingTag = await query('SELECT tag FROM clans WHERE tag = ?', [newTag])
      if (existingTag && Array.isArray(existingTag) && existingTag.length > 0) {
        return NextResponse.json(
          { success: false, message: 'Esta tag já está em uso!' },
          { status: 400 }
        )
      }
    }

    // Atualizar o clan
    const updateQuery = `
      UPDATE clans 
      SET tag = ?, chat_text = ?, chat_color = ? 
      WHERE tag = ? AND owner = ?
    `
    
    await query(updateQuery, [newTag, chat_text, chat_color, currentTag, userId])

    // Buscar o clan atualizado
    const updatedClan = await query(`
      SELECT c.*, u.username as owner_name 
      FROM clans c 
      LEFT JOIN users u ON c.owner = u._id 
      WHERE c.tag = ?
    `, [newTag])

    console.log('API Update - Clan atualizado:', updatedClan)
    
    return NextResponse.json({
      success: true,
      message: 'Clan atualizado com sucesso!',
      clan: updatedClan?.[0]
    })

  } catch (error) {
    console.error('Erro ao atualizar clan:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao atualizar clan',
      error: (error as Error).message
    }, { status: 500 })
  }
}
