import { NextRequest, NextResponse } from 'next/server'
import { listVehicleForSale, removeVehicleFromSale } from '@/lib/vehicles'
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

    const success = await listVehicleForSale(vehicleId, price, auth.user.id)
    
    if (success) {
      return NextResponse.json({ message: 'Veículo colocado à venda com sucesso!' })
    } else {
      return NextResponse.json({ error: 'Não foi possível colocar o veículo à venda' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error listing vehicle for sale:', error)
    return NextResponse.json({ error: 'Erro ao listar veículo para venda' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const vehicleId = searchParams.get('vehicleId')

    if (!vehicleId) {
      return NextResponse.json({ error: 'ID do veículo não fornecido' }, { status: 400 })
    }

    const success = await removeVehicleFromSale(Number(vehicleId), auth.user.id)
    
    if (success) {
      return NextResponse.json({ message: 'Veículo removido da venda com sucesso!' })
    } else {
      return NextResponse.json({ error: 'Não foi possível remover o veículo da venda' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error removing vehicle from sale:', error)
    return NextResponse.json({ error: 'Erro ao remover veículo da venda' }, { status: 500 })
  }
}
