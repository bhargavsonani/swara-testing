// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // import { backendUrl } from '../App';

// // const Add = ({ token }) => {
// //   const [name, setName] = useState('');
// //   const [address, setAddress] = useState('');
// //   const [gstno, setGstNo] = useState('');
// //   const [panno, setPanNo] = useState('');
// //   const [state, setState] = useState('');

// //   const onSubmitHandler = async (e) => {
// //     e.preventDefault();

// //     const loadingToastId = toast.loading("Adding creation...");
// //     try {
// //       const response = await axios.post(`${backendUrl}/creation/create`, {
// //         name,
// //         address,
// //         gstno,
// //         panno,
// //         state,
// //       }, {
// //         headers: {
// //           token,
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       toast.dismiss(loadingToastId);
// //       toast.success("Creation added successfully!");
// //       console.log("Response:", response.data);

// //       // Reset form
// //       setName('');
// //       setAddress('');
// //       setGstNo('');
// //       setPanNo('');
// //       setState('');
// //     } catch (error) {
// //       toast.dismiss(loadingToastId);
// //       console.error("Error adding creation:", error);
// //       toast.error("Failed to add creation!");
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
// //       <h2 className="text-2xl font-semibold mb-6 text-center">Add Creation</h2>
// //       <form onSubmit={onSubmitHandler} className="space-y-4">
// //         <div>
// //           <label className="block mb-1 font-medium">Name</label>
// //           <input
// //             type="text"
// //             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Address</label>
// //           <input
// //             type="text"
// //             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             value={address}
// //             onChange={(e) => setAddress(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">GST No</label>
// //           <input
// //             type="text"
// //             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             value={gstno}
// //             onChange={(e) => setGstNo(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">PAN No</label>
// //           <input
// //             type="text"
// //             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             value={panno}
// //             onChange={(e) => setPanNo(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">State</label>
// //           <input
// //             type="text"
// //             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             value={state}
// //             onChange={(e) => setState(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
// //         >
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Add;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { backendUrl } from '../App';

// const Add = ({ token }) => {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [gstno, setGstNo] = useState('');
//   const [panno, setPanNo] = useState('');
//   const [state, setState] = useState('');

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const loadingToastId = toast.loading("Adding creation...");
//     try {
//       const response = await axios.post(`${backendUrl}/creation/create`, {
//         name,
//         address,
//         gstno,
//         panno,
//         state,
//       }, {
//         headers: {
//           token,
//           'Content-Type': 'application/json',
//         },
//       });

//       toast.dismiss(loadingToastId);
//       toast.success("Creation added successfully!");
//       console.log("Response:", response.data);

//       // Reset form
//       setName('');
//       setAddress('');
//       setGstNo('');
//       setPanNo('');
//       setState('');
//     } catch (error) {
//       toast.dismiss(loadingToastId);
//       console.error("Error adding creation:", error);
//       toast.error("Failed to add creation!");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add Creation</h2>
//       <form onSubmit={onSubmitHandler} className="space-y-6">
//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Name</label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">Address</label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block mb-2 font-semibold text-gray-700">GST No</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               value={gstno}
//               onChange={(e) => setGstNo(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-semibold text-gray-700">PAN No</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//               value={panno}
//               onChange={(e) => setPanNo(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-2 font-semibold text-gray-700">State</label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Add;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Add = ({ token }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gstno, setGstNo] = useState('');
  const [panno, setPanNo] = useState('');
  const [state, setState] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Adding creation...");
    try {
      const response = await axios.post(`${backendUrl}/creation/create`, {
        name,
        address,
        email,
        gstno,
        panno,
        state,
      }, {
        headers: {
          token,
          'Content-Type': 'application/json',
        },
      });

      toast.dismiss(loadingToastId);
      toast.success("Creation added successfully!");
      console.log("Response:", response.data);

      // Reset form
      setName('');
      setAddress('');
      setEmail('');
      setGstNo('');
      setPanNo('');
      setState('');
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error("Error adding creation:", error);
      const errorMessage = error.response?.data?.message || "Failed to add creation!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Add Creation</h2>
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Address</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">GST No</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={gstno}
              onChange={(e) => setGstNo(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">PAN No</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={panno}
              onChange={(e) => setPanNo(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">State</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;