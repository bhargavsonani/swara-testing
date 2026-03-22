// // // // import axios from 'axios';
// // // // import React, { useEffect, useState } from 'react';
// // // // import { backendUrl } from '../App';
// // // // import { toast } from 'react-toastify';
// // // // import { useNavigate } from 'react-router-dom';

// // // // const List = ({ token }) => {
// // // //   const [list, setList] = useState([]);
// // // //   const navigate = useNavigate();

// // // //   const fetchList = async () => {
// // // //     try {
// // // //       const response = await axios.get(backendUrl + "/creation/getcr", {
// // // //         headers: { token }
// // // //       });
      
// // // //       if (response.data.status) {
// // // //         setList(response.data.data);
// // // //       } else {
// // // //         toast.error(response.data.message);
// // // //       }
// // // //     } catch (error) {
// // // //       console.log(error);
// // // //       toast.error("Failed to fetch creation list");
// // // //     }
// // // //   };

// // // //   const removeCreation = async (id) => {
// // // //     try {
// // // //       const response = await axios.delete(backendUrl + '/creation/remove/' + id, {
// // // //         headers: { token }
// // // //       });
// // // //       if (response.data.status) {
// // // //         toast.success("Creation removed successfully!");
// // // //         await fetchList();
// // // //       } else {
// // // //         toast.error(response.data.message);
// // // //       }
// // // //     } catch (error) {
// // // //       console.log(error);
// // // //       toast.error("Failed to remove creation");
// // // //     }
// // // //   };

// // // //   const handleCreateBill = (creationId, creationName) => {
// // // //     // Navigate to CreateBilling component with creation data
// // // //     navigate('/create-billing', { 
// // // //       state: { 
// // // //         creationId: creationId,
// // // //         creationName: creationName 
// // // //       } 
// // // //     });
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchList();
// // // //   }, []);

// // // //   return (
// // // //     <div className="p-2">
// // // //       <p className="mb-4 text-lg font-semibold">All Creation List</p>

// // // //       <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-medium">
// // // //         <span>Name</span>
// // // //         <span>Address</span>
// // // //         <span>GST No</span>
// // // //         <span>PAN No</span>
// // // //         <span className="text-center">Create Bill</span>
// // // //         <span className="text-center">Action</span>
// // // //       </div>

// // // //       <div className="flex flex-col gap-4">
// // // //         {list.map((item, index) => (
// // // //           <div
// // // //             key={index}
// // // //             className="flex flex-col md:grid md:grid-cols-[2fr_2fr_2fr_2fr_1fr_1fr] gap-2 py-2 px-3 border rounded-lg shadow-sm"
// // // //           >
// // // //             {/* Mobile layout */}
// // // //             <div className="flex md:hidden flex-col gap-2">
// // // //               <div className="flex justify-between items-start">
// // // //                 <div className="flex-1">
// // // //                   <p className="font-semibold">{item.name}</p>
// // // //                   <p className="text-xs text-gray-500">{item.address}</p>
// // // //                   <p className="text-xs text-gray-500">GST: {item.gstno}</p>
// // // //                   <p className="text-xs text-gray-500">PAN: {item.panno}</p>
// // // //                   <p className="text-xs text-gray-500">State: {item.state}</p>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="flex gap-2 mt-2">
// // // //                 <button
// // // //                   onClick={() => handleCreateBill(item._id, item.name)}
// // // //                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // // //                 >
// // // //                   Create Bill
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => removeCreation(item._id)}
// // // //                   className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // // //                 >
// // // //                   Delete
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* Desktop layout */}
// // // //             <p className="hidden md:block">{item.name}</p>
// // // //             <p className="hidden md:block text-sm">{item.address}</p>
// // // //             <p className="hidden md:block">{item.gstno}</p>
// // // //             <p className="hidden md:block">{item.panno}</p>
// // // //             <div className="hidden md:block text-center">
// // // //               <button
// // // //                 onClick={() => handleCreateBill(item._id, item.name)}
// // // //                 className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // // //               >
// // // //                 Create Bill
// // // //               </button>
// // // //             </div>
// // // //             <div className="hidden md:block text-center">
// // // //               <button
// // // //                 onClick={() => removeCreation(item._id)}
// // // //                 className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // // //               >
// // // //                 Delete
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default List;

