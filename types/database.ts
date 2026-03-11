// Interfaces base para o banco de dados
export interface User {
  _id: number
  username: string
  password: string
  online: number
  money: number
  playtime: number
  skin: number
  register_time: string
  lastseen: string
  xp: number
  group?: string
  avatar: number
}

export interface Vehicle {
  _id: number
  owner_id: number
  model: string
  mileage: number
  tuning: string | object
  stickers: string | object
  // Campos para marketplace (serão adicionados depois)
  price?: number
  for_sale?: boolean
  listed_at?: string
  created_at?: string
  updated_at?: string
}

export interface House {
  id: number
  user_id?: number
  address: string
  type?: string
  value?: number
  created_at?: string
  updated_at?: string
  // Adicionar campos conforme sua estrutura real
}

export interface Clan {
  id: number
  name: string
  tag: string
  description?: string
  leader_id: number
  created_at: string
  updated_at: string
  members_count: number
  max_members: number
  level: number
  experience: number
  is_active: boolean
  logo?: string
  leader?: User // Para JOIN com usuário
}

export interface ClanMember {
  id: number
  clan_id: number
  user_id: number
  role: 'leader' | 'officer' | 'member'
  joined_at: string
  contribution: number
  user?: User // Para JOIN com usuário
  clan?: Clan // Para JOIN com clan
}
