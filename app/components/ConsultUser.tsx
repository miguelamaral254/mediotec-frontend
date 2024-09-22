const ConsultUser = () => {
    return (
      <div className="bg-gray-500 rounded-lg p-10">
        <h2 className="text-xl">Consultar Usuário</h2>
        {/* Campos de consulta */}
        <div>
          <label>CPF:</label>
          <input type="text" className="border p-1 text-black" required />
        </div>
        <button className="mt-4 p-2 bg-green-500 text-white rounded">Buscar Usuário</button>
        {/* Exibir informações do usuário aqui */}
      </div>
    );
  };
  
  export default ConsultUser;
  