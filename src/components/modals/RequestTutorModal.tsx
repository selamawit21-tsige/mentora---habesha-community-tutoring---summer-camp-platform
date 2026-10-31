import React, { useState } from 'react';
import { Tutor, Student, ConnectionRequest, Language } from '../../types';
import { translations } from '../../data/translations';
import { X, CheckCircle, GraduationCap, AlertCircle, Sparkles } from 'lucide-react';

interface RequestTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTutor?: Tutor | null;
  tutors: Tutor[];
  students: Student[];
  language: Language;
  onSubmitRequest: (request: Omit<ConnectionRequest, 'id' | 'createdAt'>) => void;
}

export const RequestTutorModal: React.FC<RequestTutorModalProps> = ({
  isOpen,
  onClose,
  selectedTutor,
  tutors,
  students,
  language,
  onSubmitRequest,
}) => {
  const t = translations[language];

  const [parentName, setParentName] = useState('Almaz Wondimu');
  const [parentPhone, setParentPhone] = useState('+251 91 123 4567');
  const [parentEmail, setParentEmail] = useState('almaz.w@yahoo.com');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState<number>(3);
  const [school, setSchool] = useState('');
  const [tutorId, setTutorId] = useState<string>(selectedTutor?.id || tutors[0]?.id || '');
  const [packageType, setPackageType] = useState<'private_3500' | 'group_2500' | 'summer_camp'>('private_3500');
  const [targetSubjects, setTargetSubjects] = useState<string[]>(['Mathematics', 'English']);
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [preferredSchedule, setPreferredSchedule] = useState('Mon, Wed, Fri (4:30 PM - 6:00 PM)');
  const [isPrepay6Months, setIsPrepay6Months] = useState(false);
  const [isThirdChild, setIsThirdChild] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (selectedTutor) {
      setTutorId(selectedTutor.id);
    }
  }, [selectedTutor]);

  if (!isOpen) return null;

  const currentTutor = tutors.find(t => t.id === tutorId);

  // Fee calculation
  let baseFee = packageType === 'private_3500' ? 3500 : packageType === 'group_2500' ? 2500 : 3000;
  let finalFee = baseFee;
  let discountNote = 'Standard Monthly Plan';

  if (isThirdChild) {
    finalFee = 0;
    discountNote = language === 'am' ? 'የ3ኛ ልጅ 100% ነፃ የቤተሰብ ስጦታ' : '3rd Child 100% Free Family Waiver';
  } else if (isPrepay6Months) {
    // Pay 5 months for 6 months
    finalFee = Math.round((baseFee * 5) / 6);
    discountNote = language === 'am' ? 'የ6 ወር ክፍያ (1 ወር በነፃ ተቀናሽ የተደረገበት)' : '6-Month Prepayment (1 Month Free Applied)';
  }

  const handleSubjectToggle = (subj: string) => {
    if (targetSubjects.includes(subj)) {
      setTargetSubjects(targetSubjects.filter(s => s !== subj));
    } else {
      setTargetSubjects([...targetSubjects, subj]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim()) return;

    onSubmitRequest({
      parentId: 'par-current',
      parentName,
      parentPhone,
      parentEmail,
      studentName,
      grade,
      school: school || 'Primary Academy',
      tutorId: currentTutor?.id,
      tutorName: language === 'am' ? currentTutor?.amharicName : currentTutor?.name,
      packageType,
      targetSubjects,
      specialNeeds: specialNeeds || 'None specified. Standard syllabus reinforcement.',
      preferredSchedule,
      status: 'pending_review',
      monthlyFee: finalFee,
      appliedDiscountNote: discountNote,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-950 dark:text-blue-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'am' ? 'የአስጠኚ እና የትምህርት ጥያቄ ማቅረቢያ' : 'Request Tutor & Match via Bridge'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'am' 
                  ? 'ጥያቄዎ በቀጥታ ወደ ሜንቶራ አስተዳዳሪ ይደርሳል፤ ተረጋግጦ ይገናኛል።' 
                  : 'Your request is safely routed to Mentora Admin to review, schedule, and connect.'}
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
              {language === 'am' ? 'ጥያቄዎ በተሳካ ሁኔታ ቀርቧል!' : 'Request Sent to Admin Bridge!'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {language === 'am'
                ? 'የሜንቶራ አስተዳዳሪ የአስጠኚውን ዝግጁነት አረጋግጦ መርሐ-ግብር በማዘጋጀት ያገናኛችኋል።'
                : 'Mentora Admin will review tutor availability, confirm background checks, and connect your schedule.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            
            {/* Student & Parent Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የተማሪው ሙሉ ስም' : 'Student Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={language === 'am' ? 'ምሳሌ፡ ዮሐንስ ፍቅሩ' : 'e.g. Yohannes Fikru'}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30 dark:focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የክፍል ደረጃ (ከ1ኛ - 6ኛ)' : 'Grade Level (1 to 6)'} *
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                >
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <option key={g} value={g}>
                      {language === 'am' ? `${g}ኛ ክፍል` : `Grade ${g}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የትምህርት ቤት ስም' : 'School Name'}
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder={language === 'am' ? 'ምሳሌ፡ ካቴድራል ትምህርት ቤት' : 'e.g. Cathedral School'}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'am' ? 'የወላጅ ስልክ ቁጥር' : 'Parent Contact Phone'} *
                </label>
                <input
                  type="text"
                  required
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="+251 91 123 4567"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
                />
              </div>
            </div>

            {/* Target Tutor Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'am' ? 'የተመረጠው አስጠኚ (ወይም ምርጫ ለአስተዳዳሪ ይተዉ)' : 'Select Preferred Tutor'}
              </label>
              <select
                value={tutorId}
                onChange={(e) => setTutorId(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              >
                {tutors.map((tut) => (
                  <option key={tut.id} value={tut.id}>
                    {language === 'am' ? tut.amharicName : tut.name} — {tut.degree} (⭐ {tut.rating} · {tut.monthlyRate} ETB/mo)
                  </option>
                ))}
              </select>
            </div>

            {/* Package Choice */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'am' ? 'የትምህርት ፓኬጅ ይምረጡ' : 'Select Tutoring Package'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPackageType('private_3500')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    packageType === 'private_3500'
                      ? 'border-blue-900 dark:border-amber-400 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-900 dark:ring-amber-400'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {language === 'am' ? 'የግል (1 ለአንድ)' : 'Private 1-on-1'}
                    </span>
                    <span className="text-xs font-bold text-blue-900 dark:text-amber-400">
                      3,500 ETB / mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'am' ? 'ለአንድ ተማሪ ራሱን የቻለ አስጠኚ (በሳምንት 3 ቀናት)' : 'Dedicated single-student tutoring, 3x per week'}
                  </p>
                </div>

                <div
                  onClick={() => setPackageType('group_2500')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    packageType === 'group_2500'
                      ? 'border-blue-900 dark:border-amber-400 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-900 dark:ring-amber-400'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {language === 'am' ? 'የቡድን ማስጠናት' : 'Small Group (3-5)'}
                    </span>
                    <span className="text-xs font-bold text-blue-900 dark:text-amber-400">
                      2,500 ETB / mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'am' ? 'አነስተኛ ቡድን (ከ3-5 ተማሪዎች) በጋራ የሚማሩበት' : 'Interactive small cohort of 3–5 same-grade students'}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Needs & Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'am' ? 'የተማሪው ልዩ ፍላጎት ወይም ማስታወሻ' : 'Special Learning Needs or Notes'}
              </label>
              <textarea
                rows={2}
                value={specialNeeds}
                onChange={(e) => setSpecialNeeds(e.target.value)}
                placeholder={language === 'am' ? 'ምሳሌ፡ በሒሳብ ማካፈል ላይ ድጋፍ ይፈልጋል፣ ዓይን አፋር ነው...' : 'e.g. Needs extra patience in long division; shy when reading aloud; active sports lover...'}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              />
            </div>

            {/* Schedule Preference */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'am' ? 'የሚመረጥበት የትምህርት ሰዓት' : 'Preferred Tutoring Days & Times'}
              </label>
              <input
                type="text"
                value={preferredSchedule}
                onChange={(e) => setPreferredSchedule(e.target.value)}
                placeholder="Mon, Wed, Fri (4:30 PM - 6:00 PM)"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900/30"
              />
            </div>

            {/* Discounts Toggles */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {language === 'am' ? 'የሜንቶራ ልዩ ቅናሾችን ይጠቀሙ' : 'Apply Mentora Community Privileges:'}
              </span>
              
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isThirdChild}
                  onChange={(e) => {
                    setIsThirdChild(e.target.checked);
                    if (e.target.checked) setIsPrepay6Months(false);
                  }}
                  className="rounded text-blue-900 focus:ring-blue-900"
                />
                <span>
                  <strong>{language === 'am' ? '3ኛ ልጅ ነጻ:' : '3rd Child Free:'}</strong>{' '}
                  {language === 'am' ? 'ይህ 3ኛ የተመዘገበ ልጄ ነው (100% ሙሉ በነፃ ያጠናል)' : 'This is my 3rd registered child (100% Free Tuition)'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isPrepay6Months}
                  onChange={(e) => {
                    setIsPrepay6Months(e.target.checked);
                    if (e.target.checked) setIsThirdChild(false);
                  }}
                  className="rounded text-blue-900 focus:ring-blue-900"
                />
                <span>
                  <strong>{language === 'am' ? 'የ6 ወር ቅድመ-ክፍያ:' : '6-Month Prepayment:'}</strong>{' '}
                  {language === 'am' ? 'የ6 ወር ክፍያ ከፍዬ የ1 ወር በነፃ ማግኘት እፈልጋለሁ' : 'Pay for 6 months upfront and get 1 month completely free'}
                </span>
              </label>

              {/* Price Output */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  {language === 'am' ? 'የተሰላ ወርሃዊ ክፍያ:' : 'Calculated Monthly Cost:'}
                </span>
                <span className="font-mono text-sm font-bold text-blue-950 dark:text-amber-400">
                  {finalFee === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 ETB (100% FREE)</span>
                  ) : (
                    `${finalFee.toLocaleString()} ETB / mo`
                  )}
                </span>
              </div>
            </div>

            {/* Submit Action */}
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
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-800 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>{language === 'am' ? 'ጥያቄውን ለአስተዳዳሪ ላክ' : 'Submit Request to Admin Bridge'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
