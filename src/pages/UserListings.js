import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'; 
import { HouseContext } from '../components/HouseContext';
import { environment } from '../environment';
import axios from 'axios';
import House from '../components/House';
import { ImSpinner2 } from 'react-icons/im';


const UserListings = () => {
    const apiurl = environment.apiurl;
    const { id } = useParams();
    const [loading, setloading] = useState(false);  
    const [seller,setSeller] = useState({});
    const [userListings, setUserListings] = useState([]);

    useEffect( () => {
      setloading(true);
      axios.get(`${apiurl}/user/listings/${id}`).then((data)=>{
        setUserListings(data.data.userListings);
        setSeller(data.data.seller);
        setloading(false);
      })
    }, [])

    if(loading) {
      return(
        <ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4x1 mt-[200px]' />
      )
    }
    
    return (
      <section className='mb-20'>
        <h1 className='text-[20px] text-violet-700 text-center'> Other listings from <span className="text-green-600"> {seller.firstname} </span> </h1>
        <div className='container mx-auto'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-3 lg:gap-14'>
            {userListings.map((house, i) => {
              return (
                <Link to={`/property/${house._id}`} key={i}>
                  <House house={house} />
                </Link>
                )
              })}
              </div>
            </div>
          </section>
    );
  };
  
  export default UserListings;
  
