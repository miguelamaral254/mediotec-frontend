'use client';

import StudentLessonLookup from '@/app/components/users/students/StudentLessonLookup';

const Schedules = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Schedules</h1>
        <StudentLessonLookup />
      </div>
    </div>
  );
};

export default Schedules;
