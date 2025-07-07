import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/boo/${id}`);
        setBooking(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des détails de la réservation.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-6">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <FiArrowLeft className="mr-2" /> Retour
      </button>

      <h2 className="text-2xl font-bold mb-6">Détails de la réservation</h2>

      <div className="bg-white shadow-md rounded p-6 space-y-4">
        <p><span className="font-semibold">ID Utilisateur :</span> {booking.id_user}</p>
        <p><span className="font-semibold">ID Voiture :</span> {booking.id_car}</p>
        <p><span className="font-semibold">Date de début :</span> {booking.start_date}</p>
        <p><span className="font-semibold">Date de fin :</span> {booking.end_date}</p>
        <p><span className="font-semibold">Prix total :</span> {booking.prix_total} €</p>
        <p><span className="font-semibold">Statut :</span> {booking.status}</p>

        {booking.image && (
          <div>
            <span className="font-semibold">Image :</span>
            <img
              src={`http://localhost:8000/storage/${booking.image}`}
              alt="Preuve"
              className="mt-2 rounded border w-64"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
