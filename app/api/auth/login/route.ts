import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'
import { generateToken } from '@/lib/auth'
import { User } from '@/types/database'
import crypto from 'crypto'

// Função para verificar senha (assumindo que usa SHA256 como no exemplo)
function verifyPassword(inputPassword: string, storedHash: string): boolean {
  const inputHash = crypto.createHash('sha256').update(inputPassword).digest('hex')
  return inputHash === storedHash.toLowerCase()
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

    // Buscar usuário no banco
    const users = await query('SELECT * FROM users WHERE username = ?', [username]) as User[]
    
    if (users.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Usuário não encontrado' 
      }, { status: 401 })
    }

    const user = users[0]

    // Verificar senha
    const isPasswordValid = verifyPassword(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        message: 'Senha incorreta' 
      }, { status: 401 })
    }

    // Atualizar status online
    await query('UPDATE users SET online = 1, lastseen = NOW() WHERE _id = ?', [user._id])

    // Gerar token JWT
    const token = generateToken({
      id: user._id,
      username: user.username
    })

    // Retornar dados do usuário (sem senha) e token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _userPassword, ...userWithoutPassword } = user

    return NextResponse.json({ 
      success: true, 
      message: 'Login realizado com sucesso!',
      user: userWithoutPassword,
      token: token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Erro no servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
