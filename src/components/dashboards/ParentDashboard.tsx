import React, { useState } from 'react';
import { Tutor, Student, ConnectionRequest, Language } from '../../types';
import { translations } from '../../data/translations';
import { 
  Search, Filter, GraduationCap, Star, ShieldCheck, Clock, 
  ArrowRight, HeartHandshake, Dumbbell, Award, Plus, Sparkles, 
  CheckCircle2, AlertCircle, ArrowLeft 
} from 'lucide-react';

interface ParentDashboardProps {
  tutors: Tutor[];
  students: Student[];
  requests: ConnectionRequest[];
  language: Language;
  onOpenRequestModal: (tutor?: Tutor) => void;
  onOpenTutorDetail: (tutor: Tutor) => void;
  onOpenSummerCamp: () => void;
  onBackToHome: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  tutors,
  students,
  requests,
  language,
  onOpenRequestModal,
  onOpenTutorDetail,
  onOpenSummerCamp,
  onBackToHome,
}) => {
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Filter tutors
  const filteredTutors = tutors.filter((tutor) => {
    const nameMatch = (language === 'am' ? tutor.amharicName : tutor.name)
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      tutor.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.degree.toLowerCase().includes(searchQuery.toLowerCase());

    const gradeMatch = selectedGrade === 'all' || tutor.gradesSupported.includes(selectedGrade);
    
    const subjectMatch = selectedSubject === 'all' || 
      tutor.subjects.some(s => s.toLowerCase().includes(selectedSubject.toLowerCase())) ||
      tutor.amharicSubjects.some(s => s.includes(selectedSubject));

    return nameMatch && gradeMatch && subjectMatch;
  });

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

        <span className="text-xs text-slate-400 font-medium">
          {language === 'am' ? 'የወላጅ እና የተማሪ ማዕከል' : 'Parent & Family Portal'}
        </span>
      </div>

      {/* Welcome & Overview Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'ከቤት ወደ ቤት አስጠኚዎች' : 'Home to Home Certified Tutors'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.parentWelcome}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.parentHeaderDesc}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenRequestModal()}
              className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'am' ? 'አዲስ አስጠኚ ጠይቅ' : 'Request Home Tutor'}</span>
            </button>

            <button
              onClick={onOpenSummerCamp}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-xs transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{language === 'am' ? 'ለክረምት ካምፕ (8ቱ ዘርፎች) አስመዝግብ' : 'Join Summer Camp (8 Tracks)'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-radial from-amber-400/10 to-transparent pointer-events-none hidden lg:block" />
      </div>

      {/* Section 1: My Enrolled Children */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.myChildren}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am' ? 'የልጆችዎ የትምህርት፣ ስነ-ምግባር እና የኮንፊደንስ ውጤት ክትትል' : 'Academic performance, confidence, and character (ሥነ-ምግባር) logs'}
            </p>
          </div>
          <button
            onClick={() => onOpenRequestModal()}
            className="text-xs font-semibold text-blue-900 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addChildBtn}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((child) => (
            <div
              key={child.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {child.studentName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="font-semibold text-blue-900 dark:text-amber-400">
                      {language === 'am' ? `${child.grade}ኛ ክፍል` : `Grade ${child.grade}`}
                    </span>
                    <span>·</span>
                    <span className="truncate max-w-[140px]">{child.school}</span>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {child.enrolledPackage === 'private_3500' ? '3,500 ETB 1-on-1' : '2,500 ETB Group'}
                </span>
              </div>

              {/* Assigned Tutor */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">
                  {language === 'am' ? 'የተመደበው አስጠኚ:' : 'Assigned Mentor:'}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {child.assignedTutorName || (language === 'am' ? 'በአስተዳዳሪ ማገናኘት ላይ' : 'Matching via Admin')}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ● Active Session
                  </span>
                </div>
              </div>

              {/* Growth Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    {language === 'am' ? 'ስነ-ምግባር' : 'Ethics'}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {child.ethicsScore || 92}%
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    {language === 'am' ? 'ኮንፊደንስ' : 'Confidence'}
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                    {child.confidenceScore || 85}%
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    {language === 'am' ? 'የትምህርት' : 'Academic'}
                  </span>
                  <span className="font-mono text-xs font-bold text-blue-900 dark:text-blue-400">
                    {child.academicScore || 88}%
                  </span>
                </div>
              </div>

              {/* Special needs note */}
              {child.specialNeeds && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-2">
                  "{child.specialNeeds}"
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Live Connection Requests Tracker */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.myRequests}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am'
                ? 'የሜንቶራ አስተዳዳሪ ጥያቄዎችን አጣርቶ የሚያገናኝበት የድልድይ ሁኔታ'
                : 'Status of your submitted match requests managed by Mentora Admin'}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {requests.length} {language === 'am' ? 'ጥያቄዎች' : 'Requests Total'}
          </span>
        </div>

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-400">#{req.id}</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {req.studentName} ({language === 'am' ? `${req.grade}ኛ ክፍል` : `Grade ${req.grade}`})
                  </span>
                  <span>·</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    {language === 'am' ? 'የተጠየቀው አስጠኚ:' : 'Requested Tutor:'}{' '}
                    <strong>{req.tutorName}</strong>
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'am' ? 'የተመረጠ ክፍለ-ጊዜ:' : 'Requested Schedule:'} {req.preferredSchedule}
                </p>

                {req.assignedSchedule && (
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{req.assignedSchedule}</span>
                  </p>
                )}

                {req.appliedDiscountNote && (
                  <span className="inline-block text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                    ★ {req.appliedDiscountNote}
                  </span>
                )}
              </div>

              {/* Status Badge */}
              <div className="shrink-0 flex items-center gap-3">
                {req.status === 'pending_review' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>{t.statusPending}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t.statusConnected}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Verified Tutors Catalog */}
      <section id="tutors-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.availableTutors}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'am'
                ? 'የተረጋገጡ የዩኒቨርሲቲ ምሩቃን፣ ብሔራዊ መታወቂያቸው የተረጋገጠ እና በስነ-ምግባር የተመሰገኑ'
                : 'Certified university graduates with verified national IDs and proven character ratings'}
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-52 sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Grade filter */}
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="all">{t.allGrades}</option>
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <option key={g} value={g}>
                  {language === 'am' ? `${g}ኛ ክፍል` : `Grade ${g}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Tutor Card Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-amber-400/80 dark:border-amber-400/60 shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {language === 'am' ? tutor.amharicName : tutor.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{tutor.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">
                      {tutor.degree}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                      {language === 'am' ? tutor.amharicUniversity : tutor.university} · GPA {tutor.gpa}
                    </p>
                  </div>
                </div>

                {/* ID verification */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ID: {tutor.idNumber}</span>
                  </span>
                  <span>
                    Ethics: <strong>{tutor.characterRating}/5.0</strong>
                  </span>
                </div>

                {/* Subjects & Grades */}
                <div className="space-y-1.5">
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

                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {language === 'am' ? 'ክፍሎች:' : 'Grades:'}
                    </span>{' '}
                    {tutor.gradesSupported.map(g => `${g}th`).join(', ')}
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {language === 'am' ? tutor.amharicBio : tutor.bio}
                </p>
              </div>

              {/* Price & Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block leading-tight">
                    {language === 'am' ? 'ወርሃዊ ክፍያ' : 'Monthly Rate'}
                  </span>
                  <span className="font-mono text-sm font-bold text-blue-950 dark:text-amber-400">
                    {tutor.monthlyRate.toLocaleString()} ETB
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTutorDetail(tutor)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.details}
                  </button>
                  <button
                    onClick={() => onOpenRequestModal(tutor)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-800 rounded-lg shadow-xs transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>{t.requestTutorAction}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
