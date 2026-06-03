import { useState, useMemo } from 'react';
import { 
  format, 
  getDaysInMonth, 
  getDay, 
  startOfMonth, 
  addMonths, 
  subMonths,
  isWithinInterval,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReservationDetail from './ReservationDetail';

// Cottage color mapping
const COTTAGE_COLORS = {
  'Lakeside Cabin': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'Tropical Paradise Cottage': { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-300' },
  'Forest Retreat Cabin': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  'Overwater Bungalow': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  'Garden Villa': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  'Rustic Mountain Cabin': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' }
};

// Backup colors if cottage not found in COTTAGE_COLORS
const BACKUP_COLORS = [
  { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-300' },
  { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-300' },
  { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
];

export default function ReservationCalendar({ reserve = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCottage, setSelectedCottage] = useState('All Cottages');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get unique cottage names from actual reservations
  const cottages = useMemo(() => {
    const uniqueCottages = ['All Cottages', ...new Set(reserve.map(r => r.CottageName))];
    return uniqueCottages;
  }, [reserve]);

  // Dynamic color mapping based on actual cottages
  const dynamicCottageColors = useMemo(() => {
    const colorMap = { ...COTTAGE_COLORS };
    let backupIndex = 0;

    // Add colors for cottages not in predefined list
    cottages.forEach(cottage => {
      if (cottage !== 'All Cottages' && !colorMap[cottage]) {
        colorMap[cottage] = BACKUP_COLORS[backupIndex % BACKUP_COLORS.length];
        backupIndex++;
      }
    });

    return colorMap;
  }, [cottages]);

  // Filter reservations by selected cottage
  const filteredReserves = useMemo(() => {
    if (selectedCottage === 'All Cottages') {
      return reserve;
    }
    return reserve.filter(r => r.CottageName === selectedCottage);
  }, [reserve, selectedCottage]);

  // Get reservations for a specific date
  const getReservationsForDate = (date) => {
    return filteredReserves.filter(res => {
      // Don't show cancelled reservations
      if (res.Status === 'Cancelled') {
        return false;
      }

      if (res.DayTourDate) {
        // For day tours, check if the date matches
        const dayTourDate = parseISO(res.DayTourDate);
        return format(dayTourDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      } else {
        // For overnight stays, check if date is within check-in and check-out
        const checkIn = parseISO(res.CheckInDate);
        const checkOut = parseISO(res.CheckOutDate);
        return isWithinInterval(date, { start: checkIn, end: checkOut });
      }
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = startOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const startingDayOfWeek = getDay(firstDay);

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  return (
    <main className="bg-white p-4 sm:p-6 mb-5  mx-6 sm:mx-10 xl:mx-20 rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center mb-6">
          <h1 className="text-xl text-start sm:text-2xl font-semibold">Reservation Calendar</h1>
          
          <div className="flex max-sm:flex-col sm:justify-between items-center gap-4">
            <select
              value={selectedCottage}
              onChange={(e) => setSelectedCottage(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition max-sm:w-full"
            >
              {cottages.map(cottage => (
                <option key={cottage} value={cottage}>
                  {cottage}
                </option>
              ))}
            </select>

            <div className="flex items-center">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded transition"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="w-40 text-center">
                <h2 className="text-lg font-semibold">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
              </div>

              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Legend - Only show actual cottages from reservations */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-4">Cottage Legend:</p>
          <div className="flex flex-wrap max-sm:flex-col gap-4">
            {cottages
              .filter(cottage => cottage !== 'All Cottages')
              .map(cottage => {
                const colors = dynamicCottageColors[cottage];
                return (
                  <div key={cottage} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${colors.bg} ${colors.border} border`}></div>
                    <span className="text-sm">{cottage}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mt-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2 border-b border-gray-200">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="bg-gray-50 rounded min-h-32"></div>;
              }

              const reservationsForDay = getReservationsForDate(date);
              const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

              return (
                <div
                  key={format(date, 'yyyy-MM-dd')}
                  className={`min-h-32 border rounded p-2 overflow-y-auto ${
                    isToday ? 'bg-blue-50 border-blue-300 border-2' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-gray-700 mb-1">
                    {format(date, 'd')}
                  </div>
                  
                  <div className="space-y-1">
                    {reservationsForDay.map(res => {
                      const colors = dynamicCottageColors[res.CottageName];
                      const isDayTour = res.DayTourDate !== null;
                      const opacity = res.Status === 'Pending' ? 'opacity-60' : 'opacity-100';

                      return (
                        <button
                          key={res._id}
                          onClick={() => handleReservationClick(res)}
                          className={`w-full text-left text-xs p-1 rounded border cursor-pointer hover:shadow-md transition ${colors.bg} ${colors.text} ${colors.border} border ${opacity} ${isDayTour ? 'border-dashed' : ''}`}
                        >
                          <div className="truncate font-semibold">{res.CottageName}</div>
                          <div className="truncate text-xs">{res.FullName}</div>
                          {isDayTour && <div className="text-xs italic">Day Tour</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reservation Detail Modal */}
      {isModalOpen && selectedReservation && (
        <div className="fixed inset-0 flex bg-gray-800/50 items-center justify-center z-40">
          <div className="z-50">
            <ReservationDetail
              reservation={selectedReservation}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
}