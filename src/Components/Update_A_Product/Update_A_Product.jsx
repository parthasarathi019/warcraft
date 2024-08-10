import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Update_A_Product = () => {
    const Loaded_Product_Data = useLoaderData()
    console.log(Loaded_Product_Data);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            data.Price = parseInt(data.Price, 10);
            data.Price_Without_Discount = parseInt(data.Price_Without_Discount, 10);
            data.Commission = parseInt(data.Commission, 10);

            if (data.Doc_1_PC[0]) {
                const formData = new FormData();
                formData.append("image", data.Doc_1_PC[0]);

                // Upload the image to ImgBB using axios
                const response = await axios.post(
                    "https://api.imgbb.com/1/upload",
                    formData,
                    {
                        params: {
                            key: "9a38563b80c5197bc652b9f720cb5b06",
                        },
                    }
                );

                // Update the data with the uploaded image URL
                data.Doc_1_PC = response.data.data.url;
                // console.log(response);
            } else {

                data.Doc_1_PC = Loaded_Product_Data?.Doc_1_PC || "";

            }
            if (data.Doc_2_PC[0]) {
                const formData = new FormData();
                formData.append("image", data.Doc_2_PC[0]);

                // Upload the image to ImgBB using axios
                const response = await axios.post(
                    "https://api.imgbb.com/1/upload",
                    formData,
                    {
                        params: {
                            key: "9a38563b80c5197bc652b9f720cb5b06",
                        },
                    }
                );

                // Update the data with the uploaded image URL
                data.Doc_2_PC = response.data.data.url;
                // console.log(response);
            } else {

                data.Doc_2_PC = Loaded_Product_Data?.Doc_2_PC || "";

            }
            if (data.Doc_3_PC[0]) {
                const formData = new FormData();
                formData.append("image", data.Doc_3_PC[0]);

                // Upload the image to ImgBB using axios
                const response = await axios.post(
                    "https://api.imgbb.com/1/upload",
                    formData,
                    {
                        params: {
                            key: "9a38563b80c5197bc652b9f720cb5b06",
                        },
                    }
                );

                // Update the data with the uploaded image URL
                data.Doc_3_PC = response.data.data.url;
                // console.log(response);
            } else {

                data.Doc_3_PC = Loaded_Product_Data?.Doc_3_PC || "";

            }

            // Make the axios PUT request
            const response = await axios.put(`https://invest-backend-inky.vercel.app/Product_Data/${Loaded_Product_Data?._id}`, data);

            if (response.status === 200) {
                // alert("User Updated Successfully !!!", { autoClose: 2000 });.

                Swal.fire({
                    title: "Success",
                    text: "Product Updated Successfully",
                    icon: "success"
                });
                navigate("/dashboard/Product_Control")
            }

        } catch (error) {
            console.log("Error uploading images:", error.message);
        }
    };


    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px] bg-slate-100 bg-gradient-to-r from-[#460eef] to-[#8d94d6] text-white mx-auto my-20 border-2 p-4 rounded-md shadow-md">
                    {/* <DashboardInfoText title={'Add New Product'} /> */}
                    <div className='flex gap-x-4'>
                        <section className='w-[50%] flex flex-col gap-y-[44px]'>
                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Product Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={Loaded_Product_Data?.Product_Name}
                                    {...register('Product_Name')}
                                    placeholder="Product Name"
                                    className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                                />
                            </div>

                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Brand Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={Loaded_Product_Data?.Brand_Name}
                                    {...register('Brand_Name')}
                                    placeholder="Brand Name"
                                    className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"

                                />
                            </div>

                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Product Code (If Available)
                                </label>
                                <input
                                    type="text"
                                    defaultValue={Loaded_Product_Data?.Product_Code}
                                    {...register('Product_Code')}
                                    placeholder="Product Code"

                                    className="form-input  w-full bg-[#fff] text-slate-600 py-3 rounded-md "

                                />
                            </div>
                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Price
                                </label>
                                <input
                                    type="number"
                                    defaultValue={Loaded_Product_Data?.Price}
                                    {...register('Price')}
                                    placeholder="Price"
                                    className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                                />
                            </div>
                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Price Without Discount
                                </label>
                                <input
                                    type="number"
                                    defaultValue={Loaded_Product_Data?.Price_Without_Discount}
                                    {...register('Price_Without_Discount')}
                                    placeholder="Price Without Discount"
                                    className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                                />
                            </div>
                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Commission
                                </label>
                                <input
                                    type="number"
                                    defaultValue={Loaded_Product_Data?.Commission}
                                    {...register('Commission')}
                                    placeholder="Commission (%)"
                                    className="form-input w-full  bg-[#fff] text-slate-600 py-3 rounded-md"
                                />
                            </div>

                        </section>
                        <section className='w-[50%]  flex flex-col gap-y-5'>
                            <div className="">
                                <label className="block mb-1 font-medium">Product Description</label>
                                <textarea
                                    {...register("Product_Description")}
                                    defaultValue={Loaded_Product_Data?.Product_Description}
                                    placeholder="Type Your Product Description"
                                    className="form-textarea w-full h-40 bg-[#fff] text-slate-600 py-3 rounded-md pl-5"
                                />
                            </div>



                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Available Sizes
                                </label>
                                <input
                                    type="text"
                                    {...register('Available_Size')}
                                    placeholder="Available Size"
                                    className="form-input  w-full bg-[#fff] text-slate-600 py-3 rounded-md "

                                />
                            </div>

                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Enter Color Variants
                                </label>
                                <input
                                    type="text"
                                    {...register('Color_Variants')}
                                    placeholder="Color Variants"
                                    className="form-input  w-full bg-[#fff] text-slate-600 py-3 rounded-md "

                                />
                            </div>

                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Product Picture 1
                                </label>
                                <input type="file" {...register('Doc_1_PC', { required: false })} className="file-input w-full  bg-[#fff] text-slate-600" />
                            </div>
                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Product Picture 2
                                </label>
                                <input type="file" {...register('Doc_2_PC', { required: false })} className="file-input w-full  bg-[#fff] text-slate-600" />
                            </div>
                            <div className="...">
                                <label className="block mb-1 font-medium">
                                    Product Picture 3
                                </label>
                                <input type="file" {...register('Doc_3_PC', { required: false })} className="file-input w-full  bg-[#fff] text-slate-600" />
                            </div>
                        </section>
                    </div>
                    <button type="submit" className="block w-full px-4 py-3 text-xl font-bold awesome-btn rounded-md  border-2 border-black bg-blue-950 hover:scale-105 duration-200 mt-3" >Add new Product</button>
                </form>
            </div>
        </>
    )
}

export default Update_A_Product