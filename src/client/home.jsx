import { FaCar, FaClock, FaStar, FaMoneyBillWave, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const HomeC = () => {
  const popularCars = [
    {
      id: 1,
      name: 'Mercedes-Benz Classe S',
      price: '200€/jour',
      image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'BMW Série 7',
      price: '180€/jour',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Audi A8',
      price: '190€/jour',
      image: 'https://images.unsplash.com/photo-1580274455191-1c55838e998f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      name: 'Porsche Panamera',
      price: '250€/jour',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              {/* Logo */}
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <FaCar className="h-8 w-8 text-blue-500" />
                  <span className="font-semibold text-gray-500 text-lg ml-2">LuxeDrive</span>
                </a>
              </div>
              {/* Liens de navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <a href="#" className="py-4 px-2 text-blue-500 border-b-4 border-blue-500 font-semibold">Accueil</a>
                <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Voitures</a>
                <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">À propos</a>
                <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Contact</a>
              </div>
            </div>
            {/* Bouton Connexion */}
            <div className="hidden md:flex items-center space-x-3">
              <a href="#" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">Connexion</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Section Hero */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="bg-cover bg-center h-96"
          style={{ backgroundImage: "url(back.jpeg)"}}
        ></div>
        <div className="relative container mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Location de voitures de luxe</h1>
            <p className="text-xl mb-8">Découvrez notre sélection exclusive de véhicules haut de gamme pour toutes vos occasions spéciales.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Réserver maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Section Voitures populaires */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nos voitures populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <p className="text-gray-600 mb-4">{car.price}</p>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-300">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous choisir */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-6">
              <div className="flex justify-center mb-4">
                <FaClock className="text-blue-500 text-5xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rapidité</h3>
              <p className="text-gray-600">Réservation en ligne instantanée et prise en charge rapide de votre véhicule.</p>
            </div>
            <div className="text-center px-6">
              <div className="flex justify-center mb-4">
                <FaStar className="text-blue-500 text-5xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité</h3>
              <p className="text-gray-600">Des véhicules haut de gamme parfaitement entretenus et contrôlés régulièrement.</p>
            </div>
            <div className="text-center px-6">
              <div className="flex justify-center mb-4">
                <FaMoneyBillWave className="text-blue-500 text-5xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prix abordables</h3>
              <p className="text-gray-600">Des tarifs compétitifs pour un service premium et des options flexibles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">LuxeDrive</h3>
              <p className="text-gray-400">Location de voitures de luxe pour toutes vos occasions spéciales.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Accueil</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Voitures</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">À propos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <ul className="text-gray-400 space-y-2">
                <li>123 Rue de la Luxe, Paris</li>
                <li>contact@luxedrive.com</li>
                <li>+33 1 23 45 67 89</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Réseaux sociaux</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaInstagram className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 LuxeDrive. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeC;