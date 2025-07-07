import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidbar from './admin/sidbar';
import Home from './admin/home';
import Ajoutercars from './admin/ajoutercars';
import CarsList from './admin/CarsList';
import EditCar from './admin/EditCar';
import BookingList from './admin/BookingList';
import BookingDetails from './admin/BookingsDetails';
import BookingEdit from './admin/BookingEdit';
import Messagesread from './admin/MessagesRead';
import MessagesUnread from './admin/MessagesUnread';
import MessageDetails from './admin/MessageDetails';
import MessageEdit from './admin/MessageEdit';
import HomeC from './client/home';
import Propos from './client/propos';
import Contact from './client/contact';
import Categories from './admin/Categories';

function App() {
  return (
    <Router>
       <div className="flex">
         <Sidbar />
        
         <div className="flex-1 p-8">
      <Routes>
             <Route path="/home" element={<Home/>} />
             <Route path="/ajoutercars" element={<Ajoutercars />} />
             <Route path="/carslist" element={<CarsList />} />
             <Route path="/cars/edit/:id" element={<EditCar/>} />
             <Route path="/bookingList" element={<BookingList/>} />
             <Route path="bookings/view/:id" element={<BookingDetails/>} />
             <Route path="/bookings/edit/:id" element={<BookingEdit/>} />
             <Route path="message/read/" element={<Messagesread/>} />
             <Route path="message/unread/" element={<MessagesUnread/>} />
             <Route path="messages/:id" element={<MessageDetails/>} />
             <Route path="message/edit/:id" element={<MessageEdit/>} />
             <Route path="/categories" element={<Categories/>} />
         </Routes>
        </div>
      </div>
     </Router>/*
    <div>
      <Contact/>
    </div>*/
  );
}

export default App;
