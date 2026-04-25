import { useEffect, useMemo, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { GetCottageById, UpdateCottage } from '../../../Service/cottageService'
import toast from 'react-hot-toast'

export default function UpdateCottageModal({ onClose, fetchCottage, id }) {
  const [cottageName, setCottageName] = useState("")
  const [cottageType, setCottageType] = useState("")
  const [descriptions, setDescriptions] = useState("")
  const [capacity, setCapacity] = useState("")
  const [dayTourPrice, setDayTourPrice] = useState("")
  const [overnightPrice, setOvernightPrice] = useState("")
  const [amenities, setAmenities] = useState("")

  const [isDragging, setIsDragging] = useState(false)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)
  const imagePreviews = useMemo(
    () => images.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [images],
  )

  useEffect(() => {
    return () => {
      imagePreviews.forEach(({ url }) => URL.revokeObjectURL(url))
    }
  }, [imagePreviews])

  const appendImages = (fileList) => {
    const newFiles = Array.from(fileList || []).filter((file) => file.type.startsWith('image/'))

    setImages((prev) => {
      const existing = new Set(prev.map((file) => `${file.name}-${file.size}-${file.lastModified}`))
      const unique = newFiles.filter(
        (file) => !existing.has(`${file.name}-${file.size}-${file.lastModified}`),
      )
      return [...prev, ...unique]
    })
  }

  const handleFileChange = (event) => {
    appendImages(event.target.files)
    event.target.value = ''
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    appendImages(event.dataTransfer.files)
  }

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  function fetchCottageById() {
    GetCottageById(id)
      .then((res) => {
        setCottageName(res.data.CottageName)
        setCottageType(res.data.Type)
        setDescriptions(res.data.Descriptions)
        setCapacity(res.data.Capacity)
        setDayTourPrice(res.data.DayTourPrice)
        setOvernightPrice(res.data.OvernightPrice)
        setAmenities(res.data.Amenities)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchCottageById()
  }, [id])

  const handleUpdateCottage = () => {
    setIsLoading(true)
    UpdateCottage(id, cottageName, cottageType, descriptions, capacity, dayTourPrice, overnightPrice, amenities)
      .then(res => {
        console.log("Update response:", res)
        toast.success("Updated Successfully!")
        fetchCottage()
        onClose()
      })
      .catch(err => {
        console.error("Update error:", err)
        toast.error("Failed to update cottage")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return(
    <main className='bg-white w-200 h-[85vh] rounded-xl overflow-hidden flex flex-col'>
      <header className='h-20 flex items-center justify-between text-white bg-blue-500 px-6 w-full shrink-0'>
        <h1 className='text-xl font-semibold'>Update Cottage</h1>
        <button className='rounded-full p-1 hover:bg-gray-400' onClick={onClose}><X /></button>
      </header>
      <div className='px-6 py-6 overflow-y-auto'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Cottage Name:</label>
            <input 
              className='border border-gray-400 rounded-md p-2' 
              type="text" 
              placeholder='e.g., A-Frame Cabin'
              value={cottageName}
              onChange={(e) => setCottageName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Type:</label>
            <div className='grid grid-cols-2 gap-3 items-center'>
              <button 
                onClick={() => setCottageType("Cottage")}
                className={`w-full py-2 rounded-md font-semibold ${
                  cottageType === 'Cottage' 
                    ? 'border-3 border-blue-500 bg-blue-100 text-blue-500' 
                    : 'border-3 border-gray-500 text-gray-500'
                }`}>
                Cottage
              </button>
              <button
                onClick={() => setCottageType("Cabin")} 
                className={`w-full py-2 rounded-md font-semibold ${
                  cottageType === 'Cabin' 
                    ? 'border-3 border-blue-500 bg-blue-100 text-blue-500' 
                    : 'border-3 border-gray-500 text-gray-500'
                }`}>
                Cabin
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-6'>
          <label className='font-semibold'>Descriptions:</label>
          <textarea 
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
            className='border border-gray-400 rounded-md p-2 h-25' 
            placeholder="Describe the cottage, its features, and what make it special"
          ></textarea>
        </div>

        <div className='grid grid-cols-3 gap-3 mt-6'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Capacity (Guests):</label>
            <input 
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className='border border-gray-400 rounded-md p-2' 
              type="number"/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Day Tour Price (₱):</label>
            <input 
              value={dayTourPrice}
              onChange={(e) => setDayTourPrice(e.target.value)}
              className='border border-gray-400 rounded-md p-2' 
              type="number"/>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold'>Overnight Price (₱):</label>
            <input 
              value={overnightPrice}
              onChange={(e) => setOvernightPrice(e.target.value)}
              className='border border-gray-400 rounded-md p-2' 
              type="number"/>
          </div>
        </div>

        <div className='flex flex-col gap-2 mt-6'>
          <label className='font-semibold'>Images:</label>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            multiple
            onChange={handleFileChange}
            className='hidden'
          />

          <button
            type='button'
            onClick={openFilePicker}
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`w-full rounded-lg border-2 border-dashed p-6 text-left transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/60'
            }`}
          >
            <div className='flex flex-col items-center gap-1'>
              <div className='rounded-md bg-blue-100 p-2 text-blue-600'>
                <Upload size={20}/>
              </div>
              <p className='font-semibold text-gray-800'>Click to select images</p>
              <p className='text-sm text-gray-600'>or drag and drop images here (PNG, JPG, WEBP)</p>
            </div>
          </button>

          {images.length > 0 && (
            <div className='mt-2 grid grid-cols-3 gap-3'>
              {imagePreviews.map(({ file, url }, index) => (
                <div key={`${file.name}-${file.size}-${file.lastModified}`} className='relative overflow-hidden rounded-md border border-gray-300 bg-white'>
                  <img
                    src={url}
                    alt={file.name}
                    className='h-24 w-full object-cover'
                  />
                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='absolute right-1 top-1 rounded-full bg-white/90 p-1 text-gray-700 hover:bg-white'
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={14} />
                  </button>
                  <p className='truncate px-2 py-1 text-xs text-gray-600'>{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2 mt-6'>
          <label className='font-semibold'>Amenities:</label>
          <input 
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            className='border border-gray-400 rounded-md p-2' 
            type="text" 
            placeholder='e.g., Wifi, Pool Access, Park'/>
          <p className='text-xs text-gray-500 px-1'>Add amenities one at a time (e.g., Wifi, Kitchen, Pool Access)</p>
        </div>

        <div className='grid grid-cols-2 gap-3 mt-7'>
          <button onClick={onClose} disabled={isLoading} className='border border-gray-500 text-gray-500 w-full py-2.5 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>Cancel</button>
          <button onClick={handleUpdateCottage} disabled={isLoading} className='border border-blue-500 bg-blue-500 text-white w-full py-2.5 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>{isLoading ? 'Updating...' : 'Update Cottage'}</button>
        </div>
      </div>
    </main>
  )
}