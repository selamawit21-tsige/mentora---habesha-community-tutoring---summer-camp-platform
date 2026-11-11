import React, { useState } from 'react';
import { ConnectionRequest, Tutor, Language } from '../../types';
import { translations } from '../../data/translations';
import { getGradeLabel } from '../../data/gradeLevels';
import { X, ShieldCheck, Check, Calendar, User, Phone, BookOpen, AlertCircle } from 'lucide-react';

interface AdminConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ConnectionRequest | null;
  tutors: Tutor[];
  language: Language;
  onApproveBridge: (requestId: string, tutorId: string, assignedSchedule: string, adminNotes: string) => void;
}

export const AdminConnectModal: React.FC<AdminConnectModalProps> = ({
  isOpen,
  onClose,
  request,
  tutors,
  language,
  onApproveBridge,
}) => {
  const t = translations[language];

  const [selectedTutorId, setSelectedTutorId] = useState<string>('');
  const [assignedSchedule, setAssignedSchedule] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState<string>('');

  React.useEffect(() => {
    if (request) {
      setSelectedTutorId(request.tutorId || tutors[0]?.id || '');
      setAssignedSchedule(
        request.assignedSchedule ||
        request.preferredSchedule ||
        'Confirmed: Mon, Wed, Fri at 4:30 PM (Addis Ababa Time)'
      );
      setAdminNotes(
        request.adminNotes ||
        'Background credentials checked and certified. Optimal learning match established.'
      );
    }
  }, [request, tutors]);

  if (!isOpen || !request) return null;

  const currentTutor = tutors.find(t => t.id === selectedTutorId);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onApproveBridge(request.id, selectedTutorId, assignedSchedule, adminNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 md:p-7 my-2 sm:my-8 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'am' ? 'የድልድይ ማገናኛ ማጽደቂያ' : 'Bridge Connection & Scheduling'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'am'
                  ? `የጥያቄ መለያ: #${request.id} · ተማሪ፡ ${request.studentName}`
                  : `Request #${request.id} · Student: ${request.studentName}`}
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

        <form onSubmit={handleConfirm} className="mt-5 space-y-4">
          
          {/* Request Overview Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="flex justify-between items-center font-semibold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-900 dark:text-blue-400" />
                {request.studentName} ({getGradeLabel(request.grade, language)})
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold">
                {request.packageType === 'private_3500' ? '3,500 ETB Private' : '2,500 ETB Group'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">{language === 'am' ? 'ወላጅ:' : 'Parent:'}</span>
                <span className="font-medium">{request.parentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{language === 'am' ? 'ስልክ:' : 'Phone:'}</span>
                <span className="font-mono">{request.parentPhone}</span>
              </div>
            </div>

            {request.specialNeeds && (
              <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 block text-[11px]">{language === 'am' ? 'የተማሪው ልዩ ፍላጎት:' : 'Special Needs & Notes:'}</span>
                <p className="text-slate-700 dark:text-slate-200 italic mt-0.5">
                  "{request.specialNeeds}"
                </p>
              </div>
            )}

            {request.appliedDiscountNote && (
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                ★ {request.appliedDiscountNote}
              </div>
            )}
          </div>

          {/* Assigned Tutor Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'am' ? 'የሚገናኘው የተረጋገጠ አስጠኚ' : 'Assigned Certified Tutor'} *
            </label>
            <select
              value={selectedTutorId}
              onChange={(e) => setSelectedTutorId(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            >
              {tutors.map((tut) => (
                <option key={tut.id} value={tut.id}>
                  {language === 'am' ? tut.amharicName : tut.name} — {tut.degree} ({tut.idNumber})
                </option>
              ))}
            </select>
          </div>

          {/* Official Schedule Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.assignScheduleLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={assignedSchedule}
                onChange={(e) => setAssignedSchedule(e.target.value)}
                placeholder="Confirmed: Mon, Wed, Fri at 4:30 PM"
                className="w-full pl-9 pr-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Admin Review Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.adminNotesLabel}
            </label>
            <textarea
              rows={2}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Verified compatibility, syllabus alignment, and mutual confirmation."
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              {language === 'am'
                ? 'ማረጋገጫውን ሲጫኑ ወላጁም ሆኑ አስጠኚው የመርሐ-ግብር መልዕክት ይደርሳቸዋል፤ ድልድዩ በስራ ላይ ይውላል።'
                : 'Clicking approve establishes the official bridge session, notifies both parties, and activates session tracking.'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{t.approveBridgeBtn}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
