import Footer from "../../Layout/Footer";
import About from "../../Components/User/About/About";
import Header from "../../Layout/Header";
import Contact from "../../Components/User/About/Contact";
import CottageInfoNav from "../../Components/User/About/CottageInfoNav";

export default function AboutPage() {
  return (
    <div>
      <main className="bg-[#effaf4]">
        <Header/>
        <About/>
        <Contact/>
        <CottageInfoNav/>
        <Footer/>
      </main>
    </div>
  )
}