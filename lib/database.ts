import mysql from 'mysql2/promise'

// Configuração da conexão com o MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'drift_heavens',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

// Pool de conexões
const pool = mysql.createPool(dbConfig)

export async function query(sql: string, params?: unknown[] | Record<string, unknown>) {
  try {
    const [rows] = await pool.execute(sql, params as any)
    return rows
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export async function getConnection() {
  return await pool.getConnection()
}

export default pool
