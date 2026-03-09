import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'
import { requireAuth } from '@/lib/auth'

async function getUserByIdHandler(
  request: NextRequest, 
  authContext: { user: { id: number; username: string } },
  params: { id: string }
) {
  try {
    const requestedUserId = params.id

    if (!requestedUserId) {
      return NextResponse.json({ 
        success: false, 
        message: 'ID do usuário é obrigatório' 
      }, { status: 400 })
    }

    // Verificar se o usuário autenticado está solicitando seus próprios dados
    if (authContext.user.id.toString() !== requestedUserId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Acesso não autorizado' 
      }, { status: 403 })
    }

    // Buscar usuário atualizado no banco
    const users = await query('SELECT * FROM users WHERE _id = ?', [requestedUserId]) as Array<{_id: number, username: string, email: string, password: string, online: number, lastseen: string}>
    
    if (users.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Usuário não encontrado' 
      }, { status: 404 })
    }

    const user = users[0]

    // Retornar dados do usuário (sem senha)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user

    return NextResponse.json({ 
      success: true, 
      user: userWithoutPassword
    })

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Erro no servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAuth((req, authContext) => getUserByIdHandler(req, authContext, params))(request)
}
