// DesktopMenu.tsx
import { useState } from 'react';

interface DesktopMenuProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

const DesktopMenu = ({ tabs, activeTab, onTabChange }: DesktopMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="desktop-menu">
      <button 
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className={`hamburger ${isMenuOpen ? 'open' : ''}`} viewBox="0 0 24 24">
          <path className="line" d="M3 6h18" />
          <path className="line" d="M3 12h18" />
          <path className="line" d="M3 18h18" />
        </svg>
      </button>
      
      <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              setIsMenuOpen(false);
            }}
            className={`menu-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};