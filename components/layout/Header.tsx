
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
        isActive ? 'text-brand-dark' : 'text-gray-500 hover:text-brand-dark'
      }`
    }
  >
    {children}
  </NavLink>
);

const Header: React.FC = () => {
  const totalItems = useCartStore((state) => state.totalItems());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-brand-light/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-black tracking-tighter text-brand-dark">
              Aart
            </NavLink>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to}>
                {link.label}
              </NavItem>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
             <NavLink to="/cart" className="relative text-gray-500 hover:text-brand-dark transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </NavLink>
            <button
              className="md:hidden text-gray-500 hover:text-brand-dark"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
       {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <nav className="flex flex-col items-center space-y-4 py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </NavItem>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
