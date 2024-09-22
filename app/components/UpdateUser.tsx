const UpdateUser = () => {
    return (
      <div className="bg-gray-500 rounded-lg p-10">
        <h2 className="text-xl">Atualizar Usuário</h2>
        {/* Campos para atualização */}
        <div className="p-1 ">
          <label>CPF:</label>
          <input type="text" className="border p-1 text-black" required />
        </div>
        <button className="mt-4 p-2 bg-yellow-500 text-white rounded">Buscar Usuário</button>
        {/* Exibir campos editáveis e botão para atualizar */}
      </div>
    );
  };
  
  export default UpdateUser;
  