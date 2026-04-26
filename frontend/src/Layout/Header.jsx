export default function Header() {
  return(
    <header className="bg-white shadow-md flex items-center justify-between px-10 h-18">
      <h1 className="text-2xl font-semibold text-blue-500">Serenity Resort</h1>
      <div className="flex items-center gap-6">
        <p className="text-lg font-semibold hover:text-blue-500 cursor-pointer">Home</p>
        <p className="text-lg font-semibold hover:text-blue-500 cursor-pointer">Cottages</p>
        <p className="text-lg font-semibold hover:text-blue-500 cursor-pointer">About</p>
      </div>
    </header>
  )
}