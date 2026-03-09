import { NextRequest, NextResponse } from 'next/server'
import { registrationsDB, RegistrationData } from '@/lib/registrations-db'

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationData = await request.json()

    // Validação básica
    if (!body.tournamentId || !body.userId || !body.nickInGame || !body.carModel) {
      return NextResponse.json(
        { message: 'Dados obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Verificar se usuário já está inscrito neste torneio
    const existingRegistration = registrationsDB.getAll().find(
      reg => reg.tournamentId === body.tournamentId && reg.userId === body.userId
    )

    if (existingRegistration) {
      return NextResponse.json(
        { message: 'Você já está inscrito neste campeonato' },
        { status: 409 }
      )
    }

    // Simular verificação se o torneio está ativo
    // Em um projeto real, você verificaria no banco de dados
    const activeTournaments = [1] // IDs dos torneios ativos (números para corresponder aos IDs dos torneios)
    if (!activeTournaments.includes(parseInt(body.tournamentId))) {
      return NextResponse.json(
        { message: 'Este campeonato não está mais aceitando inscrições' },
        { status: 403 }
      )
    }

    // Criar nova inscrição
    const newRegistration: RegistrationData = {
      ...body,
      id: registrationsDB.getAll().length + 1,
      registrationDate: new Date().toISOString()
    }

    registrationsDB.add(newRegistration)

    // Simular envio de confirmação

    return NextResponse.json(
      { 
        message: 'Inscrição realizada com sucesso!',
        registration: newRegistration
      },
      { status: 201 }
    )

  } catch (_error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tournamentId = searchParams.get('tournamentId')
    const userId = searchParams.get('userId')

    let filteredRegistrations = registrationsDB.getAll()

    if (tournamentId) {
      filteredRegistrations = filteredRegistrations.filter(reg => reg.tournamentId === tournamentId)
    }

    if (userId) {
      filteredRegistrations = filteredRegistrations.filter(reg => reg.userId === userId)
    }

    return NextResponse.json({
      registrations: filteredRegistrations,
      total: filteredRegistrations.length
    })

  } catch (_error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
