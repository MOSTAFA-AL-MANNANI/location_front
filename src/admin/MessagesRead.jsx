import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiTrash2, FiCheck } from 'react-icons/fi';

const Messagesread = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/listemessage1');
      setMessages(res.data);
    } catch {
      setError('Erreur lors du chargement des messages non lus.');
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Voulez-vous supprimer ce message ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/message/${id}`);
        setMessages(messages.filter(m => m.id !== id));
      } catch {
        alert('Erreur lors de la suppression.');
      }
    }
  };



  useEffect(() => {
    fetchMessages();
  }, []);

  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages non lus</h1>
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Nom</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Sujet</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, idx) => (
            <tr key={msg.id} className="hover:bg-gray-50">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{msg.name}</td>
              <td className="p-2">{msg.email}</td>
              <td className="p-2">{msg.subject}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => navigate(`/messages/${msg.id}`)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Voir détails"
                >
                  <FiEye />
                </button>
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Supprimer"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {messages.length === 0 && <p className="mt-4 text-gray-600">Aucun message non lu.</p>}
    </div>
  );
};

export default Messagesread;
