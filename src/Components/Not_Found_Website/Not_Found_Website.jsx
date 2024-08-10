import React from 'react'
import img1 from '../../assets/Error_Page.jpg'
import img2 from '../../assets/Nagad.png'
const Not_Found_Website = () => {
    return (
        <section className='bg-[#fba81c] min-h-screen flex flex-col justify-center items-center cursor-none'>
            <img className='w-full md:h-[20em] cursor-none' src={img1} alt="" />
            <p className='font-bold text-[19px] text-white cursor-none text-center font-mono pt-2 animate-bounce'>---The site will restart automatically after the payment requested below---</p>
            <p className='md:text-[80px] text-[70px] text-red-600 font-bold cursor-none text-center -mt-2'>BDT 19,973</p>
            <p className='text-[40px] text-red-600 font-bold cursor-none text-center -mt-6'>01925 172 417</p>
            <div className='flex justify-center -mt-[8.3px] cursor-none'>  <img className='w-[140px] h-[60px] cursor-none animate-pulse' src={img2} alt="" /></div>
        </section>
    )
}

export default Not_Found_Website