import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [year, setYear] = useState(new Date().getUTCFullYear())
  const newYear = new Date(`Jan 2, ${year}`).getTime()

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timeId = setInterval(() => {
      const now = new Date().getTime()
      const distance = (newYear - now) / 1000
      if (distance > 0) {
        const days = Math.floor(distance/60/60/24)
        const hours = Math.floor(distance/60/60 % 24)
        const minutes = Math.floor(distance/60 % 24)
        const seconds = Math.floor(distance % 60)
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
      }
      else {
        clearInterval(timeId)
        setYear(year+1)
      }
    })
  }, [newYear])

  return (
    <>
      <Head>
        <title>New Year Countdown</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='z-10 absolute w-full h-full flex flex-col items-center justify-center'>
        <div className='absolute bottom-0 opacity-25 xsm:right-0 p-1'>© 2022 DatDaDev</div>
          <div className='bg-white/25 rounded-xl p-5'>
            <h1 className='text-white font-bold text-center text-xl xsm:text-3xl lg:text-4xl'>Happy <br className='block xsm:hidden'/>New Year</h1>
            <h2 className='pt-1 text-center text-white/75'>for {year} in</h2>
            <div className='pt-3 grid grid-cols-1 xsm:grid-cols-4 items-center justify-around gap-3'>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{days}</div>
                <h3 className='text-white/75'>days</h3>
              </div>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{hours}</div>
                <h3 className='text-white/75'>hours</h3>
              </div>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{minutes}</div>
                <h3 className='text-white/75'>minutes</h3>
              </div>
              <div className='p-3 text-sm mx-auto bg-black/25 rounded-xl flex flex-col items-center gap-1 w-20'>
                <div className='font-bold text-2xl lg:text-3xl'>{seconds}</div>
                <h3 className='text-white/75'>seconds</h3>
              </div>
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          class='z-0 blur-3xl absolute h-full object-cover w-full'
          src="${"/video.mp4"}"
        />,
      ` }}></div>
      </main>
    </>
  )
}
