// Course management utilities
import { MOCK_ENROLLMENTS } from './mock-data';

export interface Course {
  id: string;
  name: string;
  class: string; // e.g., "Class 11", "Class 12"
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  image?: string;
  createdAt: string;
  totalStudents?: number;
  // Added offline coaching specific fields
  batchType?: 'Morning' | 'Evening' | 'Weekend';
  location?: string;
  classroom?: string;
  includesMaterials?: boolean;
  videoCount?: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'dropped';
}

const COURSES_KEY = 'coaching_courses';
const ENROLLMENTS_KEY = 'coaching_enrollments';

// Get all courses
export function getAllCourses(): Course[] {
  if (typeof window === 'undefined') return getDefaultCourses();
  const courses = localStorage.getItem(COURSES_KEY);
  return courses ? JSON.parse(courses) : getDefaultCourses();
}

// Default sample courses - Updated for offline coaching
function getDefaultCourses(): Course[] {
  return [
    {
      id: '1',
      class: 'Class 11',
      name: 'Mathematics',
      description: 'Complete mathematics course covering algebra, geometry, trigonometry, and statistics. Expert instruction with board exam preparation.',
      instructor: 'Prof. Rajesh Kumar',
      duration: '12 months',
      level: 'Intermediate',
      price: 8999,
      image: '/math.jpg',
      totalStudents: 156,
      batchType: 'Morning',
      location: 'Main Campus',
      classroom: 'Room A-101',
      includesMaterials: true,
      videoCount: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      class: 'Class 11',
      name: 'Science',
      description: 'Comprehensive science curriculum covering Physics, Chemistry, and Biology. Practical approach with lab demonstrations.',
      instructor: 'Dr. Priya Sharma',
      duration: '12 months',
      level: 'Intermediate',
      price: 9999,
      image: '/sceince.jpg',
      totalStudents: 142,
      batchType: 'Morning',
      location: 'Main Campus',
      classroom: 'Lab B-202',
      includesMaterials: true,
      videoCount: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      class: 'Class 11',
      name: 'English',
      description: 'Enhance English language skills through literature, grammar, and writing. Focus on board exam preparation and communication.',
      instructor: 'Ms. Anjali Patel',
      duration: '12 months',
      level: 'Beginner',
      price: 7999,
      image: '/english.jpg',
      totalStudents: 98,
      batchType: 'Evening',
      location: 'Main Campus',
      classroom: 'Room C-303',
      includesMaterials: true,
      videoCount: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      class: 'Class 12',
      name: 'Physics',
      description: 'Advanced physics covering mechanics, thermodynamics, electricity, magnetism, and modern physics. College entrance exam focused.',
      instructor: 'Dr. Vikram Singh',
      duration: '12 months',
      level: 'Advanced',
      price: 11999,
      image: '/images/dummy1.jpg',
      totalStudents: 124,
      batchType: 'Morning',
      location: 'Science Block',
      classroom: 'Lab P-401',
      includesMaterials: true,
      videoCount: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      class: 'Class 12',
      name: 'Chemistry',
      description: 'Detailed chemistry course covering organic, inorganic, and physical chemistry with problem-solving techniques.',
      instructor: 'Dr. Meera Gupta',
      duration: '12 months',
      level: 'Advanced',
      price: 11999,
      image: '/images/dummy2.jpg',
      totalStudents: 118,
      batchType: 'Morning',
      location: 'Science Block',
      classroom: 'Lab C-402',
      includesMaterials: true,
      videoCount: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      class: 'Class 12',
      name: 'Mathematics (Advanced)',
      description: 'Advanced mathematics including calculus, vectors, linear algebra, and probability. JEE and board exam preparation.',
      instructor: 'Prof. Arun Verma',
      duration: '12 months',
      level: 'Advanced',
      price: 12999,
      image: '/images/dummy3.jpg',
      totalStudents: 167,
      batchType: 'Weekend',
      location: 'Main Campus',
      classroom: 'Room M-501',
      includesMaterials: true,
      videoCount: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: '7',
      class: 'Class 10',
      name: 'Foundation Course',
      description: 'Comprehensive foundation course for Class 10 board exams covering all major subjects with regular mock tests.',
      instructor: 'Ms. Rina Mehta',
      duration: '10 months',
      level: 'Beginner',
      price: 6999,
      image: '/images/dummy1.jpg',
      totalStudents: 210,
      batchType: 'Evening',
      location: 'Main Campus',
      classroom: 'Room F-102',
      includesMaterials: true,
      videoCount: 20,
      createdAt: new Date().toISOString(),
    },
    {
      id: '8',
      class: 'Class 12',
      name: 'Biology',
      description: 'In-depth biology course covering botany, zoology, and human physiology with practical lab sessions.',
      instructor: 'Dr. Sanjay Kapoor',
      duration: '12 months',
      level: 'Advanced',
      price: 10999,
      image: '/images/dummy2.jpg',
      totalStudents: 89,
      batchType: 'Morning',
      location: 'Science Block',
      classroom: 'Lab B-403',
      includesMaterials: true,
      videoCount: 24,
      createdAt: new Date().toISOString(),
    },
  ];
}

