"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getUserData } from "@/app/services/authService";
import { AdminSection } from "@/app/components/users/admin/AdminSection";
import { ProfessorSection } from "@/app/components/users/professors/schedules/ProfessorSection";
import NotificationTab from "@/app/components/notifications/NotificationTab";
import { MdClose, MdNotifications } from "react-icons/md";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const cpf = localStorage.getItem("cpf");
      if (!token || !cpf) {
        router.push("/auth/login");
        return;
      }

      try {
        const data = await getUserData(cpf);
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Erro ao carregar dados do usuário.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, setUser]);

  if (loading) {
    return <div className="text-center text-lg mt-20">Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full pl-20 flex flex-col bg-gray-100">
      {user ? (
        <>
          <div className="flex justify-between items-center bg-[#0056A3] p-4 text-white shadow-lg">
            <h1 className="text-2xl font-bold">
              
            </h1>
            <button
              className="relative flex justify-center items-center bg-white text-[#4666AF] rounded-full h-10 w-10 shadow-md"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              {showNotifications ? (
                <MdClose size={24} />
              ) : (
                <>
                  <MdNotifications size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
          <div className="flex justify-center items-center w-full flex-grow bg-gray-100">
            <div className="w-full max-w-6xl">
              {user.role === "ADMIN" && <AdminSection />}
              {user.role === "PROFESSOR" && <ProfessorSection />}
            </div>
          </div>

          <NotificationTab
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            setUnreadCount={setUnreadCount}
          />
        </>
      ) : (
        <p className="text-center mt-20">
          Nenhum dado encontrado para este usuário.
        </p>
      )}
    </div>
  );
}