import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/Logos.png";
import logo_M from "../../../assets/Logos.png";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);

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
    fetch('https://invest-backend-inky.vercel.app/Catagory_List')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  

  return (
    <>
      <div className=" flex items-center md:hidden justify-between px-3">
        <Link to="/">
          <div className="">
            <img src={logo_M} alt="logo" className="w-[150px] h-[25px]" />
          </div>
        </Link>
        <div className="mx-[100px] mt-[50px]">
         
        </div>
        <div className="pr-2">
          {" "}
          {/* cart  */}
          <Link to='/Product_Cart'>
            <div className="flex">
              <FiShoppingCart className="text-[18px]  text-[#f85606] hover:bg-black/10  cursor-pointer rounded-md" />
              <p className="text-[10px] -mt-[11px]"><span className="border-[1px] border-orange-500 rounded-full pt-[1px] px-[2px]">{data_Home.length}</span></p>
            </div>
          </Link>
        </div>
        {/* ---- */}
        <div>
          {/* Create Profile Drop Down */}
          {user ? (
            <div className="flex justify-center items-center gap-3 ml-2">
              <img
                src={user.photoURL}
                alt=""
                className="rounded-full-ex cursor-pointer "
                onClick={toggleDropdown}
              />

              <button onClick={handleLogOut}><IcTwotoneLogIn></IcTwotoneLogIn></button>
            </div>
          ) : (
            <div  onClick={toggleDropdown}><OcticonSignIn16></OcticonSignIn16></div>
          )}
          {isDropdownOpen && (
            <div className="absolute top-10 right-0 bg-white rounded-md shadow-md p-2 z-50 w-32">
              <ul className="space-y-2">
                {user ? (
                  <>
                    <li className="pt-2">
                      <Link to="/profile">Profile</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="pt-2">
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* navbar  */}
      <nav className="bg-[#00324a] w-full py-4 sticky top-0 left-0 hidden  z-30  md:block">
        <div className="myContainer">
          <div className="flex items-center justify-between gap-3">
            {/* logo */}
            <Link to="/">
              <div className="">
                <img src={logo} alt="logo" className="w-[157px] h-[45px]" />
              </div>
            </Link>

            {/* nav menu  */}

            <section>
     
    </section>

            {/* search bar  */}
         
            {/* profile */}
            <div className="flex items-center gap-2 font-semibold text-whiteText  capitalize ">
              {user ? (
                <div className="flex justify-center items-center gap-2">
                  <button onClick={handleLogOut}>Logout</button>
                  <img
                    src={user.photoURL}
                    alt=""
                    width={25}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  {/* login  */}
                  <Link
                    to="/login"
                    className="flex items-center  gap-1 text-lg font-semibold text-whiteText hover:bg-black/10  cursor-pointer p-2 rounded-md"
                  >
                    <FaRegUser className="text-xl" />
                    <span>login</span>
                  </Link>

                  {/* sign up  */}
                  <Link to="/register">
                    {" "}
                    <p className=" text-whiteText hover:bg-black/10  cursor-pointer p-2 rounded-md">
                      Sign up
                    </p>{" "}
                  </Link>
                </div>
              )}

 {/* cart  */}
 <Link to='/Product_Cart'>
                <div className="flex">
                  <FiShoppingCart className="text-4xl  text-whiteText hover:bg-black/10  cursor-pointer p-2 rounded-md" />
                  <p className="text-[14px] -ml-[7px]"><span className="border-[1px] border-white rounded-full pt-[2px] px-1 ">{data_Home.length}</span></p>
                </div>
              </Link>
            
            </div>
          </div>
        </div>
      </nav>
    </>
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
export default Header;


