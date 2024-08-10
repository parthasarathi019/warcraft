// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// function App() {
//   const { register, handleSubmit } = useForm();
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('https://invest-backend-inky.vercel.app/api/categories');
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       // Your form submission logic
//       console.log('Form data:', data);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="...">
//           <label className="block mb-1 font-medium">
//             Select Product Category
//           </label>
//           <select
//   {...register('Product_Category')}
//   className="form-select w-full bg-[#fff] text-slate-600 py-3 rounded-md"
// >
//   {categories.map((category) => (
//     <option key={category._id} value={category.Catagory}>
//       {category.Catagory}
//     </option>
//   ))}
// </select>
//         </div>
//         {/* ... (other form fields) */}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;
import React from 'react'

const About = () => {
  return (
    <div>
      
    </div>
  )
}

export default About
