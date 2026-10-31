import React, { useState } from 'react';
import { UserRole, Language } from '../../types';
import { translations } from '../../data/translations';
import mentoraLogo from '../../mentora.jpg';
import { 
  User, GraduationCap, Shield, ArrowLeft, Lock, Phone, 
  Mail, KeyRound, Sparkles, CheckCircle2, ArrowRight 
} from 'lucide-react';

interface LoginPageProps {
  initialRole?: UserRole;
  language: Language;
  onLoginSuccess: (role: UserRole) => void;
  onBackToHome: () => void;
  onOpenRegisterTutor: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialRole = 'parent',
  language,
  onLoginSuccess,
  onBackToHome,
  onOpenRegisterTutor,
}) => {
  const t = translations[language];

  const [activeRoleTab, setActiveRoleTab] = useState<'parent' | 'tutor' | 'admin'>(
    initialRole === 'tutor' ? 'tutor' : initialRole === 'admin' ? 'admin' : 'parent'
  );

  // Form states
  const [parentIdentifier, setParentIdentifier] = useState('+251 91 123 4567');
  const [parentPassword, setParentPassword] = useState('••••••••');

  const [tutorIdentifier, setTutorIdentifier] = useState('ET-AA-09214 (Bethlehem)');
  const [tutorPassword, setTutorPassword] = useState('••••••••');

  const [adminIdentifier, setAdminIdentifier] = useState('admin@mentora.et');
  const [adminKey, setAdminKey] = useState('••••••••••••');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(activeRoleTab);
  };

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-10 space-y-6">
      
      {/* Back to Home */}
      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-amber-400 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>{t.backToHome}</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-6 transition-all">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-3">
          <div className="w-28 h-16 rounded-2xl mx-auto overflow-hidden bg-white shadow-sm border border-slate-200 p-1">
            <img
              src={mentoraLogo}
              alt="Mentora"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t.loginPageTitle}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.loginSubtitle}
            </p>
          </div>
        </div>

        {/* 3 Role Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveRoleTab('parent')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeRoleTab === 'parent'
                ? 'bg-white dark:bg-slate-900 text-blue-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-blue-900 dark:text-blue-400" />
            <span>{t.parentLoginTab}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRoleTab('tutor')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeRoleTab === 'tutor'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>{t.tutorLoginTab}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRoleTab('admin')}
            className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              activeRoleTab === 'admin'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>{t.adminLoginTab}</span>
          </button>
        </div>

        {/* Tab-Specific Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          {activeRoleTab === 'parent' && (
            <>
              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/20 rounded-xl border border-blue-200/60 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300">
                <span className="font-bold block">
                  {language === 'am' ? 'የወላጅ መግቢያ:' : 'Parent Access:'}
                </span>
                <span className="text-[11px] text-blue-800 dark:text-blue-300/80">
                  {language === 'am'
                    ? 'የልጆችዎትን የቤት ለቤት ትምህርት ለመከታተል እና አስጠኚዎችን ለመምረጥ'
                    : 'Manage your children’s home tutoring, schedule requests, and discounts.'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የስልክ ቁጥር ወይም ኢሜይል' : 'Phone Number or Email'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={parentIdentifier}
                    onChange={(e) => setParentIdentifier(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የይለፍ ቃል (Password)' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={parentPassword}
                    onChange={(e) => setParentPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>
            </>
          )}

          {activeRoleTab === 'tutor' && (
            <>
              <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/60 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-300">
                <span className="font-bold block">
                  {language === 'am' ? 'የአስጠኚዎች መግቢያ:' : 'Certified Educator Access:'}
                </span>
                <span className="text-[11px] text-amber-800 dark:text-amber-300/80">
                  {language === 'am'
                    ? 'የተመደቡ ተማሪዎችን ለማየት፣ የስነ-ምግባር እድገት ለመመዝገብ እና ቦነስ ለመቀበል'
                    : 'Access assigned students, log confidence & ethics, and claim performance bonuses.'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የአስጠኚ መለያ ቁጥር (Tutor ID)' : 'Educator National ID or Email'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={tutorIdentifier}
                    onChange={(e) => setTutorIdentifier(e.target.value)}
                    placeholder="ET-AA-09214"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
                  />
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የይለፍ ቃል' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={tutorPassword}
                    onChange={(e) => setTutorPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Tutor Account Registration Option */}
              <div className="p-3 bg-amber-50/50 dark:bg-slate-800 rounded-xl border border-amber-200/80 dark:border-slate-700 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {language === 'am' ? 'አዲስ አስጠኚ ነዎት?' : 'New Educator in Community?'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'am' ? 'የአስጠኚ አካውንት በመክፈት ተማሪዎችን ያስተምሩ' : 'Create your tutor profile to start mentoring'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenRegisterTutor}
                  className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  {language === 'am' ? 'አካውንት ክፈት' : 'Register Here'}
                </button>
              </div>
            </>
          )}

          {activeRoleTab === 'admin' && (
            <>
              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/60 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-300">
                <span className="font-bold block">
                  {language === 'am' ? 'የአስተዳዳሪ ድልድይ መቆጣጠሪያ:' : 'Central Bridge Authority:'}
                </span>
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300/80">
                  {language === 'am'
                    ? 'የወላጅና አስጠኚ ጥያቄዎችን ለማገናኘት፣ መርሐ-ግብር ለመመደብ እና ቦነሶችን ለማጽደቅ'
                    : 'Review match requests, assign schedules, verify tutors, and disburse bonuses.'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የአስተዳዳሪ ኢሜይል' : 'Administrator Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={adminIdentifier}
                    onChange={(e) => setAdminIdentifier(e.target.value)}
                    placeholder="admin@mentora.et"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የደህንነት ቁልፍ (Security Key)' : 'Security Key'}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <span>{language === 'am' ? `${activeRoleTab === 'parent' ? 'እንደ ወላጅ' : activeRoleTab === 'tutor' ? 'እንደ አስጠኚ' : 'እንደ አስተዳዳሪ'} ግባ` : `Sign In to ${activeRoleTab === 'parent' ? 'Parent' : activeRoleTab === 'tutor' ? 'Tutor' : 'Admin'} Portal`}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          {/* Quick Demo Instant Access Button */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={() => onLoginSuccess(activeRoleTab)}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.demoLoginBtn}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
