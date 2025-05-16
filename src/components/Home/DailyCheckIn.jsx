import { FaCheck } from "react-icons/fa";
import CountdownToMidnight from "./CountDownToMidNight";

const DailyCheckIn = ({ streak = 0, isCheckin = true, handleCheckin, role = 'user' }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-br from-indigo-900 to-blue-700 rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105 border-t border-l border-indigo-400/30">
        {/* Card header */}
        <div className="p-5 bg-indigo-800/40 backdrop-blur-sm border-b border-indigo-700">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            Daily Check-in
          </h3>
        </div>

        {/* Card body */}
        <div className="p-6">
          {/* Streak counter */}
          {isCheckin &&
            <div className="mb-6 flex justify-center">
              <div className="relative flex items-center gap-2 py-3 px-6 bg-indigo-800/50 rounded-full backdrop-blur-sm border border-indigo-600">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600/20 to-red-600/20 blur-sm"></div>
                <img src="/images/fire.png" className="h-8 w-8 text-orange-500 animate-pulse" />
                <div className="flex flex-col items-center">
                  <span className="text-white font-bold text-2xl drop-shadow-md">
                    {streak}
                  </span>
                  <span className="text-indigo-200 text-sm">DAY STREAK</span>
                </div>
              </div>
            </div>
          }

          {/* Countdown to reset checkin */}
          <CountdownToMidnight />

          {/* Status message when check in */}
          {isCheckin && (
            <div className="mb-4 text-center py-2 px-4 bg-indigo-800/30 rounded-lg text-indigo-100">
              Check-in complete! See you tomorrow!
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleCheckin}
            disabled={isCheckin}
            className={`w-full mt-2 py-2 px-3 rounded-lg font-bold text-lg text-white relative overflow-hidden transition-all ${!isCheckin && 'cursor-pointer'}
              ${!isCheckin
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1'
                : 'bg-gray-600 cursor-not-allowed opacity-70'}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-full h-full bg-white/10 absolute rounded-lg transition-all 
                ${!isCheckin ? 'animate-pulse-slow' : ''}`}></div>
            </div>
            <span className="relative flex items-center justify-center gap-2">
              {!isCheckin ? (
                <>
                  <FaCheck className="h-5 w-5" />
                  Check In Now
                </>
              ) : (
                <>
                  Already Checked In
                </>
              )}
            </span>
          </button>

          <div className="mt-4 text-center text-indigo-200 text-sm">
            Check in every day to keep your streak going!
          </div>
        </div>

        {/* Card footer with rewards info */}
        <div className="p-4 bg-indigo-900/60 backdrop-blur-sm border-t border-indigo-700 text-sm text-center text-indigo-300">
          <div className="flex justify-center items-center">
            <div className="px-2 py-1 bg-indigo-700/50 rounded mr-2">Today's reward</div>
            {role == 'VIP reader' ?
              <span className="font-medium">400 XP</span>
              :
              <span className="font-medium">200 XP</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyCheckIn