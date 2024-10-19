import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);

  // Defina a URL do seu workspace
  const WORKSPACE_URL = "https://4000-idx-banco-1729352100404.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev/api";

  // Função para buscar usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${WORKSPACE_URL}/users`, { withCredentials: true });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError(`Error al obtener usuarios: ${error.message}`);
      setLoading(false);
    }
  };

  // Use o efeito para buscar usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${WORKSPACE_URL}/users/register`, newUser, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Usuario registrado:', response.data);
      setSuccess(true);
      setNewUser({ name: '', email: '', password: '' }); // Limpar formulário
      fetchUsers(); // Recarregar a lista de usuários após o registro
    } catch (error) {
      setError(`Error al registrar el usuario: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>

      <h2>Registrar Novo Usuário</h2>
      {success && <div style={{ color: 'green' }}>Usuário registrado com sucesso!</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Senha"
          required
        />
        <button type="submit">Registrar Usuário</button>
      </form>
    </div>
  );
};

export default App;
