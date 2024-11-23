import React, { useState } from "react";
import { notificationService } from "@/app/services/notificationService";
import Swal from "sweetalert2";

interface NotificationFormProps {
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ setIsDrawerOpen }) => {
  const [roles, setRoles] = useState<{ [key: string]: boolean }>({
    STUDENT: false,
    ADMIN: false,
    PROFESSOR: false,
    PARENT: false,
  });
  const [message, setMessage] = useState("");
  const [header, setHeader] = useState("");

  const handleCheckboxChange = (role: string) => {
    setRoles((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  const handleSelectAll = (isChecked: boolean) => {
    setRoles({
      STUDENT: isChecked,
      ADMIN: isChecked,
      PROFESSOR: isChecked,
      PARENT: isChecked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRoles = Object.keys(roles).filter((role) => roles[role]);

    if (selectedRoles.length === 0) {
      Swal.fire({
        title: "Erro!",
        text: "Por favor, selecione pelo menos um receptor.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const notificationRequests = selectedRoles.map((role) => ({
      role,
      message,
      header,
    }));

    Swal.fire({
      title: "Carregando...",
      text: "Enviando notificações...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      for (const request of notificationRequests) {
        await notificationService.sendNotification(request);
      }

      Swal.close();

      Swal.fire({
        title: "Sucesso!",
        text: "Notificação enviada com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setRoles({
        STUDENT: false,
        ADMIN: false,
        PROFESSOR: false,
        PARENT: false,
      });
      setMessage("");
      setHeader("");
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
      Swal.close();
      Swal.fire({
        title: "Erro!",
        text: "Ocorreu um erro ao enviar a notificação.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="w-full bg-blue-500 flex justify-between items-center px-6 py-4">
        <h3 className="text-lg font-bold text-white">Nova Notificação</h3>
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="p-6 flex-grow">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cabeçalho
            </label>
            <input
              type="text"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enviar para
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="select-all"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="select-all"
                  className="ml-2 text-sm text-gray-800"
                >
                  Todos
                </label>
              </div>
              {["STUDENT", "ADMIN", "PROFESSOR", "PARENT"].map((role) => (
                <div key={role} className="flex items-center">
                  <input
                    type="checkbox"
                    id={role}
                    checked={roles[role]}
                    onChange={() => handleCheckboxChange(role)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={role}
                    className="ml-2 text-sm text-gray-800 capitalize"
                  >
                    {role === "STUDENT"
                      ? "Alunos"
                      : role === "ADMIN"
                      ? "Coordenação"
                      : role === "PROFESSOR"
                      ? "Professores"
                      : "Pais"}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;