// Save courses to localStorage
export function saveCourses(courses: Course[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}

// Initialize courses
export function initializeCourses(): void {
  if (typeof window === 'undefined') return;
  const existingCourses = localStorage.getItem(COURSES_KEY);

  let shouldRefresh = !existingCourses;
  if (existingCourses) {
    const courses = JSON.parse(existingCourses);
    // Refresh if courses need update (e.g., missing new fields)
    if (courses.some((c: any) => !c.batchType || !c.classroom)) {
      shouldRefresh = true;
    }
  }

  if (shouldRefresh) {
    saveCourses(getDefaultCourses());
  }
}

// Create new course
export function createCourse(course: Omit<Course, 'id' | 'createdAt'>): Course {
  const newCourse: Course = {
    ...course,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const courses = getAllCourses();
  courses.push(newCourse);
  saveCourses(courses);
  return newCourse;
}

// Update course
export function updateCourse(courseId: string, updates: Partial<Course>): Course | null {
  const courses = getAllCourses();
  const courseIndex = courses.findIndex(c => c.id === courseId);
  if (courseIndex === -1) return null;

  courses[courseIndex] = { ...courses[courseIndex], ...updates };
  saveCourses(courses);
  return courses[courseIndex];
}

// Get courses by class
export function getCoursesByClass(className: string): Course[] {
  const courses = getAllCourses();
  return courses.filter(course => course.class === className);
}

// Get courses by level
export function getCoursesByLevel(level: Course['level']): Course[] {
  const courses = getAllCourses();
  return courses.filter(course => course.level === level);
}

// Search courses
export function searchCourses(query: string): Course[] {
  const courses = getAllCourses();
  const lowerQuery = query.toLowerCase();
  return courses.filter(course =>
    course.name.toLowerCase().includes(lowerQuery) ||
    course.class.toLowerCase().includes(lowerQuery) ||
    course.instructor.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery)
  );
}

// Get all enrollments
export function getAllEnrollments(): Enrollment[] {
  if (typeof window === 'undefined') return [];
  const enrollments = localStorage.getItem(ENROLLMENTS_KEY);
  if (enrollments) {
    return JSON.parse(enrollments);
  }
  // Load mock enrollments on first load
  saveEnrollments(MOCK_ENROLLMENTS as Enrollment[]);
  return MOCK_ENROLLMENTS as Enrollment[];
}

// Save enrollments
function saveEnrollments(enrollments: Enrollment[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(enrollments));
}

// Enroll student in course
export function enrollStudent(studentId: string, courseId: string): { success: boolean; error?: string } {
  const enrollments = getAllEnrollments();
  const courses = getAllCourses();

  // Check if course exists
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return { success: false, error: 'Course not found' };
  }

  // Check if already enrolled
  if (enrollments.some(e => e.studentId === studentId && e.courseId === courseId && e.status === 'active')) {
    return { success: false, error: 'Already enrolled in this course' };
  }

  const newEnrollment: Enrollment = {
    id: Date.now().toString(),
    studentId,
    courseId,
    enrollmentDate: new Date().toISOString(),
    status: 'active',
  };

  enrollments.push(newEnrollment);

  // Update total students count
  const updatedCourses = courses.map(c => {
    if (c.id === courseId) {
      return {
        ...c,
        totalStudents: (c.totalStudents || 0) + 1
      };
    }
    return c;
  });

  saveCourses(updatedCourses);
  saveEnrollments(enrollments);

  return { success: true };
}

// Get student enrollments
export function getStudentEnrollments(studentId: string): Enrollment[] {
  const enrollments = getAllEnrollments();
  return enrollments.filter(e => e.studentId === studentId);
}

// Get course enrollments
export function getCourseEnrollments(courseId: string): Enrollment[] {
  const enrollments = getAllEnrollments();
  return enrollments.filter(e => e.courseId === courseId);
}

// Get course by ID
export function getCourseById(courseId: string): Course | null {
  const courses = getAllCourses();
  return courses.find(course => course.id === courseId) || null;
}

// Update enrollment status
export function updateEnrollmentStatus(enrollmentId: string, status: Enrollment['status']): boolean {
  const enrollments = getAllEnrollments();
  const enrollmentIndex = enrollments.findIndex(e => e.id === enrollmentId);

  if (enrollmentIndex === -1) return false;

  enrollments[enrollmentIndex].status = status;
  saveEnrollments(enrollments);
  return true;
}