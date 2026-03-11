import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Primeiro, garantir que a tabela users exista
    const checkUsersTable = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = 'users'
    `) as { count: number }[]

    const usersTableExists = checkUsersTable[0]?.count > 0

    if (!usersTableExists) {
      // Criar tabela users básica
      const createUsersSql = `
        CREATE TABLE IF NOT EXISTS users (
          _id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          online INT DEFAULT 0,
          money INT DEFAULT 0,
          playtime INT DEFAULT 0,
          skin INT DEFAULT 0,
          register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          lastseen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          xp INT DEFAULT 0,
          group_name VARCHAR(50) DEFAULT NULL,
          avatar INT DEFAULT 0
        ) ENGINE=InnoDB
      `
      
      await query(createUsersSql)
      console.log('Tabela users criada com sucesso')
    }

    // Verificar se a tabela clans existe
    const checkTable = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = 'clans'
    `) as { count: number }[]

    const tableExists = checkTable[0]?.count > 0

    if (!tableExists) {
      // Criar tabela clans
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS clans (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          tag VARCHAR(10) NOT NULL UNIQUE,
          description TEXT DEFAULT NULL,
          leader_id INT UNSIGNED NOT NULL,
          members_count INT DEFAULT 1,
          max_members INT DEFAULT 50,
          level INT DEFAULT 1,
          experience INT DEFAULT 0,
          is_active BOOLEAN DEFAULT TRUE,
          logo VARCHAR(255) DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          
          FOREIGN KEY (leader_id) REFERENCES users(_id) ON DELETE CASCADE,
          
          INDEX idx_leader (leader_id),
          INDEX idx_active (is_active),
          INDEX idx_experience (experience),
          INDEX idx_created (created_at)
        ) ENGINE=InnoDB
      `
      
      await query(createTableSql)
      console.log('Tabela clans criada com sucesso')
    }

    // Verificar se a tabela clan_members existe
    const checkMembersTable = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = 'clan_members'
    `) as { count: number }[]

    const membersTableExists = checkMembersTable[0]?.count > 0

    if (!membersTableExists) {
      // Criar tabela clan_members
      const createMembersSql = `
        CREATE TABLE IF NOT EXISTS clan_members (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          clan_id INT UNSIGNED NOT NULL,
          user_id INT UNSIGNED NOT NULL,
          role ENUM('leader', 'officer', 'member') DEFAULT 'member',
          contribution INT DEFAULT 0,
          joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          
          FOREIGN KEY (clan_id) REFERENCES clans(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(_id) ON DELETE CASCADE,
          
          UNIQUE KEY unique_user_clan (user_id, clan_id),
          INDEX idx_clan (clan_id),
          INDEX idx_user (user_id),
          INDEX idx_role (role)
        ) ENGINE=InnoDB
      `
      
      await query(createMembersSql)
      console.log('Tabela clan_members criada com sucesso')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Setup das tabelas concluído!',
      usersTableExists,
      tableExists,
      membersTableExists
    })
  } catch (error) {
    console.error('Erro no setup:', error)
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 })
  }
}
