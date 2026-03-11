// Teste da função de extração de cores
const { extractColorFromText } = require('./lib/colorPalette.ts')

console.log('=== TESTE DE EXTRAÇÃO DE CORES ===')

const testCases = [
  '#FF4500Drift',
  '#FF0856Racers', 
  '#39FF14Elite',
  '#00CED1Ice',
  '#4B0082Shadow',
  '#696969Gray',
  '#FFD700Gold',
  '#8B0000DarkRed',
  'LIBERTY#FF4500',
  'Drift#696969#FF0856',
  'SemCor'
]

testCases.forEach(text => {
  const result = extractColorFromText(text)
  console.log(`Texto: "${text}"`)
  console.log(`  Cor: ${result.color?.name || 'Nenhuma'}`)
  console.log(`  Gradiente: ${result.color?.gradient || 'Nenhum'}`)
  console.log(`  Texto Limpo: "${result.cleanText}"`)
  console.log(`  Hex Original: ${result.originalHex}`)
  console.log('---')
})
