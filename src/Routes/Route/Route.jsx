import { Outlet, createBrowserRouter } from "react-router-dom";
import MainPage from "../../Layout/MainPage";
import DashboardLayout from "../../Layout/DashboardLayout";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import Contact from "../../Pages/Contact/Contact";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Chackout from "../../Components/Chackout/Chackout";
import Buy_Now from "../../Components/Buy_Now/Buy_Now";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Orders from "../../Components/Orders/Orders";
import Product_Control from "../../Components/Product_Control/Product_Control";
import Product_Cart from "../../Components/Product_Cart/Product_Cart";
import Dashboard from "../../Dashboard/Dashboard";
import Privacy_Policy from "../../Components/Policy/Privacy_Policy";
import T_and_C from "../../Components/Policy/T_and_C";
import Return_Policy from "../../Components/Policy/Return_Policy";
import Refand_Policy from "../../Components/Policy/Refand_Policy";
import Update_A_Product from "../../Components/Update_A_Product/Update_A_Product";
import CountdownButton from "../../Components/CountdownButton/CountdownButton";
import CountdownTimer from "../../Components/CountdownTimer/CountdownTimer";
import CategoryProducts from "../../Components/CategoryProducts/CategoryProducts";
import Add_Catagory from "../../Components/Add_Catagory/Add_Catagory";
import Not_Found_Website from "../../Components/Not_Found_Website/Not_Found_Website";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage /> ,
    // element: <> <Outlet></Outlet> </> ,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://invest-backend-inky.vercel.app/data")
      },
      // {
      //   path: "/",
      //   element: <Not_Found_Website />,
      // },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/Product_Cart",
        element: <Product_Cart />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Privacy_Policy",
        element: <Privacy_Policy />,
      },
      {
        path: "/T_and_C",
        element: <T_and_C />,
      },
      {
        path: "/Return_Policy",
        element: <Return_Policy />,
      },
      {
        path: "/Refand_Policy",
        element: <Refand_Policy />,
      },
      {
        path: "/CountdownButton",
        element: <CountdownButton />,
      },
      {
        path: "/CountdownTimer",
        element: <CountdownTimer />,
      },
      {
        path: "/Not_Found_Website",
        element: <Not_Found_Website />,
      },

      {
        path: "/category/:categoryName",
        element: <CategoryProducts />,
      },

      {
        path: "/Chackout/:_id",
        element: (
       
            <Chackout />
       
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_DataHost}/data/${params._id}`),
      },

      {
        path: "/shipping/:_id",
        element: (
          <PrivateRoute>
            <Buy_Now></Buy_Now>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_DataHost}/data/${params._id}`),
      },
    ],
  },
  {
    path: "/Update_A_Product/:id",
    element: (<Update_A_Product></Update_A_Product>),
    loader: ({ params }) => fetch(`https://invest-backend-inky.vercel.app/data/${params.id}`)
  },


  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
        {/* <Outlet></Outlet> */}
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: () => fetch(`https://invest-backend-inky.vercel.app/Get_Number`)
      },
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/Product_Control",
        element: <Product_Control></Product_Control>,
      },
      {
        path: "/dashboard/Add_Catagory",
        element: <Add_Catagory></Add_Catagory>,
      }
    ]
  },



]);



