import { NextRequest, NextResponse } from 'next/server'
import { getUserVehicles } from '@/lib/vehicles_simple'
import { authenticateToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    console.log('=== API my-vehicles ===')
    console.log('Headers:', Object.fromEntries(request.headers.entries()))
    
    const auth = await authenticateToken(request)
    
    console.log('Auth result:', auth)
    
    if (!auth?.user) {
      console.log('Não autorizado - auth ou user está faltando')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    console.log('Buscando veículos para o usuário:', auth.user.id)
    const vehicles = await getUserVehicles(auth.user.id)
    
    console.log('Veículos encontrados:', vehicles.length)
    console.log('Dados dos veículos:', vehicles)
    
    return NextResponse.json({ vehicles })
  } catch (error) {
    console.error('Error fetching user vehicles:', error)
    return NextResponse.json({ error: 'Erro ao buscar veículos' }, { status: 500 })
  }
}
