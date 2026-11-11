import React, { useState } from 'react';
import { SummerActivity, Language } from '../../types';
import { translations } from '../../data/translations';
import { getGradeLabel, gradeLevels } from '../../data/gradeLevels';
import { X, Sparkles, CheckCircle, Trophy, Calendar, Check } from 'lucide-react';

interface SummerCampModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: SummerActivity[];
  language: Language;
  onEnrollStudent: (studentName: string, grade: number, selectedActivities: string[], isImprovementAward: boolean) => void;
}

export const SummerCampModal: React.FC<SummerCampModalProps> = ({
  isOpen,
  onClose,
  activities,
  language,
  onEnrollStudent,
}) => {
  const t = translations[language];

  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState(3);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['act-1', 'act-2', 'act-3']);
  const [isImprovementAward, setIsImprovementAward] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleActivity = (id: string) => {
    if (selectedActivities.includes(id)) {
      if (selectedActivities.length > 1) {
        setSelectedActivities(selectedActivities.filter(a => a !== id));
      }
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    onEnrollStudent(studentName, grade, selectedActivities, isImprovementAward);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 my-2 sm:my-8 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'am' ? 'የክረምት ካምፕ መመዝገቢያ (8ቱ ዘርፎች)' : 'Enroll in Mentora 8-Track Summer Camp'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'am'
                  ? 'ስዕል፣ እንቆቅልሽ፣ እግር ኳስ፣ ዲዛይን፣ ግጥም፣ ሙዚቃ፣ ጨዋታ እና ምግብ ዝግጅት'
                  : 'Drawing, Puzzle, Football, Designing, Poem, Music, Games & Cooking'}
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
              {language === 'am' ? 'ምዝገባው በተሳካ ሁኔታ ተጠናቋል!' : 'Summer Camp Enrollment Confirmed!'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {language === 'am'
                ? `ለ${studentName} የተመረጡት ${selectedActivities.length} ዘርፎች ተመዝግበዋል። መልካም የበጋ ወቅት!`
                : `Student ${studentName} registered for ${selectedActivities.length} camp activities. Welcome aboard!`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Student Name & Grade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የተማሪው ስም' : 'Student Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={language === 'am' ? 'ምሳሌ፡ ኢዮብ ዳንኤል' : 'e.g. Eyob Daniel'}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የክፍል ደረጃ (KG 1 - ከ8ኛ ክፍል)' : 'Grade Level (KG 1 through Grade 8)'}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                >
                  {gradeLevels.map(({ value }) => (
                    <option key={value} value={value}>
                      {getGradeLabel(value, language)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select 8 Activities */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'am' ? 'የሚሳተፉባቸውን ዘርፎች ይምረጡ (8ቱ ዘርፎች)' : 'Choose Camp Tracks to Attend (Select 1 or more):'}
                </label>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                  {selectedActivities.length} {language === 'am' ? 'ተመርጠዋል' : 'selected'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {activities.map((act) => {
                  const isSelected = selectedActivities.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      onClick={() => toggleActivity(act.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                        isSelected 
                          ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold' 
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs text-slate-900 dark:text-white block">
                          {act.number}. {language === 'am' ? act.amharicTitle : act.title}
                        </span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {language === 'am' ? act.amharicShortDesc : act.shortDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* High Improvement Award Waiver */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isImprovementAward}
                  onChange={(e) => setIsImprovementAward(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                    {language === 'am' ? 'ጥሩ መሻሻል ላመጣ ተማሪ የነፃ ካምፕ ማበረታቻ (Tru Meshashal):' : 'Claim High Improvement Award (Tru Meshashal):'}
                  </span>
                  <p className="text-emerald-700 dark:text-emerald-400 text-[11px] mt-0.5">
                    {language === 'am'
                      ? 'ተማሪው ባለፈው ወር ከፍተኛ ውጤት እና ስነ-ምግባር ካስመዘገበ የክረምት ካምፕ ሙሉ በሙሉ በነጻ ይሰጠዋል!'
                      : 'If your child demonstrated high academic & ethics growth, the full 100% Free Summer Camp award applies!'}
                  </p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{language === 'am' ? 'ጠቅላላ ክፍያ:' : 'Camp Tuition:'}</span>
                <span className="font-mono text-base font-bold text-slate-900 dark:text-white">
                  {isImprovementAward ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 ETB (100% FREE AWARD)</span>
                  ) : (
                    '3,000 ETB / Summer Term'
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
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
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{language === 'am' ? 'በካምፑ አስመዝግብ' : 'Confirm Camp Registration'}</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
