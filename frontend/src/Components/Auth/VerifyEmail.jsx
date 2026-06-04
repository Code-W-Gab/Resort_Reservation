import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { verifyEmail, resendOTP } from "../../Service/authService"
import toast from "react-hot-toast"

export default function VerifyOTP() {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [timer, setTimer] = useState(300) // 5 minutes
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  // Countdown timer for OTP expiration
  useEffect(() => {
    if (timer <= 0) return
    
    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  function handleVerifyOTP() {
    if (!otp.trim()) {
      toast.error("Please enter the OTP code")
      return
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits")
      return
    }

    setLoading(true)
    verifyEmail(email, otp)
      .then(res => {
        toast.success("Email verified successfully! Redirecting to login...")
        navigate('/auth/login')
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message
        if (errorMessage?.includes('expired')) {
          toast.error("OTP has expired. Please resend a new code.")
        } else if (errorMessage?.includes('invalid') || errorMessage?.includes('not match')) {
          toast.error("Invalid OTP code. Please try again.")
        } else {
          toast.error(errorMessage || "Verification failed")
        }
      })
      .finally(() => setLoading(false))
  }

  function handleResendOTP() {
    setResendLoading(true)
    resendOTP(email)
      .then(res => {
        toast.success("OTP resent! Check your email.")
        setOtp("") // Clear input
        setTimer(300) // Reset timer
      })
      .catch(err => {
        toast.error(err.response?.data?.message || "Failed to resend OTP")
      })
      .finally(() => setResendLoading(false))
  }

  return(
    <main 
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop')`
      }}
    >
      <div className="absolute inset-0 bg-blue-500 opacity-40"></div>
      
      <div className="relative z-10">
        <div className="text-center text-white bg-blue-600 w-80 sm:w-max-100 p-7 rounded-tl-xl rounded-tr-xl">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Verify Email</h1>
          <p>Enter the OTP code sent to your email</p>
        </div>
        <div className="p-6 sm:p-7 bg-white flex flex-col gap-5 rounded-bl-xl rounded-br-xl w-100">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-gray-700">Email: <span className="font-semibold">{email}</span></p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Enter OTP Code</label>
            <input
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              value={otp}
              className="border border-gray-500 px-4 py-2.5 rounded-lg text-md text-center text-2xl tracking-widest"
              type="text" 
              placeholder="000000" 
              maxLength="6"
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Code expires in: <span className={timer < 60 ? 'text-red-600 font-bold' : 'text-blue-600 font-semibold'}>
                {formatTime(timer)}
              </span>
            </p>
          </div>

          <div className="mt-3">
            <button 
              onClick={handleVerifyOTP} 
              disabled={loading || timer <= 0}
              className="py-2 sm:py-2.5 bg-blue-600 text-white text-xl rounded-lg w-full hover:bg-blue-700 transition mb-3 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button 
              onClick={handleResendOTP} 
              disabled={resendLoading || timer > 0}
              className="py-2 sm:py-2.5 bg-gray-300 text-gray-700 text-lg rounded-lg w-full hover:bg-gray-400 transition disabled:opacity-50"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}