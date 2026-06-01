import CottageView from "../../Components/User/Cottages/CottageView";
import Header from "../../Layout/Header";

export default function CottagesPage() {
  return(
    <div>
      <main className="bg-[#e6faeb] min-h-screen">
        <Header/>
        <CottageView/>
      </main>
    </div>
  )
}