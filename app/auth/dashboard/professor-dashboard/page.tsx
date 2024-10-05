'use client';

import ProfessorLessonLookup from '@/app/components/users/professors/ProfessorLessonLookup';

const ProfessorDashboard = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-red-900">
      <ProfessorLessonLookup />
    </div>
  );
};

export default ProfessorDashboard;
