import React, { useState } from 'react';
import { Tutor, Student, ConnectionRequest, StudentGrowthLog, Language } from '../../types';
import { translations } from '../../data/translations';
import { 
  ShieldCheck, Users, CheckCircle2, Clock, AlertCircle, 
  Award, ArrowRight, BookOpen, Sparkles, Check, XCircle 
} from 'lucide-react';

interface AdminDashboardProps {
  tutors: Tutor[];
  students: Student[];
  requests: ConnectionRequest[];
  growthLogs: StudentGrowthLog[];
  language: Language;
  onOpenConnectModal: (request: ConnectionRequest) => void;
  onApproveBonus: (logId: string) => void;
  onVerifyTutor: (tutorId: string) => void;
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tutors,
  students,
  requests,
  growthLogs,
  language,
  onOpenConnectModal,
  onApproveBonus,
  onVerifyTutor,
  onBackToHome,
}) => {
  const t = translations[language];

  const pendingRequests = requests.filter(r => r.status === 'pending_review');
  const connectedRequests = requests.filter(r => r.status === 'admin_connected');

  // Total bonuses pending & disbursed
  const totalBonusesDisbursed = growthLogs
    .filter(l => l.status === 'bonus_approved_by_admin')
    .reduce((sum, l) => sum + l.tutorBonusEarned, 0);

  const pendingBonusLogs = growthLogs.filter(l => l.status === 'submitted');

  return (
    <div className="space-y-8">
      
      {/* Top Breadcrumb & Back to Home */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-amber-400 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 rotate-180 text-amber-500" />
          <span>{t.backToHome}</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          {language === 'am' ? 'የአስተዳዳሪ ማዕከል' : 'Central Admin Console'}
        </span>
      </div>
      
      {/* Admin Bridge Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'የማዕከላዊ ድልድይ ቁጥጥር' : 'Central Bridge Authority'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.adminWelcome}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.adminHeaderDesc}
          </p>
        </div>

        {/* 4 Key Bridge Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 mt-6 relative z-10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">
              {language === 'am' ? 'በመጠባበቅ ላይ ያሉ ጥያቄዎች' : 'Pending Match Queue'}
            </span>
            <span className="font-mono text-xl font-bold text-amber-400">
              {pendingRequests.length}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">
              {language === 'am' ? 'የተገናኙ ክፍለ-ጊዜዎች' : 'Active Bridge Sessions'}
            </span>
            <span className="font-mono text-xl font-bold text-emerald-400">
              {connectedRequests.length}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">
              {language === 'am' ? 'የተረጋገጡ አስጠኚዎች' : 'Verified Mentors'}
            </span>
            <span className="font-mono text-xl font-bold text-white">
              {tutors.length}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">
              {language === 'am' ? 'የተከፈሉ ቦነሶች' : 'Total Bonuses Disbursed'}
            </span>
            <span className="font-mono text-xl font-bold text-amber-400">
              {totalBonusesDisbursed.toLocaleString()} ETB
            </span>
          </div>
        </div>
      </div>

      {/* Section 1: Pending Bridge Match Queue (The Core Bridge Action) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{t.pendingQueue}</span>
              {pendingRequests.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-full">
                  {pendingRequests.length} Needs Action
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am'
                ? 'ወላጆች ያስገቧቸውን ጥያቄዎች ይገምግሙ፤ ተገቢውን አስጠኚ መድበው መርሐ-ግብር በማዘጋጀት ያገናኙ።'
                : 'Review parent requests, evaluate tutor schedules, and connect the official bridge.'}
            </p>
          </div>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            {language === 'am' ? 'በአሁኑ ወቅት በመጠባበቅ ላይ ያለ አዲስ ጥያቄ የለም።' : 'No pending bridge requests in the queue.'}
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-500">#{req.id}</span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {req.studentName} ({language === 'am' ? `${req.grade}ኛ ክፍል` : `Grade ${req.grade}`})
                    </h3>
                    <span>·</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {req.school}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-300">
                      {req.packageType === 'private_3500' ? 'Private 3,500 ETB' : 'Group 2,500 ETB'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[11px]">{language === 'am' ? 'የወላጅ መረጃ:' : 'Parent Contact:'}</span>
                      <span className="font-medium">{req.parentName} ({req.parentPhone})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">{language === 'am' ? 'የተጠየቀው አስጠኚ:' : 'Requested Tutor:'}</span>
                      <span className="font-semibold text-blue-950 dark:text-amber-400">{req.tutorName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong>{language === 'am' ? 'የትምህርት ርዕሶች:' : 'Target Subjects:'}</strong> {req.targetSubjects.join(', ')} ·{' '}
                    <strong>{language === 'am' ? 'የተመረጠ ሰዓት:' : 'Preferred Time:'}</strong> {req.preferredSchedule}
                  </p>

                  <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">{t.specialNeedsLabel}</span>
                    <p className="text-slate-800 dark:text-slate-200 italic mt-0.5">
                      "{req.specialNeeds}"
                    </p>
                  </div>

                  {req.appliedDiscountNote && (
                    <span className="inline-block text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      ★ Privilege: {req.appliedDiscountNote}
                    </span>
                  )}
                </div>

                {/* Primary Admin Bridge Trigger */}
                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-end gap-2">
                  <button
                    onClick={() => onOpenConnectModal(req)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-blue-950 dark:bg-amber-500 dark:text-slate-950 hover:bg-blue-900 dark:hover:bg-amber-400 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.approveBridgeBtn}</span>
                  </button>
                  <span className="text-[11px] text-slate-400 text-center sm:text-right">
                    {language === 'am' ? 'መርሐ-ግብር በመመደብ ያገናኙ' : 'Assign schedule & lock bridge'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Active Connected Bridges */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.connectedSessions}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am'
                ? 'በሜንቶራ ድልድይ ተገናኝተው በመማር ላይ ያሉ ተማሪዎች እና አስጠኚዎች'
                : 'Active pairings currently monitored and managed by Mentora'}
            </p>
          </div>
          <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            {connectedRequests.length} Connected
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase">
                <th className="py-3 px-3">Req ID</th>
                <th className="py-3 px-3">Student & Grade</th>
                <th className="py-3 px-3">Parent</th>
                <th className="py-3 px-3">Connected Mentor</th>
                <th className="py-3 px-3">Package / Rate</th>
                <th className="py-3 px-3">Official Schedule</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {connectedRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-400 font-semibold">#{req.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {req.studentName} ({language === 'am' ? `${req.grade}ኛ ክፍል` : `Gr ${req.grade}`})
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {req.parentName}
                  </td>
                  <td className="py-3 px-3 font-semibold text-blue-900 dark:text-amber-400">
                    {req.tutorName}
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-slate-700 dark:text-slate-300">
                    {req.monthlyFee === 0 ? 'FREE (3rd Child)' : `${req.monthlyFee} ETB/mo`}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                    {req.assignedSchedule || req.preferredSchedule}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      Connected
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Tutor Bonus & Character Awards Approval */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.bonusApproval}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am'
                ? 'ተማሪዎችን በኮንፊደንስ፣ በስፖርት እና በስነ-ምግባር ያሻሻሉ አስጠኚዎች ቦነስ ማጽደቂያ'
                : 'Performance bonus authorizations for verified character and ethics improvements'}
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
            {pendingBonusLogs.length} Pending Approvals
          </span>
        </div>

        <div className="space-y-3">
          {growthLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Mentor: {log.tutorName}
                  </span>
                  <span>·</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    Student: <strong>{log.studentName}</strong> ({log.grade}th grade)
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    Ethics: {log.ethicsBehaviorScore}%
                  </span>
                  <span>·</span>
                  <span>Confidence: {log.confidenceScore}%</span>
                  <span>·</span>
                  <span>Sports: {log.sportsDisciplineScore}%</span>
                  <span>·</span>
                  <span>Academic: {log.academicProgress}%</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  "{log.observations}"
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  +{log.tutorBonusEarned} ETB
                </span>

                {log.status === 'submitted' ? (
                  <button
                    onClick={() => onApproveBonus(log.id)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.approveBonusBtn}</span>
                  </button>
                ) : (
                  <span className="px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    ✓ {t.bonusApproved}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Verified Tutor Registry & IDs */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.tutorManagement}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'am'
              ? 'የአስጠኚዎች ብሔራዊ መታወቂያ እና የዩኒቨርሲቲ ዲፕሎማ ማረጋገጫ'
              : 'Official government ID verifications and university academic credentials'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {language === 'am' ? tutor.amharicName : tutor.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {tutor.degree} ({tutor.university})
                  </p>
                  <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block">
                    ID #{tutor.idNumber} · GPA: {tutor.gpa}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] block text-center">
                  Verified
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {tutor.activeStudentsCount} active students
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
