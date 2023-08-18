import React from 'react'
import CityTable from '../components/CityTable'
import NavbarFunc from '../components/Navbar'

function Dashboard() {

  return (
    <div className='dashboard'>
      <NavbarFunc />
      <CityTable />
    </div>
  )
}

export default Dashboard
