import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer toutes les catégories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/listecat');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ajouter une catégorie
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/modifiercat/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:8000/api/ajoutercat', formData);
      }
      setFormData({ name: '' });
      fetchCategories();
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Modifier une catégorie
  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingId(category.id_cat);
  };

  // Supprimer une catégorie
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie?')) {
      try {
        await axios.delete(`http://localhost:8000/api/cat/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Catégories</h1>
      
      {/* Formulaire */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Modifier Catégorie' : 'Ajouter Catégorie'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nom de la catégorie
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isLoading ? 'En cours...' : editingId ? 'Modifier' : 'Ajouter'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '' });
              }}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Annuler
            </button>
          )}
        </form>
      </div>

      {/* Liste des catégories */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Liste des Catégories</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">Aucune catégorie disponible</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b border-gray-200 text-left">ID</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Nom</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id_cat} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200">{category.id_cat}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{category.name}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => handleEdit(category)}
                        className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(category.id_cat)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;