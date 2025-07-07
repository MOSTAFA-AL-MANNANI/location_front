import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ajoutercars = () => {
  const navigate = useNavigate();
  const [listcat, setListcat] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    prix: '',
    image: null, // Changé pour accepter un fichier
    description: '',
    id_cat: '',
    availability: 1
  });
  const [preview, setPreview] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/listecat');
        setListcat(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Créer une prévisualisation
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('prix', formData.prix);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('id_cat', formData.id_cat);
      formDataToSend.append('availability', formData.availability);

      const response = await axios.post('http://localhost:8000/api/ajoutercar', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 201) {
        alert('Voiture ajoutée avec succès!');
        navigate('/cars');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de l\'ajout de la voiture');
      console.error('Error adding car:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter une nouvelle voiture</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Marque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Modèle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image (JPG, PNG, JPEG - max 2MB)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept=".jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {preview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Aperçu:</p>
                <img 
                  src={preview} 
                  alt="Aperçu de la voiture" 
                  className="h-32 object-contain mt-1 border rounded"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select 
              name="id_cat" 
              value={formData.id_cat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {listcat.map((category) => (
                <option key={category.id_cat} value={category.id_cat}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Disponibilité */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              id="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="availability" className="ml-2 block text-sm text-gray-700">
              Disponible
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'En cours...' : 'Ajouter la voiture'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ajoutercars;