// // // import axios from 'axios';
// // // import React, { useEffect, useState } from 'react';
// // // import { backendUrl } from '../App';
// // // import { toast } from 'react-toastify';
// // // import { useNavigate } from 'react-router-dom';

// // // const List = ({ token }) => {
// // //   const [list, setList] = useState([]);
// // //   const navigate = useNavigate();

// // //   const fetchList = async () => {
// // //     try {
// // //       const response = await axios.get(backendUrl + "/creation/getcr", {
// // //         headers: { token }
// // //       });
      
// // //       if (response.data.status) {
// // //         setList(response.data.data);
// // //         console.log(response.data.data);
// // //       } else {
// // //         toast.error(response.data.message);
// // //       }
// // //     } catch (error) {
// // //       console.log(error);
// // //       toast.error("Failed to fetch creation list");
// // //     }
// // //   };

// // //   const removeCreation = async (id) => {
// // //     try {
// // //       const response = await axios.delete(backendUrl + '/creation/remove/' + id, {
// // //         headers: { token }
// // //       });
// // //       if (response.data.status) {
// // //         toast.success("Creation removed successfully!");
// // //         await fetchList();
// // //       } else {
// // //         toast.error(response.data.message);
// // //       }
// // //     } catch (error) {
// // //       console.log(error);
// // //       toast.error("Failed to remove creation");
// // //     }
// // //   };

// // //   const handleCreateBill = (creationId, creationName) => {
// // //     // Navigate to CreateBilling component with creation data
// // //     navigate('/create-billing', { 
// // //       state: { 
// // //         creationId: creationId,
// // //         creationName: creationName 
// // //       } 
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     fetchList();
// // //   }, []);

// // //   return (
// // //     <div className="p-2">
// // //       <p className="mb-4 text-lg font-semibold">All Creation List</p>

// // //       <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-medium">
// // //         <span>Name</span>
// // //         <span>Address</span>
// // //         <span>Email</span>
// // //         <span>GST No</span>
// // //         <span>PAN No</span>
// // //         <span className="text-center">Create Bill</span>
// // //         <span className="text-center">Action</span>
// // //       </div>

// // //       <div className="flex flex-col gap-4">
// // //         {list.map((item, index) => (
// // //           <div
// // //             key={index}
// // //             className="flex flex-col md:grid md:grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] gap-2 py-2 px-3 border rounded-lg shadow-sm"
// // //           >
// // //             {/* Mobile layout */}
// // //             <div className="flex md:hidden flex-col gap-2">
// // //               <div className="flex justify-between items-start">
// // //                 <div className="flex-1">
// // //                   <p className="font-semibold">{item.name}</p>
// // //                   <p className="text-xs text-gray-500">{item.address}</p>
// // //                   <p className="text-xs text-gray-500">Email: {item.email || 'Not provided'}</p>
// // //                   <p className="text-xs text-gray-500">GST: {item.gstno}</p>
// // //                   <p className="text-xs text-gray-500">PAN: {item.panno}</p>
// // //                   <p className="text-xs text-gray-500">State: {item.state}</p>
// // //                 </div>
// // //               </div>
// // //               <div className="flex gap-2 mt-2">
// // //                 <button
// // //                   onClick={() => handleCreateBill(item._id, item.name)}
// // //                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // //                 >
// // //                   Create Bill
// // //                 </button>
// // //                 <button
// // //                   onClick={() => removeCreation(item._id)}
// // //                   className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Desktop layout */}
// // //             <p className="hidden md:block">{item.name}</p>
// // //             <p className="hidden md:block text-sm">{item.address}</p>
// // //             <p className="hidden md:block text-sm">{item.email}</p>
// // //             <p className="hidden md:block">{item.gstno}</p>
// // //             <p className="hidden md:block">{item.panno}</p>
// // //             <div className="hidden md:block text-center">
// // //               <button
// // //                 onClick={() => handleCreateBill(item._id, item.name)}
// // //                 className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // //               >
// // //                 Create Bill
// // //               </button>
// // //             </div>
// // //             <div className="hidden md:block text-center">
// // //               <button
// // //                 onClick={() => removeCreation(item._id)}
// // //                 className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// // //               >
// // //                 Delete
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // // export default List;





// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import { backendUrl } from '../App';
// // import { toast } from 'react-toastify';
// // import { useNavigate } from 'react-router-dom';

