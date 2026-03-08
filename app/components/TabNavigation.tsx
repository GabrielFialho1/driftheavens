'use client'

type TabType = 'my-vehicles' | 'marketplace'

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => onTabChange('marketplace')}
        className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
          activeTab === 'marketplace'
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Marketplace
      </button>
      <button
        onClick={() => onTabChange('my-vehicles')}
        className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
          activeTab === 'my-vehicles'
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Meus Veículos
      </button>
    </div>
  )
}
