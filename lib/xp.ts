// XP System Utilities
// Based on spreadsheet: Linear progression with 1616 XP increments
// Level 1: 0 XP total, needs 1616 XP to reach level 2
// Level 2: 1616 XP total, needs 1616 XP to reach level 3
// Level 3: 4848 XP total, needs 1616 XP to reach level 4
// Maximum level is 100

const BASE_XP = 1616
const MAX_LEVEL = 100

export function getXPRequiredForLevel(level: number): number {
  // XP needed to go FROM this level TO the next level
  if (level >= MAX_LEVEL) return 0
  return BASE_XP * level
}

export function getTotalXPRequiredForLevel(level: number): number {
  // Total XP accumulated needed to BE at this level
  if (level <= 1) return 0
  // Following the spreadsheet pattern: cumulative sum
  let total = 0
  for (let i = 1; i < level; i++) {
    total += BASE_XP * i
  }
  return total
}

export function getCurrentLevel(totalXP: number): number {
  if (totalXP < BASE_XP) return 1
  
  let level = 1
  let accumulatedXP = 0
  
  while (level < MAX_LEVEL) {
    const xpForNextLevel = BASE_XP * level
    if (accumulatedXP + xpForNextLevel > totalXP) {
      break
    }
    accumulatedXP += xpForNextLevel
    level++
  }
  
  // Verificação final: se o XP total exatamente igual ou maior que o necessário para o próximo nível
  if (level < MAX_LEVEL) {
    const xpNeededForNextLevel = BASE_XP * level
    if (totalXP >= accumulatedXP + xpNeededForNextLevel) {
      level++
      accumulatedXP += xpNeededForNextLevel
    }
  }
  
  return Math.min(level, MAX_LEVEL)
}

export function getXPProgress(totalXP: number) {
  const currentLevel = getCurrentLevel(totalXP)
  
  if (currentLevel >= MAX_LEVEL) {
    return {
      currentLevel: MAX_LEVEL,
      currentLevelXP: getTotalXPRequiredForLevel(MAX_LEVEL),
      nextLevelXP: getTotalXPRequiredForLevel(MAX_LEVEL),
      xpNeededForNextLevel: 0,
      xpProgress: 100,
      totalXP
    }
  }
  
  const currentLevelXP = getTotalXPRequiredForLevel(currentLevel)
  const xpRequiredForCurrentLevel = getXPRequiredForLevel(currentLevel) // XP para completar o nível atual
  const nextLevelXP = currentLevelXP + xpRequiredForCurrentLevel
  
  // XP acumulado dentro do nível atual
  const xpIntoCurrentLevel = totalXP - currentLevelXP
  
  // Progresso percentual dentro do nível atual
  const xpProgress = (xpIntoCurrentLevel / xpRequiredForCurrentLevel) * 100
  
  return {
    currentLevel,
    currentLevelXP: currentLevelXP,
    nextLevelXP,
    xpNeededForNextLevel: xpRequiredForCurrentLevel,
    xpProgress,
    totalXP
  }
}
