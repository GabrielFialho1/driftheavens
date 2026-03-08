import { NextRequest, NextResponse } from 'next/server'
import { purchaseMarketplaceListing } from '@/lib/marketplace'
import { authenticateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { listingId } = await request.json()

    if (!listingId) {
      return NextResponse.json({ error: 'ID do anúncio não fornecido' }, { status: 400 })
    }

    const result = await purchaseMarketplaceListing(listingId, auth.user.id)

    if (result.success) {
      return NextResponse.json({ message: result.message })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error('Error purchasing marketplace listing:', error)
    return NextResponse.json({ error: 'Erro ao comprar veículo' }, { status: 500 })
  }
}
