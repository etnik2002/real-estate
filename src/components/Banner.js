import React from 'react';
import Image from '../assets/img/house-banner.png';
import Search from '../components/Search';


const Banner = () => {
  return <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
    <div className='flex flex-col lg:flex-row'>
      <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
        <h1 className='text-4x1 lg:text-[58px] font-semibold leading-none mb-6'><span className='text-violet-700'> Rent</span> Your Dream House With Us. </h1>
        <p className='max-w-[480px] mb-8'>Looking for your dream home? Look no further! Our website offers an extensive database of houses that are currently on the market. Whether you're looking for a cozy one-bedroom apartment, a spacious family home, or a luxurious mansion, we've got you covered!</p>
      </div>
      <div className='hidden flex-1 lg:flex justify-end items-end'>
        <img src={Image} />
      </div>
    </div>
    <Search/>
  </section>;
};

export default Banner;
