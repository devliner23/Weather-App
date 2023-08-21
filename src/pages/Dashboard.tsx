import React from 'react'
import CityTable from '../components/CityTable'
import NavbarFunc from '../components/Navbar'
import background from "../assets/background.jpg"

function Dashboard() {

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <NavbarFunc />
      <div className='bg-black bg-opacity-50 min-h-screen'>
        <CityTable />

      </div>
    </div>
  )
}

export default Dashboard
