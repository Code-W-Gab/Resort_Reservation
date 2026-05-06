import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function BackMenuHeader() {
  return(
    <Link to={'/home'} className="h-16 px-20 bg-white shadow-md flex items-center gap-4">
      <ArrowLeft />
      <p className="text-lg ">Back to Home</p>
    </Link>
  )
}