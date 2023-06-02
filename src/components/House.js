import React from 'react';
import { BiBed, BiBath, BiArea } from 'react-icons/bi'
import Image from '../assets/img/house-banner.png'

const House = ({ house }) => {
  const { address, description1, description2, isForRent, isForSell, name, price, rating, bedrooms, bathrooms, surface } = house;
  
  return <div className='bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2x1 transition'>
    <img src={Image} className='mb-8  rounded-br-[90px]' />
    <div className='mb-4 lg:block sm:block gap-x-2 text-sm'>
      <div className='bg-green-500 rounded-full text-white px-3'> Name : { name } </div>
      <div> Rating : { rating } </div>
      <div> Description : { description1.slice(0,30) }... </div>
      <div> For rent : { isForRent === true ? 'Yes' : 'No'} </div>
      <div> For sell : { isForSell === true ? 'Yes' : 'No' } </div>
    </div>
    <div className='text-lg font-semibold max-w-[260px]'>
      Address : { address.city }, { address.street }
    </div>

<div className='flex gap-x-4 my-4'>
    <div className='flex items-center text-gray-600 gap-1'>
      <div className='text-[20px]'>
        <BiBed />
      </div>
      <div> { bedrooms } </div>
    </div>
    
    <div className='flex items-center text-gray-600 gap-1'>
      <div className='text-[20px]'>
        <BiBath />
      </div>
      <div> { bathrooms } </div>
    </div>

    <div className='flex items-center text-gray-600 gap-1'>
      <div className='text-[20px]'>
        <BiArea />
      </div>
      <div> { surface } / m2 </div>
    </div>
</div>
    
    <div className='text-lg font-semibold text-violet-600 mb-4'> { price }€ </div>
  </div>;
};

export default House;
