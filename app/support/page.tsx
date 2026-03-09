'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { useAuth } from '@/contexts/AuthContext'

export default function SupportPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<string>('discord')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    priority: 'normal',
    subject: '',
    message: '',
    discordId: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const tabs = [
    { id: 'discord', title: 'Discord', icon: '💬', description: 'Suporte rápido via comunidade' },
    { id: 'ticket', title: 'Abrir Ticket', icon: '🎫', description: 'Suporte formal e rastreado' },
    { id: 'faq', title: 'FAQ', icon: '❓', description: 'Perguntas frequentes' }
  ]

  const faqCategories = [
    {
      title: 'Marketplace',
      icon: '🏪',
      questions: [
        { q: 'Como comprar um veículo?', a: 'Acesse o marketplace, escolha o veículo e clique em Comprar. O dinheiro será debitado automaticamente.' },
        { q: 'Posso vender meu veículo?', a: 'Sim! Na aba "Meus Veículos", clique em "Listar" e defina o preço.' },
        { q: 'O que acontece se não tiver dinheiro?', a: 'O sistema exibirá erro de saldo insuficiente e a compra não será concluída.' }
      ]
    },
    {
      title: 'Torneios',
      icon: '🏆',
      questions: [
        { q: 'Como participar de torneios?', a: 'Acesse a seção Torneios, verifique os requisitos e clique em "Participar".' },
        { q: 'Quais são os prêmios?', a: 'Os prêmios variam conforme o torneio. Geralmente incluem dinheiro, veículos exclusivos e títulos.' },
        { q: 'Posso criar meu próprio torneio?', a: 'Sim! Jogadores VIP podem criar torneios personalizados.' }
      ]
    },
    {
      title: 'Conta',
      icon: '👤',
      questions: [
        { q: 'Como resetar minha senha?', a: 'Clique em "Esqueci minha senha" na tela de login e siga as instruções.' },
        { q: 'Como alterar meu nome?', a: 'Vá para Perfil > Configurações > Editar Perfil e atualize seu nome.' },
        { q: 'Meus dados estão seguros?', a: 'Sim! Usamos criptografia SSL e nunca compartilhamos seus dados.' }
      ]
    },
    {
      title: 'Veículos',
      icon: '🚗',
      questions: [
        { q: 'Como personalizar meu carro?', a: 'Vá para Garagem > Personalizar e escolha as modificações disponíveis.' },
        { q: 'Posso vender meu carro?', a: 'Sim! Você pode vender na Garagem ou no Marketplace.' },
        { q: 'Quantos carros posso ter?', a: 'O limite é de 10 veículos por conta. Jogadores VIP podem ter até 20.' }
      ]
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Preencher formulário com dados do usuário quando disponível
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.username || '',
        email: (user as { email?: string }).email || '',
        discordId: (user as { discordId?: string }).discordId || ''
      }))
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // URL do webhook do Discord (já configurada)
      const WEBHOOK_URL = process.env.NEXT_PUBLIC_TICKET_WEBHOOK_URL
      
      if (!WEBHOOK_URL) {
        setSubmitStatus('error')
        console.error('Webhook URL não encontrada. Verifique o arquivo .env.local')
        setIsSubmitting(false)
        return
      }
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `🎫 ${formData.name} - Drift Heavens`,
          avatar_url: process.env.NEXT_PUBLIC_LOGO_URL || 'https://i.imgur.com/your-logo.png',
          embeds: [
            {
              title: `🎫 Novo Ticket: ${formData.subject}`,
              description: formData.message,
              color: getPriorityColor(formData.priority),
              fields: [
                { name: '👤 Nome', value: formData.name, inline: true },
                { name: '📧 Email', value: formData.email, inline: true },
                { name: '📁 Categoria', value: getCategoryLabel(formData.category), inline: true },
                { name: '⚡ Prioridade', value: getPriorityLabel(formData.priority), inline: true },
                { name: '� ID Jogo', value: user._id?.toString() || 'N/A', inline: true },
                ...(formData.discordId ? [{ name: '🏷️ Discord', value: `<@${formData.discordId}>`, inline: true }] : [])
              ],
              footer: {
                text: 'Enviado via formulário do site Drift Heavens',
                icon_url: process.env.NEXT_PUBLIC_LOGO_URL || 'https://i.imgur.com/your-logo.png'
              },
              timestamp: new Date().toISOString()
            }
          ],
          components: formData.discordId ? [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  label: '🔄 Em Andamento',
                  style: 1,
                  custom_id: `status_progress_${Date.now()}`
                },
                {
                  type: 2,
                  label: '✅ Resolvido',
                  style: 3,
                  custom_id: `status_resolved_${Date.now()}`
                },
                {
                  type: 2,
                  label: '❌ Cancelado',
                  style: 4,
                  custom_id: `status_cancelled_${Date.now()}`
                }
              ]
            }
          ] : []
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          category: '',
          priority: 'normal',
          subject: '',
          message: '',
          discordId: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Erro ao enviar ticket:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      
      if (submitStatus === 'success') {
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'baixa': return 8311585 // Cinza
      case 'normal': return 3066993 // Verde  
      case 'alta': return 15105570 // Laranja
      case 'urgente': return 15158332 // Vermelho
      default: return 3066993
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'marketplace': '🏪 Marketplace',
      'torneios': '🏆 Torneios',
      'conta': '👤 Problemas com Conta',
      'veiculos': '🚗 Veículos',
      'bug': '🐛 Reportar Bug',
      'sugestao': '💡 Sugestão',
      'outro': '📦 Outro'
    }
    return labels[category] || category
  }

  const getPriorityLabel = (priority: string) => {
    const labels: { [key: string]: string } = {
      'baixa': '🟢 Baixa',
      'normal': '🟡 Normal',
      'alta': '🟠 Alta',
      'urgente': '🔴 Urgente'
    }
    return labels[priority] || priority
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'discord':
        return (
          <div className="space-y-8">
            <div className="bg-black/40 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">💬</span>
                Suporte via Discord
              </h3>
              <p className="text-gray-300 mb-6">
                Junte-se à nossa comunidade no Discord para suporte rápido e interativo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                  <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                    📱 Como Acessar
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Clique no botão abaixo</li>
                    <li>• Entre no servidor</li>
                    <li>• Vá ao canal #suporte</li>
                    <li>• Descreva seu problema</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
                  <h4 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                    ⚡ Vantagens
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Resposta em minutos</li>
                    <li>• Interação com outros jogadores</li>
                    <li>• Acompanhamento em tempo real</li>
                    <li>• Comunidade ativa 24/7</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href="https://discord.gg/diftheavens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-all transform hover:scale-105 cursor-pointer"
                >
                  <span className="text-2xl">💬</span>
                  Entrar no Discord
                </a>
              </div>
            </div>
          </div>
        )

      case 'ticket':
        if (!user) {
          return (
            <div className="space-y-8">
              <div className="bg-black/40 border border-blue-500/30 rounded-2xl p-8">
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">🔒</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Login Necessário
                  </h3>
                  <p className="text-gray-300 mb-8 max-w-md mx-auto">
                    Para abrir um ticket de suporte, você precisa estar logado. Faça login para acessar o formulário e receber suporte personalizado.
                  </p>
                  <div className="flex justify-center gap-4">
                    <a 
                      href="/login"
                      className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      Fazer Login
                    </a>
                    <a 
                      href="/register"
                      className="px-8 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      Criar Conta
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="space-y-8">
            <div className="bg-black/40 border border-blue-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🎫</span>
                Abrir Novo Ticket
              </h3>
              <p className="text-gray-300 mb-6">
                Preencha o formulário abaixo para abrir um ticket de suporte. Nossa equipe responderá em até 24 horas.
                {formData.discordId && ' Se você informou seu Discord ID, será notificado automaticamente!'}
              </p>
              
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
                  ✅ Ticket enviado com sucesso! Responderemos em até 24 horas.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
                  ❌ Erro ao enviar ticket. Verifique a configuração do webhook ou tente novamente.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Nome *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                      required
                      disabled={!!user}
                    />
                    {user && (
                      <p className="text-gray-400 text-sm mt-1">Preenchido automaticamente com seu nome de usuário</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                      required
                      disabled={!!user && !!(user as { email?: string }).email}
                    />
                    {user && (user as { email?: string }).email && (
                      <p className="text-gray-400 text-sm mt-1">Preenchido automaticamente com seu email</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Discord ID (opcional)</label>
                    <input
                      type="text"
                      name="discordId"
                      value={formData.discordId}
                      onChange={handleInputChange}
                      placeholder="Ex: 123456789012345678"
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                      disabled={!!user && !!(user as { discordId?: string }).discordId}
                    />
                    {user && (user as { discordId?: string }).discordId ? (
                      <p className="text-gray-400 text-sm mt-1">Preenchido automaticamente com seu Discord ID</p>
                    ) : (
                      <p className="text-gray-400 text-sm mt-1">Seu ID de usuário do Discord para notificação automática</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Categoria *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="marketplace">🏪 Marketplace</option>
                      <option value="torneios">🏆 Torneios</option>
                      <option value="conta">👤 Problemas com Conta</option>
                      <option value="veiculos">🚗 Veículos</option>
                      <option value="bug">🐛 Reportar Bug</option>
                      <option value="sugestao">💡 Sugestão</option>
                      <option value="outro">📦 Outro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Prioridade *</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    >
                      <option value="baixa">🟢 Baixa</option>
                      <option value="normal">🟡 Normal</option>
                      <option value="alta">🟠 Alta</option>
                      <option value="urgente">🔴 Urgente</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Assunto *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">Mensagem *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none resize-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )

      case 'faq':
        return (
          <div className="space-y-8">
            <div className="bg-black/40 border border-yellow-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">❓</span>
                Perguntas Frequentes
              </h3>
              <p className="text-gray-300 mb-6">
                Respostas rápidas para as dúvidas mais comuns.
              </p>
              
              <div className="space-y-6">
                {faqCategories.map((category, index) => (
                  <div key={index} className="bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="bg-gray-800/30 px-6 py-4 border-b border-gray-700/50">
                      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        {category.title}
                      </h4>
                    </div>
                    
                    <div className="divide-y divide-gray-700/50">
                      {category.questions.map((faq, faqIndex) => (
                        <div key={faqIndex} className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="text-yellow-400 mt-1">Q:</div>
                            <div className="flex-1">
                              <p className="text-white font-medium mb-2">{faq.q}</p>
                              <div className="flex items-start gap-3">
                                <div className="text-green-400 mt-1">A:</div>
                                <p className="text-gray-300">{faq.a}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-12 pt-32 min-h-[calc(100vh-200px)]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Central de <span className="text-red-500">Suporte</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ajudar. Escolha a melhor forma de contato.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 justify-center max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-6 rounded-xl border transition-all ${
                activeTab === tab.id
                  ? 'bg-red-500/20 border-red-500 text-white'
                  : 'bg-black/40 border-gray-700 text-gray-300 hover:border-red-500/60 hover:text-white'
              }`}
            >
              <div className="text-3xl mb-3">{tab.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{tab.title}</h3>
              <p className="text-sm text-gray-400">{tab.description}</p>
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      <Footer />
    </div>
  )
}
