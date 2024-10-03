'use client';

import ProfessorLessonLookup from '@/app/components/users/professors/ProfessorLessonLookup';

const ProfessorDashboard = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <ProfessorLessonLookup />
    </div>
  );
};

export default ProfessorDashboard;
