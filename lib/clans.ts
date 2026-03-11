import { query } from './database'
import { Clan, ClanMember } from '@/types/database'

type ClanRow = {
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
  leader_username?: string
  leader_avatar?: number
}

type MemberRow = {
  id: number
  clan_id: number
  user_id: number
  role: 'leader' | 'officer' | 'member'
  joined_at: string
  contribution: number
  username?: string
  avatar?: number
  xp?: number
  online?: number
  lastseen?: string
}

export async function getAllClans(): Promise<Clan[]> {
  const sql = `
    SELECT 
      c.*,
      u.username as leader_username,
      u.avatar as leader_avatar
    FROM clans c
    LEFT JOIN users u ON c.leader_id = u._id
    WHERE c.is_active = 1
    ORDER BY c.experience DESC, c.created_at ASC
  `
  
  console.log('Executando SQL:', sql)
  
  const clans = await query(sql) as ClanRow[]
  console.log('Resultado da query:', clans)
  
  return clans.map(clan => ({
    id: clan.id,
    name: clan.name,
    tag: clan.tag,
    description: clan.description,
    leader_id: clan.leader_id,
    created_at: clan.created_at,
    updated_at: clan.updated_at,
    members_count: clan.members_count,
    max_members: clan.max_members,
    level: clan.level,
    experience: clan.experience,
    is_active: clan.is_active,
    logo: clan.logo,
    leader: clan.leader_username ? {
      _id: clan.leader_id,
      username: clan.leader_username,
      avatar: clan.leader_avatar || 0,
      password: '',
      online: 0,
      money: 0,
      playtime: 0,
      skin: 0,
      register_time: '',
      lastseen: '',
      xp: 0
    } : undefined
  }))
}

export async function getClanById(clanId: number): Promise<Clan | null> {
  const sql = `
    SELECT 
      c.*,
      u.username as leader_username,
      u.avatar as leader_avatar
    FROM clans c
    LEFT JOIN users u ON c.leader_id = u._id
    WHERE c.id = ? AND c.is_active = true
  `
  
  const clans = await query(sql, [clanId]) as ClanRow[]
  
  if (clans.length === 0) return null
  
  const clan = clans[0]
  return {
    id: clan.id,
    name: clan.name,
    tag: clan.tag,
    description: clan.description,
    leader_id: clan.leader_id,
    created_at: clan.created_at,
    updated_at: clan.updated_at,
    members_count: clan.members_count,
    max_members: clan.max_members,
    level: clan.level,
    experience: clan.experience,
    is_active: clan.is_active,
    logo: clan.logo,
    leader: clan.leader_username ? {
      _id: clan.leader_id,
      username: clan.leader_username,
      avatar: clan.leader_avatar || 0,
      password: '',
      online: 0,
      money: 0,
      playtime: 0,
      skin: 0,
      register_time: '',
      lastseen: '',
      xp: 0
    } : undefined
  }
}

export async function getClanMembers(clanId: number): Promise<ClanMember[]> {
  const sql = `
    SELECT 
      cm.*,
      u.username,
      u.avatar,
      u.xp,
      u.online,
      u.lastseen
    FROM clan_members cm
    LEFT JOIN users u ON cm.user_id = u._id
    WHERE cm.clan_id = ?
    ORDER BY 
      CASE cm.role 
        WHEN 'leader' THEN 1 
        WHEN 'officer' THEN 2 
        ELSE 3 
      END,
      u.xp DESC
  `
  
  const members = await query(sql, [clanId]) as MemberRow[]
  
  return members.map(member => ({
    id: member.id,
    clan_id: member.clan_id,
    user_id: member.user_id,
    role: member.role,
    joined_at: member.joined_at,
    contribution: member.contribution,
    user: member.username ? {
      _id: member.user_id,
      username: member.username,
      avatar: member.avatar || 0,
      xp: member.xp || 0,
      online: member.online || 0,
      lastseen: member.lastseen || '',
      password: '',
      money: 0,
      playtime: 0,
      skin: 0,
      register_time: ''
    } : undefined
  }))
}

