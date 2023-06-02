import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { environment } from '../environment';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Container from '@mui/material/Container';
import { Alert, Box, Button, Modal, Typography } from '@mui/material';
import '../index.css';

const Profile = () => {
    const { id } = useParams();
    const apiurl = environment.apiurl;
    let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
    let user = token ? JSON.parse(atob(token.split('.')[1])) : {}

    const [userListings, setUserListings] = useState([]);
    const [loading, setloading] = useState(false);  
    const [showListings, setshowListings] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    useEffect( () => {
      setloading(true);
      axios.get(`${apiurl}/user/listings/${id}`).then((data)=>{
        setUserListings(data.data.userListings);
        setloading(false);
      })
    }, [])

     function handleDelete(id) {
        try {
            setloading(true);
            setMessage("Post deleted successfully");
            axios.post(`${apiurl}/property/delete/${id}`);
            setloading(false);
        } catch(err) {
            setError(true);
        }
    }

    return (
        <>
        <div>
            <div class="container px-6 mx-auto grid">
                <h2 class="my-6 text-2xl font-semibold text-gray-700">
                    Welcome {user.data.firstname} {user.data.lastname}
                </h2>
                {message.length > 0 ? <Alert severity="success"> {message} </Alert> : ""}
                {error && <Alert severity="error"> Something went wrong, please try again! </Alert>}
                <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div  role='button' onClick={() => setshowListings(!showListings)} class="flex items-center p-4 bg-white rounded-lg shadow-xs">
                        <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600">
                                {showListings === false ? 'Show my posts' : 'Hide my posts'}
                            </p>
                            <p class="text-lg font-semibold text-gray-700">
                                {userListings.length}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
                        <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600">
                                Joined at
                            </p>
                            <p class="text-lg font-semibold text-gray-700">
                                {moment(user.data.createdAt).format('DD/MM/YYYY')}
                                
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
                        <div class="p-3 mr-4 text-red-500 bg-red-100 rounded-full">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600">
                                Users suspend
                            </p>
                            <p class="text-lg font-semibold text-gray-700">
                                6389
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-white rounded-lg shadow-xs">
                        <div
                            class="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600">
                                Role
                            </p>
                            <p class="text-lg font-semibold text-gray-700">
                            {user.data.isAdmin ? 'Admin' : 'User'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Container>
                {showListings && 
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 rounded-l-lg">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" class="px-6 py-3 rounded-r-lg">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3 rounded-r-lg">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userListings.length > 0 ?
                                userListings.map((post )=> (
                                    <tr class="bg-white dark:bg-gray-800">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {post.name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {post.isForSell ? 'For sell' : "For rent"}
                                        </td>
                                        <td class="px-6 py-4">
                                            {post.price}€ {post.isForSell ? '' : '/ night'}
                                        </td>
                                        <td class="px-6 py-4">
                                            <Button onClick={() => setOpenModal(true)}>Edit</Button>
                                            <Button onClick={() => handleDelete(post._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )) : <div style={{display: 'flex', textAlign: 'center'}}>
                                        <h3>You haven't posted anything yet. Click <Link style={{color:'blue'}} to={`/property/create/${user.data._id}`}>here</Link> to add your first post! </h3>
                                    </div>
                            }
                            
                        </tbody>
                        {/* <tfoot>
                            <tr class="font-semibold text-gray-900 dark:text-white">
                            <th scope="row" class="px-6 py-3 text-base">Total</th>
                            <td class="px-6 py-3">3</td>
                            <td class="px-6 py-3">21,000</td>
                            </tr>
                        </tfoot> */}
                    </table>
                </div>
            }
        </Container>

    
        </>
    )
}


export default Profile;
