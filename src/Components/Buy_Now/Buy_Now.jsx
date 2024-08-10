import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";
import axios from "axios";
import { useCounter } from "../../../Hooks/CounterContext";

const Buy_Now = () => {
/////////////////////////////////////////////////////////////////////////////
// this is only for show the pymebt numbers
  const [mata, setmata] = useState([]);
  // console.log(data);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DataHost}/Get_Number`)
      .then((res) => res.json())
      .then((mata) => setmata(mata));
  }, []);
  ///////////////////////////////////////////////////////////////////////////



  const { counter } = useCounter();
  const data = useLoaderData();
  const { _id, Product_Name, Price, Doc_1_PC } = data;
  const { user, loading } = useContext(AuthContext);

  const [deliveryOption, setDeliveryOption] = useState("DJI");
  // const [counter, setQuantity] = useState(1);
  const generateRandomNumber = () => {
    return (Math.floor(Math.random() * 10000000000) + 1).toString();
  };
  const [formData, setFormData] = useState({
    YourName: "",
    YourMobileNumber: "",
    T_Method: "",
    YourEmail: "",
    T_ID: "",
    Is_orderd: "Orderd",
    Product_id: _id,
    // counter: "",
    UserEmail: user?.email,
    userEmail: user?.email,
    PiC: Doc_1_PC ,
    Product_Name,
    Price,
    purseDate : new Date().getTime(),
    Iscanceled : "No",
    Status : "Pending",
    random_number: generateRandomNumber()
  });

  const handleDeliveryChange = (e) => {
    setDeliveryOption(e.target.value);
  };



  // const handleQuantity = (e) => {
  //   setQuantity(e.target.value);
  // };


  const handleQuantity = (e) => {
    const newQuantity = Math.max(0, parseInt(e.target.value, 10));

    if (newQuantity === 0) {
      // Show SweetAlert notification for zero counter
      Swal.fire({
        icon: 'warning',
        title: 'Invalid counter',
        text: 'counter cannot be zero.',
      });
    } else if (newQuantity < 0) {
      // Show SweetAlert notification for negative counter
      Swal.fire({
        icon: 'warning',
        title: 'Invalid counter',
        text: 'counter cannot be a negative value.',
      });
    } else {
      setQuantity(newQuantity);
    }
  };

  const calculateTotal = () => {
    const deliveryCharge = deliveryOption === "DJI" ? 60 : 120;
    return (Price * counter) + deliveryCharge;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.UserEmail) {
      console.error("UserEmail is undefined. Form submission aborted.");
      return;
    }

    const totalPrice = calculateTotal();

    const orderData = {
      ...formData,
      DeliveryCharge: deliveryOption === "DJI" ? 60 : 120,
      TotalPrice: totalPrice,
      Quantity: counter,
    };

    try {
      const responsePurchase = await axios.post(
        `${import.meta.env.VITE_DataHost}/ProductPurchase`,
        orderData
      );

      const responseAddToCart = await axios.post(
        `${import.meta.env.VITE_DataHost}/ProductAddToCart`,
        orderData
      );

      Swal.fire({
        title: "Order Successful!",
        text: "Thank you for your order. We will process it soon.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error submitting order:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to submit order. Please try again later.",
        icon: "error",
      });
    }

  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="md:max-w-[1220px] mx-auto px-2 md:px-0 pt-5 md:pt-0">
      <form onSubmit={handleFormSubmit}>
        <section className="flex flex-col md:flex-row justify-between md:gap-x-4 gap-y-5">
          <section className="md:w-[50%] bg-slate-0 md:p-4 bg-white">
            <p className="text-center text-[18px] pt-7 pb-3">
              To confirm the order, make the payment on the
              <span className="text-primaryColor1"> numbers</span> given below
            </p>
            <section className="border-[2px] border-black flex flex-col gap-y-3 justify-center items-center mb-7">
              <p className="font-bold text-[20px] text-red-600">BKASH - {mata[0]?.Bkash}      </p>
              <p className="font-bold text-[20px] text-red-600">NAGAD - {mata[0]?.Nagad}      </p>
              <p className="font-bold text-[20px] text-red-600">BINANCE - {mata[0]?.Binance}      </p>
            </section>
            <section className="flex flex-col gap-y-4">
              <div>
                <p className="pl-[5px]">Your Name</p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter Your Name"
                  type="text"
                  required
                  name="YourName"
                  value={formData.YourName}
                  onChange={handleInputChange}
                />
              </div>
            
              <div>
                <p className="pl-[5px]">Your Email </p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter Your Email"
                  type="text"

                  name="YourEmail"
                  value={user?.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <p className="pl-[5px]">Payment Amount</p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter the number of money, you paid"
                  type="text"
                  required
                  name="YourMobileNumber"
                  value={formData.YourMobileNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="pl-[5px]">Payment Method</p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter Payment Method"
                  type="text"
                  required
                  name="T_Method"
                  value={formData.T_Method}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="pl-[5px]">Transaction ID</p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter Transaction ID"
                  type="text"
                  required
                  name="T_ID"
                  value={formData.T_ID}
                  onChange={handleInputChange}
                />
              </div>

            
              <input
                type="submit"
                value="Purchase Now"
                className="w-full py-3 bg-orange-500 btn hover:bg-orange-300 rounded-[3px] cursor-pointer"
              />
            </section>
          </section>
          <section className="md:w-[50%] bg-white md:p-4 md:pt-0 py-4 md:py-0">
            <p className="text-[18px] text-center md:text-left">Your Plan</p>
            <div className="flex justify-between items-center pt-5 md:gap-x-4 gap-x-2">
              <div className="w-[20%]">
                <img
                  className="w-[90px] h-[60px] md:w-[80px] md:h-[80px] rounded-[2px]"
                  src={Doc_1_PC}
                  alt=""
                />
              </div>
              <div className="w-[70%] font-serif text-[10.5px] md:text-[14px]">
                {Product_Name}
              </div>
              <div className="w-[10%] text-right">
                <p>USD</p> <p>{Price}</p>
              </div>
            </div>
            <hr className="mt-3 border-t-2" />
            <div className="flex gap-y-2 flex-col mt-10">
              <div className="flex justify-between">
                <p className="font-bold">Subtototal:</p>
                <p className="font-bold">
                  <span className="font-semibold">$</span> {Price}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Activition Fees:</p>
                <p className="font-bold text-orange-600">
                 
                  Free
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-[18px]">Total:</p>
                <p className="font-bold text-[19.2px]">$ {Price}</p>
              </div>
            </div>
          </section>
        </section>
      </form>
    </div>
  );
};

export default Buy_Now;
