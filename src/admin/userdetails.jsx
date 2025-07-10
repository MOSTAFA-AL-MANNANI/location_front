import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p className="text-center mt-20">Chargement...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Détails de l'utilisateur</h2>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
            alt={user.name}
            className="w-16 h-16 rounded-full shadow"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nom Complet</p>
            <p className="text-base text-gray-700">{user.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base text-gray-700">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Téléphone</p>
            <p className="text-base text-gray-700">{user.phone || 'Non renseigné'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rôle</p>
            <p className="text-base text-gray-700 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/users" className="text-blue-600 hover:underline">← Retour à la liste</Link>
        </div>
      </div>
    </div>
  );
}
