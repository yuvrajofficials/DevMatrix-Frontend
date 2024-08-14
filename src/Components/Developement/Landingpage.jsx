import React from 'react'
import DevMatrix from "../../Images/DevMatrix_Logo.png"
import LoginAuth from '../Utils/LoginAuth'
import Headers from '../Utility/utils1/Headers'
import Footers from '../Utility/utils1/Footers'


const Landingpage = () => {
  return (
 
 <>
 <div className='herosection w-full h-screen rounded-b-xl'>
<Headers/>
<h1>This page is under construction you can check other features of this</h1>
 </div>
 <div>
  <h1>After hero</h1>
 </div>
 
     {/* <nav className='bg-[#4438ca] w-screen h-full'>
      <header className='flex justify-between  w-full h-16  '>
      <div className='py-3'>

       <h1 className='w-12 h-12 text-2xl font-bold'>
       DEV<span className='text-[#BEF2FF]'>MATRIX</span>
       </h1>
       </div>
       <LoginAuth/>

      </header>
      <div className='h-screen w-full bg-[#DEDDDD]'>

      </div>
    </nav> */}
      <Footers/>
      
    </>
  )
}

export default Landingpage
