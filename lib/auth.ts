import { NextRequest, NextResponse } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = 'your-secret-key-change-in-production'

export async function authenticateToken(request: NextRequest): Promise<{ user: { id: number; username: string } } | null> {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { id: number; username: string }
    
    return {
      user: {
        id: decoded.id,
        username: decoded.username
      }
    }
  } catch {
    return null
  }
}

export function requireAuth(handler: (req: NextRequest, context: { user: { id: number; username: string } }) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const auth = await authenticateToken(request)
    
    if (!auth?.user) {
      return NextResponse.json(
        { success: false, message: 'Autenticação necessária' },
        { status: 401 }
      )
    }

    return handler(request, auth)
  }
}

export function generateToken(user: { id: number; username: string }): string {
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}
