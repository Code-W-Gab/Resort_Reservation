import CottageView from "../../Components/User/Cottages/CottageView";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";

export default function CottagesPage() {
  return(
    <div>
      <main className="bg-[#effaf4]">
        <Header/>
        <CottageView/>
        <Footer/>
      </main>
    </div>
  )
}