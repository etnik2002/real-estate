import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { HouseContext } from './HouseContext';
import House from './House';
import{ ImSpinner2 } from 'react-icons/im';

let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
let data = token ?  JSON.parse(atob(token.split('.')[1])) : {}

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

  if(loading) {
    console.log(loading);
    return(
      <ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4x1 mt-[200px]' />
    )
  }

  if(!loading && houses.length < 1) {
    return <div className='text-center text-3x1 text-gray-400 mt-48 text-large'>Sorry, nothing found!</div>
  }

  return <section className='mb-20'>
    <div className='container mx-auto'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-3 lg:gap-14'>
        {houses.map((house, i) => {
          return (
            <Link to={`/property/${house._id}/${house.seller._id}/${data.data?._id}`} key={i}>
              <House house={house} />
            </Link>
          )
        })}
      </div>
    </div>
  </section>;
};

export default HouseList;
