import { NextRequest, NextResponse } from 'next/server'
import { createMarketplaceListing } from '@/lib/marketplace'
import { authenticateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { vehicleId, name, price, description, images } = body

    if (!vehicleId || !name || !price || !description) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    const result = await createMarketplaceListing(
      vehicleId,
      auth.user.id,
      name,
      price,
      description,
      images || []
    )

    if (result.success) {
      return NextResponse.json({ message: result.message })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error('Error creating marketplace listing:', error)
    return NextResponse.json({ error: 'Erro ao criar anúncio' }, { status: 500 })
  }
}
