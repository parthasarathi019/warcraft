import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Add_Catagory() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('https://invest-backend-inky.vercel.app/api/Catagory_Add', { Catagory: data.Catagory });

      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again.');
    }
  };

  return (
    <div className="mt-[6em] flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
       
       <section className='flex gap-x-4 items-center'>
       <div>Catagory Name:</div>
          <input required className='outline-none border-[1.7px] border-orange-500 rounded-[3.3px] w-[350px] p-2 ' {...register('Catagory')} />
        <button className=" btn bg-orange-500 rounded-[4px] px-7 hover:bg-orange-400" type="submit">Add Catagory</button>

       </section>
      </form>
    </div>
  );
}

export default Add_Catagory;
