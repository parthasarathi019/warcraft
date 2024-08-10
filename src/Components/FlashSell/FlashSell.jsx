import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FlashSell = () => {
  const [mata, setmata] = useState([]);
  // console.log(data);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DataHost}/data`)
      .then((res) => res.json())
      .then((mata) => setmata(mata));
  }, []);

  const data = mata ? [...mata].reverse() : [];

  const [showAll, setShowAll] = useState(false);

  const handleToggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="w-full bg-white myContainer my-4 md:py-4 py-2 px-1 rounded-md">
      <h1 className="text-center text-3xl font-bold text-primaryColor1 capitalize my-4">
        Flash sell
      </h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
        {/* Card */}
        {data.map((product) => (
          <Link to={`Chackout/${product._id}`}>
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
                    product.Commission && <span className=" cursor-pointer"> -{product.Commission}%</span>
                  }
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlashSell;
