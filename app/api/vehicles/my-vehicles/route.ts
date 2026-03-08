import { NextRequest, NextResponse } from 'next/server'
import { getUserVehicles } from '@/lib/vehicles_simple'
import { authenticateToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const vehicles = await getUserVehicles(auth.user.id)
    
    return NextResponse.json({ vehicles })
  } catch (error) {
    console.error('Error fetching user vehicles:', error)
    return NextResponse.json({ error: 'Erro ao buscar veículos' }, { status: 500 })
  }
}
