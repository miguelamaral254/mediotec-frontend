'use client';

import ProfessorPage from "@/app/components/users/professors/grades/ProfessorPage";
import { useEffect, useState } from "react";

const Grades = () => {
  const [cpf, setCpf] = useState<string | null>(null);

  useEffect(() => {
    const storedCpf = localStorage.getItem("cpf");
    if (storedCpf) {
      setCpf(storedCpf);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {cpf ? (
        <ProfessorPage cpf={cpf} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Grades;