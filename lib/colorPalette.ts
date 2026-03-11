// Paleta de cores baseada em códigos hexadecimais conhecidos
const COLOR_PALETTE: { [key: string]: { name: string; gradient: string; textColor: string } } = {
  // Cores Primárias
  '#FF0000': { name: 'Vermelho', gradient: 'from-red-500 to-red-700', textColor: 'text-white' },
  '#00FF00': { name: 'Verde', gradient: 'from-green-400 to-green-600', textColor: 'text-gray-900' },
  '#0000FF': { name: 'Azul', gradient: 'from-blue-500 to-blue-700', textColor: 'text-white' },
  
  // Cores Gaming/Drift
  '#FF4500': { name: 'Laranja Fogo', gradient: 'from-orange-500 to-red-600', textColor: 'text-white' },
  '#FF0856': { name: 'Rosa Neon', gradient: 'from-pink-500 to-rose-600', textColor: 'text-white' },
  '#39FF14': { name: 'Verde Neon', gradient: 'from-green-400 to-lime-500', textColor: 'text-gray-900' },
  '#00CED1': { name: 'Azul Gelo', gradient: 'from-cyan-400 to-blue-500', textColor: 'text-white' },
  '#4B0082': { name: 'Roxo Sombra', gradient: 'from-purple-900 to-pink-600', textColor: 'text-white' },
  '#FFD700': { name: 'Dourado', gradient: 'from-yellow-400 to-orange-500', textColor: 'text-gray-900' },
  '#C0C0C0': { name: 'Prata', gradient: 'from-gray-300 to-gray-500', textColor: 'text-gray-900' },
  '#8B0000': { name: 'Vermelho Escuro', gradient: 'from-red-900 to-red-700', textColor: 'text-white' },
  '#191970': { name: 'Azul Meia-Noite', gradient: 'from-indigo-900 to-purple-800', textColor: 'text-white' },
  '#FF1493': { name: 'Rosa Profundo', gradient: 'from-pink-600 to-rose-700', textColor: 'text-white' },
  '#00FF7F': { name: 'Verde Primavera', gradient: 'from-green-400 to-emerald-500', textColor: 'text-gray-900' },
  '#FF69B4': { name: 'Rosa Quente', gradient: 'from-pink-400 to-rose-500', textColor: 'text-white' },
  '#1E90FF': { name: 'Azul Dodger', gradient: 'from-blue-400 to-blue-600', textColor: 'text-white' },
  '#FF6347': { name: 'Tomate', gradient: 'from-red-400 to-orange-500', textColor: 'text-white' },
  '#40E0D0': { name: 'Turquesa Claro', gradient: 'from-teal-300 to-cyan-400', textColor: 'text-gray-900' },
  '#EE82EE': { name: 'Violeta', gradient: 'from-purple-400 to-purple-600', textColor: 'text-white' },
  '#F0E68C': { name: 'Kaki', gradient: 'from-yellow-200 to-amber-300', textColor: 'text-gray-900' },
  '#ADD8E6': { name: 'Azul Claro', gradient: 'from-blue-200 to-blue-400', textColor: 'text-gray-900' },
  '#F08080': { name: 'Coral Claro', gradient: 'from-red-200 to-pink-300', textColor: 'text-gray-900' },
  '#E0FFFF': { name: 'Azul Claro', gradient: 'from-cyan-100 to-blue-200', textColor: 'text-gray-900' },
  '#FAFAD2': { name: 'Honeydew', gradient: 'from-yellow-50 to-yellow-200', textColor: 'text-gray-900' },
  '#D3D3D3': { name: 'Cinza Claro', gradient: 'from-gray-200 to-gray-400', textColor: 'text-gray-900' },
  '#A9A9A9': { name: 'Cinza Escuro', gradient: 'from-gray-400 to-gray-600', textColor: 'text-white' },
  '#696969': { name: 'Cinza Escuro', gradient: 'from-gray-500 to-gray-700', textColor: 'text-white' },
  
  // Material Design Colors
  '#F44336': { name: 'Vermelho Material', gradient: 'from-red-500 to-red-600', textColor: 'text-white' },
  '#E91E63': { name: 'Rosa Material', gradient: 'from-pink-500 to-rose-600', textColor: 'text-white' },
  '#9C27B0': { name: 'Roxo Material', gradient: 'from-purple-500 to-purple-700', textColor: 'text-white' },
  '#673AB7': { name: 'Índigo Material', gradient: 'from-indigo-500 to-indigo-700', textColor: 'text-white' },
  '#3F51B5': { name: 'Azul Material', gradient: 'from-blue-500 to-blue-700', textColor: 'text-white' },
  '#2196F3': { name: 'Azul Claro Material', gradient: 'from-sky-500 to-blue-600', textColor: 'text-white' },
  '#03A9F4': { name: 'Ciano Material', gradient: 'from-cyan-500 to-blue-500', textColor: 'text-white' },
  '#00BCD4': { name: 'Turquesa Material', gradient: 'from-teal-500 to-cyan-600', textColor: 'text-white' },
  '#009688': { name: 'Verde Teal Material', gradient: 'from-teal-600 to-teal-700', textColor: 'text-white' },
  '#4CAF50': { name: 'Verde Material', gradient: 'from-green-500 to-green-600', textColor: 'text-white' },
  '#8BC34A': { name: 'Verde Limão Material', gradient: 'from-lime-400 to-green-500', textColor: 'text-gray-900' },
  '#CDDC39': { name: 'Amarelo Limão Material', gradient: 'from-yellow-300 to-lime-400', textColor: 'text-gray-900' },
  '#FFEB3B': { name: 'Amarelo Material', gradient: 'from-yellow-400 to-amber-500', textColor: 'text-gray-900' },
  '#FFC107': { name: 'Âmbar Material', gradient: 'from-amber-400 to-orange-500', textColor: 'text-gray-900' },
  '#FF9800': { name: 'Laranja Material', gradient: 'from-orange-500 to-orange-600', textColor: 'text-white' },
  '#FF5722': { name: 'Laranja Profundo Material', gradient: 'from-orange-600 to-red-600', textColor: 'text-white' },
  '#795548': { name: 'Marrom Material', gradient: 'from-amber-700 to-stone-700', textColor: 'text-white' },
  '#9E9E9E': { name: 'Cinza Material', gradient: 'from-gray-400 to-gray-600', textColor: 'text-white' },
  '#607D8B': { name: 'Azul Cinza Material', gradient: 'from-slate-500 to-slate-700', textColor: 'text-white' },
  
  // Cores Web Populares
  '#FF6B6B': { name: 'Coral', gradient: 'from-red-400 to-pink-500', textColor: 'text-white' },
  '#4ECDC4': { name: 'Turquesa', gradient: 'from-teal-400 to-cyan-500', textColor: 'text-white' },
  '#45B7D1': { name: 'Azul Claro', gradient: 'from-sky-400 to-blue-500', textColor: 'text-white' },
  '#96CEB4': { name: 'Menta', gradient: 'from-green-300 to-emerald-400', textColor: 'text-gray-900' },
  '#FFEAA7': { name: 'Pêssego', gradient: 'from-yellow-200 to-orange-300', textColor: 'text-gray-900' },
  '#DDA0DD': { name: 'Ameixa', gradient: 'from-purple-300 to-purple-500', textColor: 'text-white' },
  
  // Cores Escuras
  '#000000': { name: 'Preto', gradient: 'from-gray-900 to-black', textColor: 'text-white' },
  '#333333': { name: 'Cinza Escuro', gradient: 'from-gray-700 to-gray-900', textColor: 'text-white' },
  '#666666': { name: 'Cinza Médio', gradient: 'from-gray-500 to-gray-700', textColor: 'text-white' },
  '#999999': { name: 'Cinza Claro', gradient: 'from-gray-300 to-gray-500', textColor: 'text-gray-900' },
  '#CCCCCC': { name: 'Cinza Muito Claro', gradient: 'from-gray-100 to-gray-300', textColor: 'text-gray-900' },
  '#FFFFFF': { name: 'Branco', gradient: 'from-white to-gray-100', textColor: 'text-gray-900' }
}