// // const List = ({ token }) => {
// //   const [list, setList] = useState([]);
// //   const [editModal, setEditModal] = useState(false);
// //   const [editData, setEditData] = useState({
// //     name: '', address: '', email: '', gstno: '', panno: '', state: ''
// //   });
// //   const [editId, setEditId] = useState(null);
// //   const [updating, setUpdating] = useState(false);
// //   const navigate = useNavigate();

// //   const fetchList = async () => {
// //     try {
// //       const response = await axios.get(backendUrl + "/creation/getcr", {
// //         headers: { token }
// //       });
// //       if (response.data.status) {
// //         setList(response.data.data);
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Failed to fetch creation list");
// //     }
// //   };

// //   const removeCreation = async (id) => {
// //     try {
// //       const response = await axios.delete(backendUrl + '/creation/remove/' + id, {
// //         headers: { token }
// //       });
// //       if (response.data.status) {
// //         toast.success("Creation removed successfully!");
// //         await fetchList();
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Failed to remove creation");
// //     }
// //   };

// //   // ─── Open Edit Modal & fetch single creation ───
// //   const handleEditClick = async (id) => {
// //     try {
// //       const response = await axios.get(backendUrl + '/creation/singleCr/' + id, {
// //         headers: { token }
// //       });
// //       if (response.data.status) {
// //         const { name, address, email, gstno, panno, state } = response.data.data;
// //         setEditData({ name, address, email: email || '', gstno, panno: panno || '', state });
// //         setEditId(id);
// //         setEditModal(true);
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Failed to fetch creation details");
// //     }
// //   };

// //   // ─── Submit Update ───
// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     setUpdating(true);
// //     try {
// //       const response = await axios.put(
// //         backendUrl + '/creation/update/' + editId,
// //         editData,
// //         { headers: { token } }
// //       );
// //       if (response.data.status) {
// //         toast.success("Creation updated successfully!");
// //         setEditModal(false);
// //         await fetchList();
// //       } else {
// //         toast.error(response.data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Failed to update creation");
// //     } finally {
// //       setUpdating(false);
// //     }
// //   };

// //   const handleCreateBill = (creationId, creationName) => {
// //     navigate('/create-billing', {
// //       state: { creationId, creationName }
// //     });
// //   };

// //   useEffect(() => {
// //     fetchList();
// //   }, []);

// //   return (
// //     <div className="p-2">
// //       <p className="mb-4 text-lg font-semibold">All Creation List</p>

// //       {/* ── Desktop Header ── */}
// //       <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-medium">
// //         <span>Name</span>
// //         <span>Address</span>
// //         <span>Email</span>
// //         <span>GST No</span>
// //         <span>PAN No</span>
// //         <span className="text-center">Create Bill</span>
// //         <span className="text-center">Edit</span>
// //         <span className="text-center">Action</span>
// //       </div>

// //       <div className="flex flex-col gap-4">
// //         {list.map((item, index) => (
// //           <div
// //             key={index}
// //             className="flex flex-col md:grid md:grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr_1fr] gap-2 py-2 px-3 border rounded-lg shadow-sm"
// //           >
// //             {/* ── Mobile Layout ── */}
// //             <div className="flex md:hidden flex-col gap-2">
// //               <div className="flex-1">
// //                 <p className="font-semibold">{item.name}</p>
// //                 <p className="text-xs text-gray-500">{item.address}</p>
// //                 <p className="text-xs text-gray-500">Email: {item.email || 'Not provided'}</p>
// //                 <p className="text-xs text-gray-500">GST: {item.gstno}</p>
// //                 <p className="text-xs text-gray-500">PAN: {item.panno}</p>
// //                 <p className="text-xs text-gray-500">State: {item.state}</p>
// //               </div>
// //               <div className="flex gap-2 mt-2">
// //                 <button
// //                   onClick={() => handleCreateBill(item._id, item.name)}
// //                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// //                 >
// //                   Create Bill
// //                 </button>
// //                 <button
// //                   onClick={() => handleEditClick(item._id)}
// //                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded transition duration-200"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => removeCreation(item._id)}
// //                   className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>

