import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useMemo } from 'react';

const CountdownToMidnight = () => {
  // Calculate seconds left until midnight
  const secondsUntilMidnight = useMemo(() => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set to 00:00 of next day
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <CountdownCircleTimer
        isPlaying
        size={130}
        duration={secondsUntilMidnight}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[secondsUntilMidnight, secondsUntilMidnight / 2, secondsUntilMidnight / 4, 0]}
        onComplete={() => {
          // Refresh page or reset component at midnight
          window.location.reload();
          return { shouldRepeat: true }; // Continue repeating
        }}
      >
        {({ remainingTime }) => {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;

          return (
            <div className="flex flex-col items-center text-lg font-bold text-white">
              <div>{`${hours.toString().padStart(2, '0')} : ${minutes
                .toString()
                .padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`}</div>
            </div>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default CountdownToMidnight;
