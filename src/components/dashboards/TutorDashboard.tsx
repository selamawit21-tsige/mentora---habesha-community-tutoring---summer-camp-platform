import React, { useState } from 'react';
import { Tutor, Student, ConnectionRequest, StudentGrowthLog, Language } from '../../types';
import { translations } from '../../data/translations';
import { getGradeLabel } from '../../data/gradeLevels';
import { TutorAvatar } from '../TutorAvatar';
import { 
  GraduationCap, Award, ShieldCheck, Star, Users, CheckCircle, 
  Clock, ArrowRight, HeartHandshake, Dumbbell, BookOpen, AlertCircle, 
  Plus, ArrowLeft, Camera, Check 
} from 'lucide-react';

interface TutorDashboardProps {
  currentTutor: Tutor;
  assignedStudents: Student[];
  openStudentRequests: ConnectionRequest[];
  growthLogs: StudentGrowthLog[];
  language: Language;
  onOpenGrowthModal: (student: Student) => void;
  onOpenStudentDetail: (student: Student) => void;
  onBackToHome: () => void;
  onUpdateTutorAvatar: (newAvatarUrl: string) => void;
  onOpenEditProfileModal: () => void;
}

export const TutorDashboard: React.FC<TutorDashboardProps> = ({
  currentTutor,
  assignedStudents,
  openStudentRequests,
  growthLogs,
  language,
  onOpenGrowthModal,
  onOpenStudentDetail,
  onBackToHome,
  onUpdateTutorAvatar,
  onOpenEditProfileModal,
}) => {
  const t = translations[language];
  const directFileInputRef = React.useRef<HTMLInputElement>(null);

  // Calculate total bonuses earned by this tutor
  const tutorLogs = growthLogs.filter(l => l.tutorId === currentTutor.id);
  const totalBonuses = tutorLogs.reduce((sum, log) => sum + log.tutorBonusEarned, 0);

  // Direct file selection with canvas downsampling to protect quota
  const handleDirectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 300;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.82);
            onUpdateTutorAvatar(compressed);
          }
        };
        if (typeof event.target?.result === 'string') {
          img.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Breadcrumb & Back to Home */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-amber-400 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>{t.backToHome}</span>
        </button>

        <button
          onClick={onOpenEditProfileModal}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white bg-amber-400 hover:bg-amber-300 px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-slate-950" />
          <span>{t.editProfile}</span>
        </button>
      </div>

      {/* Educator Profile Card & Welcome with Prominent Photo */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            
            {/* Prominent Tutor Profile Picture with Direct File Chooser */}
            <div className="relative group shrink-0">
              <input
                ref={directFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleDirectImageUpload}
                className="hidden"
              />

              <TutorAvatar
                src={currentTutor.avatar}
                name={currentTutor.name}
                onClick={() => directFileInputRef.current?.click()}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-3 border-amber-400 shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
              />

              <div className="flex items-center gap-1 absolute -bottom-2 -right-2">
                <button
                  type="button"
                  onClick={() => directFileInputRef.current?.click()}
                  title="Choose image from device"
                  className="p-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl shadow-lg transition-transform hover:scale-110 cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'ፎቶ ምረጥ' : 'Select Photo'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {language === 'am' ? currentTutor.amharicName : currentTutor.name}
                </h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.verifiedIdBadge} ({currentTutor.idNumber})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {currentTutor.degree} · <strong>{language === 'am' ? currentTutor.amharicUniversity : currentTutor.university}</strong> (GPA {currentTutor.gpa})
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {currentTutor.rating.toFixed(2)} rating ({currentTutor.totalReviews} reviews)
                </span>
                <span>·</span>
                <span className="text-emerald-400 font-semibold">
                  Ethics Score: {currentTutor.characterRating}/5.0
                </span>
                <span>·</span>
                <span className="text-amber-300 font-semibold">
                  Home to Home Certified
                </span>
              </div>
            </div>
          </div>

          {/* Quick Bonus Metric Card */}
          <div className="bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/15 min-w-[200px] text-right self-stretch sm:self-auto">
            <span className="text-[11px] text-slate-300 block uppercase font-medium">
              {t.totalEarnedBonuses}
            </span>
            <span className="font-mono text-2xl font-extrabold text-amber-400">
              +{totalBonuses.toLocaleString()} ETB
            </span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">
              ★ {language === 'am' ? 'የስነ-ምግባር እና ኮንፊደንስ ቦነሶች' : 'Character & Ethics growth awards'}
            </span>
          </div>
        </div>

      </div>

      {/* Section 1: My Assigned Students (Connected by Admin) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.myAssignedStudents}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am'
                ? 'በሜንቶራ አስተዳዳሪ ድልድይ ተገናኝተው በአሁኑ ወቅት የሚያስጧኗቸው ተማሪዎች'
                : 'Elementary learners currently paired with you through the Mentora Bridge'}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-900 dark:text-amber-400">
            {assignedStudents.length} {language === 'am' ? 'ተማሪዎች' : 'Active Learners'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assignedStudents.map((student, idx) => (
            <div
              key={student.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start gap-3.5">
                {/* Student Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 text-amber-400 flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                  {student.studentName.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                      {student.studentName}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="font-semibold text-blue-900 dark:text-amber-400">
                      {getGradeLabel(student.grade, language)}
                    </span>
                    <span>·</span>
                    <span className="truncate">{student.school}</span>
                  </div>
                </div>
              </div>

              {/* Special Learning Needs & Parent Info */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>{language === 'am' ? 'ወላጅ:' : 'Parent:'} <strong>{student.parentName}</strong></span>
                  <span className="font-mono">{student.parentPhone}</span>
                </div>

                {student.specialNeeds && (
                  <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                      {t.specialNeedsLabel}
                    </span>
                    <p className="text-slate-700 dark:text-slate-200 italic mt-0.5">
                      "{student.specialNeeds}"
                    </p>
                  </div>
                )}
              </div>

              {/* Growth Scores Bar */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">{language === 'am' ? 'ስነ-ምግባር' : 'Ethics'}</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {student.ethicsScore || 92}%
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">{language === 'am' ? 'ኮንፊደንስ' : 'Confidence'}</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {student.confidenceScore || 84}%
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">{language === 'am' ? 'ስፖርት' : 'Sports'}</span>
                  <span className="font-mono font-bold text-blue-900 dark:text-blue-400">
                    {student.sportsScore || 80}%
                  </span>
                </div>
              </div>

              {/* Primary Action: Log Student Growth to earn bonus */}
              <button
                onClick={() => onOpenGrowthModal(student)}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>{t.logGrowthBtn}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Open Student Inquiries Seeking Tutors (KG 1 through Grade 8) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.openStudentRequests}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'am'
              ? 'ወላጆች ያስገቧቸው ክፍት የትምህርት ጥያቄዎች (በክፍል፣ በርዕስ እና በልዩ ፍላጎት የተዘረዘሩ)'
              : 'Elementary student requests awaiting matching in the Mentora bridge network'}
          </p>
        </div>

        <div className="space-y-3">
          {openStudentRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-400">#{req.id}</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {req.studentName} ({getGradeLabel(req.grade, language)})
                  </span>
                  <span>·</span>
                  <span className="text-xs text-blue-900 dark:text-amber-400 font-semibold">
                    {req.packageType === 'private_3500' ? '3,500 ETB Private' : '2,500 ETB Group'}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2 flex-wrap">
                  <span>{language === 'am' ? 'የትምህርት ቤት:' : 'School:'} {req.school}</span>
                  <span>·</span>
                  <span>{language === 'am' ? 'የሚፈለጉ ርዕሶች:' : 'Target Subjects:'} {req.targetSubjects.join(', ')}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  <strong>{language === 'am' ? 'ልዩ ፍላጎት:' : 'Special Needs:'}</strong> "{req.specialNeeds}"
                </p>

                <p className="text-[11px] text-slate-400">
                  {language === 'am' ? 'የሚመረጥበት ሰዓት:' : 'Preferred Time:'} {req.preferredSchedule}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  {language === 'am' ? 'ክፍት ዕድል' : 'Open for Match'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Growth Logs & Bonus Disbursement History */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.tutorBonusesTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am'
                ? 'በተማሪዎች ኮንፊደንስ፣ ስፖርት እና መልካም ስነ-ምግባር ለውጥ የተገኙ የተረጋገጡ ቦነሶች'
                : 'Performance rewards earned through verifiable student character improvements'}
            </p>
          </div>
          <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {tutorLogs.length} {language === 'am' ? 'የቦነስ ሪፖርቶች' : 'Bonus Records'}
          </span>
        </div>

        <div className="space-y-3">
          {tutorLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {log.studentName} ({getGradeLabel(log.grade, language)})
                  </span>
                  <span className="text-xs text-slate-400">· {log.date}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 pt-0.5">
                  <span>Ethics: <strong>{log.ethicsBehaviorScore}%</strong></span>
                  <span>·</span>
                  <span>Confidence: <strong>{log.confidenceScore}%</strong></span>
                  <span>·</span>
                  <span>Sports: <strong>{log.sportsDisciplineScore}%</strong></span>
                  <span>·</span>
                  <span>Academic: <strong>{log.academicProgress}%</strong></span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  "{log.observations}"
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400 block">
                  +{log.tutorBonusEarned} ETB
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                  {log.status === 'bonus_approved_by_admin' ? '✓ Disbursed by Admin' : '⏳ Queued for Payout'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
