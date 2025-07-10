import axios from 'axios';
import { useEffect,useState } from 'react';
import { FaCar, FaClock, FaStar, FaMoneyBillWave, FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    read: 0
  });

  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 3;

  const startIndex = currentPage * carsPerPage;
  const visibleCars = cars.slice(startIndex, startIndex + carsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/ajoutermessage", formData).then((res) => {
      if (res.status === 201) {
        alert("Message bien ajouté");
      } else {
        alert("Erreur du BackEnd");
      }
    }).catch(() => {
      alert("Erreur lors de la requête");
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      read: 0
    });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/listecar');
        setCars(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCars();
  }, []);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(cars.length / carsPerPage) - 1) setCurrentPage(currentPage + 1);
  };
  const teamMembers = [
  {
    id: 1,
    name: 'Ali Bennani',
    role: 'Directeur général',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Sanae Elhaj',
    role: 'Responsable clientèle',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

  return (
    <div className="min-h-screen flex flex-col pt-20">


      {/* Section Hero */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="bg-cover bg-center h-96"
          style={{ backgroundImage: "url(https://coolwallpapers.me/picsup/5747443-dacia-wallpapers.jpg" }}
        ></div>
        <div className="relative container mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Location de voitures de luxe</h1>
            <p className="text-xl mb-8">Découvrez notre sélection exclusive de véhicules haut de gamme pour toutes vos occasions spéciales.</p>
                        <a href="/allcars"  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                          Réserver maintenant
                        </a>

          </div>
        </div>
      </section>

      {/* Section Voitures populaires */}
<section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
  {/* Formes décoratives en arrière-plan */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
  <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>

  <div className="container mx-auto px-6 relative z-10">
    {/* En-tête avec animation */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        Nos Voitures Populaires
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
        Découvrez notre sélection de véhicules les plus demandés, alliant confort, performance et style
      </p>
    </div>

    <div className="relative">
      {/* Bouton gauche amélioré */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 z-20 group border border-gray-200"
      >
        <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Grille des voitures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {visibleCars.map((car, index) => (
          <div 
            key={car.id_car} 
            className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:border-blue-200 hover:-translate-y-2"
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            {/* Image avec overlay */}
            <div className="relative overflow-hidden">
              <img
                src={`http://127.0.0.1:8000/storage/${car.image}`}
                alt={car.name}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Badge populaire */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                Populaire
              </div>
            </div>

            {/* Contenu de la carte */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {car.name}
              </h3>
              
              {/* Prix avec design amélioré */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-blue-600">{car.prix}</span>
                  <div className="text-gray-500">
                    <span className="text-sm">DH</span>
                    <span className="text-sm block">/ jour</span>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Caractéristiques */}
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  4 places
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Automatique
                </div>
              </div>

              {/* Bouton avec animation */}
              <Link to={`/car/${car.id_car}`}>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group">
                  <span className="flex items-center justify-center">
                    Voir Détails
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton droit amélioré */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 z-20 group border border-gray-200"
      >
        <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* Indicateurs de pagination */}
    <div className="flex justify-center mt-12 space-x-2">
      {[...Array(Math.ceil(cars.length / 3))].map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentPage 
              ? 'bg-blue-500 w-8' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setCurrentPage(index)}
        />
      ))}
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
              <p className="text-gray-600">
                Avec plus de 10 ans d'expérience dans le secteur du luxe automobile, nous avons développé un savoir-faire unique pour répondre aux attentes les plus élevées.
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
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-center mb-8">Notre équipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Formulaire de contact */}
            <div className="lg:w-1/2">
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">

                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-300"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
            
            {/* Coordonnées de l'agence */}
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-2xl font-semibold mb-6">Nos coordonnées</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-500 text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="text-lg font-medium mb-1">Adresse</h4>
                      <p className="text-gray-600">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="text-blue-500 text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="text-lg font-medium mb-1">Téléphone</h4>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                      <p className="text-gray-600 text-sm mt-1">Lundi au Vendredi: 9h - 19h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="text-blue-500 text-xl mt-1 mr-4" />
                    <div>
                      <h4 className="text-lg font-medium mb-1">Email</h4>
                      <p className="text-gray-600">contact@luxedrive.com</p>
                      <p className="text-gray-600">reservations@luxedrive.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 h-64">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1623258126830!5m2!1sfr!2sfr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
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
                <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <ul className="text-gray-400 space-y-2">
                <li>123 Avenue des Champs-Élysées, Paris</li>
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

export default Contact;