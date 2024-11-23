import Modal from "react-modal";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";
import AddStudentModal from "./create-users/AddStudentModal";
import { Parent } from "@/app/interfaces/Parent";
import { Student } from "@/app/interfaces/Student";
import { User } from "@/app/interfaces/User";
import { FaTrash } from "react-icons/fa";
import { formatCpf } from "@/app/utils/formatCpf ";

interface UserEditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedUser: User | Parent | null;
  onUpdateUser: (user: User) => Promise<void>;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onRequestClose,
  selectedUser,
  onUpdateUser,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentModalIsOpen, setStudentModalIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setBirthDate(selectedUser.birthDate || "");
      setAddress(selectedUser.address || "");
      setPhone(selectedUser.phone || "");
      setActive(selectedUser.active);
      setStudents(selectedUser.students || []);
    }
  }, [isOpen, selectedUser]);

  const handleUpdate = async () => {
    if (selectedUser) {
      const updatedUser: User = {
        ...selectedUser,
        name,
        email,
        birthDate,
        address,
        phone,
        active,
        studentCpfs: students.map((student) => student.cpf),
      };

      const confirmUpdate = await Swal.fire({
        title: "Confirmação",
        text: "Você tem certeza que deseja atualizar o usuário?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, atualizar!",
        cancelButtonText: "Não, cancelar",
      });

      if (confirmUpdate.isConfirmed) {
        try {
          await onUpdateUser(updatedUser);
          await Swal.fire({
            icon: "success",
            title: "Atualização bem-sucedida!",
            text: "O usuário foi atualizado com sucesso.",
          });
          onRequestClose();
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";
          await Swal.fire({
            icon: "error",
            title: "Erro na atualização!",
            text: `Houve um problema ao atualizar o usuário. Erro: ${errorMessage}`,
          });
        }
      }
    }
  };

  const addStudent = (student: Student) => {
    if (!students.some((s) => s.cpf === student.cpf)) {
      setStudents((prevStudents) => [...prevStudents, student]);
    }
    setStudentModalIsOpen(false);
  };

  const removeStudent = (cpf: string) => {
    setStudents((prevStudents) => prevStudents.filter((s) => s.cpf !== cpf));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: "90%",
          maxWidth: "600px",
          height: "80%",
          margin: "auto",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          position: "relative",
          overflow: "hidden",
        },
      }}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-md w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
      >
        ✕
      </button>
      <div className="h-full overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Editar Usuário
        </h3>

        {selectedUser && (
          <div className="w-full space-y-4">
            <div>
              <label className="block mb-2 text-gray-600">Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">
                Data de Nascimento:
              </label>
              <input
                type="date"
                value={birthDate.split("T")[0] || ""}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">Endereço:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">Telefone:</label>
              <InputMask
                mask="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">Ativo:</label>
              <select
                value={active ? "Sim" : "Não"}
                onChange={(e) => setActive(e.target.value === "Sim")}
                className="border rounded-md p-2 w-full"
              >
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>

            {selectedUser.role === "PARENT" && (
              <>
                <div className="flex justify-center">
                  <button
                    onClick={() => setStudentModalIsOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Adicionar Alunos
                  </button>
                </div>

                <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md">
                  <div className="grid grid-cols-3 gap-4 text-center font-semibold mb-2">
                    <div className="text-gray-600">Nome</div>
                    <div className="text-gray-600">CPF</div>
                    <div className="text-gray-600">Ações</div>
                  </div>
                  {students.map((student, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 items-center text-center border-b last:border-none py-2"
                    >
                      <div className="flex justify-center items-center">
                        {student.name}
                      </div>
                      <div className="flex justify-center items-center">
                        {formatCpf(student.cpf)}
                      </div>
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => removeStudent(student.cpf)}
                          className="text-red-500 hover:text-red-700 transition flex items-center gap-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Atualizar Usuário
              </button>
            </div>
          </div>
        )}
      </div>
      <AddStudentModal
        isOpen={studentModalIsOpen}
        onRequestClose={() => setStudentModalIsOpen(false)}
        onAddStudent={addStudent}
        existingStudentCpfs={students.map((student) => student.cpf)}
      />{" "}
    </Modal>
  );
};

export default UserEditModal;
