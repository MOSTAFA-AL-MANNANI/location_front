import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/home", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setStats(res.data);
    })
    .catch((err) => {
      console.error("Erreur chargement :", err);
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center p-4">Chargement...</p>;
  if (!stats) return <p className="text-center text-red-500">Erreur de chargement</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Administrateur</h1>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Voitures" value={stats.cars.count} growth={stats.cars.growth} />
        <StatCard title="Réservations" value={stats.reservations.count} growth={stats.reservations.growth} />
        <StatCard title="Revenus (Dhs)" value={stats.revenue.total} growth={stats.revenue.growth} />
        <StatCard title="Clients" value={stats.clients.count} growth={stats.clients.growth} />
      </div>

      {/* Autres données */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Messages" value={stats.messages} />
        <InfoCard title="Utilisateurs" value={stats.users} />
        <InfoCard title="Catégories" value={stats.categories} />
      </div>
    </div>
  );
}

function StatCard({ title, value, growth }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-gray-500 text-sm font-semibold">{title}</h2>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className={`text-sm font-medium ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {growth}% par rapport au mois précédent
      </p>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-gray-600 text-md">{title}</h2>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
