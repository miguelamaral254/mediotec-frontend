import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import NotificationForm from "../../notifications/NotificationForm";
import AnalyticsDashboard from "./AnalyticsDashboard";

export const AdminSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-300 w-full max-w-6xl p-6 relative">
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-14 h-14 bg-[#4666AF] text-white rounded-full shadow-lg hover:bg-blue-500 focus:outline-none"
          >
            <FiMail size={32} />
          </button>
        </div>

        <div
          className={`fixed inset-y-0 right-0 z-40 w-96 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {isDrawerOpen && (
            <div className="h-full w-full">
              <NotificationForm setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          )}
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-[#4666AF] mb-4">
            Painel do Administrador
          </h2>
          <p className="text-gray-600 text-lg">
            Acompanhe as métricas e envie notificações diretamente aos usuários.
          </p>
        </div>

        <AnalyticsDashboard />
      </div>
    </div>
  );
};