// //             {/* ── Desktop Layout ── */}
// //             <p className="hidden md:block">{item.name}</p>
// //             <p className="hidden md:block text-sm">{item.address}</p>
// //             <p className="hidden md:block text-sm">{item.email || '—'}</p>
// //             <p className="hidden md:block">{item.gstno}</p>
// //             <p className="hidden md:block">{item.panno || '—'}</p>
// //             <div className="hidden md:flex justify-center">
// //               <button
// //                 onClick={() => handleCreateBill(item._id, item.name)}
// //                 className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// //               >
// //                 Create Bill
// //               </button>
// //             </div>
// //             <div className="hidden md:flex justify-center">
// //               <button
// //                 onClick={() => handleEditClick(item._id)}
// //                 className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded transition duration-200"
// //               >
// //                 Edit
// //               </button>
// //             </div>
// //             <div className="hidden md:flex justify-center">
// //               <button
// //                 onClick={() => removeCreation(item._id)}
// //                 className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition duration-200"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* ══════════════════ EDIT MODAL ══════════════════ */}
// //       {editModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //           <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6">
// //             <div className="flex justify-between items-center mb-5">
// //               <h2 className="text-xl font-bold text-gray-800">Edit Creation</h2>
// //               <button
// //                 onClick={() => setEditModal(false)}
// //                 className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
// //               >
// //                 &times;
// //               </button>
// //             </div>

// //             <form onSubmit={handleUpdate} className="flex flex-col gap-4">
// //               {/* Name */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Name <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={editData.name}
// //                   onChange={(e) => setEditData({ ...editData, name: e.target.value })}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //                   placeholder="Enter name"
// //                 />
// //               </div>

// //               {/* Address */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Address <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={editData.address}
// //                   onChange={(e) => setEditData({ ...editData, address: e.target.value })}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //                   placeholder="Enter address"
// //                 />
// //               </div>

// //               {/* Email */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
// //                 <input
// //                   type="email"
// //                   value={editData.email}
// //                   onChange={(e) => setEditData({ ...editData, email: e.target.value })}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //                   placeholder="Enter email (optional)"
// //                 />
// //               </div>

// //               {/* GST No */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   GST No <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={editData.gstno}
// //                   onChange={(e) => setEditData({ ...editData, gstno: e.target.value })}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //                   placeholder="Enter GST number"
// //                 />
// //               </div>

// //               {/* PAN No */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">PAN No</label>
// //                 <input
// //                   type="text"
// //                   value={editData.panno}
// //                   onChange={(e) => setEditData({ ...editData, panno: e.target.value })}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //                   placeholder="Enter PAN number (optional)"
// //                 />
// //               </div>

// //               {/* State */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   State <span className="text-red-500">*</span>
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   value={editData.state}
// //                   onChange={(e) => setEditData({ ...editData, state: e.target.value })}
// //                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //                   placeholder="Enter state"
// //                 />
// //               </div>

// //               {/* Buttons */}
// //               <div className="flex gap-3 mt-2">
// //                 <button
// //                   type="button"
// //                   onClick={() => setEditModal(false)}
// //                   className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-100 py-2 rounded-lg text-sm transition"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={updating}
// //                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-semibold transition disabled:opacity-60"
// //                 >
// //                   {updating ? 'Updating...' : 'Update'}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default List;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const List = ({ token }) => {
//   const [list, setList] = useState([]);
//   const navigate = useNavigate();

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/creation/getcr", {
//         headers: { token }
//       });
      
//       if (response.data.status) {
//         setList(response.data.data);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch creation list");
//     }
//   };

//   const removeCreation = async (id) => {
//     try {
//       const response = await axios.delete(backendUrl + '/creation/remove/' + id, {
//         headers: { token }
//       });
//       if (response.data.status) {
//         toast.success("Creation removed successfully!");
//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to remove creation");
//     }
//   };

//   // ✅ ADDED FUNCTION
//   const handleUpdate = (id) => {
//     navigate(`/update-creation/${id}`);
//   };

//   const handleCreateBill = (creationId, creationName) => {
//     navigate('/create-billing', { 
//       state: { 
//         creationId: creationId,
//         creationName: creationName 
//       } 
//     });
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="p-2">
//       <p className="mb-4 text-lg font-semibold">All Creation List</p>

//       <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-medium">
//         <span>Name</span>
//         <span>Address</span>
//         <span>Email</span>
//         <span>GST No</span>
//         <span>PAN No</span>
//         <span className="text-center">Create Bill</span>
//         <span className="text-center">Action</span>
//       </div>

