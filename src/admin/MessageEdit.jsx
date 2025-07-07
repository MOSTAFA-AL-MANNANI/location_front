import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

const MessageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    read: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/message/${id}`);
        setFormData({res });
      } catch {
        setError('Erreur lors du chargement.');
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ read: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(`http://localhost:8000/api/modifiermessage/${id}`, formData);
      navigate('/messageslist');
    } catch {
      setError('Erreur lors de la mise à jour.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <FiArrowLeft className="mr-2" /> Retour
      </button>
      <h2 className="text-2xl font-bold mb-6">Modifier le statut de lecture</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.read}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Message lu</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          {isSubmitting ? 'Enregistrement...' : <><FiSave className="mr-2" /> Enregistrer</>}
        </button>
      </form>
    </div>
  );
};

export default MessageEdit;
