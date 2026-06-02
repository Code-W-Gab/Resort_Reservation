import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "../../../Service/authService";
import toast from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendContactMessage(name, email, message)
      .then(res => {
        if (res.data.success) { 
          toast.success("Message sent successfully!")
          // Reset form fields after submission
          setName("");
          setEmail("");
          setMessage("");
        } else {
          toast.error("Failed to send message: " + res.data.message)
        }
      })
      .catch(err => {
        console.error("Error sending message:", err)
        toast.error("An error occurred while sending your message. Please try again later.")
      })
      .finally(() => setLoading(false));
    
  }

  return(
    <main className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 px-6 lg:px-10 xl:20 py-6">
      <div className="bg-blue-600 text-white p-10 rounded-lg shadow-lg space-y-5">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <div className="flex items-center gap-3">
          <MapPin />
          <div>
            <h2 className="text-gray-300">Address</h2>
            <p>123 Paradise Beach Road, Tropical Island, 12345</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone />
          <div>
            <h2 className="text-gray-300">Phone</h2>
            <p>+63 1234567890</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail />
          <div>
            <h2 className="text-gray-300">Email</h2>
            <p>info@serenityresort.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock />
          <div>
            <h2 className="text-gray-300">Hours</h2>
            <p>Check-in: 8:00 AM | Check-out: 7:00 PM</p>
            <p>Reception: 24/7</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold">Send Us a Message</h1>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-500 font-medium">Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-500 font-medium">Email</label>
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-gray-500 font-medium">Message</label>
            <textarea 
              placeholder="Your Message" 
              className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button 
            onClick={handleSubmit} 
            className={`bg-blue-600 w-full text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
        </div>
      </div>
    </main>
  )
}