//       <div className="flex flex-col gap-4">
//         {list.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:grid md:grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] gap-2 py-2 px-3 border rounded-lg shadow-sm"
//           >
//             {/* Mobile */}
//             <div className="flex md:hidden flex-col gap-2">
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-xs">{item.address}</p>

//               <div className="flex gap-2 mt-2">
//                 <button
//                   onClick={() => handleCreateBill(item._id, item.name)}
//                   className="flex-1 bg-blue-600 text-white px-2 py-1 rounded"
//                 >
//                   Create Bill
//                 </button>

//                 {/* ✅ ADDED UPDATE */}
//                 <button
//                   onClick={() => handleUpdate(item._id)}
//                   className="flex-1 bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Update
//                 </button>

//                 <button
//                   onClick={() => removeCreation(item._id)}
//                   className="bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>

//             {/* Desktop */}
//             <p className="hidden md:block">{item.name}</p>
//             <p className="hidden md:block">{item.address}</p>
//             <p className="hidden md:block">{item.email}</p>
//             <p className="hidden md:block">{item.gstno}</p>
//             <p className="hidden md:block">{item.panno}</p>

//             <div className="hidden md:block text-center">
//               <button
//                 onClick={() => handleCreateBill(item._id, item.name)}
//                 className="bg-blue-600 text-white px-2 py-1 rounded"
//               >
//                 Create Bill
//               </button>
//             </div>

//             {/* ✅ UPDATED ACTION */}
//             <div className="hidden md:flex gap-2 justify-center">
//               <button
//                 onClick={() => handleUpdate(item._id)}
//                 className="bg-green-600 text-white px-2 py-1 rounded"
//               >
//                 Update
//               </button>

//               <button
//                 onClick={() => removeCreation(item._id)}
//                 className="bg-red-600 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default List;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/creation/getcr", {
        headers: { token }
      });
      if (response.data.status) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch creation list");
    } finally {
      setLoading(false);
    }
  };

  const removeCreation = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/creation/remove/' + id, {
        headers: { token }
      });
      if (response.data.status) {
        toast.success("Creation removed successfully!");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to remove creation");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-creation/${id}`);
  };

  const handleCreateBill = (creationId, creationName) => {
    navigate('/create-billing', {
      state: { creationId, creationName }
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">

      {/* ── Page Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Creation List</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all your creations below</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          {list.length} record{list.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Loading State ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400 tracking-wide">Loading creations...</p>
          </div>
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm font-medium">No creations found</p>
        </div>
      ) : (
        <>
          {/* ── Desktop Table Header ── */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] items-center py-3 px-5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
            <span>Name</span>
            <span>Address</span>
            <span>Email</span>
            <span>GST No</span>
            <span>PAN No</span>
            <span className="text-center">Create Bill</span>
            <span className="text-center">Actions</span>
          </div>

          {/* ── Rows ── */}
          <div className="flex flex-col gap-3">
            {list.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200"
              >

                {/* ── Mobile Layout ── */}
                <div className="flex md:hidden flex-col gap-3 p-4">
                  <div>
                    <p className="font-semibold text-slate-800 text-base">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-500">
                    <span><span className="font-medium text-slate-600">Email:</span> {item.email || '—'}</span>
                    <span><span className="font-medium text-slate-600">GST:</span> {item.gstno}</span>
                    <span><span className="font-medium text-slate-600">PAN:</span> {item.panno || '—'}</span>
                    <span><span className="font-medium text-slate-600">State:</span> {item.state}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleCreateBill(item._id, item.name)}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      Create Bill
                    </button>
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => removeCreation(item._id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* ── Desktop Layout ── */}
                <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr_1fr] items-center px-5 py-4 gap-2">
                  <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                  <p className="text-sm text-slate-500 truncate">{item.address}</p>
                  <p className="text-sm text-slate-500 truncate">{item.email || '—'}</p>
                  <p className="text-sm text-slate-600 font-mono truncate">{item.gstno}</p>
                  <p className="text-sm text-slate-600 font-mono truncate">{item.panno || '—'}</p>

                  <div className="flex justify-center">
                    <button
                      onClick={() => handleCreateBill(item._id, item.name)}
                      className="bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-200 hover:border-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                      Create Bill
                    </button>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="bg-amber-50 hover:bg-amber-500 hover:text-white text-amber-600 border border-amber-200 hover:border-amber-500 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeCreation(item._id)}
                      className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 border border-red-200 hover:border-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;