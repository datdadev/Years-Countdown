import { Temporal } from '@js-temporal/polyfill';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';


export default function Home() {
  const TIME_ZONE = Temporal.TimeZone.from("Asia/Ho_Chi_Minh");
  const LUNAR_CALENDAR = Temporal.Calendar.from("chinese");
  const NORMAL_CALENDAR = Temporal.Calendar.from("iso8601");

  const [calendar, setCalendar] = useState(NORMAL_CALENDAR);

  // const newYear = useMemo(() => Temporal.Now.zonedDateTime(calendar, TIME_ZONE).add({ seconds: 5 }), [calendar])
  const newYear = useMemo(() => Temporal.ZonedDateTime.from({
    calendar,
    timeZone: TIME_ZONE,
    year: Temporal.Now.zonedDateTime(calendar, TIME_ZONE).year + 1,
    month: 1,
    day: 1,
  }), [calendar]);

  const [distance, setDistance] = useState(new Temporal.Duration());

  useEffect(() => {
    const id = setInterval(() => {
      setDistance(() => {
        const newDistance = newYear.since(Temporal.Now.zonedDateTime(calendar, TIME_ZONE), {largestUnit: "days", smallestUnit: "seconds"});
        if (newDistance.sign != -1) {
          return newDistance;
        } else {
          clearInterval(id);
          return new Temporal.Duration();
        }
      });
    }, 1000);
    return () => clearInterval(id);
  }, [calendar])

  // change calendar base on query
  const router = useRouter();
  const { lunar } = router.query;
  useEffect(() => {
    if (lunar !== undefined) {
      setCalendar(LUNAR_CALENDAR);
    } else {
      setCalendar(NORMAL_CALENDAR);
    }
  }, [lunar])


  return (
    <>
      <Head>
        <title>New Year Countdown</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='z-10 absolute w-full h-full flex flex-col items-center justify-center'>
        <div className='absolute bottom-0 opacity-25 xsm:right-0 p-1'>© 2022 DatDaDev, {
          calendar.id === LUNAR_CALENDAR.id
          ? <Link className='underline' href="?">normal mode</Link>
          : <Link className='underline' href="?lunar">lunar mode</Link>
        }</div>
          <div className='bg-white/25 rounded-xl p-5'>
            <h1 className='text-white font-bold text-center text-xl xsm:text-3xl lg:text-4xl'>Happy {calendar.id === LUNAR_CALENDAR.id ? "Lunar " : " "}<br className='block xsm:hidden'/>New Year</h1>
            <h2 className='pt-1 text-center text-white/75'>for {newYear.year} in</h2>
            <div className='pt-3 grid grid-cols-1 xsm:grid-cols-4 items-center justify-around gap-3'>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{distance.days}</div>
                <h3 className='text-white/75'>days</h3>
              </div>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{distance.hours}</div>
                <h3 className='text-white/75'>hours</h3>
              </div>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{distance.minutes}</div>
                <h3 className='text-white/75'>minutes</h3>
              </div>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{distance.seconds}</div>
                <h3 className='text-white/75'>seconds</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          class='z-0 blur-3xl absolute h-full object-cover w-full'
          src="${"/video.mp4"}"
        />,
      ` }}></div> */}
      </main>
    </>
  )
}
