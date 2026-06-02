import { Shield, Heart, Award } from "lucide-react";
export default function About(){
  const awardData = [
    { title: "Award-Winning Service", description: "Recognized for excellence in hospitality with a 4.9-star rating from over 5,000 guests.", icon: <Award size={30} className="text-blue-600"/>, bgColor: 'bg-blue-100' }, 
    { title: "Eco-Friendly", description: "Committed to sustainable practices that preserve the natural beauty around us.", icon: <Heart size={30} className="text-green-500"/>, bgColor: 'bg-green-100' }, 
    { title: "Safety First", description: "24/7 security and safety protocols to ensure your peace of mind throughout your stay.", icon: <Shield size={30} className="text-violet-500"/>, bgColor: 'bg-violet-100' }
  ]
  return(
    <main>
      <div className="flex items-center justify-center h-90 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop')`
        }}>
          {/* Blue Semi-transparent Overlay */}
          <div className="absolute inset-0 bg-blue-700 opacity-50"></div>
          
          {/* Content */}
          <div className="text-center relative z-10 px-6">
            <h1 className="text-4xl sm:text-5xl font-semibold text-white">About Serenity Resort</h1>
            <p className="text-lg sm:text-xl mt-2 text-white">Discover the perfect getaway at our serene resort</p>
          </div>
        </div>

        <div className="px-6 lg:px-10 xl:20 py-6">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold">Our Story</h1>
              <div className="mt-4 text-gray-700 space-y-4 sm:text-md lg:text-lg">
                <p>Nestled in paradise, Serenity Resort has been welcoming guests since 2010. What started as a dream to create the perfect escape has blossomed into a collection of unique accommodations that blend luxury with nature's tranquility.</p>
                <p>Our carefully curated cottages and cabins offer something for everyone – from romantic getaways in our overwater bungalows to family adventures in our spacious garden villas. Each property is designed to provide comfort while immersing you in the natural beauty that surrounds us.</p>
                <p>We believe that the best vacations are those that rejuvenate the soul. Whether you're here for a day tour or an extended stay, our team is dedicated to ensuring your experience is nothing short of extraordinary.</p>
              </div>
            </div>
            
            <div>
              <img src="https://media-cdn.tripadvisor.com/media/photo-s/28/fd/37/ed/pearl-farm-beach-resort.jpg" alt="Resort" className="w-full h-60 object-cover rounded-lg shadow-md"/>
              <img src="https://www.casatropica.com/wp-content/uploads/2024/10/award-winning-resorts-nay-palad.webp" alt="Resort" className="w-full h-60 object-cover rounded-lg shadow-md mt-4"/>
            </div>
          </section>

          <section className="mt-20 bg-white p-10 rounded-lg shadow-lg">
            <h1 className="text-2xl lg:text-3xl font-semibold mb-10 text-center">Why Choose Serenity Resort?</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
              {awardData.map((award, index) => (
                <div className="text-center space-y-2" key={index}>
                  <div>
                    <span className={`${award.bgColor} p-3 rounded-full inline-block`}>
                      {award.icon}
                    </span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold">{award.title}</h3>
                  <p className="text-gray-600">{award.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
    </main>
  )
}