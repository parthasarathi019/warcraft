import React, { useEffect, useState, useContext } from "react";
import ServiceGuearanty from "../../Components/ServiceGuarenty/ServiceGuearenty";
import Slider from "../../Components/Slider/Slider";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import  Imgs from "../../assets/our_Partnert_8_Aug_2024__1_47_AM.png";



const FlashSell = () => {


  const Loaded_Drones = useLoaderData()
  const [data ,setTotalDate] = useState(Loaded_Drones)
  const [searchText, setSearchText] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [categories, setCategories] = useState([]);


  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  const handleSearch = () => {
    const capitalizedSearchText = capitalizeFirstLetter(searchText);

    fetch(`https://server-side-zeta-ivory.vercel.app/searchText/${capitalizedSearchText}`)
    .then(res => res.json())
    .then(data => {
      setTotalDate(data);
      setShowSearchResults(true);
    })
  }
  const data_Reverse = data ? [...data].reverse() : [];

  const handleBackToHome = () => {
    setTotalDate(Loaded_Drones);
    setShowSearchResults(false);
  };


  const [showAll, setShowAll] = useState(false);
  const handleToggleShow = () => {
    setShowAll(!showAll);
  };






  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [data_Home, setData] = useState([]);
  const fetchData = () => {
    fetch(`${import.meta.env.VITE_DataHost}/ProductAddToCart?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((data_Home) => setData(data_Home))
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

  const handleLogOut = () => {
    logOut();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  



  useEffect(() => {
    // Fetch data from the provided link
    fetch('https://server-side-zeta-ivory.vercel.app/Catagory_List')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
  <div>


         <Slider />
        <ServiceGuearanty />
      <div className="w-full bg-white  my-4 md:py-4 py-2 px-1 rounded-md">
      <h1 className="text-center text-3xl font-bold text-primaryColor1 capitalize my-4">
        Our Plan
      </h1>
     

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
        {/* Card */}
        {data_Reverse.map((product) => (
          <Link to={`shipping/${product._id}`}>
            <div className="cursor-pointer rounded-md p-3 hover:-translate-y-2 transition-transform duration-300" key={product._id.$oid}>
              <img
                src={product.Doc_1_PC || product.Doc_2_PC || product.Doc_3_PC} // Assuming you want to display the first image
                alt="flash sell"
                className=" mx-auton  rounded-[4px]"
              />

             
            </div>
          </Link>
        ))}
      </div>
<div><img className="px-3 h-[193px] md:h-full rounded-[16px]" src={Imgs} alt="" /></div>
    </div>

  </div>
  );
};


export function MemoryLogin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5 1h12v1h1v18h-1v1H5v-1H4v-6h2v5h10V3H6v5H4V2h1V1m3 5h2v1h1v1h1v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1H8v-2h1v-1h1v-1H2v-2h8V9H9V8H8V6Z"
      ></path>
    </svg>
  );
}


export function IcTwotoneLogIn(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M9 2h9c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-2h2v2h9V4H9v2H7V4c0-1.1.9-2 2-2"></path><path fill="currentColor" d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67z"></path></svg>
  )
}



export function OcticonSignIn16(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="currentColor" d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm6.56 4.5h5.69a.75.75 0 0 1 0 1.5H8.56l1.97 1.97a.749.749 0 0 1-.326 1.275a.749.749 0 0 1-.734-.215L6.22 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.749.749 0 0 1 1.275.326a.749.749 0 0 1-.215.734Z"></path></svg>
  )
}
export default FlashSell;

