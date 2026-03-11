import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
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
        CREATE TABLE clans (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          tag VARCHAR(10) NOT NULL UNIQUE,
          description TEXT DEFAULT NULL,
          leader_id INT NOT NULL,
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
        )
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
        CREATE TABLE clan_members (
          id INT AUTO_INCREMENT PRIMARY KEY,
          clan_id INT NOT NULL,
          user_id INT NOT NULL,
          role ENUM('leader', 'officer', 'member') DEFAULT 'member',
          contribution INT DEFAULT 0,
          joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          
          FOREIGN KEY (clan_id) REFERENCES clans(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(_id) ON DELETE CASCADE,
          
          UNIQUE KEY unique_user_clan (user_id, clan_id),
          INDEX idx_clan (clan_id),
          INDEX idx_user (user_id),
          INDEX idx_role (role)
        )
      `
      
      await query(createMembersSql)
      console.log('Tabela clan_members criada com sucesso')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Setup das tabelas clans concluído!',
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
