import { NextRequest, NextResponse } from 'next/server'
import { getVehiclesForSale } from '@/lib/vehicles_simple'

export async function GET(request: NextRequest) {
  try {
    console.log('=== API marketplace ===')
    const vehicles = await getVehiclesForSale()
    
    console.log('Veículos à venda:', vehicles.length)
    
    return NextResponse.json({ vehicles })
  } catch (error) {
    console.error('Error fetching vehicles for sale:', error)
    return NextResponse.json({ error: 'Erro ao buscar veículos à venda' }, { status: 500 })
  }
}
