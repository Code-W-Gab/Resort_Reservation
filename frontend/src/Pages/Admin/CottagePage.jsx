import { useEffect, useState } from "react";
import AddCottage from "../../Components/Admin/Cottages/AddCottage";
import CottageList from "../../Components/Admin/Cottages/CottageList";
import Header from "../../Components/Admin/Header";
import Status from "../../Components/Admin/Status";
import { GetCottage } from "../../Service/cottageService";
import { getReserveCottage } from "../../Service/reserveService";

export default function CottagePage() {
  const [cottages, setCottages] = useState([])
  const [reserve, setReserve] = useState([]);
  const [count, setCount] = useState(null)
  
    function fetchReserve() {
      getReserveCottage()
        .then(res => {
          setReserve(res.data.data)
          setCount(res.data.count)
        })
        .catch(err => console.log(err))
    }
  
    useEffect(() => {
      fetchReserve()
    }, [])
  

  const fetchCottage = () => {
    GetCottage()
      .then(res => {
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
      <div className="bg-gray-100 min-h-screen">
        <Status count={count} reserve={reserve}/>
        <CottageList cottages={cottages} fetchCottage={fetchCottage}/>
      </div>
    </main>
  )
}