'use client';

import StudentLessonLookup from '@/app/components/users/students/StudentLessonLookup';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <StudentLessonLookup />
    </div>
  );
};

export default StudentDashboard;
