import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.svg';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
let data = token ?  JSON.parse(atob(token.split('.')[1])) : {}

const Header = () => {

  var notifications = data.data?.notifications.filter((n) => n.read === false)

  const options = [
    { value: 'Profile', label: 'Profile' },
    { value: 'Settings', label: 'Settings' },
    { value: 'Notificatons', label: 'Notifications' },
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem("usertoken");
      console.log("logged out");
      window.location = '/';
    } catch (error) {
      console.log(error);      
    }
  }

  const handleSelect = (option) => {
    if (option.value === 'Profile') {
      window.location = `/profile/${data.data._id}`;
    } else if (option.value === 'Settings') {
      window.location.href = '/settings';
    }
  };

  const defaultOption = data.data?.firstname;

  return (
    <header className='py-6 mb-12 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        <a href='/'>
          <img src={Logo} href="/" />
        </a>
          {token ? <Link to={`/property/create/${data.data?._id}`}><button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded font-[20px]"> + </button></Link>  : ""}
          
          {token ? <Link to={`/notifications/${data.data?._id}`}>
            <Badge badgeContent={notifications.length > 0 ? notifications.length : 0} color="primary">
              <MailIcon color="action" />
            </Badge>
          </Link> : ""}
              
        <div className='flex items-center gap-6'>
          {token ? (
            <Dropdown
              options={options}
              value={defaultOption}
              placeholder={data.data?.firstname}
              onChange={handleSelect} 
            />
          ) : (
            <Link className='hover:text-violet-900 transition' to="/login">Log In</Link>
          )}
          {token ? (
            <Link
              className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition'
              role='button'
              onClick={handleLogout}
            >
              Log Out
            </Link>
          ) : (
            ''
          )}
          {!token ? (
            <Link
              className='bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition'
              to='/signup'
            >
              Sign up
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
