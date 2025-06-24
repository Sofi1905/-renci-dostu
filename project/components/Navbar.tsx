'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, ShoppingCart, Home, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('home.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              <span>{t('nav.home')}</span>
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="w-4 h-4" />
                  <span>{t('nav.dashboard')}</span>
                </Link>
                <Link href="/discounts" className="text-gray-700 hover:text-blue-600 transition-colors">
                  {t('nav.discounts')}
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('nav.logout')}</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">{t('nav.login')}</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
            
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600">
                <Home className="w-4 h-4" />
                <span>{t('nav.home')}</span>
              </Link>
              
              {user ? (
                <>
                  <Link href="/dashboard" className="flex items-center space-x-2 py-2 text-gray-700 hover:text-blue-600">
                    <User className="w-4 h-4" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                  <Link href="/discounts" className="py-2 text-gray-700 hover:text-blue-600">
                    {t('nav.discounts')}
                  </Link>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-start space-x-2 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('nav.logout')}</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="py-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">{t('nav.login')}</Button>
                  </Link>
                  <Link href="/register" className="py-2">
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      {t('nav.register')}
                    </Button>
                  </Link>
                </>
              )}
              
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="flex items-center justify-start space-x-2 w-full"
              >
                <Globe className="w-4 h-4" />
                <span>{language.toUpperCase()}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}