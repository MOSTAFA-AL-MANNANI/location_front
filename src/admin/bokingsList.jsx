// pages/BookingList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reservations')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8000/api/reservation/${id}/status`, {
        status: newStatus,
      });
      setBookings(prev =>
        prev.map(b =>
          b.id === id ? { ...b, status: newStatus } : b
        )
      );
      alert("Statut mis à jour !");
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des Réservations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2">Voiture</th>
              <th className="px-4 py-2">Dates</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-2">{b.user?.name || "Inconnu"}</td>
                <td className="px-4 py-2">{b.cars?.name || "Inconnu"}</td>
                <td className="px-4 py-2">
                  {b.start_date} → {b.end_date}
                </td>
                <td className="px-4 py-2">{b.prix_total} DH</td>
                <td className="px-4 py-2">
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${b.status === 'pending' && 'bg-yellow-100 text-yellow-800'}
                    ${b.status === 'confirmed' && 'bg-green-100 text-green-800'}
                    ${b.status === 'cancelled' && 'bg-red-100 text-red-800'}
                    `}
                >
                    {b.status === 'pending' && '🕒 En attente'}
                    {b.status === 'confirmed' && '✅ Confirmée'}
                    {b.status === 'cancelled' && '❌ Annulée'}
                </span>
                </td>
                <td className="px-10 py-2">
                <select
                    style={{ width: '60%' }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium shadow border appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${b.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                    ${b.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                    ${b.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-300' : ''}
                    `}
                    value={b.status || 'pending'} // ✅ valeur par défaut
                    onChange={e => updateStatus(b.id, e.target.value)}
                >
                    <option value="pending">🕒 En attente</option>
                    <option value="confirmed">✅ Confirmée</option>
                    <option value="cancelled">❌ Annulée</option>
                </select>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <p className="text-gray-500 mt-4">Aucune réservation trouvée.</p>}
      </div>
    </div>
  );
}
