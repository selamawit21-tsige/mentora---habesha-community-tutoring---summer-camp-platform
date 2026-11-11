import React, { useState } from 'react';
import { PackageOffer, SpecialIncentive, SummerActivity, AgazBook, Language, UserRole, Tutor } from '../types';
import { translations } from '../data/translations';
import { TutorAvatar } from './TutorAvatar';
import mentoraLogo from '../mentora.jpg';
import { 
  GraduationCap, Sparkles, Check, Star, ShieldCheck, HeartHandshake, 
  Dumbbell, BookOpen, Palette, Puzzle, Trophy, Feather, Music, Gamepad2, 
  Utensils, ArrowRight, Award, Calculator, Download, ChevronRight, CheckCircle2 
} from 'lucide-react';

interface PublicLandingProps {
  packages: PackageOffer[];
  incentives: SpecialIncentive[];
  summerActivities: SummerActivity[];
  agazBooks: AgazBook[];
  tutors: Tutor[];
  language: Language;
  onSelectRole: (role: UserRole) => void;
  onOpenRequestModal: () => void;
  onOpenSummerCampModal: () => void;
  onOpenRegisterTutor?: () => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  packages,
  incentives,
  summerActivities,
  agazBooks,
  tutors,
  language,
  onSelectRole,
  onOpenRequestModal,
  onOpenSummerCampModal,
  onOpenRegisterTutor,
}) => {
  const t = translations[language];

  // Interactive Discount Calculator State
  const [calcChildrenCount, setCalcChildrenCount] = useState<number>(3);
  const [calcPackage, setCalcPackage] = useState<'private_3500' | 'group_2500'>('private_3500');
  const [calcPrepayMonths, setCalcPrepayMonths] = useState<number>(6);

  // Activity icon map
  const getIcon = (name: string) => {
    switch (name) {
      case 'Palette': return <Palette className="w-6 h-6 text-pink-500" />;
      case 'Puzzle': return <Puzzle className="w-6 h-6 text-indigo-500" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-yellow-500" />;
      case 'Feather': return <Feather className="w-6 h-6 text-purple-500" />;
      case 'Music': return <Music className="w-6 h-6 text-blue-500" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-emerald-500" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-orange-500" />;
      default: return <Sparkles className="w-6 h-6 text-amber-500" />;
    }
  };

  // Calculator logic
  const unitPrice = calcPackage === 'private_3500' ? 3500 : 2500;
  // If 3 children -> 3rd child is 100% free (pay for 2)
  const effectiveChildrenToPay = calcChildrenCount >= 3 ? calcChildrenCount - 1 : calcChildrenCount;
  const standardMonthly = calcChildrenCount * unitPrice;
  const monthlyWithChildDiscount = effectiveChildrenToPay * unitPrice;
  // 6 month prepayment -> pay for 5 months
  const isSixMonthsPrepay = calcPrepayMonths === 6;
  const totalMonthsMultiplier = isSixMonthsPrepay ? 5 : calcPrepayMonths;
  const finalTotalAmount = monthlyWithChildDiscount * totalMonthsMultiplier;
  const standardTotalWithoutAnyDiscount = standardMonthly * calcPrepayMonths;
  const totalSaved = standardTotalWithoutAnyDiscount - finalTotalAmount;

  return (
    <div className="space-y-16 py-4">
      
      {/* 1. Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-balance">
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectRole('parent')}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5 text-slate-950" />
              <span>{t.heroCtaParent}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectRole('tutor')}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-xs transition-all cursor-pointer flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t.heroCtaTutor}</span>
            </button>

            <button
              onClick={() => onSelectRole('admin')}
              className="px-4 py-3 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {language === 'am' ? 'የአስተዳዳሪ ድልድይ ገጽ →' : 'Admin Bridge Console →'}
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 block">
                {t.heroStat1Value}
              </span>
              <span className="text-xs text-slate-400">{t.heroStat1Label}</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                {t.heroStat2Value}
              </span>
              <span className="text-xs text-slate-400">{t.heroStat2Label}</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                {t.heroStat3Value}
              </span>
              <span className="text-xs text-slate-400">{t.heroStat3Label}</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 block">
                {t.heroStat4Value}
              </span>
              <span className="text-xs text-slate-400">{t.heroStat4Label}</span>
            </div>
          </div>

        </div>

        {/* Ambient subtle glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-10 top-10 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 2. Featured Home to Home Tutors Showcase */}
      <section id="find-tutors" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {language === 'am' ? 'የተረጋገጡ የቤት ለቤት አስጠኚዎች' : 'Verified Home to Home Educators'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {language === 'am' ? 'ብቁ እና የተመሰገኑ አስጠኚዎች' : 'Find Your Child’s Ideal Tutor'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {language === 'am' 
                ? 'በዩኒቨርሲቲ ዲግሪ የተመረቁ፣ ብሔራዊ መታወቂያቸው የተረጋገጠ እና በስነ-ምግባር የታነፁ'
                : 'AAU and leading university graduates with verified government IDs and proven academic track records.'}
            </p>
          </div>

          <button
            onClick={() => onSelectRole('parent')}
            className="px-4 py-2 text-xs font-bold text-blue-950 dark:text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>{language === 'am' ? 'ሁሉንም በወላጅ ገጽ ይመልከቱ' : 'View Full Catalog in Parent Portal'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tutors.slice(0, 3).map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <TutorAvatar
                    src={tutor.avatar}
                    name={tutor.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-amber-400 shadow-xs shrink-0"
                  />
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {language === 'am' ? tutor.amharicName : tutor.name}
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">
                      {tutor.degree}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-0.5">
                      <span className="font-semibold text-emerald-600">ID #{tutor.idNumber}</span>
                      <span>·</span>
                      <span className="font-bold text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-current" /> {tutor.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {(language === 'am' ? tutor.amharicSubjects : tutor.subjects).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {language === 'am' ? tutor.amharicBio : tutor.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'am' ? 'ወርሃዊ ክፍያ' : 'Monthly'}</span>
                  <span className="font-mono text-sm font-bold text-blue-950 dark:text-amber-400">
                    {tutor.monthlyRate.toLocaleString()} ETB
                  </span>
                </div>
                <button
                  onClick={onOpenRequestModal}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 rounded-lg shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>{language === 'am' ? 'አስጠኚ ጠይቅ' : 'Request Tutor'}</span>
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Join as an Educator / Register as Tutor banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-800/60 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-white">
                {language === 'am' ? 'የዩኒቨርሲቲ ተመራቂ ነዎት? አስጠኚ ሆነው ይመዝገቡ' : 'Are you a University Graduate? Teach with Mentora'}
              </h4>
              <p className="text-xs text-slate-300">
                {language === 'am' 
                  ? 'የተሟላ ክፍያ፣ የስነ-ምግባር እና የተማሪ ማሻሻያ ቦነሶች ያግኙ' 
                  : 'Verified credentials, prompt payouts, and character/ethics achievement bonuses.'}
              </p>
            </div>
          </div>
          {onOpenRegisterTutor ? (
            <button
              onClick={onOpenRegisterTutor}
              className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'am' ? 'የአስጠኚ መለያ ይፍጠሩ' : 'Create Tutor Account'}</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectRole('tutor')}
              className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>{t.tutorPortal}</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. Packages & Pricing Section */}
      <section id="packages" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {language === 'am' ? 'የተስተካከለ ዋጋ' : 'Curated Curriculum Packages'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.packagesTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.packagesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 transition-all flex flex-col justify-between space-y-6 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-blue-950 to-slate-900 text-white shadow-xl ring-2 ring-amber-400 relative'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[11px] shadow-sm">
                  {language === 'am' ? 'በብዛት የተመረጠ' : 'Most Popular Choice'}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-amber-400 block mb-1">
                    {pkg.gradeRange}
                  </span>
                  <h3 className="text-xl font-bold">
                    {language === 'am' ? pkg.amharicName : pkg.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 mt-1 leading-relaxed">
                    {language === 'am' ? pkg.amharicDescription : pkg.description}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-4xl font-extrabold text-amber-400">
                    {pkg.price.toLocaleString()}
                  </span>{' '}
                  <span className="text-xs text-slate-400">
                    {language === 'am' ? pkg.amharicBillingPeriod : pkg.billingPeriod}
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200/20 dark:border-slate-800">
                  <span className="text-xs font-semibold block text-slate-300">
                    {t.packageFeaturesTitle}
                  </span>
                  {(language === 'am' ? pkg.amharicFeatures : pkg.features).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={pkg.popular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenRequestModal}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                  pkg.popular
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-blue-950 dark:bg-amber-500 text-white dark:text-slate-950 hover:bg-blue-900 dark:hover:bg-amber-400'
                }`}
              >
                <span>{t.choosePlan}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The 5 Special Mentora Privileges & Rules */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {language === 'am' ? 'የማህበረሰብ ማበረታቻዎች' : '5 Community Privileges'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.promoHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {incentives.map((inc) => (
            <div
              key={inc.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {language === 'am' ? inc.amharicBenefitTag : inc.benefitTag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'am' ? inc.amharicTitle : inc.title}
                </h3>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-blue-950 dark:text-amber-300 italic">
                  "{language === 'am' ? inc.amharicRuleTitle : inc.ruleTitle}"
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'am' ? inc.amharicDescription : inc.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'am' ? 'በስራ ላይ ያለ ደንብ' : 'Active Mentora Rule'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The 8-Track Summer Camp */}
      <section id="summer-camp" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {language === 'am' ? 'የበጋ ወቅት ልዩ ፕሮግራም' : 'Summer Enrichment Program'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.summerCampTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t.summerCampSubtitle}
            </p>
          </div>

          <button
            onClick={onOpenSummerCampModal}
            className="px-5 py-2.5 text-xs font-bold text-white bg-blue-950 dark:bg-amber-500 dark:text-slate-950 hover:bg-blue-900 dark:hover:bg-amber-400 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-400 dark:text-slate-950" />
            <span>{language === 'am' ? 'በካምፑ ይመዝገቡ' : 'Enroll in Summer Camp'}</span>
          </button>
        </div>

        {/* 8 Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summerActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {getIcon(act.iconName)}
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">
                  0{act.number}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                  {act.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {language === 'am' ? act.amharicTitle : act.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {language === 'am' ? act.amharicShortDesc : act.shortDesc}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                {(language === 'am' ? act.amharicHighlights : act.highlights).map((hl, i) => (
                  <div key={i} className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 pt-1">
                {language === 'am' ? act.amharicSchedule : act.schedule}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Agaz Books & Habesha Educational Resources */}
      <section id="books" className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {language === 'am' ? 'የትምህርት ድጋፍ' : 'Supplemental References'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.booksTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.booksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {agazBooks.map((book) => (
            <div
              key={book.id}
              className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Book Cover Visual */}
                <div className={`h-32 rounded-xl bg-gradient-to-br ${book.coverAccent} p-4 text-white flex flex-col justify-between shadow-xs`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/30 backdrop-blur-xs">
                      {language === 'am' ? `${book.grade}ኛ ክፍል` : `Grade ${book.grade}`}
                    </span>
                    <BookOpen className="w-4 h-4 text-white/80" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs line-clamp-2">
                      {language === 'am' ? book.amharicTitle : book.title}
                    </h4>
                    <span className="text-[10px] text-white/70 block mt-0.5">
                      {book.author}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{language === 'am' ? book.amharicSubject : book.subject}</span>
                    <span className="font-mono">{book.pageCount} pages</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                    {language === 'am' ? book.amharicDescription : book.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                {book.isReward && (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{t.freeRewardBadge}</span>
                  </span>
                )}
                <button
                  onClick={() => alert(language === 'am' ? `የ${book.amharicTitle} የማጣቀሻ ቅጽበታዊ ቅጂ ተከፍቷል!` : `Opening reference guide for: ${book.title}`)}
                  className="w-full py-2 px-3 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-blue-900 dark:text-amber-400" />
                  <span>{t.downloadBook}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive Savings & Privilege Calculator */}
      <section className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>{t.calculateDiscount}</span>
          </span>
          <h2 className="text-2xl font-bold tracking-tight">
            {language === 'am' ? 'የ3 ልጆች እና የ6 ወር ቅድመ-ክፍያ የገንዘብ ቁጠባ ማስያ' : 'Family & Advance Prepayment Savings Estimator'}
          </h2>
          <p className="text-xs text-slate-300">
            {language === 'am'
              ? '3 ልጅ ሲያስመዘግቡ 3ኛው ልጅ ሙሉ በሙሉ በነጻ ይማራል፤ የ6 ወር ቅድመ-ክፍያ ሲከፍሉ ደግሞ የ1 ወር በነፃ ያገኛሉ።'
              : 'Estimate exact tuition with our 3rd child 100% free discount and 6-month advance payment 1-month-free benefit.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Controls */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Number of children */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                {language === 'am' ? 'የልጆች ብዛት:' : 'Children Enrolled:'}
              </label>
              <select
                value={calcChildrenCount}
                onChange={(e) => setCalcChildrenCount(Number(e.target.value))}
                className="w-full p-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white font-bold"
              >
                <option value={1}>1 Child</option>
                <option value={2}>2 Children</option>
                <option value={3}>3 Children (3rd FREE!)</option>
                <option value={4}>4 Children (3rd FREE!)</option>
              </select>
              {calcChildrenCount >= 3 && (
                <span className="text-[11px] text-amber-400 font-bold block">
                  ★ 3rd Child 100% Free Applied!
                </span>
              )}
            </div>

            {/* Package */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                {language === 'am' ? 'የፓኬጅ አይነት:' : 'Package:'}
              </label>
              <select
                value={calcPackage}
                onChange={(e) => setCalcPackage(e.target.value as any)}
                className="w-full p-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white font-bold"
              >
                <option value="private_3500">Private (3,500 ETB)</option>
                <option value="group_2500">Group (2,500 ETB)</option>
              </select>
            </div>

            {/* Prepay Term */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                {language === 'am' ? 'የክፍያ ቆይታ:' : 'Payment Cadence:'}
              </label>
              <select
                value={calcPrepayMonths}
                onChange={(e) => setCalcPrepayMonths(Number(e.target.value))}
                className="w-full p-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-white font-bold"
              >
                <option value={1}>1 Month (Standard)</option>
                <option value={3}>3 Months</option>
                <option value={6}>6 Months (1 Month FREE!)</option>
              </select>
              {calcPrepayMonths === 6 && (
                <span className="text-[11px] text-emerald-400 font-bold block">
                  ★ Pay 5 Months, Get 6 Months!
                </span>
              )}
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs text-slate-300 block uppercase font-medium">
                {language === 'am' ? 'የተሰላ ጠቅላላ ክፍያ:' : 'Estimated Total Investment:'}
              </span>
              <div className="font-mono text-3xl font-extrabold text-amber-400">
                {finalTotalAmount.toLocaleString()} ETB
              </div>
              {totalSaved > 0 && (
                <div className="text-xs text-emerald-400 font-bold">
                  🎉 Total Savings: {totalSaved.toLocaleString()} ETB
                </div>
              )}
            </div>

            <button
              onClick={onOpenRequestModal}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              {language === 'am' ? 'በዚህ ቅናሽ አስጠኚ ጠይቅ' : 'Enroll with this Privilege'}
            </button>
          </div>

        </div>
      </section>

      {/* 7. Bridge Model 4-Step Diagram */}
      <section id="bridge" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-900 dark:text-amber-400 uppercase tracking-wider">
            {language === 'am' ? 'አስተማማኝ ቁጥጥር' : 'Quality Assurance'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.bridgeTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.bridgeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.bridgeStep1Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.bridgeStep1Desc}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.bridgeStep2Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.bridgeStep2Desc}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.bridgeStep3Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.bridgeStep3Desc}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 font-bold text-xs flex items-center justify-center">
              4
            </span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.bridgeStep4Title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.bridgeStep4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={mentoraLogo}
            alt="Mentora logo"
            className="w-7 h-7 rounded-lg object-contain"
          />
          <span className="font-bold text-slate-900 dark:text-white">Mentora</span>
          <span>·</span>
          <span>© 2026 Mentora Education. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Addis Ababa · Habesha Community Global</span>
          <span>·</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">Bridge Active</span>
        </div>
      </footer>

    </div>
  );
};
