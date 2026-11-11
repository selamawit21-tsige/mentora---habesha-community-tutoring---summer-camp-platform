import React from 'react';
import { Tutor, Language } from '../../types';
import { translations } from '../../data/translations';
import { getGradeLabel } from '../../data/gradeLevels';
import { TutorAvatar } from '../TutorAvatar';
import { X, Star, ShieldCheck, Award, GraduationCap, Calendar, Clock, BookOpen } from 'lucide-react';

interface TutorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: Tutor | null;
  language: Language;
  onRequestTutor: (tutor: Tutor) => void;
}

export const TutorDetailModal: React.FC<TutorDetailModalProps> = ({
  isOpen,
  onClose,
  tutor,
  language,
  onRequestTutor,
}) => {
  const t = translations[language];

  if (!isOpen || !tutor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-8 my-2 sm:my-8 transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200 dark:border-slate-800">
          <TutorAvatar
            src={tutor.avatar}
            name={tutor.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm border border-slate-200 dark:border-slate-700"
          />
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {language === 'am' ? tutor.amharicName : tutor.name}
              </h3>
              {tutor.idVerified && (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.verifiedIdBadge} ({tutor.idNumber})
                </span>
              )}
            </div>
            
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-900 dark:text-blue-400 shrink-0" />
              <span>{tutor.degree} · <strong>{language === 'am' ? tutor.amharicUniversity : tutor.university}</strong></span>
            </p>

            <div className="flex items-center gap-4 text-xs pt-1 text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {tutor.rating.toFixed(2)} ({tutor.totalReviews} reviews)
              </span>
              <span>·</span>
              <span>GPA: <strong className="font-mono text-slate-800 dark:text-slate-200">{tutor.gpa}</strong></span>
              <span>·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Ethics Rating: {tutor.characterRating}/5.0
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Biography */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1.5">
              {language === 'am' ? 'የአስተማሪው ገለጻ' : 'Educator Philosophy & Experience'}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {language === 'am' ? tutor.amharicBio : tutor.bio}
            </p>
          </div>

          {/* Grades & Subjects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <h5 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-900 dark:text-amber-400" />
                {language === 'am' ? 'የሚያስተምሯቸው የትምህርት አይነቶች' : 'Subjects Taught'}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {(language === 'am' ? tutor.amharicSubjects : tutor.subjects).map((subj, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                  >
                    {subj}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <h5 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                {language === 'am' ? 'የሚሸፍኗቸው ክፍሎች' : 'Elementary Grades Supported'}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {tutor.gradesSupported.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 text-xs bg-blue-50 dark:bg-blue-950/40 rounded-md border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 font-semibold"
                  >
                    {getGradeLabel(g, language)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Availability & Rates */}
          <div className="bg-blue-50/50 dark:bg-slate-800/80 p-4 rounded-xl border border-blue-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{language === 'am' ? 'የጊዜ መርሃ-ግብር:' : 'Schedule Availability:'}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {language === 'am' ? tutor.amharicAvailability : tutor.availability}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                {language === 'am' ? 'ወርሃዊ የማስጠናት ክፍያ:' : 'Standard Package Rate:'}
              </span>
              <span className="font-mono text-lg font-bold text-blue-950 dark:text-amber-400">
                {tutor.monthlyRate.toLocaleString()} ETB <span className="text-xs font-normal text-slate-500">/ mo</span>
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tutor.badges.map((b, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                {b}
              </span>
            ))}
          </div>

        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            {t.close}
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestTutor(tutor);
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-800 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>{language === 'am' ? `ከ${tutor.amharicName} ጋር አገናኘኝ` : `Request to Connect with ${tutor.name}`}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
