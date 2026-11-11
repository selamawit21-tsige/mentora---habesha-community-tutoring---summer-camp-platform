import React, { useState, useRef, useEffect } from 'react';
import { UserRole, Language } from '../types';
import { translations } from '../data/translations';
import mentoraLogo from '../mentora.jpg';
import { 
  Globe, GraduationCap, Sparkles, BookOpen, ChevronDown, 
  User, Shield, Home, Briefcase, Check, ArrowRight 
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageToggle: () => void;
  pendingRequestsCount: number;
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onRequestTutorClick: () => void;
  onOpenLogin: (role?: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageToggle,
  pendingRequestsCount,
  activeTab,
  onNavigateTab,
  onRequestTutorClick,
  onOpenLogin,
}) => {
  const t = translations[language];
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'parent': return t.parentPortal;
      case 'tutor': return t.tutorPortal;
      case 'admin': return t.adminPortal;
      case 'guest': return t.publicPortal;
      default: return t.parentPortal;
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'parent': return <User className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />;
      case 'tutor': return <GraduationCap className="w-3.5 h-3.5 text-amber-500" />;
      case 'admin': return <Shield className="w-3.5 h-3.5 text-emerald-500" />;
      case 'guest': return <Home className="w-3.5 h-3.5 text-slate-500" />;
      default: return <User className="w-3.5 h-3.5" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-18 min-w-0">
          
          {/* Zone 1: Mentora Brand with "Home to Home Tutors" */}
          <button 
            onClick={() => {
              onRoleChange('guest');
              onNavigateTab('home');
            }}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group min-w-0 cursor-pointer"
          >
            <img
              src={mentoraLogo}
              alt="Mentora logo"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-contain border border-slate-200/80 shadow-xs shrink-0 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                {t.brandName}
              </span>
              <span className="hidden sm:inline text-[11px] font-semibold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                {t.subtitleHome}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Fully working) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onNavigateTab('tutors')}
              className={`hover:text-blue-900 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                activeTab === 'tutors' ? 'text-blue-900 dark:text-amber-400 font-bold border-b-2 border-amber-500' : ''
              }`}
            >
              {t.navTutors}
            </button>
            <button
              onClick={() => onNavigateTab('packages')}
              className={`hover:text-blue-900 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                activeTab === 'packages' ? 'text-blue-900 dark:text-amber-400 font-bold border-b-2 border-amber-500' : ''
              }`}
            >
              {t.navPackages}
            </button>
            <button
              onClick={() => onNavigateTab('summer-camp')}
              className={`hover:text-blue-900 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 py-1 ${
                activeTab === 'summer-camp' ? 'text-blue-900 dark:text-amber-400 font-bold border-b-2 border-amber-500' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.navSummerCamp}</span>
            </button>
            <button
              onClick={() => onNavigateTab('books')}
              className={`hover:text-blue-900 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 py-1 ${
                activeTab === 'books' ? 'text-blue-900 dark:text-amber-400 font-bold border-b-2 border-amber-500' : ''
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.navBooksTips}</span>
            </button>
            <button
              onClick={() => onNavigateTab('bridge')}
              className={`hover:text-blue-900 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                activeTab === 'bridge' ? 'text-blue-900 dark:text-amber-400 font-bold border-b-2 border-amber-500' : ''
              }`}
            >
              {t.navBridgeSystem}
            </button>
          </nav>

          {/* Zone 3: Language Toggle, Clean Portal Switcher, and Primary Action */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            
            {/* Language Switcher */}
            <button
              onClick={onLanguageToggle}
              title="Toggle English / አማርኛ"
              aria-label="Toggle English / አማርኛ"
              className="flex items-center gap-1.5 px-2 sm:px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">{language === 'en' ? 'አማርኛ' : 'English'}</span>
            </button>

            {/* Clean, Elegant Role Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                aria-label={getRoleLabel(currentRole)}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all cursor-pointer shadow-2xs"
              >
                {getRoleIcon(currentRole)}
                <span className="hidden sm:inline">{getRoleLabel(currentRole)}</span>
                {currentRole === 'admin' && pendingRequestsCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-bold rounded-full">
                    {pendingRequestsCount}
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.switchRole}
                  </div>

                  <button
                    onClick={() => {
                      onRoleChange('guest');
                      onNavigateTab('home');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                      currentRole === 'guest' ? 'text-amber-600 dark:text-amber-400 font-bold bg-amber-50/50 dark:bg-amber-950/20' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-slate-500" />
                      <span>{t.publicPortal}</span>
                    </span>
                    {currentRole === 'guest' && <Check className="w-3.5 h-3.5 text-amber-500" />}
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('parent');
                      onNavigateTab('dashboard');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                      currentRole === 'parent' ? 'text-blue-900 dark:text-amber-400 font-bold bg-blue-50/50 dark:bg-blue-950/20' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-900 dark:text-blue-400" />
                      <span>{t.parentPortal}</span>
                    </span>
                    {currentRole === 'parent' && <Check className="w-3.5 h-3.5 text-blue-900 dark:text-amber-400" />}
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('tutor');
                      onNavigateTab('dashboard');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                      currentRole === 'tutor' ? 'text-amber-600 dark:text-amber-400 font-bold bg-amber-50/50 dark:bg-amber-950/20' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-500" />
                      <span>{t.tutorPortal}</span>
                    </span>
                    {currentRole === 'tutor' && <Check className="w-3.5 h-3.5 text-amber-500" />}
                  </button>

                  <button
                    onClick={() => {
                      onRoleChange('admin');
                      onNavigateTab('dashboard');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                      currentRole === 'admin' ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span>{t.adminPortal}</span>
                    </span>
                    <div className="flex items-center gap-1">
                      {pendingRequestsCount > 0 && (
                        <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-bold rounded-full">
                          {pendingRequestsCount}
                        </span>
                      )}
                      {currentRole === 'admin' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                  </button>

                  <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setIsRoleDropdownOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer flex items-center justify-between"
                    >
                      <span>{t.signIn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => onOpenLogin(currentRole)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-900 dark:hover:text-amber-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>{t.signIn}</span>
            </button>

            {/* Primary Action */}
            <button
              onClick={onRequestTutorClick}
              className="px-2 sm:px-4 py-2 text-xs font-bold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-800 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{t.requestTutorBtn}</span>
              <span className="hidden min-[380px]:inline sm:hidden">{language === 'am' ? 'አስጠኚ ፈልግ' : 'Find Tutor'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
