import React, { useState } from 'react';
import { Student, StudentGrowthLog, Language } from '../../types';
import { translations } from '../../data/translations';
import { X, Award, CheckCircle, HeartHandshake, Dumbbell, ShieldCheck, BookOpen } from 'lucide-react';

interface LogGrowthModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  tutorId: string;
  tutorName: string;
  language: Language;
  onSubmitGrowthLog: (log: Omit<StudentGrowthLog, 'id'>) => void;
}

export const LogGrowthModal: React.FC<LogGrowthModalProps> = ({
  isOpen,
  onClose,
  student,
  tutorId,
  tutorName,
  language,
  onSubmitGrowthLog,
}) => {
  const t = translations[language];

  const [academicProgress, setAcademicProgress] = useState(88);
  const [confidenceScore, setConfidenceScore] = useState(90);
  const [sportsDisciplineScore, setSportsDisciplineScore] = useState(85);
  const [ethicsBehaviorScore, setEthicsBehaviorScore] = useState(95);
  const [observations, setObservations] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !student) return null;

  // Bonus calculation based on holistic growth
  // If ethics >= 90 and confidence >= 85 and sports >= 80 -> 750 ETB, else 500 ETB
  const calculatedBonus = (ethicsBehaviorScore >= 90 && confidenceScore >= 85) ? 750 : 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmitGrowthLog({
      tutorId,
      tutorName,
      studentId: student.id,
      studentName: student.studentName,
      grade: student.grade,
      date: new Date().toISOString().split('T')[0],
      academicProgress,
      confidenceScore,
      sportsDisciplineScore,
      ethicsBehaviorScore,
      observations: observations || (language === 'am' 
        ? 'ተማሪው በራስ መተማመን እና መልካም ስነ-ምግባር ላይ ከፍተኛ መሻሻል አሳይቷል!' 
        : 'Student demonstrated admirable growth in self-confidence, study habits, and respectful manners.'),
      tutorBonusEarned: calculatedBonus,
      status: 'submitted',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-7 my-8 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'am' ? 'የተማሪ የስነ-ምግባር እና የእድገት መመዝገቢያ' : 'Log Student Growth & Character'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'am' 
                  ? `ተማሪ፡ ${student.studentName} (${student.grade}ኛ ክፍል) · መምህር፡ ${tutorName}`
                  : `Student: ${student.studentName} (Grade ${student.grade}) · Mentor: ${tutorName}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'am' ? 'የእድገት ሪፖርቱ ተመዝግቧል!' : 'Growth Log Successfully Submitted!'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {language === 'am'
                ? `የ${calculatedBonus} ብር የአስጠኚ ማበረታቻ ቦነስ ለአስተዳዳሪ ማጽደቂያ ተልኳል። እናመሰግናለን!`
                : `A ${calculatedBonus} ETB performance bonus has been queued for Admin disbursement. Thank you!`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Promo banner */}
            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-300">
              <span className="font-bold block mb-0.5">
                {language === 'am' ? 'የአስጠኚ የስነ-ምግባር ቦነስ ደንብ:' : 'Tutor Character & Ethics Incentive Rule:'}
              </span>
              <p className="text-[11px] leading-relaxed">
                "{language === 'am' ? 'ተማሪዎችን ያሻሻለ ማለትም በኮንፊደንስ፣ ስፖርት፣ ስነ-ምግባር ያሻሻለ አስጠኚ ቦነስ ያገኛል' : 'Tutors who uplift students in confidence, sports, and good ethics earn financial growth bonuses!'}"
              </p>
            </div>

            {/* Score Sliders */}
            <div className="space-y-4 pt-1">
              {/* Ethics / Sene-Megbar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5 text-blue-900 dark:text-amber-400">
                    <HeartHandshake className="w-4 h-4" />
                    {language === 'am' ? 'ስነ-ምግባር እና አክብሮት (Ethics & Respect)' : 'Ethics & Respect (ሥነ-ምግባር)'}
                  </span>
                  <span className="font-mono text-sm font-bold">{ethicsBehaviorScore}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={ethicsBehaviorScore}
                  onChange={(e) => setEthicsBehaviorScore(Number(e.target.value))}
                  className="w-full accent-blue-900 dark:accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Confidence */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                    {language === 'am' ? 'በራስ መተማመን (Self-Confidence)' : 'Self-Confidence & Speaking'}
                  </span>
                  <span className="font-mono text-sm font-bold">{confidenceScore}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={confidenceScore}
                  onChange={(e) => setConfidenceScore(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Sports & Discipline */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Dumbbell className="w-4 h-4" />
                    {language === 'am' ? 'ስፖርት እና አካላዊ ቅልጥፍና (Sports & Fitness)' : 'Sports & Athletic Discipline'}
                  </span>
                  <span className="font-mono text-sm font-bold">{sportsDisciplineScore}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={sportsDisciplineScore}
                  onChange={(e) => setSportsDisciplineScore(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Academic Progress */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="w-4 h-4" />
                    {language === 'am' ? 'የትምህርት ውጤት (Academic Progress)' : 'Academic Subject Mastery'}
                  </span>
                  <span className="font-mono text-sm font-bold">{academicProgress}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={academicProgress}
                  onChange={(e) => setAcademicProgress(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Observations */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'am' ? 'የተማሪው የሳምንቱ ለውጥ ማስታወሻ' : 'Specific Progress Notes & Observations'}
              </label>
              <textarea
                rows={2}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder={language === 'am' 
                  ? 'ምሳሌ፡ ተማሪው የሒሳብ ስራዎችን በሰዓቱ አጠናቋል፤ በንባብ ጊዜ ከፍተኛ ድፍረት አሳይቷል...' 
                  : 'e.g. Student answered reading questions eagerly; greeted parents with great respect; stayed focused throughout session.'}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              />
            </div>

            {/* Bonus Box */}
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                  {language === 'am' ? 'የሚገባዎት የማበረታቻ ቦነስ:' : 'Eligible Tutor Performance Bonus:'}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  {language === 'am' ? 'በአስተዳዳሪ ተረጋግጦ ይከፈላል' : 'Authorized for admin disbursement upon submission'}
                </span>
              </div>
              <span className="font-mono text-base font-bold text-emerald-700 dark:text-emerald-300">
                +{calculatedBonus} ETB
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-800 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>{language === 'am' ? 'እድገቱን መዝግብ እና ቦነስ ጠይቅ' : 'Submit Growth & Claim Bonus'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
