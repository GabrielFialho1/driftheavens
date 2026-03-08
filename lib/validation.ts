interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
  label: string
}

export function checkPasswordStrength(password: string): PasswordStrength {
  let score = 0
  const feedback: string[] = []

  // Comprimento mínimo
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Mínimo de 8 caracteres')
  }

  // Letras maiúsculas
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Pelo menos uma letra maiúscula')
  }

  // Letras minúsculas
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Pelo menos uma letra minúscula')
  }

  // Números
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('Pelo menos um número')
  }

  // Caracteres especiais
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1
  } else {
    feedback.push('Pelo menos um caractere especial')
  }

  // Comprimento extra
  if (password.length >= 12) {
    score += 1
  }

  const strengthLevels = {
    0: { color: 'bg-red-500', label: 'Muito fraca' },
    1: { color: 'bg-red-500', label: 'Muito fraca' },
    2: { color: 'bg-orange-500', label: 'Fraca' },
    3: { color: 'bg-yellow-500', label: 'Média' },
    4: { color: 'bg-blue-500', label: 'Forte' },
    5: { color: 'bg-green-500', label: 'Muito forte' },
    6: { color: 'bg-green-600', label: 'Excelente' }
  }

  return {
    score,
    feedback,
    color: strengthLevels[score as keyof typeof strengthLevels].color,
    label: strengthLevels[score as keyof typeof strengthLevels].label
  }
}

export function validateEmail(email: string): { isValid: boolean; message?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' }
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Formato de email inválido' }
  }
  
  return { isValid: true }
}

export function validateUsername(username: string): { isValid: boolean; message?: string } {
  if (!username) {
    return { isValid: false, message: 'Nome de usuário é obrigatório' }
  }
  
  if (username.length < 3) {
    return { isValid: false, message: 'Mínimo de 3 caracteres' }
  }
  
  if (username.length > 20) {
    return { isValid: false, message: 'Máximo de 20 caracteres' }
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, message: 'Apenas letras, números e underscore' }
  }
  
  return { isValid: true }
}
