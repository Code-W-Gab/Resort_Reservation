import { useEffect, useState, useRef } from "react";
import AccommodationList from "../../Components/User/Home/AccommodationList";
import Accommodations from "../../Components/User/Home/Accommodations";
import Explore from "../../Components/User/Home/Explore";
import Info from "../../Components/User/Home/Info";
import Header from "../../Layout/Header";
import { GetCottage } from "../../Service/cottageService";
import Footer from "../../Layout/Footer";
import HomePageSkeleton from "../../Components/Skeletons/HomePageSkeleton";

export default function HomePage() {
  const [cottages, setCottages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCottage = () => {
    GetCottage()
      .then((res) => {
        setCottages(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchCottage()
  }, [])

  const accommodationsRef = useRef(null)

  const scrollToAccommodations = () => {
    accommodationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (loading) return <HomePageSkeleton />
  
  return(
    <main className="bg-[#effaf4]">
      <Header/>
      <Explore onExploreClick={scrollToAccommodations} />
      <Info/>
      <div ref={accommodationsRef}>
        <Accommodations />
      </div>
      <div className="px-6 sm:px-10 lg:px-15 xl:px-25 py-6">
        <AccommodationList cottages={cottages} />
      </div>
      <Footer/>
    </main>
  )
}