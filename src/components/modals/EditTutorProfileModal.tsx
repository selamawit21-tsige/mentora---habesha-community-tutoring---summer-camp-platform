import React, { useState } from 'react';
import { Tutor, Language } from '../../types';
import { translations } from '../../data/translations';
import { X, Camera, Upload, Check, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface EditTutorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: Tutor;
  language: Language;
  onSaveProfile: (updatedTutor: Tutor) => void;
}

const habeshaPresetPortraits = [
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', label: 'Bethlehem T. (AAU Eng)' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', label: 'Dawit M. (Hawassa)' },
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', label: 'Selamawit H. (ASTU)' },
  { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', label: 'Natnael G. (Jimma)' },
  { url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80', label: 'Tsion K. (Addis Ababa)' },
  { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80', label: 'Mahlet A. (Mekelle)' },
];

export const EditTutorProfileModal: React.FC<EditTutorProfileModalProps> = ({
  isOpen,
  onClose,
  tutor,
  language,
  onSaveProfile,
}) => {
  const t = translations[language];

  const [avatar, setAvatar] = useState(tutor.avatar);
  const [name, setName] = useState(tutor.name);
  const [amharicName, setAmharicName] = useState(tutor.amharicName);
  const [university, setUniversity] = useState(tutor.university);
  const [degree, setDegree] = useState(tutor.degree);
  const [gpa, setGpa] = useState(tutor.gpa);
  const [monthlyRate, setMonthlyRate] = useState(tutor.monthlyRate);
  const [bio, setBio] = useState(tutor.bio);
  const [customUrl, setCustomUrl] = useState('');

  if (!isOpen) return null;

  // Handle local image file upload with automatic downsampling/compression
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          // Resize to max 300x300 square/proportional thumbnail
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
            // Export lightweight compressed JPEG (~20KB)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
            setAvatar(compressedDataUrl);
          }
        };
        if (typeof readerEvent.target?.result === 'string') {
          img.src = readerEvent.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = () => {
    if (customUrl.trim()) {
      setAvatar(customUrl.trim());
      setCustomUrl('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...tutor,
      avatar,
      name,
      amharicName,
      university,
      degree,
      gpa,
      monthlyRate,
      bio,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.editProfile}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'am' ? 'የአስጠኚ ፎቶዎን እና መረጃዎን ያዘምኑ' : 'Update your profile photo, degrees, and bio'}
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          
          {/* Profile Picture Upload & Selection */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <span className="text-xs font-bold text-slate-900 dark:text-white block flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-500" />
              <span>{t.uploadPhoto}</span>
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Circular Preview */}
              <div className="relative group shrink-0">
                <img
                  src={avatar}
                  alt="Tutor Avatar Preview"
                  className="w-24 h-24 rounded-2xl object-cover border-3 border-amber-400 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                  Preview
                </div>
              </div>

              {/* Upload Controls */}
              <div className="space-y-2.5 flex-1 w-full">
                <div className="flex items-center gap-2">
                  <label className="px-3.5 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2 shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-blue-900 dark:text-amber-400" />
                    <span>{language === 'am' ? 'ከኮምፒውተር / ስልክ ፎቶ ይስቀሉ' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Paste URL */}
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://... (or paste web photo URL)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-950 dark:text-amber-400 bg-blue-50 dark:bg-slate-800 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Curated Habesha Portrait Presets */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">
                {t.selectHabeshaPhoto}:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {habeshaPresetPortraits.map((preset, i) => (
                  <div
                    key={i}
                    onClick={() => setAvatar(preset.url)}
                    className={`p-1 rounded-xl border cursor-pointer transition-all text-center space-y-1 ${
                      avatar === preset.url
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 ring-2 ring-amber-400'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-12 h-12 rounded-lg object-cover mx-auto"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block truncate">
                      {preset.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Text Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name (English)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ሙሉ ስም (አማርኛ)
              </label>
              <input
                type="text"
                required
                value={amharicName}
                onChange={(e) => setAmharicName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University (e.g. Addis Ababa University)
              </label>
              <input
                type="text"
                required
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Degree / Academic Qualification
              </label>
              <input
                type="text"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GPA
              </label>
              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Monthly Package Rate (ETB)
              </label>
              <input
                type="number"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Educator Bio & Mentorship Philosophy
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-950 dark:bg-blue-900 hover:bg-blue-900 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-amber-400" />
              <span>{language === 'am' ? 'መገለጫውን አዘምን' : 'Save Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
