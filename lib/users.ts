import { query } from './database'
import { User } from '@/types/database'

export async function getUsers(): Promise<User[]> {
  const users = await query('SELECT * FROM users ORDER BY xp DESC') as User[]
  return users
}

export async function getUserById(id: number): Promise<User | null> {
  const users = await query('SELECT * FROM users WHERE _id = ?', [id]) as User[]
  return users[0] || null
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const users = await query('SELECT * FROM users WHERE username = ?', [username]) as User[]
  return users[0] || null
}

export async function getTopUsersByXP(limit: number = 10): Promise<User[]> {
  const users = await query('SELECT * FROM users ORDER BY xp DESC LIMIT ?', [limit]) as User[]
  return users
}

export async function getOnlineUsers(): Promise<User[]> {
  const users = await query('SELECT * FROM users WHERE online = 1') as User[]
  return users
}
