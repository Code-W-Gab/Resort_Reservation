import { useEffect, useState, useRef } from "react";
import AccommodationList from "../../Components/User/AccommodationList";
import Accommodations from "../../Components/User/Accommodations";
import Explore from "../../Components/User/Explore";
import Info from "../../Components/User/Info";
import Header from "../../Layout/Header";
import { GetCottage } from "../../Service/cottageService";

export default function HomePage({ setUser }) {
  const [cottages, setCottages] = useState([])

  const fetchCottage = () => {
    GetCottage()
      .then((res) => {
        setCottages(res.data)
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


  return(
    <main>
      <Header setUser={setUser}/>
      <Explore onExploreClick={scrollToAccommodations} />
      <Info/>
      <div ref={accommodationsRef}>
        <Accommodations />
      </div>
      <AccommodationList cottages={cottages}/>
    </main>
  )
}