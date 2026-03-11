import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET(_request: NextRequest) {
  try {
    // Primeiro, verificar se a tabela existe
    const checkTable = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = 'clans'
    `) as { count: number }[]

    const tableExists = checkTable[0]?.count > 0

    if (tableExists) {
      // Verificar se a coluna chat_display existe
      const checkColumn = await query(`
        SELECT COUNT(*) as count 
        FROM information_schema.columns 
        WHERE table_schema = DATABASE() 
        AND table_name = 'clans' 
        AND column_name = 'chat_display'
      `) as { count: number }[]

      const columnExists = checkColumn[0]?.count > 0

      if (!columnExists) {
        // Adicionar a coluna chat_display
        await query(`
          ALTER TABLE clans 
          ADD COLUMN chat_display VARCHAR(255) DEFAULT NULL 
          AFTER tag
        `)
        console.log('Coluna chat_display adicionada à tabela clans')
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Tabela clans já existe e está atualizada!' 
      })
    }

    // Criar a tabela clans com a estrutura correta
    const sql = `
      CREATE TABLE clans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        tag VARCHAR(10) NOT NULL UNIQUE,
        chat_display VARCHAR(255) DEFAULT NULL,
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
    `;
    
    await query(sql);

    // Criar tabela de membros do clan
    const membersSql = `
      CREATE TABLE IF NOT EXISTS clan_members (
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
    `;
    
    await query(membersSql);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tabelas clans e clan_members criadas com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
