import { NextRequest, NextResponse } from 'next/server'
import { purchaseVehicle } from '@/lib/vehicles'
import { authenticateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { vehicleId, price } = await request.json()

    if (!vehicleId || !price || price <= 0) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    const result = await purchaseVehicle(vehicleId, auth.user.id, price)
    
    if (result.success) {
      return NextResponse.json({ message: result.message })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error('Error purchasing vehicle:', error)
    return NextResponse.json({ error: 'Erro ao comprar veículo' }, { status: 500 })
  }
}
