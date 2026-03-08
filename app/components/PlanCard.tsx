import { Plan } from '@/lib/plans'

interface PlanCardProps {
  plan: Plan
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <div
      className={`bg-black/80 backdrop-blur-lg border ${plan.color} rounded-2xl p-6 relative transition-all duration-300 hover:scale-105 ${
        plan.popular ? 'ring-2 ring-red-500/50 shadow-lg shadow-red-500/20' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-red-500 text-black px-3 py-1 rounded-full text-xs font-bold">
            MAIS POPULAR
          </span>
        </div>
      )}
      
      {/* Plan Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">{plan.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center">
          <span className="text-3xl font-bold text-white">{plan.price}</span>
          <span className="text-gray-400 ml-1">{plan.period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        className={`w-full py-3 rounded-lg cursor-pointer font-medium transition-all duration-200 transform hover:scale-105 ${plan.buttonColor} text-white shadow-lg`}
      >
        {plan.popular ? 'ASSINAR AGORA' : 'ESCOLHER PLANO'}
      </button>
    </div>
  )
}
