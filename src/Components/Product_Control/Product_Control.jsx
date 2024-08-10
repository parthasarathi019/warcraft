//eslint-disable-next-line
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const Product_Control = () => {
    //eslint-disable-next-line
    const [Moookings, seMoookings] = useState([])
    const url = (`https://invest-backend-inky.vercel.app/data`)
    useEffect(() => {
        fetch(url)

            .then(res => res.json())
            .then((data) => {
                seMoookings(data);
            })
    }, [])
    const Boookings = Moookings ? [...Moookings].reverse() : [];

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

                fetch(`https://invest-backend-inky.vercel.app/data/${_id}`, { method: "DELETE" },

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
        <div>
            <div className="overflow-x-auto w-full md:pl-4">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Details</th>
                            <th>Price Details</th>
                            <th>Edit</th>
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
                                                <img src={Product.Doc_1_PC || Product.Doc_2_PC || Product.Doc_2_PC} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div className='max-w-[250px] text-justify'>
                                            <div className="font-bold">{Product.Product_Name}</div>
                                            <div className="text-sm opacity-50">{Product.Brand_Name}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>
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
                                    <button className="btn btn-primary"><Link to={`/Update_A_Product/${Product._id}`}>Update</Link></button>
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

export default Product_Control;
