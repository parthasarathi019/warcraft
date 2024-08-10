import React from "react";

const Menu = () => {
  return (
    <section>
      <ul className="flex items-center  gap-2">
        <li className="relative group">
          <span className="text-xl font-semibold text-white cursor-pointer">
            Catagories
          </span>
          <div className="hidden absolute top-7 w-max bg-transparent  drop-shadow-md p-5 rounded-md group-hover:grid  group-hover:transition-all group-hover:duration-300 items-center grid-cols-4 gap-[20px] ">
           <div className=" grid grid-cols-10 gap-[20px] mt-3 p-5 bg-orange-500 text-white -ml-[28px] rounded-md">
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           <div className="">
              <p className="text-xl font-semibold cursor-pointer mb-1">shirt</p>
            </div>
           </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Menu;
