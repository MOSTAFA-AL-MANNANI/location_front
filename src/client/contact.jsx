import axios from 'axios';
import { useState } from 'react';
import { FaCar, FaClock, FaStar, FaMoneyBillWave, FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    read: 0
  });
console.log(formData)
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/ajoutermessage",formData).then((res)=>{
   
   if(res.status==201)
   {
    alert("bien ajouter")

   }
   else
   {
    alert("Erreur du BackEnd")
   }
   })
    // Ici vous pourriez ajouter une requête API pour envoyer le formulaire
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      read: 0
    });
    
  };

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
                <a href="#contact" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Contact</a>
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

      {/* Section Voitures populaires */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nos voitures populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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