import { NextRequest, NextResponse } from 'next/server'
import { registrationsDB } from '@/lib/registrations-db'
import { tournaments } from '@/lib/tournaments'

// Mock users para referência
const users = [
  { _id: '1', username: 'player1' },
  { _id: '2', username: 'player2' },
  { _id: '3', username: 'player3' },
]

export async function GET() {
  try {
    // Obter todas as inscrições do database compartilhado
    const allRegistrations = registrationsDB.getAll()
    
    // Filtrar apenas inscrições de campeonatos ativos
    const activeTournamentIds = tournaments
      .filter(t => t.isActive)
      .map(t => t.id.toString())

    const enrichedRegistrations = allRegistrations
      .filter(reg => activeTournamentIds.includes(reg.tournamentId.toString()))
      .map(reg => {
        const user = users.find(u => u._id === reg.userId.toString())
        const tournament = tournaments.find(t => t.id.toString() === reg.tournamentId.toString())
        
        return {
          ...reg,
          username: user?.username || 'Unknown',
          tournamentTitle: tournament?.title || 'Unknown Tournament'
        }
      })

    return NextResponse.json({
      success: true,
      registrations: enrichedRegistrations
    })
  } catch {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Adicionar nova inscrição ao mock database
    const newRegistration = {
      id: Date.now().toString(),
      ...body,
      registrationDate: new Date().toISOString()
    }
    
    registrationsDB.add(newRegistration)

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso',
      registration: newRegistration
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Erro ao processar inscrição' },
      { status: 500 }
    )
  }
}
