import React, { useState } from 'react';
import axios from 'axios';

export default function AuthForm({ type }) {
  const [data, setData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = type === 'login'
      ? 'http://127.0.0.1:8000/api/login'
      : 'http://127.0.0.1:8000/api/register';

    try {
      const res = await axios.post(url, data);
      localStorage.setItem('token', res.data.token);

      const role = res.data.user.role;
      window.location.href = role === 'admin' ? '/home' : '/allcars';

    } catch (err) {
      const msg = err.response?.data?.message || 'Erreur inconnue';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow pt-20">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {type === 'login' ? 'Connexion' : 'Créer un compte'}--*-
      </h2>
    <div><h1></h1></div>
      {error && <p className="mb-3 text-red-500">{error}</p>}

      {type === 'register' && (
        <>
          <input
            type="text"
            placeholder="Nom"
            className="mb-2 w-full border p-2"
            onChange={e => setData({ ...data, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Téléphone"
            className="mb-2 w-full border p-2"
            onChange={e => setData({ ...data, phone: e.target.value })}
          />
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        className="mb-2 w-full border p-2"
        onChange={e => setData({ ...data, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="mb-4 w-full border p-2"
        onChange={e => setData({ ...data, password: e.target.value })}
        required
      />

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
        {type === 'login' ? 'Connexion' : 'S’inscrire'}
      </button>
    </form>
  );
}
