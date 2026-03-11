import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, clanTag, userId } = body

    console.log('API Action - Dados recebidos:', { action, clanTag, userId })

    if (!action || !userId) {
      return NextResponse.json(
        { success: false, message: 'Parâmetros obrigatórios faltando' },
        { status: 400 }
      )
    }

    let result
    if (action === 'join') {
      if (!clanTag) {
        return NextResponse.json(
          { success: false, message: 'Tag do clan é obrigatória' },
          { status: 400 }
        )
      }

      // Verificar se o clan existe
      const clan = await query('SELECT * FROM clans WHERE tag = ?', [clanTag])
      if (!clan || !Array.isArray(clan) || clan.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Clan não encontrado!' },
          { status: 404 }
        )
      }

      // Verificar se usuário já é dono de algum clan
      const existingOwner = await query('SELECT tag FROM clans WHERE owner = ?', [userId])
      if (existingOwner && Array.isArray(existingOwner) && existingOwner.length > 0) {
        return NextResponse.json(
          { success: false, message: 'Você já é dono de um clan!' },
          { status: 400 }
        )
      }

      // Simular solicitação de entrada (em um sistema real, você adicionaria à tabela de solicitações)
      result = {
        success: true,
        message: 'Solicitação de entrada enviada com sucesso! Aguarde aprovação do dono.'
      }

    } else if (action === 'leave') {
      // Verificar se usuário é dono de algum clan
      const existingOwner = await query('SELECT tag FROM clans WHERE owner = ?', [userId])
      if (existingOwner && Array.isArray(existingOwner) && existingOwner.length > 0) {
        return NextResponse.json(
          { success: false, message: 'Dono do clan não pode sair! Transfira a propriedade primeiro.' },
          { status: 400 }
        )
      }

      result = {
        success: true,
        message: 'Você saiu do clan com sucesso!'
      }
    } else {
      return NextResponse.json(
        { success: false, message: 'Ação inválida' },
        { status: 400 }
      )
    }

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Erro na ação de clan:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao processar ação do clan' },
      { status: 500 }
    )
  }
}
