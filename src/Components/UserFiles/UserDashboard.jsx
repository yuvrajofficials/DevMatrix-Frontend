import React from 'react'
import DevMatrix_Logo from '../../Images/DevMatrix_Logo.png'
import LoginAuth from '../Utils/LoginAuth'

const UserDashboard = () => {
  return (
    <div>
     <navbar>
      <header>
      <section className="bg-yellow-400 w-full h-16">
        <img src={DevMatrix_Logo} className='h-10 p-1'/>
        <LoginAuth/>
        </section>
        <section className=".bg-black-800 w-48 border-2 border-grey-500 h-screen">
        <p className=' py-4 hover:bg-yellow-300 p-4 '>Home</p>
        <p className=' py-4 hover:bg-yellow-300 p-4 '>Dashboard</p>
        <p className=' py-4 hover:bg-yellow-300 p-4 '>My Courses</p>
        <p className=' py-4 hover:bg-yellow-300 p-4 '>History</p>
        <p className=' py-4 hover:bg-yellow-300 p-4 '>To do List</p>
        <p className=' py-4 hover:bg-yellow-300 p-4 '>Notifications</p>
        </section>

      </header>
     </navbar>

    </div>
  )
}

export default UserDashboard
