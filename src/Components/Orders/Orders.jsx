//eslint-disable-next-line
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const Orders = () => {
    //eslint-disable-next-line
    const [Moookings, seMoookings] = useState([])
    const url = (`https://invest-backend-inky.vercel.app/order`)
    const fetchData = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                seMoookings(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData(); // Fetch data initially on component moun

        const intervalId = setInterval(fetchData, 1000); // Periodically refetch data every 1 second
        return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
    }, []); 

    

    const handle_delete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://invest-backend-inky.vercel.app/delete_Product/${_id}`, { method: "DELETE" },

                )
                    .then(res => res.json())
                    .then(delete_data => {
                        // console.log(delete_data);
                        if (delete_data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Product data been deleted.',
                                'success'
                            )
                        }
                        const remaining = Moookings.filter(Moooking => Moooking._id !== _id)
                        seMoookings(remaining)
                    })
            }
        })

    }


    const Make_Cancel = (user) => {
        console.log(user._id);
        fetch(`https://invest-backend-inky.vercel.app/product_cancel_conformation/${user.random_number}`, {
            method: "PATCH",
            //   headers: { //'content-type': 'application/json'//},
            //   body: JSON.stringify({status: 'confirm'}) 
        })
        fetch(`https://invest-backend-inky.vercel.app/product_cancel_conformation_2/${user.Product_id}`, {
            method: "PATCH",
            //   headers: { //'content-type': 'application/json'//},
            //   body: JSON.stringify({status: 'confirm'}) 
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Order Cancel Successfully`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            })

            // console.log(user.Product_id)
    }


     // const [mata, setmata] = useState([]);
  // // console.log(data);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_DataHost}/data`)
  //     .then((res) => res.json())
  //     .then((mata) => setmata(mata));
  // }, []);

  
  const Boookings = Moookings ? [...Moookings].reverse() : [];
    return (
        <div>
            <div className="overflow-x-auto w-full md:pl-2">
                <table className="table w-full">
                  
                    <thead>
                        <tr>
                            <th>Product Details</th>
                            <th>Customer Details</th>
                            <th>Payment Details</th>
                            <th>Cancel</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Boookings.map(Product => <tr key={Product._id}>

                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={Product.PiC} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div className='max-w-[250px] md:text-justify'>
                                            <div className="font-bold ">{Product.Product_Name}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>
                                    <div className='max-w-[300px] text-justify'>
                                        <div className="font-bold text-[17px] capitalize">{Product.YourName}</div>
                                        <div className="text-sm opacity-60 text-red-500">{Product.YourEmail}</div>
                                     
                                    </div>
                                </th>
                                <th>
                                    <div className='max-w-[250px] text-justify'>
                                        <div className="text-sm opacity-60 text-red-500 ">{Product.T_Method} <span className='text-green-700'>(${Product.YourMobileNumber})</span> </div>
                                        <div className="text-sm opacity-60 capitalize text-red-500">{Product.T_ID}</div>
                                    </div>
                                </th>
                               
                            
                                            <th>
                                                {  (Product.Iscanceled === 'No' ? <button onClick={() => Make_Cancel(Product)} className="bg-red-500 hover:bg-red-500 px-[19px] py-[11px] btn  rounded-sm text-white">Approve Order</button> : <button className="bg-green-500 px-[36px] py-3 rounded-sm text-white">Approved</button>)  }

                                            </th> 
                                        
                                <th>
                                    <button onClick={() => { handle_delete(Product._id) }} className="btn btn-square btn-outline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
