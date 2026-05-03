import AccommodationList from "../../Components/User/AccommodationList";
import Accommodations from "../../Components/User/Accommodations";
import Explore from "../../Components/User/Explore";
import Info from "../../Components/User/Info";
import Header from "../../Layout/Header";

export default function HomePage() {
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