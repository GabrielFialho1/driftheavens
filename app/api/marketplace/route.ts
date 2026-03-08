import { NextRequest, NextResponse } from 'next/server'
import { getMarketplaceListings } from '@/lib/marketplace'

export async function GET(request: NextRequest) {
  try {
    const listings = await getMarketplaceListings()
    
    return NextResponse.json({ listings })
  } catch (error) {
    console.error('Error fetching marketplace listings:', error)
    return NextResponse.json({ error: 'Erro ao buscar anúncios' }, { status: 500 })
  }
}
