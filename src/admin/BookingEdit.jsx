import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSave, FiArrowLeft, FiTrash2 } from 'react-icons/fi';

const BookingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_user: '',
    id_car: '',
    start_date: '',
    end_date: '',
    prix_total: '',
    status: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/boo/${id}`);
        const booking = res.data;
        setFormData({
          id_user: booking.id_user || '',
          id_car: booking.id_car || '',
          start_date: booking.start_date || '',
          end_date: booking.end_date || '',
          prix_total: booking.prix_total || '',
          status: booking.status || '',
        });
        if (booking.image) {
          setCurrentImageUrl(`http://localhost:8000/storage/${booking.image}`);
        }
      } catch (err) {
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('L\'image doit être inférieure à 2MB.');
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setCurrentImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const dataToSend = new FormData();
      dataToSend.append('_method', 'PUT'); // Laravel update method
      dataToSend.append('id_user', formData.id_user);
      dataToSend.append('id_car', formData.id_car);
      dataToSend.append('start_date', formData.start_date);
      dataToSend.append('end_date', formData.end_date);
      dataToSend.append('prix_total', formData.prix_total);
      dataToSend.append('status', formData.status);
      if (imageFile) {
        dataToSend.append('image', imageFile);
      }

      await axios.post(`http://localhost:8000/api/modifierboo/${id}`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/bookingslist', { state: { success: 'Réservation modifiée avec succès' } });
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(', ')
        : err.response?.data?.message || 'Erreur lors de la modification';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <FiArrowLeft className="mr-2" /> Retour
      </button>

      <h2 className="text-2xl font-bold mb-6">Modifier la réservation</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow-md">
        <div>
          <label className="block mb-1 font-medium">ID Utilisateur *</label>
          <input
            type="text"
            name="id_user"
            value={formData.id_user}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">ID Voiture *</label>
          <input
            type="text"
            name="id_car"
            value={formData.id_car}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date de début *</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date de fin *</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Prix total (€) *</label>
          <input
            type="number"
            name="prix_total"
            value={formData.prix_total}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Statut *</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image (JPG, PNG max 2MB)</label>
          {currentImageUrl && (
            <div className="relative mb-3">
              <img src={currentImageUrl} alt="Image réservation" className="h-48 w-auto rounded border" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            {isSubmitting && (
              <svg
                className="animate-spin mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingEdit;
