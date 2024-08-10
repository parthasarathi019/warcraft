import React, { useState, useEffect } from 'react';
import Header from '../Components/SharedComponents/Header/Header';
import Footer from '../Components/SharedComponents/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/Mobile_Logo.png'

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const delay = 1000;

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
    
          
            <Header />
            <div className=''>
              <Outlet></Outlet>
            </div>
            <Footer />
          
      

    </>
  );
};

export default MainPage;


// import { useNavigate, useLocation } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import Header from '../Components/SharedComponents/Header/Header';
// import Footer from '../Components/SharedComponents/Footer/Footer';
// import { Outlet } from 'react-router-dom';
// import Logo from '../assets/Mobile_Logo.png'
// const MainPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check if the current route is the Home route
//   const isHomeRoute = location.pathname === '/';

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading for 3 seconds
//     const delay = 200;

//     const timeoutId = setTimeout(() => {
//       setIsLoading(false);
//     }, delay);

//     // Clean up the timeout to avoid memory leaks
//     return () => clearTimeout(timeoutId);
//   }, []); // Empty dependency array ensures this effect runs only once

//   return (
//     <div className=''>
//       {isLoading ? (
//         <div className='flex justify-center items-center h-screen'><img className='w-[50px] animate-ping' src={Logo} alt="" /></div>
//       ) : (
//         <>
//           {!isHomeRoute && <Header />}
//           <div className=''>
//             <Outlet />
//             {!isHomeRoute && <Footer />}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MainPage;

