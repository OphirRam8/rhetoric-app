import { useState } from 'react';

const tabs = [
  { id: 'home', label: 'Home', icon: '📖' },
  { id: 'learn', label: 'Learn', icon: '🏛️' },
  { id: 'flashcards', label: 'Cards', icon: '🃏' },
  { id: 'quiz', label: 'Quiz', icon: '⚡' },
  { id: 'scenarios', label: 'Practice', icon: '🎭' },
  { id: 'reference', label: 'Reference', icon: '📜' },
];

export default function Navigation({ activeTab, onTabChange, user, onLogin, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-ink text-parchment shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => onTabChange('home')}
            className="font-bold text-gold tracking-wide text-lg cursor-pointer"
            style={{ fontFamily: "'Palatino', 'Book Antiqua', serif" }}
          >
            The Art of Argument
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 rounded text-sm transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gold text-ink font-semibold'
                    : 'text-parchment/70 hover:text-parchment hover:bg-white/10'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Auth button - desktop */}
            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={onLogout}
                  className="text-sm text-parchment/70 hover:text-parchment cursor-pointer"
                >
                  {user.name} · Sign Out
                </button>
              ) : (
                <button
                  onClick={onLogin}
                  className="text-sm px-3 py-1.5 rounded bg-gold/20 text-gold hover:bg-gold/30 cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-2xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 border-t border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { onTabChange(tab.id); setMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 text-sm cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gold text-ink font-semibold'
                    : 'text-parchment/70 hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
            <div className="border-t border-white/10 mt-1 pt-1">
              {user ? (
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-parchment/70 hover:bg-white/10 cursor-pointer"
                >
                  👤 {user.name} · Sign Out
                </button>
              ) : (
                <button
                  onClick={() => { onLogin(); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-gold hover:bg-white/10 cursor-pointer"
                >
                  🔑 Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
