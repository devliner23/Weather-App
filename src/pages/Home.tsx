import React from 'react'
import NavbarFunc from '../components/Navbar'
import AuthUI from './SignIn'
import Background from '../assets/background.jpg'

function Home() {
  return (
    <div>
        <NavbarFunc />
        <div 
        style={{ backgroundImage: `url(${ Background })`}} 
        className='flex flex-grow justify-center min-h-screen mx-auto bg-cover bg-fixed bg-center'
        >
          <AuthUI />

        </div>
    </div>
  )
}

export default Home
