import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST() {
  try {
    console.log('Criando tabela clan_members...')

    // Criar tabela de membros
    await query(`
      CREATE TABLE IF NOT EXISTS clan_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        clan_tag VARCHAR(255) NOT NULL,
        user_id INT UNSIGNED NOT NULL,
        role ENUM('leader', 'member') DEFAULT 'member',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_clan_user (clan_tag, user_id),
        INDEX idx_user (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    // Migrar dados existentes - converter clans com owner: "null" para membros
    console.log('Migrando membros existentes...')
    
    // Primeiro, identificar quem são os líderes
    const leaders = await query(`
      SELECT DISTINCT owner as user_id, tag as clan_tag
      FROM clans 
      WHERE owner IS NOT NULL AND owner != 'null'
    `)

    // Inserir líderes como membros na nova tabela
    for (const leader of (leaders as any[])) {
      await query(`
        INSERT INTO clan_members (clan_tag, user_id, role)
        VALUES (?, ?, 'leader')
        ON DUPLICATE KEY UPDATE role = 'leader'
      `, [leader.clan_tag, leader.user_id])
    }

    // Converter clans com owner: "null" para membros
    const memberClans = await query(`
      SELECT tag as clan_tag, 'placeholder' as user_id
      FROM clans 
      WHERE owner = 'null' OR owner IS NULL
    `)

    // Nota: Estes são "clans de membro" que precisam de lógica especial
    // Por enquanto, vamos apenas registrar que existem

    console.log('Migração concluída!')
    console.log('Líderes migrados:', leaders.length)
    console.log('Clans de membro encontrados:', (memberClans as any[]).length)

    return NextResponse.json({
      success: true,
      message: 'Tabela clan_members criada com sucesso!',
      data: {
        leadersMigrated: leaders.length,
        memberClansFound: (memberClans as any[]).length,
        nextSteps: [
          'Implementar lógica de adicionar/remover membros',
          'Atualizar sistema de permissões',
          'Migrar clans com owner: null para sistema correto'
        ]
      }
    })

  } catch (error) {
    console.error('Erro ao criar tabela clan_members:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao criar tabela clan_members',
      error: (error as Error).message
    }, { status: 500 })
  }
}
