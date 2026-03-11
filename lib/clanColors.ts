// Funções para processar cores e códigos hexadecimais nos nomes dos clans

export interface ColorInfo {
  hex: string
  rgb: { r: number; g: number; b: number }
  gradient?: string
  textColor: string
}

// Padrões para detectar códigos hexadecimais
const HEX_PATTERNS = [
  /#([0-9A-Fa-f]{6})/g,           // #FF0000
  /#([0-9A-Fa-f]{3})/g,            // #F00
  /0x([0-9A-Fa-f]{6})/g,           // 0xFF0000
  /\\^([0-9A-Fa-f]{6})/g,          // ^FF0000
  /&([0-9A-Fa-f]{6})/g,            // &FF0000
]

// Códigos de cores especiais para clans
const SPECIAL_COLORS: { [key: string]: ColorInfo } = {
  // Cores de gradientes populares
  'fogo': {
    hex: '#FF4500',
    rgb: { r: 255, g: 69, b: 0 },
    gradient: 'from-orange-600 to-red-600',
    textColor: 'text-white'
  },
  'gelo': {
    hex: '#00CED1',
    rgb: { r: 0, g: 206, b: 209 },
    gradient: 'from-cyan-400 to-blue-500',
    textColor: 'text-gray-900'
  },
  'sombra': {
    hex: '#4B0082',
    rgb: { r: 75, g: 0, b: 130 },
    gradient: 'from-purple-900 to-pink-600',
    textColor: 'text-white'
  },
  'natureza': {
    hex: '#228B22',
    rgb: { r: 34, g: 139, b: 34 },
    gradient: 'from-green-700 to-green-500',
    textColor: 'text-white'
  },
  'eletrico': {
    hex: '#FFD700',
    rgb: { r: 255, g: 215, b: 0 },
    gradient: 'from-yellow-400 to-orange-500',
    textColor: 'text-gray-900'
  },
  'cosmico': {
    hex: '#191970',
    rgb: { r: 25, g: 25, b: 112 },
    gradient: 'from-indigo-900 to-purple-600',
    textColor: 'text-white'
  },
  'rubro': {
    hex: '#8B0000',
    rgb: { r: 139, g: 0, b: 0 },
    gradient: 'from-red-900 to-red-600',
    textColor: 'text-white'
  },
  'neon': {
    hex: '#39FF14',
    rgb: { r: 57, g: 255, b: 20 },
    gradient: 'from-green-400 to-lime-500',
    textColor: 'text-gray-900'
  }
}

export function extractHexCodes(text: string): string[] {
  const codes: string[] = []
  
  HEX_PATTERNS.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      codes.push(...matches.map(match => match.replace(/[^0-9A-Fa-f]/g, '')))
    }
  })
  
  return [...new Set(codes)] // Remover duplicados
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remover prefixos
  const cleanHex = hex.replace(/[#^&]/g, '')
  
  // Validar formato
  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null
  }
  
  const r = parseInt(cleanHex.substr(0, 2), 16)
  const g = parseInt(cleanHex.substr(2, 2), 16)
  const b = parseInt(cleanHex.substr(4, 2), 16)
  
  return { r, g, b }
}

export function rgbToTailwind(rgb: { r: number; g: number; b: number }): string {
  const { r, g, b } = rgb
  
  // Encontrar a cor Tailwind mais próxima
  const colors = [
    { name: 'red', values: [239, 68, 68] },
    { name: 'orange', values: [249, 115, 22] },
    { name: 'yellow', values: [245, 158, 11] },
    { name: 'green', values: [34, 197, 94] },
    { name: 'blue', values: [59, 130, 246] },
    { name: 'indigo', values: [99, 102, 241] },
    { name: 'purple', values: [168, 85, 247] },
    { name: 'pink', values: [236, 72, 153] },
    { name: 'gray', values: [107, 114, 128] },
    { name: 'slate', values: [71, 85, 105] }
  ]
  
  let closestColor = 'gray'
  let minDistance = Infinity
  
  colors.forEach(color => {
    const distance = Math.sqrt(
      Math.pow(r - color.values[0], 2) +
      Math.pow(g - color.values[1], 2) +
      Math.pow(b - color.values[2], 2)
    )
    
    if (distance < minDistance) {
      minDistance = distance
      closestColor = color.name
    }
  })
  
  return closestColor
}

export function getTextColor(rgb: { r: number; g: number; b: number }): string {
  // Calcular luminosidade para decidir a cor do texto
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance > 0.5 ? 'text-gray-900' : 'text-white'
}

export function processClanName(name: string): {
  processedName: string
  colorInfo?: ColorInfo
  hasColorCode: boolean
} {
  const hexCodes = extractHexCodes(name)
  
  if (hexCodes.length === 0) {
    // Verificar se é uma cor especial por nome
    const lowerName = name.toLowerCase()
    for (const [colorName, colorInfo] of Object.entries(SPECIAL_COLORS)) {
      if (lowerName.includes(colorName)) {
        return {
          processedName: name.replace(new RegExp(colorName, 'gi'), ''),
          colorInfo,
          hasColorCode: true
        }
      }
    }
    
    return {
      processedName: name,
      hasColorCode: false
    }
  }
  
  // Usar o primeiro código hex encontrado
  const firstHex = hexCodes[0]
  const rgb = hexToRgb(firstHex)
  
  if (!rgb) {
    return {
      processedName: name,
      hasColorCode: false
    }
  }
  
  const tailwindColor = rgbToTailwind(rgb)
  const textColor = getTextColor(rgb)
  
  // Remover todos os códigos hexadecimais da string original
  let cleanedName = name
  HEX_PATTERNS.forEach(pattern => {
    cleanedName = cleanedName.replace(pattern, '')
  })
  
  return {
    processedName: cleanedName.trim(),
    colorInfo: {
      hex: `#${firstHex}`,
      rgb,
      gradient: `from-${tailwindColor}-500 to-${tailwindColor}-700`,
      textColor
    },
    hasColorCode: true
  }
}

export function getClanTagStyle(tag: string): {
  className: string
  style?: React.CSSProperties
} {
  const { processedName, colorInfo, hasColorCode } = processClanName(tag)
  
  if (!hasColorCode || !colorInfo) {
    return {
      className: 'bg-gradient-to-br from-red-600 to-red-800 border-2 border-red-500/50'
    }
  }
  
  return {
    className: `bg-gradient-to-br ${colorInfo.gradient} border-2 border-white/20`,
    style: {
      boxShadow: `0 0 20px ${colorInfo.hex}40`
    }
  }
}

export function getClanNameStyle(name: string): {
  className: string
  processedName: string
} {
  const { processedName, colorInfo, hasColorCode } = processClanName(name)
  
  if (!hasColorCode || !colorInfo) {
    return {
      className: 'text-white',
      processedName
    }
  }
  
  return {
    className: colorInfo.textColor,
    processedName
  }
}
