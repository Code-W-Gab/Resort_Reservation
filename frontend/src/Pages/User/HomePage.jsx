import { useEffect, useState } from "react";
import AccommodationList from "../../Components/User/AccommodationList";
import Accommodations from "../../Components/User/Accommodations";
import Explore from "../../Components/User/Explore";
import Info from "../../Components/User/Info";
import Header from "../../Layout/Header";
import { GetCottage } from "../../Service/cottageService";

export default function HomePage() {
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


  return(
    <main>
      <Header/>
      <Explore/>
      <Info/>
      <Accommodations/>
      <AccommodationList/>
    </main>
  )
}