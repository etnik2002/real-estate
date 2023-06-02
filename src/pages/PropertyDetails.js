import React, { useContext, useEffect, useState } from 'react';
import { HouseContext } from '../components/HouseContext';
import { Link, useParams } from 'react-router-dom';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import Image from '../assets/img/house-banner.png';
import Logo from '../assets/img/logo.svg';
import { environment } from '../environment';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';
import { Alert } from '@mui/material';
let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
let user = token ?  JSON.parse(atob(token.split('.')[1])) : {}

const PropertyDetails = () => {
  const { id, receiverID, senderID } = useParams();
  const apiurl = environment.apiurl;
  const [data, setData] = useState({})
  const [loading, setloading] = useState(false);  
  const [senderMessage, setSenderMessage] = useState(`Hello ${data?.seller?.firstname}, I am interested`);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [alert, setAlert] = useState("");

  useEffect( () => {
    setloading(true);
    axios.get(`${apiurl}/property/${id}`).then((data)=>{
      setData(data.data.singleProperty);
      setloading(false);
    })
  }, [])

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        `${apiurl}/notifications/send-notification/${receiverID}/${senderID}`,
        { 
          sender : senderID,
          name : name, 
          email : email,
          phone : phone,
          message : senderMessage
        },
        { headers: { "Content-Type": "application/json" } }
        );
        setAlert("Message successfully sent");
      } catch (error) {
      console.error(error)    
    }
  }
    


  if(loading) {
    return(
      <ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4x1 mt-[200px]' />
    )
  }

  return <section>
    <div className='container mx-auto nim-h-[800px] mb-14'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h2 className='text-2x1 font-semibold'>{data.name}</h2>
            <h2  className='text-lg mb-4 '>{data?.address?.city}, {data?.address?.street}</h2>
          </div>
          <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
            <div className='bg-green-500 text-white px-3 rounded-full'> {data?.category?.key} </div>
          </div>
          <div className='text-3x1 font-semibold text-violet-600'> {data.price} € </div>

        </div>
        <div className='flex flex-col items-start gap-8 lg:flex-row'>
          <div className='max-w-[768px]'>
            <div className='mb-8'> 
              <img src={data.images?.url}/>
            </div>

            <div className='flex gap-x-6 text-violet-700 mb-6 '>
              <div className='flex gap-x-2 items-center'>
                <BiBed className='text-2x-1' />
                <div>
                  {data.bedrooms}
                </div>
              </div>

              <div className='flex gap-x-2 items-center'>
                <BiBath className='text-2x-1' />
                <div>
                  {data.bathrooms}
                </div>
              </div>

              <div className='flex gap-x-2 items-center'>
                <BiArea className='text-2x-1' />
                <div>
                  {data.surface} / m2
                </div>
              </div>
            </div>

            <div> { data.description1 } </div>
            <hr/>
            <div> { data.description2 ? data.description2 : "" } </div>
          
          </div>
          <div className='flex-1 bg-white-100 w-full mb-8 border border-gray-300 rounded-lg px-6 py-8'>
            <div className=''>
              <div className='flex items-center gap-x-4 mb-8'>
                <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
                  <img src="https://www.svgrepo.com/show/192244/man-user.svg" />
                </div>
                <div className='font-bold text-lg'> { data?.seller?.firstname } </div>
                {alert.length > 0 ? <Alert severity="success"> {alert} </Alert> : ""}
                <div>
                  <Link className='text-violet-700 text-sm' to={`/user/listings/${data?.seller?._id}`}> View Listings </Link>
                </div>
              </div>

              <form className='flex flex-col gap-y-4'>
                <input onChange={(e) => setname(e.target.value)} className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Name*'  type='text'/>
                <input onChange={(e) => setemail(e.target.value)} className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Email*'  type='text'/>
                <input onChange={(e) => setphone(e.target.value)} className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Phone*'  type='text'/>
                <textarea onChange={(e) => setSenderMessage(e.target.value)} className='border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400' placeholder='Message*' value={senderMessage} defaultValue={senderMessage}></textarea>
               
                <div className='flex gap-x-2'>
                  <button className='bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition' onClick={sendMessage}>Send message</button>
                  <button className='border border-violet-700 text-violet-700 hover:border-violet-500 hover:text-violet-500 rounded p-4 w-full text-sm transition'><a></a>Call</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  </section>;
};

export default PropertyDetails;
