import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [daysCount, setDaysCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Charger les données de la voiture
  useEffect(() => {
    axios.get(`http://localhost:8000/api/car/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://127.0.0.1:8000/api/user", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
  }, []);

  // Calcul automatique du prix total
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = end - start;
      if (diff >= 0) {
        const days = Math.floor(diff / (1000 * 3600 * 24)) + 1;
        setDaysCount(days);
        setTotalPrice(days * (car?.prix || 0));
      } else {
        setDaysCount(0);
        setTotalPrice(0);
      }
    } else {
      setDaysCount(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, car]);

  // Vérifier si l'utilisateur est connecté avant réservation
  const handleReservation = () => {
    if (!user) return navigate("/login");
    setShowModal(true);
  };

  // Envoyer la réservation
  const handleSubmit = async () => {
    setErrorMsg('');
    if (!startDate || !endDate) {
      setErrorMsg('Veuillez sélectionner les deux dates.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/bookings', {
        id_car: car.id_car,
        start_date: startDate,
        end_date: endDate,
        prix_total: totalPrice
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Réservation confirmée ✅");

      // Message WhatsApp
      const message = `Nouvelle Réservation:\nNom: ${user.name}\nVoiture: ${car.name}\nDu: ${startDate}\nAu: ${endDate}\nPrix: ${totalPrice} DH`;
      const phone = "212612345678";
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");

      setShowModal(false);
      setStartDate('');
      setEndDate('');
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur lors de la réservation.");
    }
    setLoading(false);
  };

  if (!car) return <p className="text-center mt-20">Chargement...</p>;

  return (
    <div className="min-h-screen bg-white py-12 px-6 pt-20">
      <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow">
        <img
          src={`http://127.0.0.1:8000/storage/${car.image}`}
          alt={car.name}
          className="w-full h-80 object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-6 mb-2">{car.name}</h1>
        <p className="text-gray-600 text-lg mb-4">{car.description}</p>
        <p className="text-blue-600 text-xl font-semibold mb-6">{car.prix} DH / jour</p>
        <p className="text-gray-700"><strong>Marque:</strong> {car.brand}</p>
        <p className="text-gray-700 mb-4"><strong>Modèle:</strong> {car.model}</p>
        <button
          onClick={handleReservation}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded text-lg"
        >
          Réserver maintenant
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Réservation</h2>

            <p><strong>Nom:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Voiture:</strong> {car.name}</p>

            <div className="my-4">
              <label className="block text-sm font-medium">Date début</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="my-4">
              <label className="block text-sm font-medium">Date fin</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            {daysCount > 0 && (
              <div className="my-2">
                <p><strong>Durée:</strong> {daysCount} {daysCount > 1 ? 'jours' : 'jour'}</p>
                <p className="text-blue-600 font-semibold">Prix Total: {totalPrice} DH</p>
              </div>
            )}

            {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full disabled:opacity-50"
            >
              {loading ? 'Traitement...' : 'Valider la réservation'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
