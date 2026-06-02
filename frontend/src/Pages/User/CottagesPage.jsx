import { useEffect, useState } from "react";
import CottageView from "../../Components/User/Cottages/CottageView";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";
import CottagesSkeleton from "../../Components/Skeletons/CottagesSkeleton";

export default function CottagesPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading or fetch your cottage data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <CottagesSkeleton />

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