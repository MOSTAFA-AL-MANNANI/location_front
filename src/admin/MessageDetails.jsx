import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/message/${id}`);
        setMessage(res.data);
      } catch {
        setError('Erreur lors du chargement du message.');
      }
    };
    fetchMessage();
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!message) return <div className="p-4">Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <FiArrowLeft className="mr-2" /> Retour
      </button>
      <h2 className="text-2xl font-bold mb-6">Détails du message</h2>
      <div className="bg-white shadow-md rounded p-6 space-y-4">
        <p><span className="font-semibold">Nom :</span> {message.name}</p>
        <p><span className="font-semibold">Email :</span> {message.email}</p>
        <p><span className="font-semibold">Sujet :</span> {message.subject}</p>
        <p><span className="font-semibold">Message :</span></p>
        <p className="whitespace-pre-wrap border p-3 rounded bg-gray-50">{message.message}</p>
        <p><span className="font-semibold">Lu :</span> {message.read ? 'Oui' : 'Non'}</p>
        <p><span className="font-semibold">Envoyé le :</span> {new Date(message.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default MessageDetails;
