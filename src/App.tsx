import React, { useState, useEffect } from 'react';
import { UserRole, Language, Tutor, Student, ConnectionRequest, StudentGrowthLog } from './types';
import { 
  initialTutors, 
  initialStudents, 
  initialConnectionRequests, 
  packagesList, 
  specialIncentives, 
  summerActivities, 
  initialGrowthLogs, 
  initialAgazBooks 
} from './data/mockData';
import { translations } from './data/translations';

// Components
import { Navbar } from './components/Navbar';
import { PublicLanding } from './components/PublicLanding';
import { ParentDashboard } from './components/dashboards/ParentDashboard';
import { TutorDashboard } from './components/dashboards/TutorDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { LoginPage } from './components/auth/LoginPage';

// Modals
import { RequestTutorModal } from './components/modals/RequestTutorModal';
import { AdminConnectModal } from './components/modals/AdminConnectModal';
import { LogGrowthModal } from './components/modals/LogGrowthModal';
import { TutorDetailModal } from './components/modals/TutorDetailModal';
import { SummerCampModal } from './components/modals/SummerCampModal';
import { EditTutorProfileModal } from './components/modals/EditTutorProfileModal';
import { RegisterTutorModal } from './components/modals/RegisterTutorModal';

// Safe localStorage wrapper to prevent QuotaExceededError
const safeStorage = {
  getItem: <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.warn(`Failed reading localStorage key "${key}":`, e);
      return fallback;
    }
  },
  setItem: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`LocalStorage write failed or quota exceeded for "${key}":`, e);
      // Attempt cleanup of older version keys to free quota
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k && (k.startsWith('mentora_app_state_v1') || k.startsWith('mentora_app_state_v2'))) {
            localStorage.removeItem(k);
          }
        }
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // In-memory state remains intact; don't crash the app
      }
    }
  }
};

