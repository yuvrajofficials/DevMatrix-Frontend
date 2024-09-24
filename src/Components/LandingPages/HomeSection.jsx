import React from 'react'
import HeroSection from './HeroSection'
import ourpartners from '../../Images/Partners.png'
import FetchCourseList from '../Utils2/FetchCourseList'
import FetchBlogCard from '../Utils2/FetchBlogCard'
import FetchCourseCard from '../Utils2/FetchCourseCard'
import ApplyAsTeacher from '../Utils/ApplyAsTeacher'
// import HeroSection from './HeroSection'

const HomeSection = () => {
  return (
<>
    {/* <HeroSection/> */}
    <HeroSection>
    <div className='py-4'>

<h1 className='text-3xl text-center font-semibold py-4 text-decoration-underline'>Our Partners</h1>
<img src={ourpartners} className='w-screen px-48'/>
    </div>
    <div className='py-4'>

<h1 className='text-3xl text-center font-semibold py-4 text-decoration-underline'>Top Courses</h1>
<FetchCourseCard/>
</div>
 <div className='py-4'>

<h1 className='text-3xl text-center font-semibold py-4 text-decoration-underline'>Top Blogs</h1>
<FetchBlogCard/>
</div>
 <div className='py-4'>

<ApplyAsTeacher/>
</div>
</HeroSection>  
</>
)
}

export default HomeSection
