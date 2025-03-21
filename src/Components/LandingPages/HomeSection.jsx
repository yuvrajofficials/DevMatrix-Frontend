
import HeroSection from './HeroSection'
import FetchBlogCard from '../Utils2/FetchBlogCard'
import FetchCourseCard from '../Utils2/FetchCourseCard'
import ApplyAsTeacher from '../Utils/ApplyAsTeacher'
// import HeroSection from './HeroSection'
import { PiParallelogramFill } from "react-icons/pi";
import FetchTestimonials from '../Utils2/FetchTestimonials'
import InfoPage from '../HomepageComponents/InfoPage'
import CourseByCategory from '../HomepageComponents/CourseByCategory'
import CourseList from '../HomepageComponents/CourseList'
import CombinedSlider from '../HomepageComponents/Testimonials'

const HomeSection = () => {
  return (
    <>
      {/* <HeroSection/> */}
      <HeroSection>
        <div className="py-4">
          <InfoPage/>
          <CourseByCategory/>

          <CourseList/> 
          <CombinedSlider/> 
          <ApplyAsTeacher />

        </div>
      
      </HeroSection>
    </>
  )
}

export default HomeSection
