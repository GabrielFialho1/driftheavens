export function Footer() {
  return (
    <footer className="bg-black border-t border-red-500/30 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <div className="text-gray-500 text-sm font-light tracking-widest">HEAVENS DRIFT</div>
            </div>
            <div className="text-gray-600 text-xs font-light tracking-widest">© 2026 ALL RIGHTS RESERVED</div>
          </div>
          <div className="flex items-center gap-12">
            <div className="text-gray-600 text-xs font-light tracking-widest">NEXT</div>
            <div className="w-px h-6 bg-gradient-to-b from-red-500 to-transparent" />
            <div className="text-gray-600 text-xs font-light tracking-widest">REALLY</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
