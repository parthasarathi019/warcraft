import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Product_Cart = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const fetchData = () => {
        fetch(`${import.meta.env.VITE_DataHost}/ProductAddToCart?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        fetchData();
    }, [user]); // Refetch whenever the user changes
    // Periodically refetch data every 5 seconds (adjust the interval as needed)
    useEffect(() => {
        const intervalId = setInterval(fetchData, 1000);
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [user]); // Refetch whenever the user changes


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

                fetch(`https://invest-backend-inky.vercel.app/Delete_ProductAddToCart/${_id}`, { method: "DELETE" },

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
                        const remaining = Boookings.filter(Boooking => Boooking._id !== _id)
                        seBoookings(remaining)
                    })
            }
        })

    }

  
    return (
        <div className="md:px-3">
            {

                data.length > 0 ? <div>
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Product Details</th>
                                    <th className="hidden md:block">Price Details</th>
                                    <th>Your Plans</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(Product => <tr key={Product._id}>

                                        <td>
                                            <Link to={`/Chackout/${Product.Product_id || Product._id}`}>
                                                <div className="flex items-center space-x-1 md:space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={Product.Doc_1_PC || Product.Doc_2_PC || Product.Doc_2_PC || Product.PiC} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div className='max-w-[250px] md:text-justify'>
                                                        <div className="font-bold md:text-normal text-[10px]">{Product.Product_Name}</div>
                                                        <div className="md:text-sm opacity-50 text-[13px]">{Product.Brand_Name}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <th className="hidden md:block">
                                            <div className='max-w-[250px] text-justify'>
                                                <div className="font-bold"> <span>Main Price: </span> {Product.Price}</div>
                                                {
                                                    Product.Price_Without_Discount && <div className="text-sm opacity-50"><span>Offer Price: </span>{Product.Price_Without_Discount}</div>
                                                }
                                                {
                                                    Product.Commission && <div className="text-sm opacity-50"><span>Commission: </span>{Product.Commission}%</div>
                                                }
                                            </div>
                                        </th>
                                        <th>
                                            {
                                                <div>{Product.Is_orderd && Product.Iscanceled === 'No' ? <button className="bg-red-500 px-[39.6px] py-3 rounded-sm text-white">{Product.Is_orderd}</button> : (Product.Iscanceled === 'Yes' ? <button className="bg-green-500 px-[33px] py-3 rounded-sm text-white">Approved</button> : <button className="bg-red-500 px-6 py-3 rounded-sm text-white">Not Orderd</button>)}</div>
                                            }
                                        </th>
                                        {/* <th>{Math.ceil((new Date().getTime() - Product.purseDate) / 40)} 11 : 43 PM</th> */}
                                        
                                            <th>
                                                { Product.Iscanceled === 'No' ? <button className="bg-red-500 hover:bg-red-500 px-[19px] py-[11px] btn  rounded-sm text-white">Pending Order</button> : <button className="bg-green-500 px-[33px] py-3 rounded-sm text-white">Activated</button> }
                                                { console.log(Product.Iscanceled)
                                                  }

                                            </th> 
                                        

                                        <th>
                                            <button onClick={() => { handle_delete(Product._id) }} className="btn btn-square btn-outline ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="md:h-6 w-5 md:w-6 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </th>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : <div className="flex justify-center animate-spin p-11"> <IconParkOutlineLoadingOne></IconParkOutlineLoadingOne> </div>
            }
        </div>
    );
};



export function IconParkOutlineLoadingOne(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 48 48" {...props}><path fill="none" stroke="orange" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24 4v4m10-1.32l-2 3.464M41.32 14l-3.464 2M44 24h-4m1.32 10l-3.464-2M34 41.32l-2-3.464M24 44v-4m-10 1.32l2-3.464M6.68 34l3.464-2M4 24h4M6.68 14l3.464 2M14 6.68l2 3.464"></path></svg>
    )
}

export default Product_Cart;
