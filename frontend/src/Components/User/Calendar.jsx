import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Calendar({ bookingType, onDateSelect, checkIn, checkOut, reservedDates = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)) // May 2026
  const [tempStartDate, setTempStartDate] = useState(null)

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const isDateInRange = (date, start, end) => {
    if (!start || !end) return false
    return date >= start && date <= end
  }

  const isReservedDate = (date) => {
    return reservedDates.some((reserved) => isSameDay(date, new Date(reserved)))
  }

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

    if (isReservedDate(selectedDate)) return

    if (bookingType === 'dayTour') {
      onDateSelect(selectedDate, selectedDate)
      setTempStartDate(null)
    } else if (bookingType === 'overnight') {
      if (!tempStartDate) {
        setTempStartDate(selectedDate)
      } else {
        if (selectedDate < tempStartDate) {
          onDateSelect(selectedDate, tempStartDate)
        } else {
          onDateSelect(tempStartDate, selectedDate)
        }
        setTempStartDate(null)
      }
    }
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days.map((day, index) => {
      if (day === null) {
        return (
          <div key={`empty-${index}`} className='h-10'></div>
        )
      }

      const currentFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isSelected = isSameDay(currentFullDate, checkIn) || isSameDay(currentFullDate, checkOut)
      const isInRange = isDateInRange(currentFullDate, checkIn, checkOut)
      const isReserved = isReservedDate(currentFullDate)
      const isTemp = tempStartDate && isSameDay(currentFullDate, tempStartDate)

      let dayClass = 'h-10 rounded text-sm font-medium cursor-pointer flex items-center justify-center border'

      if (isReserved) {
        dayClass += ' bg-gray-300 text-gray-500 cursor-not-allowed'
      } else if (isSelected) {
        dayClass += ' bg-blue-500 text-white border-blue-500'
      } else if (isInRange) {
        dayClass += ' bg-blue-100 text-gray-800 border-blue-200'
      } else if (isTemp) {
        dayClass += ' bg-yellow-100 border-yellow-400 text-gray-800'
      } else {
        dayClass += ' bg-white text-gray-800 border-gray-200 hover:bg-blue-50'
      }

      return (
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={dayClass}
          disabled={isReserved}
        >
          {day}
        </button>
      )
    })
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  return (
    <div className='bg-gray-50 p-4 rounded-lg'>
      <div className='flex items-center justify-between mb-4'>
        <button onClick={previousMonth} className='p-1 hover:bg-gray-200 rounded'>
          <ChevronLeft size={20} />
        </button>
        <h3 className='text-lg font-semibold text-center flex-1'>{monthName}</h3>
        <button onClick={nextMonth} className='p-1 hover:bg-gray-200 rounded'>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className='grid grid-cols-7 gap-2 mb-4'>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className='h-10 flex items-center justify-center font-semibold text-gray-600 text-sm'>
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      <div className='flex items-center gap-6 mt-4'>
        <div className='flex items-center gap-2'>
          <div className='size-3 bg-blue-500 rounded-sm'></div>
          <p className='text-xs'>Selected</p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='size-3 bg-blue-100 rounded-sm'></div>
          <p className='text-xs'>Range</p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='size-3 bg-gray-300 rounded-sm'></div>
          <p className='text-xs'>Reserved</p>
        </div>
        {bookingType === 'overnight' && tempStartDate && (
          <div className='flex items-center gap-2'>
            <div className='size-3 bg-yellow-100 rounded-sm border border-yellow-400'></div>
            <p className='text-xs'>Start Date</p>
          </div>
        )}
      </div>
    </div>
  )
}
