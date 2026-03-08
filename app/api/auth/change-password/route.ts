import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'
import crypto from 'crypto'

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

function verifyPassword(inputPassword: string, storedHash: string): boolean {
  const inputHash = crypto.createHash('sha256').update(inputPassword).digest('hex')
  return inputHash === storedHash.toLowerCase()
}

export async function POST(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json()

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário pelo ID
    const users = await query('SELECT * FROM users WHERE _id = ?', [userId]) as { _id: number; username: string; password: string; online: number; money: number; playtime: number; skin: number; register_time: string; lastseen: string; xp: number; avatar: number }[]
    
    if (users.length === 0) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const user = users[0]

    // Verificar se a senha atual corresponde
    const isCurrentPasswordValid = verifyPassword(currentPassword, user.password)
    
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Senha atual incorreta' },
        { status: 401 }
      )
    }

    // Hashear a nova senha
    const hashedNewPassword = hashPassword(newPassword)

    // Atualizar no banco de dados
    await query('UPDATE users SET password = ? WHERE _id = ?', [hashedNewPassword, userId])

    return NextResponse.json(
      { message: 'Senha alterada com sucesso!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro ao alterar senha:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
