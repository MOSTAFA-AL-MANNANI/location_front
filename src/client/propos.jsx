import { FaCar, FaClock, FaStar, FaMoneyBillWave, FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

const Propos = () => {
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

  const teamMembers = [
    {
      id: 1,
      name: 'Jean Dupont',
      role: 'Fondateur & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Marie Lambert',
      role: 'Responsable clientèle',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Thomas Martin',
      role: 'Expert automobile',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
                <a href="#about" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">À propos</a>
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
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

      {/* Section À propos */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">À propos de notre agence</h2>
          
          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-6">Notre histoire</h3>
              <p className="text-gray-600 mb-4">
                Fondée en 2010, LuxeDrive est née de la passion pour les automobiles d'exception. Notre objectif est simple : offrir une expérience de location premium à nos clients exigeants.
              </p>
              <p className="text-gray-600 mb-4">
                Avec plus de 10 ans d'expérience dans le secteur du luxe automobile, nous avons développé un savoir-faire unique pour répondre aux attentes les plus élevées. Chaque véhicule de notre flotte est sélectionné avec soin et entretenu avec la plus grande attention.
              </p>
              <p className="text-gray-600">
                Notre équipe de professionnels est à votre écoute pour vous conseiller et vous accompagner dans le choix du véhicule qui correspond parfaitement à vos besoins et à vos envies.
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Showroom LuxeDrive" 
                className="rounded-lg shadow-md h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Intérieur de voiture de luxe" 
                className="rounded-lg shadow-md h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Service clientèle" 
                className="rounded-lg shadow-md h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Atelier d'entretien" 
                className="rounded-lg shadow-md h-48 w-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-center mb-8">Notre équipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg"
                />
                <h4 className="text-xl font-semibold">{member.name}</h4>
                <p className="text-blue-500">{member.role}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-center mb-8">Nous trouver</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <h4 className="text-lg font-semibold">Adresse</h4>
              </div>
              <p className="text-gray-600 mb-6">123 Avenue des Champs-Élysées, 75008 Paris</p>
              
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h4 className="text-lg font-semibold">Téléphone</h4>
              </div>
              <p className="text-gray-600 mb-6">+33 1 23 45 67 89</p>
              
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h4 className="text-lg font-semibold">Email</h4>
              </div>
              <p className="text-gray-600">contact@luxedrive.com</p>
            </div>
            <div className="md:w-1/2 h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1623258126830!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
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
                <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">À propos</a></li>
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

export default Propos;