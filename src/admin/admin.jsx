import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidbar from './sidbar';
import Home from './home';
import Ajoutercars from './ajoutercars';
import CarsList from './CarsList';
import EditCar from './EditCar';
import BookingsList from './bokingsList';
import BookingDetails from './BookingsDetails';
import Messagesread from './MessagesRead';
import MessagesUnread from './MessagesUnread';
import MessageDetails from './MessageDetails';
import MessageEdit from './MessageEdit';
import Categories from './Categories';
import AuthForm from "../client/register";
import UserList from "./userlist";
import UserDetails from "./userdetails";
import Contact from "../client/contact";
export default function Admin(){
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
             <Route path="bookings/view/:id" element={<BookingDetails/>} />
             <Route path="message/read/" element={<Messagesread/>} />
             <Route path="message/unread/" element={<MessagesUnread/>} />
             <Route path="messages/:id" element={<MessageDetails/>} />
             <Route path="message/edit/:id" element={<MessageEdit/>} />
             <Route path="/categories" element={<Categories/>} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/bookingsList" element={<BookingsList />} />
         </Routes>
        </div>
      </div>
     </Router>
    )
}