export async function getUserClan(userId: number): Promise<Clan | null> {
  const sql = `
    SELECT 
      c.*,
      u.username as leader_username,
      u.avatar as leader_avatar
    FROM clans c
    LEFT JOIN users u ON c.leader_id = u._id
    INNER JOIN clan_members cm ON c.id = cm.clan_id
    WHERE cm.user_id = ? AND c.is_active = true
  `
  
  const clans = await query(sql, [userId]) as ClanRow[]
  
  if (clans.length === 0) return null
  
  const clan = clans[0]
  return {
    id: clan.id,
    name: clan.name,
    tag: clan.tag,
    description: clan.description,
    leader_id: clan.leader_id,
    created_at: clan.created_at,
    updated_at: clan.updated_at,
    members_count: clan.members_count,
    max_members: clan.max_members,
    level: clan.level,
    experience: clan.experience,
    is_active: clan.is_active,
    logo: clan.logo,
    leader: clan.leader_username ? {
      _id: clan.leader_id,
      username: clan.leader_username,
      avatar: clan.leader_avatar || 0,
      password: '',
      online: 0,
      money: 0,
      playtime: 0,
      skin: 0,
      register_time: '',
      lastseen: '',
      xp: 0
    } : undefined
  }
}

export async function createClan(clanData: {
  name: string
  tag: string
  description?: string
  leader_id: number
}): Promise<{ success: boolean; message: string; clan?: Clan }> {
  try {
    console.log('createClan - Iniciando com dados:', clanData)
    
    // Verificar se usuário já está em um clan
    const existingClan = await getUserClan(clanData.leader_id)
    console.log('createClan - Verificando clan existente para usuário', clanData.leader_id, ':', existingClan)
    
    if (existingClan) {
      return { success: false, message: 'Você já está em um clan!' }
    }

    // Verificar se nome já existe
    const nameCheck = await query('SELECT id FROM clans WHERE name = ?', [clanData.name]) as { id: number }[]
    console.log('createClan - Verificando nome existente:', nameCheck)
    
    if (nameCheck.length > 0) {
      return { success: false, message: 'Este nome de clan já está em uso!' }
    }

    // Verificar se tag já existe
    const tagCheck = await query('SELECT id FROM clans WHERE tag = ?', [clanData.tag]) as { id: number }[]
    console.log('createClan - Verificando tag existente:', tagCheck)
    
    if (tagCheck.length > 0) {
      return { success: false, message: 'Esta tag de clan já está em uso!' }
    }

    console.log('createClan - Inserindo novo clan...')
    // Inserir clan
    const result = await query(
      'INSERT INTO clans (name, tag, description, leader_id) VALUES (?, ?, ?, ?)',
      [clanData.name, clanData.tag, clanData.description, clanData.leader_id]
    ) as { insertId: number }

    console.log('createClan - Clan inserido com ID:', result.insertId)
    
    const clan = await getClanById(result.insertId)
    console.log('createClan - Clan recuperado:', clan)
    
    return { 
      success: true, 
      message: 'Clan criado com sucesso!', 
      clan: clan || undefined 
    }
  } catch (error) {
    console.error('Erro ao criar clan:', error)
    return { success: false, message: 'Erro ao criar clan. Tente novamente.' }
  }
}

export async function joinClan(clanId: number, userId: number): Promise<{ success: boolean; message: string }> {
  try {
    // Verificar se usuário já está em um clan
    const existingClan = await getUserClan(userId)
    if (existingClan) {
      return { success: false, message: 'Você já está em um clan!' }
    }

    // Verificar se clan existe e está ativo
    const clan = await getClanById(clanId)
    if (!clan) {
      return { success: false, message: 'Clan não encontrado!' }
    }

    // Verificar se clan está cheio
    if (clan.members_count >= clan.max_members) {
      return { success: false, message: 'Este clan está cheio!' }
    }

    // Adicionar membro
    await query(
      'INSERT INTO clan_members (clan_id, user_id, role) VALUES (?, ?, ?)',
      [clanId, userId, 'member']
    )

    return { success: true, message: 'Você entrou no clan com sucesso!' }
  } catch (error) {
    console.error('Erro ao entrar no clan:', error)
    return { success: false, message: 'Erro ao entrar no clan. Tente novamente.' }
  }
}

export async function leaveClan(userId: number): Promise<{ success: boolean; message: string }> {
  try {
    // Verificar se usuário está em um clan
    const userClan = await getUserClan(userId)
    if (!userClan) {
      return { success: false, message: 'Você não está em nenhum clan!' }
    }

    // Verificar se é o líder
    if (userClan.leader_id === userId) {
      return { success: false, message: 'O líder não pode sair do clan. Transfira a liderança primeiro!' }
    }

    // Remover membro
    await query('DELETE FROM clan_members WHERE user_id = ?', [userId])

    return { success: true, message: 'Você saiu do clan com sucesso!' }
  } catch (error) {
    console.error('Erro ao sair do clan:', error)
    return { success: false, message: 'Erro ao sair do clan. Tente novamente.' }
  }
}
