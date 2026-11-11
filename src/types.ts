export type UserRole = 'guest' | 'parent' | 'tutor' | 'admin';
export type Language = 'en' | 'am';

export interface Tutor {
  id: string;
  name: string;
  amharicName: string;
  avatar: string;
  university: string;
  amharicUniversity: string;
  degree: string;
  gpa: string;
  idNumber: string;
  idVerified: boolean;
  rating: number;
  totalReviews: number;
  hourlyRate: number; // ETB
  monthlyRate: number; // ETB (e.g. 3500)
  subjects: string[];
  amharicSubjects: string[];
  gradesSupported: number[]; // KG 1-3 use -3, -2, -1; grades 1-8 use their grade number
  bio: string;
  amharicBio: string;
  characterRating: number; // 1-5 rating for mentorship/ethics
  activeStudentsCount: number;
  availability: string;
  amharicAvailability: string;
  badges: string[];
}

export interface Student {
  id: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  studentName: string;
  avatar?: string;
  grade: number; // KG 1-3 use -3, -2, -1; grades 1-8 use their grade number
  age: number;
  school: string;
  subjectsNeeded: string[];
  specialNeeds: string;
  learningGoal: string;
  enrolledPackage?: 'private_3500' | 'group_2500' | 'summer_camp';
  assignedTutorId?: string;
  assignedTutorName?: string;
  confidenceScore?: number; // 1-100
  ethicsScore?: number; // 1-100
  sportsScore?: number; // 1-100
  academicScore?: number; // 1-100
}

export type ConnectionStatus = 'pending_review' | 'admin_connected' | 'in_progress' | 'completed';

export interface ConnectionRequest {
  id: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  studentName: string;
  grade: number;
  school: string;
  tutorId?: string;
  tutorName?: string;
  packageType: 'private_3500' | 'group_2500' | 'summer_camp';
  targetSubjects: string[];
  specialNeeds: string;
  preferredSchedule: string;
  status: ConnectionStatus;
  createdAt: string;
  assignedSchedule?: string;
  adminNotes?: string;
  monthlyFee: number;
  appliedDiscountNote?: string;
}

export interface PackageOffer {
  id: 'private_3500' | 'group_2500';
  name: string;
  amharicName: string;
  price: number;
  billingPeriod: string;
  amharicBillingPeriod: string;
  gradeRange: string;
  description: string;
  amharicDescription: string;
  features: string[];
  amharicFeatures: string[];
  popular?: boolean;
}

export interface SpecialIncentive {
  id: string;
  title: string;
  amharicTitle: string;
  ruleTitle: string;
  amharicRuleTitle: string;
  description: string;
  amharicDescription: string;
  benefitTag: string;
  amharicBenefitTag: string;
  category: 'student_award' | 'tutor_bonus' | 'family_discount' | 'prepay_discount' | 'book_gift';
}

export interface SummerActivity {
  id: string;
  number: number;
  title: string;
  amharicTitle: string;
  category: string;
  iconName: string;
  shortDesc: string;
  amharicShortDesc: string;
  highlights: string[];
  amharicHighlights: string[];
  ageGroup: string;
  schedule: string;
  amharicSchedule: string;
}

export interface StudentGrowthLog {
  id: string;
  tutorId: string;
  tutorName: string;
  studentId: string;
  studentName: string;
  grade: number;
  date: string;
  academicProgress: number; // 1-100
  confidenceScore: number; // 1-100
  sportsDisciplineScore: number; // 1-100
  ethicsBehaviorScore: number; // 1-100 (ስነ-ምግባር)
  observations: string;
  tutorBonusEarned: number; // ETB bonus
  status: 'submitted' | 'bonus_approved_by_admin';
}

export interface AgazBook {
  id: string;
  title: string;
  amharicTitle: string;
  author: string;
  grade: number;
  subject: string;
  amharicSubject: string;
  coverAccent: string;
  pageCount: number;
  description: string;
  amharicDescription: string;
  isReward: boolean;
  rewardCondition?: string;
  downloadSize: string;
}
