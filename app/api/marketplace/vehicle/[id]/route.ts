import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'
import { authenticateToken } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const vehicleId = parseInt(resolvedParams.id)
    
    // Verificar se o veículo está no marketplace
    const listing = await query(
      'SELECT id, price, name FROM marketplace_listings WHERE vehicle_id = ? AND seller_id = ? AND status = "active"',
      [vehicleId, auth.user.id]
    ) as { id: number; price: number; name: string }[]

    const isListed = listing && listing.length > 0
    
    return NextResponse.json({
      isListed,
      listing: isListed ? listing[0] : null
    })
  } catch (error) {
    console.error('Error checking vehicle listing status:', error)
    return NextResponse.json({ error: 'Erro ao verificar status do veículo' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const vehicleId = parseInt(resolvedParams.id)
    
    // Remover veículo do marketplace
    const result = await query(
      'UPDATE marketplace_listings SET status = "cancelled" WHERE vehicle_id = ? AND seller_id = ? AND status = "active"',
      [vehicleId, auth.user.id]
    ) as { affectedRows: number }

    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'Veículo removido do marketplace com sucesso!' })
    } else {
      return NextResponse.json({ error: 'Veículo não encontrado ou não pertence a você' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error removing vehicle from marketplace:', error)
    return NextResponse.json({ error: 'Erro ao remover veículo do marketplace' }, { status: 500 })
  }
}
