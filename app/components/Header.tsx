import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from './Button';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { AuthModal } from './AuthModal';
import UserAvatar from './UserAvatar';

const navItems = [
  { id: 1, name: "Home", label: "Página inicial" },
  { id: 2, name: "About", label: "Sobre nós" },
  { id: 3, name: "Championships", label: "Campeonatos" },
  { id: 4, name: "Marketplace", label: "Marketplace de veículos" },
  { id: 5, name: "Support", label: "Suporte e ajuda" },
];

export function Header() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const goToProfile = () => {
    // Redirecionar para página de perfil (pode implementar depois)
    window.location.href = '/profile';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-red-500/60">
        <section className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <div>
            <Link href="/" className="block hover:opacity-80 transition-opacity">
              <Image
                src="/img/banner.png"
                alt="Banner Heavens Drift"
                width={130}
                height={40}
              />
            </Link>
          </div>

          <nav className="flex gap-6" role="navigation" aria-label="Navegação principal">
            {navItems.map((item) => {
              const href = item.name.toLowerCase() === 'home' ? '/' : `/${item.name.toLowerCase()}`;
              const isActive = pathname === href;
              
              return (
                <Link 
                  key={item.id} 
                  href={href}
                  className={`text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded px-1 ${
                    isActive 
                      ? 'border-b-2 border-red-600 text-red-400' 
                      : 'hover:border-b border-red-600'
                  }`}
                  aria-label={item.label}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex gap-3 items-center">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-white hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={`Menu do usuário ${user.username}`}
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <UserAvatar user={user} className="w-8 h-8" />
                  <span className="text-red-400 font-medium">{user.username}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-red-500/30 rounded-lg shadow-lg shadow-red-500/20 z-50"
                    role="menu"
                    aria-label="Menu do usuário"
                  >
                    <div className="py-2">
                      <button
                        onClick={goToProfile}
                        className="w-full text-left px-4 py-2 text-white hover:bg-red-600/20 hover:text-red-400 transition-colors flex items-center gap-3 cursor-pointer focus:outline-none focus:bg-red-600/30"
                        role="menuitem"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 007-7z" />
                        </svg>
                        Perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white hover:bg-red-600/20 hover:text-red-400 transition-colors flex items-center gap-3 cursor-pointer focus:outline-none focus:bg-red-600/30"
                        role="menuitem"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} 
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Abrir modal de login"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }} 
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Abrir modal de registro"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </section>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}

export default Header;
