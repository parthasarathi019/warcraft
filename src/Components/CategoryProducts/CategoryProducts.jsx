import React, { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`https://invest-backend-inky.vercel.app/api/products/${categoryName}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [categoryName]);

    const [showAll, setShowAll] = useState(false);

    const handleToggleShow = () => {
      setShowAll(!showAll);
    };
  return (
   <>
{
   products.length > 0 ? 

   <div className="w-full bg-white myContainer my-4 md:py-4 py-2 px-1 rounded-md">
   <h1 className="text-center text-3xl font-bold text-primaryColor1 capitalize my-4">
   {categoryName} {/* Products */}
   </h1>
   <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
     {/* Card */}
     {products.map((product) => (
       <Link to={`/Chackout/${product._id}`}>
         <div className="cursor-pointer h-[23em] rounded-md p-3 shadow-md hover:-translate-y-2 transition-transform duration-300" key={product._id.$oid}>
           <img
             src={product.Doc_1_PC || product.Doc_2_PC || product.Doc_3_PC} // Assuming you want to display the first image
             alt="flash sell"
             className="w-[10rem] h-[12em] mx-auto mb-2 rounded-[2px]"
           />

           <div className="space-y-2  cursor-pointer">
             <div>
               <h3 className="text-[12.2px] md:text-normal text-justify">
                 {showAll ? product.Product_Name : product.Product_Name.slice(0, 77)}
                 {product.Product_Name.length > 69 && (
                   <span
                     style={{ color: 'orange', cursor: 'pointer', fontWeight: "bold" }}
                   // onClick={() => setShowAll(!showAll)}
                   >
                     {showAll ? ' Show Less' : ' Show More...'}
                   </span>
                 )}
               </h3>
             </div>

             <h2 className="text-primaryColor1 text-[18px] md:text-xl cursor-pointer font-semibold">
               ট{product.Price}{" "}
             </h2>
             <p className="text-lg">
               <span className="line-through text-slate-400 cursor-pointer">
                 {product.Price_Without_Discount}
               </span>
               {
                 product.Commission && <span className=" cursor-pointer"> - {product.Commission}%</span>
               }
             </p>
           </div>
         </div>
       </Link>
     ))}
   </div>
    <Link to = "/"><div className="flex justify-center pt-4"> <button className=" btn bg-orange-500 rounded-[4px] px-7 hover:bg-orange-400" >Back to Home</button></div></Link>

 </div> :  <div className="flex justify-center animate-spin p-11"> <IconParkOutlineLoadingOne></IconParkOutlineLoadingOne> </div>
}
   </>
  )
}

export function IconParkOutlineLoadingOne(props) {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 48 48" {...props}><path fill="none" stroke="orange" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24 4v4m10-1.32l-2 3.464M41.32 14l-3.464 2M44 24h-4m1.32 10l-3.464-2M34 41.32l-2-3.464M24 44v-4m-10 1.32l2-3.464M6.68 34l3.464-2M4 24h4M6.68 14l3.464 2M14 6.68l2 3.464"></path></svg>
  )
}
export default CategoryProducts