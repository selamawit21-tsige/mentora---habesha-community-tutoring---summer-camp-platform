import React, { useState, useRef } from 'react';
import { Tutor, Language } from '../../types';
import { translations } from '../../data/translations';
import { 
  X, Camera, Upload, GraduationCap, Check, ShieldCheck, 
  Sparkles, BookOpen, User, Phone, Mail, Award 
} from 'lucide-react';

interface RegisterTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onRegisterTutor: (newTutor: Tutor) => void;
}

const habeshaPresetPortraits = [
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', label: 'Bethlehem T. (AAU)' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', label: 'Dawit M. (Hawassa)' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', label: 'Selamawit H. (ASTU)' },
  { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', label: 'Natnael G. (Jimma)' },
  { url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80', label: 'Tsion K. (Addis Ababa)' },
  { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80', label: 'Mahlet A. (Mekelle)' },
];

export const RegisterTutorModal: React.FC<RegisterTutorModalProps> = ({
  isOpen,
  onClose,
  language,
  onRegisterTutor,
}) => {
  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState(habeshaPresetPortraits[0].url);
  const [name, setName] = useState('');
  const [amharicName, setAmharicName] = useState('');
  const [university, setUniversity] = useState('Addis Ababa University');
  const [degree, setDegree] = useState('');
  const [gpa, setGpa] = useState('3.80 / 4.00');
  const [idNumber, setIdNumber] = useState(`ET-AA-${Math.floor(10000 + Math.random() * 90000)}`);
  const [hourlyRate, setHourlyRate] = useState(350);
  const [monthlyRate, setMonthlyRate] = useState(3500);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics', 'English']);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([1, 2, 3, 4]);
  const [bio, setBio] = useState('');
  const [amharicBio, setAmharicBio] = useState('');

  if (!isOpen) return null;

  // Handle local image file upload with downsampling to avoid quota issues
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
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
            setAvatar(compressed);
          }
        };
        if (typeof readerEvent.target?.result === 'string') {
          img.src = readerEvent.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGradeToggle = (g: number) => {
    if (selectedGrades.includes(g)) {
      if (selectedGrades.length > 1) {
        setSelectedGrades(selectedGrades.filter(x => x !== g));
      }
    } else {
      setSelectedGrades([...selectedGrades, g].sort());
    }
  };

  const handleSubjectToggle = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter(s => s !== subj));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTutor: Tutor = {
      id: `tut-${Date.now().toString().slice(-4)}`,
      name,
      amharicName: amharicName || name,
      avatar,
      university,
      amharicUniversity: university === 'Addis Ababa University' ? 'አዲስ አበባ ዩኒቨርሲቲ' : university,
      degree: degree || 'B.Sc. Applied Mathematics & Science',
      gpa: gpa || '3.85 / 4.00',
      idNumber,
      idVerified: true,
      rating: 5.0,
      totalReviews: 1,
      hourlyRate,
      monthlyRate,
      subjects: selectedSubjects,
      amharicSubjects: selectedSubjects.map(s => {
        if (s === 'Mathematics') return 'ሒሳብ';
        if (s === 'English') return 'እንግሊዝኛ';
        if (s === 'General Science') return 'ሳይንስ';
        if (s === 'Amharic (አማርኛ)') return 'አማርኛ ቋንቋ';
        return s;
      }),
      gradesSupported: selectedGrades,
      bio: bio || 'Dedicated and passionate Habesha elementary educator focused on building strong fundamentals, confidence, and respectful manners (ሥነ-ምግባር).',
      amharicBio: amharicBio || 'የመጀመሪያ ደረጃ ተማሪዎችን በትዕግስት እና በፍቅር የምታስጠና/የሚያስጠና ብቁ መምህር። በኮንፊደንስ እና መልካም ስነ-ምግባር ላይ ያተኮረ።',
      characterRating: 5.0,
      activeStudentsCount: 0,
      availability: 'Mon to Fri (4:00 PM – 7:00 PM) & Weekends',
      amharicAvailability: 'ከሰኞ እስከ አርብ (ከ10:00 - 1:00) እና ቅዳሜ/እሁድ',
      badges: ['Newly Certified Educator', 'National ID Verified', 'Home to Home Mentor'],
    };

    onRegisterTutor(newTutor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === 'am' ? 'የአስጠኚ አዲስ አካውንት መመዝገቢያ' : 'Create Tutor Portal Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'am' 
                  ? 'የቤት ለቤት አስጠኚ ሆነው ይመዝገቡ፤ መገለጫዎን እና ፎቶዎን ያዘጋጁ' 
                  : 'Join Mentora as a certified Home-to-Home tutor and start mentoring Grade 1-6 students'}
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          
          {/* Profile Picture Section */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-500" />
                <span>{language === 'am' ? 'የአስጠኚ ፎቶዎን ይምረጡ ወይም ይስቀሉ' : 'Profile Picture (Select or Upload)'} *</span>
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                Habesha Community Friendly
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Avatar Preview with Click-to-upload */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer shrink-0"
                title="Click to select image file from computer or phone"
              >
                <img
                  src={avatar}
                  alt="Tutor Avatar Preview"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-amber-400 shadow-md group-hover:opacity-85 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                  {language === 'am' ? 'ፎቶ ምረጥ' : 'Choose Photo'}
                </div>
              </div>

              <div className="space-y-2 flex-1 w-full">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'ከስልክዎ / ኮምፒውተርዎ ፎቶ ይምረጡ' : 'Select Photo from Device'}</span>
                </button>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {language === 'am' ? 'ወይም ከታች ከተዘጋጁት የሀበሻ ምስሎች ይምረጡ:' : 'Or pick an authentic Habesha portrait below:'}
                </p>

                {/* Preset Avatars */}
                <div className="grid grid-cols-6 gap-1.5 pt-1">
                  {habeshaPresetPortraits.map((preset, i) => (
                    <div
                      key={i}
                      onClick={() => setAvatar(preset.url)}
                      className={`p-1 rounded-xl border cursor-pointer transition-all text-center ${
                        avatar === preset.url
                          ? 'border-amber-500 bg-amber-100 dark:bg-amber-950/60 ring-2 ring-amber-400'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-9 h-9 rounded-lg object-cover mx-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tutor Personal & Academic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name (English) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mahlet Assefa"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ሙሉ ስም (አማርኛ) *
              </label>
              <input
                type="text"
                required
                value={amharicName}
                onChange={(e) => setAmharicName(e.target.value)}
                placeholder="ምሳሌ፡ ማህሌት አሰፋ"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University Graduated *
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Addis Ababa University">Addis Ababa University (AAU)</option>
                <option value="Adama Science & Tech University (ASTU)">ASTU (Adama)</option>
                <option value="Hawassa University">Hawassa University</option>
                <option value="Jimma University">Jimma University</option>
                <option value="Bahir Dar University">Bahir Dar University</option>
                <option value="Mekelle University">Mekelle University</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Degree & Field of Study *
              </label>
              <input
                type="text"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. B.Sc. Civil Engineering & Math"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Graduation GPA
              </label>
              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="3.85 / 4.00"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                National ID Number (የመታወቂያ ቁጥር) *
              </label>
              <input
                type="text"
                required
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="ET-AA-12345"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono font-semibold"
              />
            </div>
          </div>

          {/* Grades Supported */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'am' ? 'የሚያስተምሯቸው የክፍል ደረጃዎች (ከ1-6)' : 'Elementary Grades You Can Teach (Select all that apply):'}
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => handleGradeToggle(g)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                    selectedGrades.includes(g)
                      ? 'bg-blue-950 dark:bg-amber-500 text-white dark:text-slate-950 border-transparent shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Grade {g}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'am' ? 'የሚያስተምሯቸው የትምህርት አይነቶች' : 'Subjects Offered:'}
            </label>
            <div className="flex flex-wrap gap-2">
              {['Mathematics', 'English', 'General Science', 'Amharic (አማርኛ)', 'Social Studies'].map((subj) => (
                <button
                  type="button"
                  key={subj}
                  onClick={() => handleSubjectToggle(subj)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                    selectedSubjects.includes(subj)
                      ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Teaching Philosophy */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'am' ? 'የማስጠናት ፍልስፍናዎ እና የስነ-ምግባር አቀራረብዎ' : 'Teaching Philosophy & Ethics Approach'}
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Explain how you encourage students in confidence, neat problem solving, and respectful manners..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Instant Tutor Portal Activation</span>
            </span>

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
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{language === 'am' ? 'አካውንት ክፈት እና ጀምር' : 'Register & Enter Tutor Portal'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
