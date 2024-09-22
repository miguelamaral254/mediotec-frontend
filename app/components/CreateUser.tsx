const CreateUser = () => {
    return (
      <div className="bg-gray-500 rounded-lg p-10">
        <h2 className="text-xl">Criar Usuário</h2>
        {/* Formulário de criação de usuário */}
        <form>
          {/* Campos do formulário */}
          <div className="py-5">
            <label>Nome:</label>
            <input type="text" className="border p-1" required />
          </div>
          <div>
            <label>CPF:</label>
            <input type="text" className="border p-1" required />
          </div>
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Criar Usuário</button>
        </form>
      </div>
    );
  };
  
  export default CreateUser;
  