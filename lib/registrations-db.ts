// Database compartilhado para inscrições de campeonatos
export interface RegistrationData {
  id?: number
  tournamentId: string
  userId: string
  nickInGame: string
  carModel: string
  experienceImage?: string
  team?: string
  registrationDate?: string
}

// Mock database - em um projeto real, você usaria um banco de dados real
// Compartilhado entre as APIs de registro e inscrições
let registrationsData: RegistrationData[] = []

export const registrationsDB = {
  getAll: () => registrationsData,
  add: (registration: RegistrationData) => {
    registrationsData.push(registration)
  },
  clear: () => {
    registrationsData = []
  }
}
