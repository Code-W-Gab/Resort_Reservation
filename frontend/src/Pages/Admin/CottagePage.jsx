import AddCottage from "../../Components/Admin/Cottages/AddCottage";
import Header from "../../Components/Admin/Header";
import Status from "../../Components/Admin/Status";

export default function CottagePage() {
  return(
    <main>
      <Header/>
      <div className="bg-gray-100 min-h-screen">
        <Status/>
        <AddCottage/>
      </div>
    </main>
  )
}