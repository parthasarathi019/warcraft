import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
const Dashboard = () => {
  const Loaded_Product_Data = useLoaderData()

  console.log(Loaded_Product_Data[0].Bkash);
  
  const { register, handleSubmit, reset } = useForm();



  const onSubmit = async (data) => {
    try {
  
      // Make the axios POST request
      axios.put(`${import.meta.env.VITE_DataHost}/Change_Number/66b687394638242336709304`, data)
      .then((result) => {
        if (result) {
          alert("Number Added Successfully !!!", { autoClose: 1000 });
          reset();
        }
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
    } catch (error) {
      console.log("Error uploading images:", error.message);
    }
  };


  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] bg-slate-100 bg-gradient-to-r from-[#460eef] to-[#8d94d6] text-white mx-auto my-20 border-2 p-4 rounded-md shadow-md">
          {/* <DashboardInfoText title={'Add New Product'} /> */}
          <div className='flex justify-center'>
            <section className='w-[50%] flex justify-center flex-col gap-y-[24px]'>
              <div className="...">
                <label className="block mb-1 font-medium">
                  BKASH
                </label>
                <input
                  type="text"
                   defaultValue={Loaded_Product_Data[0]?.Bkash}
                  {...register('Bkash')}
                  placeholder="Enter Number"
                  className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md pl-3"
                />
              </div>

            

              <div className="...">
                <label className="block mb-1 font-medium">
                  NAGAD
                </label>
                <input
                  type="text"
                   defaultValue={Loaded_Product_Data[0]?.Nagad}
                  {...register('Nagad')}
                  placeholder="Enter Number"
                  className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md pl-3"

                />
              </div>

              <div className="...">
                <label className="block mb-1 font-medium">
                  BINANCE
                </label>
                <input
                  type="text"
                   defaultValue={Loaded_Product_Data[0]?.Binance}
                  {...register('Binance')}
                  placeholder="Enter Number"

                  className="form-input  w-full bg-[#fff] text-slate-600 py-3 rounded-md pl-3 "

                />
              </div>
              
                           

            </section>
           
          </div>
          <button type="submit" className="block w-full px-4 text-xl font-bold btn rounded-md text-white border-2 border-black bg-blue-950 hover:text-black mt-3" >Add Number</button>
        </form>
      </div>
    </>
  )
}

export default Dashboard