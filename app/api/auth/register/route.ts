import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'
import { User } from '@/types/database'
import { syncAutoIncrement } from '@/lib/autoIncrement'
import crypto from 'crypto'

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Usuário e senha são obrigatórios' 
      }, { status: 400 })
    }

    // Verificar se usuário já existe
    const existingUsers = await query('SELECT username FROM users WHERE username = ?', [username]) as Pick<User, 'username'>[]
    
    if (existingUsers.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Este usuário já está em uso' 
      }, { status: 409 })
    }

    // Validar tamanho do usuário
    if (username.length > 25) {
      return NextResponse.json({ 
        success: false, 
        message: 'Nome de usuário muito longo (máximo 25 caracteres)' 
      }, { status: 400 })
    }

    // Criar novo usuário
    const hashedPassword = hashPassword(password)
    
    // Sincronizar AUTO_INCREMENT antes de criar usuário
    await syncAutoIncrement()
    
    const result = await query(
      'INSERT INTO users (username, password, money, playtime, skin, xp, avatar) VALUES (?, ?, 1000, 0, 1, 0, 1)',
      [username, hashedPassword]
    ) as { insertId: number }

    // Buscar usuário criado
    const newUsers = await query('SELECT * FROM users WHERE _id = ?', [result.insertId]) as User[]
    const newUser = newUsers[0]

    // Retornar dados do usuário (sem senha)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = newUser

    return NextResponse.json({ 
      success: true, 
      message: 'Usuário criado com sucesso!',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro no servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
