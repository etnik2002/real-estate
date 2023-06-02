import React from 'react';
import { Routes,Route } from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserListings from './pages/UserListings';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost'
import Notifications from './pages/Notifications';

const App = () => {
  return <div className='max-w-[1440px] mx-auto bg-white'>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile/:id' element={<Profile/>} />
      <Route path='/property/:id/:receiverID/:senderID' element={<PropertyDetails/>} />
      <Route path='/user/listings/:id' element={<UserListings/>} />
      <Route path='/property/create/:userid' element={<CreatePost/>} />
      <Route path='/property/edit/:id' element={<EditPost/>} />
      <Route path='/notifications/:id' element={<Notifications/>} />
    </Routes>
    <Footer/>
  </div>;
};

export default App;
