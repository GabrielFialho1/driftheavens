import { useState, useEffect, useCallback } from 'react'
import { Clan, ClanMember } from '@/types/database'
import { 
  getAllClans, 
  getClanById, 
  getClanMembers, 
  getUserClan, 
  createClan, 
  joinClan, 
  leaveClan 
} from '@/lib/clans'

export function useClans() {
  const [clans, setClans] = useState<Clan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadClans = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAllClans()
      setClans(data)
      setError('')
    } catch (err) {
      console.error('Erro ao carregar clans:', err)
      setError('Erro ao carregar clans')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadClans()
  }, [loadClans])

  return {
    clans,
    loading,
    error,
    refetch: loadClans
  }
}

export function useClan(clanId: number | null) {
  const [clan, setClan] = useState<Clan | null>(null)
  const [members, setMembers] = useState<ClanMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!clanId) {
      setClan(null)
      setMembers([])
      setLoading(false)
      return
    }

    const loadClanData = async () => {
      try {
        setLoading(true)
        const [clanData, membersData] = await Promise.all([
          getClanById(clanId),
          getClanMembers(clanId)
        ])
        setClan(clanData)
        setMembers(membersData)
        setError('')
      } catch (err) {
        console.error('Erro ao carregar dados do clan:', err)
        setError('Erro ao carregar dados do clan')
      } finally {
        setLoading(false)
      }
    }

    loadClanData()
  }, [clanId])

  return {
    clan,
    members,
    loading,
    error
  }
}

export function useUserClan(userId: number) {
  const [userClan, setUserClan] = useState<Clan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUserClan = async () => {
      try {
        setLoading(true)
        const clan = await getUserClan(userId)
        setUserClan(clan)
        setError('')
      } catch (err) {
        console.error('Erro ao carregar clan do usuário:', err)
        setError('Erro ao carregar clan do usuário')
      } finally {
        setLoading(false)
      }
    }

    loadUserClan()
  }, [userId])

  return {
    userClan,
    loading,
    error
  }
}

export function useClanActions() {
  const [loading, setLoading] = useState(false)

  const handleCreateClan = async (clanData: {
    name: string
    tag: string
    description?: string
    leader_id: number
  }) => {
    setLoading(true)
    try {
      const result = await createClan(clanData)
      return result
    } finally {
      setLoading(false)
    }
  }

  const handleJoinClan = async (clanId: number, userId: number) => {
    setLoading(true)
    try {
      const result = await joinClan(clanId, userId)
      return result
    } finally {
      setLoading(false)
    }
  }

  const handleLeaveClan = async (userId: number) => {
    setLoading(true)
    try {
      const result = await leaveClan(userId)
      return result
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    createClan: handleCreateClan,
    joinClan: handleJoinClan,
    leaveClan: handleLeaveClan
  }
}
