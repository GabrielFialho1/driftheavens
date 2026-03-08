export default function BenefitsSection() {
  return (
    <div className="mt-16 text-center">
      <div className="bg-black/50 backdrop-blur-lg border border-red-900/30 rounded-2xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-red-500 mb-4">Por que escolher nossos planos?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="text-white font-medium mb-1">Segurança Garantida</h4>
            <p className="text-gray-400 text-sm">Pagamentos seguros e proteção de dados</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="text-white font-medium mb-1">Recursos Exclusivos</h4>
            <p className="text-gray-400 text-sm">Acesso a conteúdo e funcionalidades únicas</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔄</div>
            <h4 className="text-white font-medium mb-1">Cancelamento Fácil</h4>
            <p className="text-gray-400 text-sm">Cancele a qualquer momento sem complicações</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          Todos os planos incluem suporte garantido e atualizações automáticas
        </p>
      </div>
    </div>
  )
}
