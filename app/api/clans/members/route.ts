import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clanTag = searchParams.get('clanTag')
    
    console.log('API /api/clans/members - Buscando membros do clan:', clanTag)
    
    if (!clanTag) {
      return NextResponse.json({
        success: false,
        message: 'Tag do clan não fornecida'
      }, { status: 400 })
    }

    // Buscar membros do clan na tabela clan_members
    let members = []
    try {
      members = await query(`
        SELECT u._id, u.username 
        FROM clan_members cm
        JOIN users u ON cm.user_id = u._id
        WHERE cm.clan_tag = ?
        ORDER BY cm.joined_at ASC
      `, [clanTag])
      console.log('Membros encontrados na clan_members:', members)
    } catch (e) {
      console.log('Erro ao buscar clan_members (tabela pode não existir):', e)
      // Se a tabela não existir, buscar apenas o owner
    }

    // Buscar também o owner para incluir na lista
    let ownerResult = []
    try {
      ownerResult = await query(`
        SELECT u._id, u.username 
        FROM clans c
        JOIN users u ON c.owner = u._id
        WHERE c.tag = ?
      `, [clanTag])
      console.log('Owner encontrado:', ownerResult)
    } catch (e) {
      console.log('Erro ao buscar owner:', e)
      return NextResponse.json({
        success: false,
        message: 'Erro ao buscar dados do clan',
        error: e instanceof Error ? e.message : 'Unknown error'
      }, { status: 500 })
    }

    const allMembers = []
    
    // Adicionar o owner primeiro
    if (ownerResult && Array.isArray(ownerResult) && ownerResult.length > 0) {
      allMembers.push(ownerResult[0])
    }
    
    // Adicionar os membros
    if (members && Array.isArray(members)) {
      allMembers.push(...members)
    }

    console.log('Total de membros retornados:', allMembers.length)

    return NextResponse.json({
      success: true,
      data: allMembers,
      count: allMembers.length
    })

  } catch (error) {
    console.error('Erro geral na API de membros:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar membros do clan',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
