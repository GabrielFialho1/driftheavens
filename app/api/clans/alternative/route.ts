import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Tentar buscar da tabela que aparece na imagem (possivelmente com estrutura diferente)
    const clansData = await query(`
      SELECT tag, chat_text as name, owner as leader_id, chat_color as description
      FROM clans
      LIMIT 10
    `)

    // Se não funcionar, tentar da estrutura padrão
    if (!Array.isArray(clansData) || clansData.length === 0) {
      const standardClans = await query(`
        SELECT 
          c.*,
          u.username as leader_username,
          u.avatar as leader_avatar
        FROM clans c
        LEFT JOIN users u ON c.leader_id = u._id
        WHERE c.is_active = 1
        ORDER BY c.experience DESC, c.created_at ASC
        LIMIT 10
      `)

      return NextResponse.json({ 
        success: true, 
        message: 'Dados da estrutura padrão',
        data: standardClans,
        source: 'standard_structure'
      })
    }

    // Buscar informações do líder (owner)
    const clansWithLeaders = await Promise.all(
      (clansData as any[]).map(async (clan) => {
        const leaderInfo = await query(
          'SELECT username, avatar FROM users WHERE _id = ?',
          [clan.leader_id]
        ) as any[]

        return {
          id: clan.tag, // Usar tag como ID temporário
          name: clan.name,
          tag: clan.tag,
          description: clan.description,
          leader_id: clan.leader_id,
          leader_username: leaderInfo[0]?.username,
          leader_avatar: leaderInfo[0]?.avatar || 0,
          members_count: 1, // Padrão
          max_members: 50, // Padrão
          level: 1, // Padrão
          experience: 0, // Padrão
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })
    )

    return NextResponse.json({ 
      success: true, 
      message: 'Dados da estrutura alternativa',
      data: clansWithLeaders,
      source: 'alternative_structure',
      originalData: clansData
    })
  } catch (error) {
    console.error('Erro na busca alternativa:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao buscar clans',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
