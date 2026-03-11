import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Buscar APENAS clans que têm dono definido (não são "clans de membro")
    const clans = await query(`
      SELECT 
        c.tag,
        c.chat_text,
        c.chat_color,
        c.owner,
        u.username as owner_name
      FROM clans c 
      LEFT JOIN users u ON c.owner = u._id 
      WHERE c.owner IS NOT NULL 
        AND c.owner != 'null' 
        AND c.owner != ''
      ORDER BY c.tag
    `)

    // Para cada clan, buscar contagem de membros separadamente
    const clansWithMembers = []
    for (const clan of (clans as any[])) {
      try {
        const memberCount = await query(`
          SELECT COUNT(*) as count
          FROM clan_members 
          WHERE clan_tag = ? AND role = 'member'
        `, [clan.tag])
        
        clansWithMembers.push({
          ...clan,
          members_count: (memberCount as any[])[0]?.count || 0
        })
      } catch (e) {
        // Se não encontrar na tabela clan_members, assume 0 membros
        clansWithMembers.push({
          ...clan,
          members_count: 0
        })
      }
    }

    console.log('GET /api/clans - Clans filtrados:', clansWithMembers)
    return NextResponse.json({ success: true, data: clansWithMembers })
  } catch (error) {
    console.error('Erro ao buscar clans:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar clans' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, tag, chat_text, chat_color } = body

    console.log('POST /api/clans - Dados recebidos:', { userId, tag, chat_text, chat_color })

    if (!userId || !tag) {
      console.log('POST /api/clans - Validação falhou:', { userId: !!userId, tag: !!tag })
      return NextResponse.json(
        { success: false, message: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Verificar se a tag já existe
    const existingTag = await query('SELECT tag FROM clans WHERE tag = ?', [tag])
    if (existingTag && Array.isArray(existingTag) && existingTag.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Esta tag já está em uso!'
      }, { status: 400 })
    }

    // Inserir novo clan na tabela existente
    const insertQuery = `
      INSERT INTO clans (tag, chat_text, owner, chat_color) 
      VALUES (?, ?, ?, ?)
    `
    
    await query(insertQuery, [tag, chat_text || 'Clan criado com sucesso!', userId, chat_color || '#FFFFFF'])

    // Adicionar como líder na tabela clan_members
    try {
      await query(`
        INSERT INTO clan_members (clan_tag, user_id, role) 
        VALUES (?, ?, 'leader')
      `, [tag, userId])
    } catch (e) {
      console.log('Tabela clan_members não existe, criando...')
      // Se a tabela não existe, criar e inserir
      await query(`
        CREATE TABLE IF NOT EXISTS clan_members (
          id INT AUTO_INCREMENT PRIMARY KEY,
          clan_tag VARCHAR(255) NOT NULL,
          user_id INT UNSIGNED NOT NULL,
          role ENUM('leader', 'member') DEFAULT 'member',
          joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_clan_user (clan_tag, user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `)
      
      await query(`
        INSERT INTO clan_members (clan_tag, user_id, role) 
        VALUES (?, ?, 'leader')
      `, [tag, userId])
    }

    // Atualizar o campo Team do usuário
    await query('UPDATE users SET Team = ? WHERE _id = ?', [tag, userId])

    // Buscar o clan recém-criado
    const newClan = await query('SELECT * FROM clans WHERE tag = ?', [tag])

    console.log('POST /api/clans - Clan criado com sucesso:', newClan)
    
    return NextResponse.json({
      success: true,
      message: 'Clan criado com sucesso!',
      clan: newClan
    })
  } catch (error) {
    console.error('Erro ao criar clan:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao criar clan',
        error: errorMessage,
        stack: errorStack
      },
      { status: 500 }
    )
  }
}
