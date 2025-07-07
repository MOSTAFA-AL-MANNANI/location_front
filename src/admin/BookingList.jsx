import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/listeboo');
      setBookings(res.data);
    } catch (err) {
      setError("Erreur lors du chargement des réservations.");
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/deleteboo/${id}`);
        setBookings(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des réservations</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Utilisateur</th>
              <th className="p-2 text-left">Voiture</th>
              <th className="p-2 text-left">Date début</th>
              <th className="p-2 text-left">Date fin</th>
              <th className="p-2 text-left">Prix total</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{booking.id_user}</td>
                <td className="p-2">{booking.id_car}</td>
                <td className="p-2">{booking.start_date}</td>
                <td className="p-2">{booking.end_date}</td>
                <td className="p-2">{booking.prix_total} €</td>
                <td className="p-2">{booking.status}</td>
                <td className="p-2 flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => navigate(`/bookings/view/${booking.id}`)}
                  >
                    <FiEye />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => navigate(`/bookings/edit/${booking.id}`)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteBooking(booking.id)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
