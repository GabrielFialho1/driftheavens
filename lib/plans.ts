export interface Plan {
  name: string
  price: string
  period: string
  icon: string
  features: string[]
  color: string
  buttonColor: string
  popular?: boolean
}

export const plans: Plan[] = [
  {
    name: 'VIP',
    price: 'R$ 49,99',
    period: '/mês',
    icon: '👑',
    features: [
      'Acesso VIP exclusivo',
      'Prioridade em filas',
      'Badge VIP no perfil',
      'Suporte prioritário 24/7',
      'Recursos exclusivos',
      'Sem anúncios'
    ],
    color: 'border-red-500',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    popular: true
  },
  {
    name: 'Premium',
    price: 'R$ 29,99',
    period: '/mês',
    icon: '⭐',
    features: [
      'Acesso a recursos premium',
      'Suporte prioritário',
      '50GB de armazenamento',
      'Anúncios reduzidos',
      'Recursos avançados',
      'Badge Premium no perfil'
    ],
    color: 'border-zinc-200',
    buttonColor: 'border hover:bg-zinc-200'
  },
  {
    name: 'Casas Privadas',
    price: 'R$ 89,99',
    period: '/mês',
    icon: '🏠',
    features: [
      'Acesso a casas exclusivas',
      'Propriedades privadas',
      'Garagem para veículos',
      'Decoração personalizada',
      'Acesso a áreas VIP',
      'Sem limite de propriedades'
    ],
    color: 'border-zinc-200',
    buttonColor: 'border hover:bg-zinc-200'
  },
  {
    name: 'Veículos Privados',
    price: 'R$ 69,99',
    period: '/mês',
    icon: '🚗',
    features: [
      'Frota de veículos exclusivos',
      'Carros de luxo',
      'Motos personalizadas',
      'Aeronaves privadas',
      'Garagem virtual',
      'Customização completa'
    ],
    color: 'border-zinc-200',
    buttonColor: 'border hover:bg-zinc-200'
  },
  {
    name: 'Empresarial',
    price: 'R$ 149,99',
    period: '/mês',
    icon: '🏢',
    features: [
      'Todos os planos inclusos',
      'API personalizada',
      'Suporte dedicado',
      'Recursos ilimitados',
      'Acesso beta antecipado',
      'Consultoria personalizada'
    ],
    color: 'border-zinc-200',
    buttonColor: 'border hover:bg-zinc-200'
  },
  {
    name: 'Starter',
    price: 'R$ 9,99',
    period: '/mês',
    icon: '🌱',
    features: [
      'Acesso básico',
      'Suporte por email',
      '10GB de armazenamento',
      'Recursos essenciais',
      'Badge Starter no perfil',
      'Comunidade exclusiva'
    ],
    color: 'border-zinc-200',
    buttonColor: 'border hover:bg-zinc-200'
  }
]
