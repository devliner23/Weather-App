import React from 'react';
import { Link } from 'react-router-dom';
import NavbarFunc from '../components/Navbar';
import Background from '../assets/background.jpg';

function Home() {
  return (
    <div>
      <NavbarFunc />
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className='flex flex-grow justify-center items-center min-h-screen mx-auto bg-cover bg-fixed bg-center'
      >
        <div className='p-4 text-white text-center bg-black opacity-50'>
          <h1 className='text-4xl font-bold mb-4'>
            Welcome, browse weather conditions around the world!
          </h1>
          <Link to='/dashboard' className='text-blue-500 hover:underline'>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