export default function App() {
  const STORAGE_KEY = 'mentora_app_state_v4';

  // State initialization: defaults to 'guest' so user starts on the rich home page
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [loginPageRole, setLoginPageRole] = useState<UserRole>('parent');

  const [tutors, setTutors] = useState<Tutor[]>(() => {
    return safeStorage.getItem(`${STORAGE_KEY}_tutors`, initialTutors);
  });

  const [students, setStudents] = useState<Student[]>(() => {
    return safeStorage.getItem(`${STORAGE_KEY}_students`, initialStudents);
  });

  const [requests, setRequests] = useState<ConnectionRequest[]>(() => {
    return safeStorage.getItem(`${STORAGE_KEY}_requests`, initialConnectionRequests);
  });

  const [growthLogs, setGrowthLogs] = useState<StudentGrowthLog[]>(() => {
    return safeStorage.getItem(`${STORAGE_KEY}_growthLogs`, initialGrowthLogs);
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to local storage safely with try/catch
  useEffect(() => {
    safeStorage.setItem(`${STORAGE_KEY}_tutors`, tutors);
  }, [tutors]);

  useEffect(() => {
    safeStorage.setItem(`${STORAGE_KEY}_students`, students);
  }, [students]);

  useEffect(() => {
    safeStorage.setItem(`${STORAGE_KEY}_requests`, requests);
  }, [requests]);

  useEffect(() => {
    safeStorage.setItem(`${STORAGE_KEY}_growthLogs`, growthLogs);
  }, [growthLogs]);

  // Modals state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedTutorForRequest, setSelectedTutorForRequest] = useState<Tutor | null>(null);

  const [isTutorDetailOpen, setIsTutorDetailOpen] = useState(false);
  const [selectedTutorForDetail, setSelectedTutorForDetail] = useState<Tutor | null>(null);

  const [isAdminConnectModalOpen, setIsAdminConnectModalOpen] = useState(false);
  const [selectedRequestForConnect, setSelectedRequestForConnect] = useState<ConnectionRequest | null>(null);

  const [isGrowthModalOpen, setIsGrowthModalOpen] = useState(false);
  const [selectedStudentForGrowth, setSelectedStudentForGrowth] = useState<Student | null>(null);

  const [isSummerCampModalOpen, setIsSummerCampModalOpen] = useState(false);
  const [isEditTutorProfileOpen, setIsEditTutorProfileOpen] = useState(false);
  const [isRegisterTutorOpen, setIsRegisterTutorOpen] = useState(false);

  // Handlers
  const handleRegisterTutor = (newTutor: Tutor) => {
    setTutors(prev => [newTutor, ...prev]);
    setIsRegisterTutorOpen(false);
    setIsLoginPageOpen(false);
    if (currentRole !== 'admin') {
      setCurrentRole('tutor');
    }
    showToast(
      language === 'am'
        ? `አስጠኚው ${newTutor.amharicName || newTutor.name} በተሳካ ሁኔታ ተመዝግቧል።`
        : `${newTutor.name} has been registered successfully.`
    );
  };

  const handleLanguageToggle = () => {
    setLanguage(prev => (prev === 'en' ? 'am' : 'en'));
  };

  const handleOpenLogin = (role?: UserRole) => {
    setLoginPageRole(role === 'tutor' ? 'tutor' : role === 'admin' ? 'admin' : 'parent');
    setIsLoginPageOpen(true);
  };

  const handleOpenRequestModal = (tutor?: Tutor) => {
    setSelectedTutorForRequest(tutor || null);
    setIsRequestModalOpen(true);
  };

  const handleOpenTutorDetail = (tutor: Tutor) => {
    setSelectedTutorForDetail(tutor);
    setIsTutorDetailOpen(true);
  };

  const handleUpdateTutorAvatar = (newAvatarUrl: string) => {
    setTutors(prev =>
      prev.map((t, idx) => {
        if (idx === 0) {
          return { ...t, avatar: newAvatarUrl };
        }
        return t;
      })
    );
    showToast(
      language === 'am' ? 'የአስጠኚ ፎቶዎ በተሳካ ሁኔታ ተቀይሯል!' : 'Tutor profile photo updated!'
    );
  };

  const handleSaveTutorProfile = (updatedTutor: Tutor) => {
    setTutors(prev =>
      prev.map(t => (t.id === updatedTutor.id ? updatedTutor : t))
    );
    showToast(
      language === 'am' ? 'የአስጠኚው መገለጫ እና ፎቶ በተሳካ ሁኔታ ዘምኗል!' : 'Tutor profile and photo saved successfully!'
    );
  };

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    setIsLoginPageOpen(false);

    if (tab === 'home') {
      setCurrentRole('guest');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'tutors') {
      setCurrentRole('parent');
      setTimeout(() => {
        const el = document.getElementById('tutors-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (tab === 'packages') {
      setCurrentRole('guest');
      setTimeout(() => {
        const el = document.getElementById('packages');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (tab === 'summer-camp') {
      setCurrentRole('guest');
      setTimeout(() => {
        const el = document.getElementById('summer-camp');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (tab === 'books') {
      setCurrentRole('guest');
      setTimeout(() => {
        const el = document.getElementById('books');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (tab === 'bridge') {
      setCurrentRole('guest');
      setTimeout(() => {
        const el = document.getElementById('bridge');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
  };

  const handleCreateRequest = (newReqData: Omit<ConnectionRequest, 'id' | 'createdAt'>) => {
    const newRequest: ConnectionRequest = {
      ...newReqData,
      id: `req-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };

    setRequests(prev => [newRequest, ...prev]);

    // Also add to student list if not present
    const existingStudent = students.find(s => s.studentName.toLowerCase() === newReqData.studentName.toLowerCase());
    if (!existingStudent) {
      const newStudent: Student = {
        id: `std-${Date.now().toString().slice(-4)}`,
        parentId: newReqData.parentId,
        parentName: newReqData.parentName,
        parentPhone: newReqData.parentPhone,
        studentName: newReqData.studentName,
        grade: newReqData.grade,
        age: newReqData.grade + 6,
        school: newReqData.school,
        subjectsNeeded: newReqData.targetSubjects,
        specialNeeds: newReqData.specialNeeds,
        learningGoal: 'Home-to-home personalized curriculum mastery and confidence building.',
        enrolledPackage: newReqData.packageType,
        assignedTutorId: newReqData.tutorId,
        assignedTutorName: newReqData.tutorName,
        confidenceScore: 82,
        ethicsScore: 90,
        sportsScore: 78,
        academicScore: 85,
      };
      setStudents(prev => [newStudent, ...prev]);
    }

    showToast(
      language === 'am' 
        ? `ጥያቄዎ ወደ ሜንቶራ አስተዳዳሪ ተልኳል! በቅርቡ ተረጋግጦ ይገናኛል።` 
        : `Request sent to Mentora Admin Bridge for scheduling & connection!`
    );
  };

  // Admin approves & connects bridge
  const handleApproveBridge = (
    requestId: string,
    tutorId: string,
    assignedSchedule: string,
    adminNotes: string
  ) => {
    const targetTutor = tutors.find(t => t.id === tutorId);
    const tutorDisplayName = targetTutor 
      ? (language === 'am' ? targetTutor.amharicName : targetTutor.name) 
      : 'Assigned Tutor';

    setRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          return {
            ...r,
            tutorId,
            tutorName: tutorDisplayName,
            assignedSchedule,
            adminNotes,
            status: 'admin_connected',
          };
        }
        return r;
      })
    );

    // Also update student's assigned tutor
    const targetReq = requests.find(r => r.id === requestId);
    if (targetReq) {
      setStudents(prev =>
        prev.map(s => {
          if (s.studentName === targetReq.studentName) {
            return {
              ...s,
              assignedTutorId: tutorId,
              assignedTutorName: tutorDisplayName,
            };
          }
          return s;
        })
      );
    }

    showToast(
      language === 'am'
        ? `ድልድዩ በተሳካ ሁኔታ ተገናኝቷል! መርሐ-ግብር ተመድቧል።`
        : `Bridge successfully established! Home tutor and parent connected.`
    );
  };

  // Tutor logs growth
  const handleSubmitGrowthLog = (newLogData: Omit<StudentGrowthLog, 'id'>) => {
    const newLog: StudentGrowthLog = {
      ...newLogData,
      id: `log-${Date.now().toString().slice(-4)}`,
    };

    setGrowthLogs(prev => [newLog, ...prev]);

    // Update student scores
    setStudents(prev =>
      prev.map(s => {
        if (s.id === newLogData.studentId) {
          return {
            ...s,
            confidenceScore: newLogData.confidenceScore,
            ethicsScore: newLogData.ethicsBehaviorScore,
            sportsScore: newLogData.sportsDisciplineScore,
            academicScore: newLogData.academicProgress,
          };
        }
        return s;
      })
    );

    showToast(
      language === 'am'
        ? `የተማሪው የስነ-ምግባር እና የእድገት ሪፖርት ተመዝግቧል! ቦነስ ተጠይቋል።`
        : `Student growth log submitted! Tutor performance bonus queued.`
    );
  };

  // Admin approves bonus
  const handleApproveBonus = (logId: string) => {
    setGrowthLogs(prev =>
      prev.map(l => {
        if (l.id === logId) {
          return { ...l, status: 'bonus_approved_by_admin' };
        }
        return l;
      })
    );

    showToast(
      language === 'am'
        ? `የአስጠኚው የስነ-ምግባር እና ኮንፊደንስ ቦነስ ተከፍሏል!`
        : `Tutor performance bonus disbursed successfully!`
    );
  };

  // Summer camp enrollment
  const handleEnrollSummerCamp = (
    studentName: string,
    grade: number,
    selectedActivities: string[],
    isImprovementAward: boolean
  ) => {
    showToast(
      language === 'am'
        ? `${studentName} ለክረምት ካምፕ (8ቱ ዘርፎች) በተሳካ ሁኔታ ተመዝግቧል!`
        : `Student ${studentName} successfully enrolled in Summer Camp!`
    );
  };

  // Pending count for Admin badge
  const pendingRequestsCount = requests.filter(r => r.status === 'pending_review').length;

  // Active educator for tutor portal
  const activeTutor = tutors[0];
  const assignedToActiveTutor = students.filter(
    s => s.assignedTutorId === activeTutor.id || s.assignedTutorName?.includes(activeTutor.name)
  );
  const openRequestsForTutors = requests.filter(r => r.status === 'pending_review');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090E17] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 1. Top Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => {
          setIsLoginPageOpen(false);
          setCurrentRole(role);
          if (role === 'guest') setActiveTab('home');
        }}
        language={language}
        onLanguageToggle={handleLanguageToggle}
        pendingRequestsCount={pendingRequestsCount}
        activeTab={activeTab}
        onNavigateTab={handleNavigateTab}
        onRequestTutorClick={() => handleOpenRequestModal()}
        onOpenLogin={handleOpenLogin}
      />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 w-full min-w-0 px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Dedicated Login Screen */}
        {isLoginPageOpen ? (
          <LoginPage
            initialRole={loginPageRole}
            language={language}
            onLoginSuccess={(role) => {
              setCurrentRole(role);
              setIsLoginPageOpen(false);
              showToast(
                language === 'am' ? `እንኳን ደህና መጡ! ወደ ገጽዎ ገብተዋል።` : `Welcome! Signed in successfully.`
              );
            }}
            onBackToHome={() => setIsLoginPageOpen(false)}
            onOpenRegisterTutor={() => setIsRegisterTutorOpen(true)}
          />
        ) : (
          <>
            {currentRole === 'parent' && (
              <ParentDashboard
                tutors={tutors}
                students={students}
                requests={requests}
                language={language}
                onOpenRequestModal={handleOpenRequestModal}
                onOpenTutorDetail={handleOpenTutorDetail}
                onOpenSummerCamp={() => setIsSummerCampModalOpen(true)}
                onBackToHome={() => {
                  setCurrentRole('guest');
                  setActiveTab('home');
                }}
              />
            )}

            {currentRole === 'tutor' && (
              <TutorDashboard
                currentTutor={activeTutor}
                assignedStudents={assignedToActiveTutor}
                openStudentRequests={openRequestsForTutors}
                growthLogs={growthLogs}
                language={language}
                onOpenGrowthModal={(std) => {
                  setSelectedStudentForGrowth(std);
                  setIsGrowthModalOpen(true);
                }}
                onOpenStudentDetail={(std) => {}}
                onBackToHome={() => {
                  setCurrentRole('guest');
                  setActiveTab('home');
                }}
                onUpdateTutorAvatar={handleUpdateTutorAvatar}
                onOpenEditProfileModal={() => setIsEditTutorProfileOpen(true)}
              />
            )}

            {currentRole === 'admin' && (
              <AdminDashboard
                tutors={tutors}
                students={students}
                requests={requests}
                growthLogs={growthLogs}
                language={language}
                onOpenConnectModal={(req) => {
                  setSelectedRequestForConnect(req);
                  setIsAdminConnectModalOpen(true);
                }}
                onApproveBonus={handleApproveBonus}
                onVerifyTutor={() => {}}
                onOpenRegisterTutor={() => setIsRegisterTutorOpen(true)}
                onBackToHome={() => {
                  setCurrentRole('guest');
                  setActiveTab('home');
                }}
              />
            )}

            {currentRole === 'guest' && (
              <PublicLanding
                packages={packagesList}
                incentives={specialIncentives}
                summerActivities={summerActivities}
                agazBooks={initialAgazBooks}
                tutors={tutors}
                language={language}
                onSelectRole={(role) => setCurrentRole(role)}
                onOpenRequestModal={() => handleOpenRequestModal()}
                onOpenSummerCampModal={() => setIsSummerCampModalOpen(true)}
                onOpenRegisterTutor={() => setIsRegisterTutorOpen(true)}
              />
            )}
          </>
        )}

      </main>

      {/* Interactive Modals */}
      <RequestTutorModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        selectedTutor={selectedTutorForRequest}
        tutors={tutors}
        students={students}
        language={language}
        onSubmitRequest={handleCreateRequest}
      />

      <AdminConnectModal
        isOpen={isAdminConnectModalOpen}
        onClose={() => setIsAdminConnectModalOpen(false)}
        request={selectedRequestForConnect}
        tutors={tutors}
        language={language}
        onApproveBridge={handleApproveBridge}
      />

      <LogGrowthModal
        isOpen={isGrowthModalOpen}
        onClose={() => setIsGrowthModalOpen(false)}
        student={selectedStudentForGrowth}
        tutorId={activeTutor.id}
        tutorName={language === 'am' ? activeTutor.amharicName : activeTutor.name}
        language={language}
        onSubmitGrowthLog={handleSubmitGrowthLog}
      />

      <TutorDetailModal
        isOpen={isTutorDetailOpen}
        onClose={() => setIsTutorDetailOpen(false)}
        tutor={selectedTutorForDetail}
        language={language}
        onRequestTutor={(tutor) => handleOpenRequestModal(tutor)}
      />

      <SummerCampModal
        isOpen={isSummerCampModalOpen}
        onClose={() => setIsSummerCampModalOpen(false)}
        activities={summerActivities}
        language={language}
        onEnrollStudent={handleEnrollSummerCamp}
      />

      <EditTutorProfileModal
        isOpen={isEditTutorProfileOpen}
        onClose={() => setIsEditTutorProfileOpen(false)}
        tutor={activeTutor}
        language={language}
        onSaveProfile={handleSaveTutorProfile}
      />

      <RegisterTutorModal
        isOpen={isRegisterTutorOpen}
        onClose={() => setIsRegisterTutorOpen(false)}
        language={language}
        onRegisterTutor={handleRegisterTutor}
      />

    </div>
  );
}
