import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiTrash2 } from 'react-icons/fi';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    prix: '',
    description: '',
    id_cat: '',
    availability: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carRes, catRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/car/${id}`),
          axios.get(`http://localhost:8000/api/listecat`),
        ]);

        const car = carRes.data;

        setFormData({
          name: car.name || '',
          brand: car.brand || '',
          model: car.model || '',
          prix: car.prix || '',
          description: car.description || '',
          id_cat: car.id_cat || '',
          availability: car.availability ?? true,
        });

        setCurrentImageUrl(car.image_url || '');
        setCategories(catRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
      setError("L'image doit être inférieure à 2MB (jpeg/png)");
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
      const formDataToSend = new FormData();
      formDataToSend.append('_method', 'PUT'); // important pour Laravel
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('prix', formData.prix);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('id_cat', formData.id_cat);
      formDataToSend.append('availability', formData.availability ? 1 : 0);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await axios.post(`http://localhost:8000/api/modifiercar/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/carslist', { state: { success: 'Voiture modifiée avec succès' } });
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-blue-600">
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Modifier la Voiture</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marque *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modèle *</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prix (€) *</label>
            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie *</label>
            <select
              name="id_cat"
              value={formData.id_cat}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id_cat} value={cat.id_cat}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <label className="ml-2 text-sm">Disponible</label>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Image (JPG, PNG max 2MB)</label>
          {currentImageUrl && (
            <div className="relative mb-3">
              <img src={currentImageUrl} alt="Aperçu" className="h-48 w-auto rounded border" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          )}

          <input type="file" accept="image/jpeg,image/png" onChange={handleImageChange} />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
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

export default EditCar;
