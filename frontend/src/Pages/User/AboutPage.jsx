import { useEffect, useState } from "react";
import Footer from "../../Layout/Footer";
import About from "../../Components/User/About/About";
import Header from "../../Layout/Header";
import Contact from "../../Components/User/About/Contact";
import CottageInfoNav from "../../Components/User/About/CottageInfoNav";
import AboutSkeleton from "../../Components/Skeletons/AboutSkeleton";

export default function AboutPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <AboutSkeleton />

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