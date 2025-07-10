import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaCar } from 'react-icons/fa';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // تحميل بيانات المستخدم عند الدخول
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://127.0.0.1:8000/api/user", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.role === "client") {
        setUser(res.data); // تخزين بيانات المستخدم
      }
    })
    .catch(() => {
      localStorage.removeItem("token"); // في حال انتهت صلاحية التوكن
    });
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.log("Erreur logout:", err);
    }

    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg fixed  left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            {/* Logo */}
            <div>
              <Link to="#" className="flex items-center py-4 px-2">
                <FaCar className="h-8 w-8 text-blue-500" />
                <span className="font-semibold text-gray-500 text-lg ml-2">LuxeDrive</span>
              </Link>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500">Accueil</Link>
              <Link to="/allcars" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500">Voitures</Link>
              <a href="#about" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500">À propos</a>
              <a href="#contact" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500">Contact</a>
            </div>
          </div>

          {/* Auth / User Info */}
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <>
                <Link to="/login" className="py-2 px-2 text-gray-500 hover:bg-blue-500 hover:text-white rounded transition">Connexion</Link>
                <Link to="/register" className="py-2 px-2 text-gray-500 hover:bg-blue-500 hover:text-white rounded transition">Créer un compte</Link>
              </>
            ) : (
              <>
                <span className="text-gray-600">Bienvenue, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    
  );
}
