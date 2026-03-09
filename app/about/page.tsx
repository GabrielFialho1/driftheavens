'use client'

import { useState } from 'react'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<string>('overview')

  const sections = [
    { id: 'overview', title: 'Visão Geral', icon: '🏠' },
    { id: 'features', title: 'Recursos', icon: '⚡' },
    { id: 'contact', title: 'Contato', icon: '📧' }
  ]

  const content = {
    overview: {
      title: 'Sobre Drift Heavens',
      description: 'Bem-vindo ao Drift Heavens, sua plataforma definitiva para gerenciamento de veículos e competições de drift.',
      details: [
        'Plforma completa para gerenciamento de veículos',
        'Sistema de marketplace para compra e venda',
        'Torneios e competições regulares',
        'Sistema de progressão e recompensas'
      ]
    },
    features: {
      title: 'Nossos Recursos',
      description: 'Descubra tudo o que nossa plataforma oferece para sua experiência de drift.',
      details: [
        '🏁 **Garagem Personalizada**: Gerencie sua coleção de veículos',
        '💰 **Economia Virtual**: Compre, venda e negocie veículos',
        '🏆 **Torneios**: Participe de competições e ganhe prêmios',
        '📊 **Estatísticas**: Acompanhe seu progresso e rankings',
        '🎨 **Personalização**: Customize seus veículos com stickers',
        '🌐 **Comunidade**: Conecte-se com outros pilotos'
      ]
    },
    contact: {
      title: 'Entre em Contato',
      description: 'Precisa de ajuda ou tem sugestões? Estamos aqui para ajudar!',
      details: [
        '📧 **Email**: support@driftheavens.com',
        '💬 **Discord**: Junte-se à nossa comunidade',
        '🐦 **Twitter**: Siga nossas novidades',
        '📱 **WhatsApp**: Suporte rápido e direto',
        '🐛 **Report Bugs**: Ajude-nos a melhorar'
      ]
    }
  }

  const currentContent = content[activeSection as keyof typeof content]

  // Se a seção não existir, volta para a primeira
  if (!currentContent) {
    setActiveSection('overview')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-[calc(100vh-200px)]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Sobre <span className="text-red-500">Drift Heavens</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sua jornada no mundo do drift começa aqui
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-black/40 border border-red-500/30 text-gray-300 hover:border-red-500/60 hover:text-white'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-black/40 border border-red-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {currentContent.title}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {currentContent.description}
          </p>
          
          <div className="space-y-4">
            {currentContent.details.map((detail, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-red-500/30 transition-colors"
              >
                <div className="text-red-400 mt-1">→</div>
                <div 
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: detail }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Usuários Ativos', value: '10K+', icon: '👤' },
            { label: 'Veículos', value: '500+', icon: '🚗' },
            { label: 'Torneios', value: '50+', icon: '🏆' },
            { label: 'Transações', value: '100K+', icon: '💰' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-black/40 border border-red-500/30 rounded-lg p-6 text-center hover:border-red-500/60 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-red-400 mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
