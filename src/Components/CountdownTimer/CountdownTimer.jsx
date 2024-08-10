import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    microseconds: 0,
    nanoseconds: 0,
    picoseconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('January 12, 2028 00:00:00').getTime();

    const calculateTimeRemaining = () => {
      const currentDate = new Date().getTime();
    //   console.log(currentDate);
      const timeDifference = targetDate - currentDate;

      const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      const milliseconds = Math.floor(timeDifference % 1000);
      const microseconds = Math.floor((timeDifference % 1000) * 1000);
      const nanoseconds = Math.floor((timeDifference % 1000) * 1e6);
      const picoseconds = Math.floor((timeDifference % 10000) * 1e9);

    // const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    // const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    // const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    // const milliseconds = Math.floor(timeDifference % 1000);
    // const microseconds = Math.floor(timeDifference % 100);
    // const nanoseconds = Math.floor(timeDifference % 10);
    // const picoseconds = Math.floor((timeDifference % 1000) * 1e9);

      setCountdown({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        microseconds,
        nanoseconds,
        picoseconds,
      });
    };

    const intervalId = setInterval(calculateTimeRemaining, 1);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center my-8">
      <h1 className="md:text-3xl text-2xl font-bold mb-4">Countdown to January 1, 2028</h1>
      <div className="flex flex-col md:flex-row justify-between items-center animate">
      <div className="countdown-item rounded-[4px]  md:py-[15px] w-[53px] bg-lime-400">
          <span className="text-2xl font-bold">{countdown.years}</span>
          <span className="text-xs">years</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[63px] bg-green-400">
          <span className="text-2xl font-bold">{countdown.months}</span>
          <span className="text-xs">months</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[72px] md:w-[63px] bg-teal-400">
          <span className="text-2xl font-bold">{countdown.days}</span>
          <span className="text-xs">days</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[82px] md:w-[67px] bg-orange-400">
          <span className="text-2xl font-bold">{countdown.hours}</span>
          <span className="text-xs">hours</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[92px] md:w-[83px] bg-teal-400">
          <span className="text-2xl font-bold">{countdown.minutes}</span>
          <span className="text-xs">minutes</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[110px] bg-purple-400">
          <span className="text-2xl font-bold">{countdown.seconds}</span>
          <span className="text-xs">seconds</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[130px] bg-blue-400">
          <span className="text-2xl font-bold">{countdown.milliseconds}</span>
          <span className="text-xs">milliseconds</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] md:w-[200px] w-[184px] bg-orange-400">
          <span className="text-2xl font-bold">{countdown.microseconds}</span>
          <span className="text-xs">microseconds</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[206px] md:w-[219px] bg-teal-400">
          <span className="text-2xl font-bold">{countdown.nanoseconds}</span>
          <span className="text-xs">nanoseconds</span>
        </div> :
        <div className="countdown-item rounded-[4px]  md:py-[15px] w-[256px] bg-red-500">
          <span className="text-2xl font-bold">{countdown.picoseconds}</span>
          <span className="text-xs">picoseconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
