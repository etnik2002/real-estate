import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../environment';
let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
let data = token ?  JSON.parse(atob(token.split('.')[1])) : {}

const CreatePost = () => {
    const { userid } = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const [surface, setSurface] = useState("");
    const [description, setDescription] = useState("");
    const [description2, setDescription2] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [category, setCategory] = useState("");
    const [isForSell, setIsForSell] = useState(false);
    const [isForRent, setIsForRent] = useState(false);
    const [images, setImages] = useState(null);
    const [file, setFile] = useState(null);

    const handleType = (e) => {
        setType(e.target.value);
        if(e.target.value === 'forSell') { 
            setIsForSell(true);
            setIsForRent(false);
        } else if(e.target.value === 'forRent') {
            setIsForRent(true);
            setIsForSell(false);
        }
    }

    useEffect( () => {
        axios.get(`${environment.apiurl}/category/all`).then((data)=>{
            setCategories(data.data.allCategories);
        })
      }, [])

      const propertyAddress = {
        street: street,
        city: city,
        state: state,
        zip: zip
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("isForSell", isForSell ? isForSell : false);
        formData.append("isForRent", isForRent);
        formData.append("description1", description);
        formData.append("description2", description2);
        formData.append("seller", userid);
        formData.append("category", category);
        formData.append("bathrooms", bathrooms);
        formData.append("bedrooms", bedrooms);
        formData.append("address[street]", street);
        formData.append("address[city]", city);
        formData.append("address[state]", state);
        formData.append("address[zip]", zip);
        formData.append("surface", surface);
        formData.append("images", file);

      
        try {
          await axios.post(`${environment.apiurl}/property/create/${userid}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
          });
        } catch (e) {
          console.log(e);
        }
      };
      
      
    return (
        <div>
            <div className='flex-1 bg-white-100 w-full mb-8 border border-gray-300 rounded-lg px-6 py-8'>
            <div className=''>

              <form className='flex flex-col gap-y-4'  encType='multipart/form-data'>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Property Name*' onChange={(e) => setName(e.target.value)} type='text'/>
                
                <select onChange={handleType} className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm'>
                    <option value={''}>Choose</option>
                    <option value={'forSell'}>For sell</option>
                    <option value={'forRent'}>For rent</option>
                </select>

                <label>Choose a category</label>
                <select onChange={(e) => setCategory(e.target.value)} required className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm'>
                    <option> Choose </option>
                        {
                            categories.map((category) => (
                                <option value={category._id}> {category.key} </option>
                            ))
                        }                   
                </select>

                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Description*' onChange={(e) => setDescription(e.target.value)} type='text'/>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Description 2 (Optional)*' onChange={(e) => setDescription2(e.target.value)} type='text'/>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Surface*' onChange={(e) => setSurface(e.target.value)} type='text'/> 
                { type === "forSell" ? <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Price*' onChange={(e) => setPrice(e.target.value)} type='number'/> : <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Price per night*' onChange={(e) => setPrice(e.target.value)} type='number'/>}
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Bathrooms*' onChange={(e) => setBathrooms(e.target.value)} type='text'/>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Bedrooms*' onChange={(e) => setBedrooms(e.target.value)} type='text'/>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Street*' onChange={(e) => setStreet(e.target.value)} type='text'/>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='City*' onChange={(e) => setCity(e.target.value)} type='text'/>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='State*' onChange={(e) => setState(e.target.value)} type='text'/>
                <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' placeholder='Zip* (Optional)*' onChange={(e) => setZip(e.target.value)} type='text'/>

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Import images</label>
                <input onChange={(e) => setFile(e.target.files[0])} class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" multiple={true} type="file" name="images" />

                <div className='flex gap-x-2'>
                  <button onClick={handleSubmit} className='bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition'>Submit</button>
                  <button className='border border-violet-700 text-violet-700 hover:border-violet-500 hover:text-violet-500 rounded p-4 w-full text-sm transition'>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
}

export default CreatePost;
