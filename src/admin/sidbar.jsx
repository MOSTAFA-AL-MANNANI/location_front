import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.data.role === 'admin') {
          setUser(res.data);
        } else {
          localStorage.removeItem('token');
          navigate('/');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

const logout = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Erreur logout:", err);
    }
  }

  localStorage.removeItem("token");
  setUser(null);

  // ✅ Redirection vers la page d'accueil
  window.location.href = "/"; // ← cela redirige et recharge automatiquement la page
};


  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-200 bg-white">
      <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600 mb-4">
          Admin Panel
        </span>

        <ul className="space-y-1">
          <li><Link to="/home" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">🏠 Home</Link></li>
          <li><Link to="/carslist" className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">🚗 Afficher Cars</Link></li>
          <li><Link to="/ajoutercars" className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">➕ Ajouter Cars</Link></li>
          <li><Link to="/message/read/" className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">📩 Message Lu</Link></li>
          <li><Link to="/message/unread/" className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">📬 Message Non Lu</Link></li>
          <li><Link to="/users" className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">👥 Utilisateurs</Link></li>
          <li><Link to="/bookingsList" className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">📅 Réservations</Link></li>
          <li><Link to="/categories" className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">📂 Catégories</Link></li>
          <li>
            <button
              onClick={logout}
              className="w-full text-left text-sm text-red-500 px-4 py-2 hover:bg-red-100 rounded"
            >
              🔒 Déconnexion
            </button>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 p-4">
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Chargement...</p>
        )}
      </div>
    </div>
  );
}
