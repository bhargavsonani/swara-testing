// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const UpdateCreation = ({ token }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     name: "",
//     address: "",
//     email: "",
//     gstno: "",
//     panno: "",
//     state: "",
//   });

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/creation/singleCr/${id}`);
//       if (res.data.status) {
//         setData(res.data.data);
//       }
//     } catch {
//       toast.error("Fetch failed");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.put(
//         `${backendUrl}/creation/update/${id}`,
//         data,
//         { headers: { token } }
//       );

//       if (res.data.status) {
//         toast.success("Updated successfully");
//         navigate("/list");
//       }
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

//         {/* Heading */}
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Update Creation
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleUpdate} className="flex flex-col gap-4">

//           {/* Name */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Name</label>
//             <input
//               name="name"
//               value={data.name}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter name"
//               required
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Address</label>
//             <input
//               name="address"
//               value={data.address}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter address"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Email</label>
//             <input
//               name="email"
//               value={data.email || ""}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter email"
//             />
//           </div>

//           {/* GST */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">GST No</label>
//             <input
//               name="gstno"
//               value={data.gstno}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter GST number"
//               required
//             />
//           </div>

//           {/* PAN */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">PAN No</label>
//             <input
//               name="panno"
//               value={data.panno || ""}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter PAN number"
//             />
//           </div>

//           {/* State */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">State</label>
//             <input
//               name="state"
//               value={data.state}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter state"
//               required
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="mt-4 bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-md"
//           >
//             Update Creation
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateCreation;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UpdateCreation = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [data, setData] = useState({
    name: "",
    address: "",
    email: "",
    gstno: "",
    panno: "",
    state: "",
  });

  const fetchData = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${backendUrl}/creation/singleCr/${id}`);
      if (res.data.status) {
        setData(res.data.data);
      }
    } catch {
      toast.error("Fetch failed");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${backendUrl}/creation/update/${id}`,
        data,
        { headers: { token } }
      );
      if (res.data.status) {
        toast.success("Updated successfully");
        navigate("/list");
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text", placeholder: "Enter full name", required: true },
    { label: "Address", name: "address", type: "text", placeholder: "Enter address", required: true },
    { label: "Email", name: "email", type: "email", placeholder: "Enter email (optional)", required: false },
    { label: "GST No", name: "gstno", type: "text", placeholder: "e.g. 22ABCDE1234F1Z5", required: true },
    { label: "PAN No", name: "panno", type: "text", placeholder: "e.g. ABCDE1234F", required: false },
    { label: "State", name: "state", type: "text", placeholder: "Enter state", required: true },
  ];

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium tracking-wide">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />

          <div className="px-8 py-8">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate("/list")}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-all duration-200"
                title="Go back"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Update Creation</h2>
                <p className="text-slate-400 text-sm mt-0.5">Edit and save the details below</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdate} className="space-y-5">

              {/* 2-column grid for first 4 fields, full width for last 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {fields.slice(0, 4).map(({ label, name, type, placeholder, required }) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      {label}
                      {required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    <input
                      name={name}
                      type={type}
                      value={data[name] || ""}
                      onChange={handleChange}
                      required={required}
                      placeholder={placeholder}
                      className="w-full border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {fields.slice(4).map(({ label, name, type, placeholder, required }) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      {label}
                      {required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    <input
                      name={name}
                      type={type}
                      value={data[name] || ""}
                      onChange={handleChange}
                      required={required}
                      placeholder={placeholder}
                      className="w-full border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm"
                    />
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 pt-2" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/list")}
                  className="flex-1 py-2.5 px-6 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-emerald-300 disabled:to-teal-300 text-white text-sm font-semibold shadow-md hover:shadow-lg shadow-emerald-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Update Creation
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Fields marked with <span className="text-red-400 font-semibold">*</span> are required
        </p>

      </div>
    </div>
  );
};

export default UpdateCreation;