export interface ColorInfo {
  name: string
  gradient: string
  textColor: string
}

export function findColorInPalette(hex: string): ColorInfo | null {
  // Normalizar o código hex
  const normalizedHex = hex.toUpperCase().replace('#', '')
  
  // Buscar exato
  const exactMatch = COLOR_PALETTE[`#${normalizedHex}`]
  if (exactMatch) return exactMatch
  
  // Buscar sem o #
  const noHashMatch = COLOR_PALETTE[normalizedHex]
  if (noHashMatch) return noHashMatch
  
  // Se não encontrar, retornar cor padrão
  return COLOR_PALETTE['#FF4500'] // Laranja Fogo como padrão
}

export function extractColorFromText(text: string): { color: ColorInfo | null; cleanText: string; originalHex: string | null } {
  // Detectar códigos hexadecimais
  const hexMatch = text.match(/#([0-9A-Fa-f]{6})/gi)
  
  if (hexMatch && hexMatch.length > 0) {
    const originalHex = hexMatch[0]
    const color = findColorInPalette(originalHex)
    const cleanText = text.replace(/#[0-9A-Fa-f]{6}/gi, '').trim()
    
    return { color, cleanText, originalHex }
  }
  
  return { color: null, cleanText: text, originalHex: null }
}

export function getAllColors(): { hex: string; info: ColorInfo }[] {
  return Object.entries(COLOR_PALETTE).map(([hex, info]) => ({ hex, info }))
}

export function getRandomColor(): ColorInfo {
  const colors = Object.values(COLOR_PALETTE)
  return colors[Math.floor(Math.random() * colors.length)]
}
