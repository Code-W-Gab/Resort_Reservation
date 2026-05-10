import { useState, useEffect } from 'react'
import cabin from '/cabin.jpg'
import { Users, Minus, Plus } from 'lucide-react'
import Calendar from './Calendar'
import { GetCottageById } from '../../Service/cottageService'
import { useParams } from 'react-router-dom'
import { reserveCottage } from '../../Service/reserveService'
import toast from 'react-hot-toast'

export default function Book() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cottageType, setCottageType] = useState("")
  const [capacity, setCapacity] = useState(0)
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const { id } = useParams()
  const [cottage, setCottage] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCheckIn(null)
    setCheckOut(null)
  }, [cottageType])

  const handleDateSelect = (startDate, endDate) => {
    setCheckIn(startDate)
    setCheckOut(endDate)
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const diffTime = Math.abs(checkOut - checkIn)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return cottageType === 'dayTour' ? 0 : diffDays
  }

  const calculateTotal = () => {
    if (!checkIn) return 0
    if (cottageType === 'dayTour') {
      return 100
    } else if (cottageType === 'overnight') {
      const nights = calculateNights()
      return nights > 0 ? nights * 300 : 0
    }
    return 0
  }

  const formatDate = (date) => {
    if (!date) return 'Not selected'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const nights = calculateNights()
  const total = calculateTotal()
  

  useEffect(() => {
    if (id) { 
      setLoading(true)
      GetCottageById(id)
        .then((res) => {
          setCottage(res.data)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [id])

  function handleConfirmBooking() {
    // Validation
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!checkIn) {
      toast.error("Please select a date")
      return
    }

    if (cottageType === 'overnight' && !checkOut) {
      toast.error("Please select check-out date")
      return
    }

    const bookingData = {
      CottageName: cottage.CottageName,
      Capacity: capacity,
      DayTourDate: cottageType === 'dayTour' ? checkIn : null,
      CheckInDate: cottageType === 'overnight' ? checkIn : null,
      CheckOutDate: cottageType === 'overnight' ? checkOut : null,
      FullName: fullName,
      Email: email,
      Phone: parseInt(phone),
      Total: total
    }
    reserveCottage(
      bookingData.CottageName,
      bookingData.Capacity,
      bookingData.DayTourDate,
      bookingData.CheckInDate,
      bookingData.CheckOutDate,
      bookingData.FullName,
      bookingData.Email,
      bookingData.Phone,
      bookingData.Total
    )
      .then(res => {
        toast.success("Booking confirmed successfully!")
        // Reset form
        setFullName("")
        setEmail("")
        setPhone("")
        setCheckIn(null)
        setCheckOut(null)
        setCottageType("")
      })
      .catch(err => console.log(err))
  }

  
  return(
    <main className='py-10 grid grid-cols-2 gap-4 px-20 items-start'>
      {loading || !cottage 
      ? (
        <div className='col-span-2 text-center py-20'>
          <p className='text-xl text-gray-500'>Loading cottage details...</p>
        </div>
        ) 
      :
      <>
        <div className='border border-gray-300 rounded-2xl bg-white shadow-lg'>
          <img src={cabin} alt='cabin' className=' h-100 w-full object-cover rounded-tl-xl rounded-tr-xl'/>
          <div className='p-8'>
            <h1 className='text-4xl font-semibold'>{cottage.CottageName}</h1>
            <p className='text-gray-700 text-lg py-2 my-3'>{cottage.Descriptions}</p>

            <div className='flex items-center gap-2 text-gray-700'>
              <Users size={20}/>
              <span className='text-lg'>Capacity: Up to {cottage.Capacity} guests</span>
            </div>
            <div className='border-b my-5 border-gray-300'></div>
            <h1 className='text-xl font-semibold'>Amenities</h1>
            <div className='mt-5 flex flex-wrap gap-2 items-center'>
              {cottage.Amenities.slice(0, 3).map((amenity, index) => {
                return(
                  <span key={`${cottage._id}-${index}`} className='bg-blue-100 px-2 py-1 rounded-sm text-sm text-blue-700'>
                    {amenity}
                  </span>
                )
              })}
            </div>
        </div>
      </div>
      </> 
      }

      <div className='border border-gray-300 rounded-2xl bg-white shadow-lg p-6'>
        <h1 className='text-2xl font-semibold'>Book Your Stay</h1>
        <div className='mt-7'>
          <label className='font-semibold'>Booking Type</label>
          <div className='grid grid-cols-2 gap-4 mt-3'>
            <button 
              onClick={() => setCottageType("dayTour")}
              className={`border-3 p-4 rounded-xl ${
                cottageType === "dayTour"
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300'
              }`}
            >
              <span className='text-md font-semibold text-gray-500'>Day Tour</span>
              <p className='text-blue-500 text-3xl'>₱100</p>
            </button>
            <button 
              onClick={() => setCottageType("overnight")}
              className={`border-3 p-4 rounded-xl ${
                cottageType === "overnight"
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-300'
              }`}
            >
              <span className='text-md font-semibold text-gray-500'>Overnight</span>
              <p className='text-blue-500 text-3xl'>₱300/night</p>
            </button>
          </div>
        </div>

        <div className='mt-8'>
          <label className='font-semibold'>Number of Guests</label>
          <div className='flex items-center gap-8 mt-4'>
            <button onClick={() => setCapacity(c => c > 0 ? c - 1 : 0)} className='border border-gray-400 rounded-full p-2'><Minus size={18}/></button>
            <span className='text-xl'>{capacity}</span>
            <button onClick={() => setCapacity(c => c < 6 ? c + 1 : 6)} className='border border-gray-400 rounded-full p-2'><Plus size={18}/></button>
            <p className='text-gray-500'>Max: 6</p>
          </div>
        </div>

        <div className='mt-8'>
          <label className='font-semibold block mb-3'>Select Dates {cottageType === 'overnight' ? '(Click start and end date)' : '(Click to select day)'}</label>
          {cottageType ? (
            <Calendar 
              bookingType={cottageType}
              onDateSelect={handleDateSelect}
              checkIn={checkIn}
              checkOut={checkOut}
              reservedDates={[]}
            />
          ) : (
            <div className='bg-gray-100 p-4 rounded-lg text-gray-500 text-center'>
              Please select a booking type first
            </div>
          )}
        </div>

        <div className='bg-blue-50 p-4 rounded-lg my-8 text-gray-700'>
          <p className='font-bold'>Check-in: <span className='text-blue-500'>{formatDate(checkIn)}</span></p>
          {cottageType === 'overnight' && (
            <>
              <p className='font-bold'>Check-out: <span className='text-blue-500'>{formatDate(checkOut)}</span></p>
              <p className='font-bold'>Nights: <span className='text-blue-500'>{nights}</span></p>
            </>
          )}
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-md text-gray-700 font-semibold'>Full Name *</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='John Smith' 
              className='border border-gray-400 py-2.5 px-4 rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-md text-gray-700 font-semibold'>Email *</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='john@example.com' 
              className='border border-gray-400 py-2.5 px-4 rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-md text-gray-700 font-semibold'>Phone</label>
            <input 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='+1234567890' 
              className='border border-gray-400 py-2.5 px-4 rounded-xl'
            />
          </div>
        </div>

        <div className='border-b border-gray-300 my-10'></div>

        <div>
          <div className='flex items-center justify-between '>
            <p className='text-gray-500 text-xl'>Total</p>
            <h3 className='text-blue-500 text-4xl'>₱{total}</h3>
          </div>
          <button 
            disabled={!checkIn}
            onClick={handleConfirmBooking}
            className={`w-full py-3 rounded-lg text-lg mt-6 ${
              checkIn
                ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </main>
  )
}