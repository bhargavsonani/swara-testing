// import { backendUrl } from '../App'

// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronRight, Download, Trash2, FileText, Building, MapPin, Hash, CreditCard, Calendar } from 'lucide-react';

// const CreationData = () => {
//   const [creations, setCreations] = useState([]);
//   const [expandedCreations, setExpandedCreations] = useState(new Set());
//   const [creationPDFs, setCreationPDFs] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [loadingPDFs, setLoadingPDFs] = useState(new Set());

//   // Base API URL - adjust this to match your backend
//   // Update this to your actual API base URL

//   // Fetch all creations on component mount
//   useEffect(() => {
//     fetchAllCreations();
//   }, []);

//   const fetchAllCreations = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${backendUrl}/creation/getcr`);
//       const data = await response.json();
      
//       if (data.status && data.data) {
//         setCreations(data.data);
//       } else {
//         setError('Failed to fetch creations');
//       }
//     } catch (err) {
//       console.error('Error fetching creations:', err);
//       setError('Error connecting to server');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCreationPDFs = async (creationId) => {
//     if (creationPDFs[creationId]) {
//       return; // Already fetched
//     }

//     try {
//       setLoadingPDFs(prev => new Set([...prev, creationId]));
//       const response = await fetch(`${backendUrl}/pdf/creation/${creationId}`);
//       const data = await response.json();
      
//       if (data.status && data.data) {
//         setCreationPDFs(prev => ({
//           ...prev,
//           [creationId]: data.data
//         }));
//       } else {
//         setCreationPDFs(prev => ({
//           ...prev,
//           [creationId]: []
//         }));
//       }
//     } catch (err) {
//       console.error('Error fetching PDFs:', err);
//       setCreationPDFs(prev => ({
//         ...prev,
//         [creationId]: []
//       }));
//     } finally {
//       setLoadingPDFs(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(creationId);
//         return newSet;
//       });
//     }
//   };

//   const toggleCreationExpansion = async (creationId) => {
//     const newExpanded = new Set(expandedCreations);
    
//     if (newExpanded.has(creationId)) {
//       newExpanded.delete(creationId);
//     } else {
//       newExpanded.add(creationId);
//       // Fetch PDFs when expanding
//       await fetchCreationPDFs(creationId);
//     }
    
//     setExpandedCreations(newExpanded);
//   };

//   const downloadPDF = async (pdfId, fileName) => {
//     try {
//       const response = await fetch(`${backendUrl}/pdf/download/${pdfId}`);
      
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//       } else {
//         alert('Failed to download PDF');
//       }
//     } catch (err) {
//       console.error('Error downloading PDF:', err);
//       alert('Error downloading PDF');
//     }
//   };

//   const deletePDF = async (pdfId, creationId) => {
//     if (!window.confirm('Are you sure you want to delete this PDF?')) {
//       return;
//     }

//     try {
//       const response = await fetch(`${backendUrl}/pdf/delete/${pdfId}`, {
//         method: 'DELETE'
//       });
      
//       const data = await response.json();
      
//       if (data.status) {
//         // Refresh PDFs for this creation
//         setCreationPDFs(prev => ({
//           ...prev,
//           [creationId]: prev[creationId].filter(pdf => pdf._id !== pdfId)
//         }));
//         alert('PDF deleted successfully');
//       } else {
//         alert('Failed to delete PDF');
//       }
//     } catch (err) {
//       console.error('Error deleting PDF:', err);
//       alert('Error deleting PDF');
//     }
//   };

//   const deleteCreation = async (creationId) => {
//     if (!window.confirm('Are you sure you want to delete this creation? This will also delete all associated PDFs.')) {
//       return;
//     }

//     try {
//       const response = await fetch(`${backendUrl}/creation/remove/${creationId}`, {
//         method: 'DELETE'
//       });
      
//       const data = await response.json();
      
//       if (data.status) {
//         setCreations(prev => prev.filter(creation => creation._id !== creationId));
//         setCreationPDFs(prev => {
//           const newPDFs = { ...prev };
//           delete newPDFs[creationId];
//           return newPDFs;
//         });
//         setExpandedCreations(prev => {
//           const newExpanded = new Set(prev);
//           newExpanded.delete(creationId);
//           return newExpanded;
//         });
//         alert('Creation deleted successfully');
//       } else {
//         alert('Failed to delete creation');
//       }
//     } catch (err) {
//       console.error('Error deleting creation:', err);
//       alert('Error deleting creation');
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown';
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(1024));
//     return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <div className="flex">
//           <div className="text-red-800">
//             <h3 className="text-lg font-medium">Error</h3>
//             <p className="mt-1">{error}</p>
//             <button 
//               onClick={fetchAllCreations}
//               className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Creation Management</h1>
//         <p className="text-gray-600">Manage your creations and their associated PDF invoices</p>
//       </div>

//       {creations.length === 0 ? (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
//           <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No Creations Found</h3>
//           <p className="text-gray-600">Create your first business profile to get started.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {creations.map((creation) => (
//             <div key={creation._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//               {/* Creation Header */}
//               <div className="p-6 border-b border-gray-200 bg-gray-50">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={() => toggleCreationExpansion(creation._id)}
//                       className="flex items-center space-x-2 text-left hover:bg-gray-100 p-2 rounded-md transition-colors"
//                     >
//                       {expandedCreations.has(creation._id) ? (
//                         <ChevronDown className="h-5 w-5 text-gray-500" />
//                       ) : (
//                         <ChevronRight className="h-5 w-5 text-gray-500" />
//                       )}
//                       <div>
//                         <h2 className="text-xl font-semibold text-gray-900">{creation.name}</h2>
//                         <p className="text-sm text-gray-600">Click to view PDFs</p>
//                       </div>
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => deleteCreation(creation._id)}
//                     className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
//                     title="Delete Creation"
//                   >
//                     <Trash2 className="h-5 w-5" />
//                   </button>
//                 </div>

//                 {/* Creation Details */}
//                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="h-4 w-4 text-gray-400" />
//                     <div>
//                       <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</p>
//                       <p className="text-sm text-gray-900">{creation.address}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Hash className="h-4 w-4 text-gray-400" />
//                     <div>
//                       <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">GST No.</p>
//                       <p className="text-sm text-gray-900">{creation.gstno}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <CreditCard className="h-4 w-4 text-gray-400" />
//                     <div>
//                       <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">PAN No.</p>
//                       <p className="text-sm text-gray-900">{creation.panno}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <MapPin className="h-4 w-4 text-gray-400" />
//                     <div>
//                       <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">State</p>
//                       <p className="text-sm text-gray-900">{creation.state}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* PDF List (Expandable) */}
//               {expandedCreations.has(creation._id) && (
//                 <div className="p-6">
//                   {loadingPDFs.has(creation._id) ? (
//                     <div className="flex items-center justify-center py-8">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                       <span className="ml-3 text-gray-600">Loading PDFs...</span>
//                     </div>
//                   ) : creationPDFs[creation._id]?.length > 0 ? (
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
//                         <FileText className="h-5 w-5 mr-2" />
//                         Generated PDFs ({creationPDFs[creation._id].length})
//                       </h3>
//                       <div className="grid gap-4">
//                         {creationPDFs[creation._id].map((pdf) => (
//                           <div key={pdf._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                             <div className="flex items-center justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-3">
//                                   <FileText className="h-6 w-6 text-red-600" />
//                                   <div>
//                                     <h4 className="font-medium text-gray-900">{pdf.fileName}</h4>
//                                     <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
//                                       {pdf.invoiceNumber && (
//                                         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
//                                           {pdf.invoiceNumber}
//                                         </span>
//                                       )}
//                                       <span>{formatFileSize(pdf.fileSize)}</span>
//                                       <span className="flex items-center">
//                                         <Calendar className="h-3 w-3 mr-1" />
//                                         {formatDate(pdf.createdAt || pdf.generatedAt)}
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   onClick={() => downloadPDF(pdf._id, pdf.fileName)}
//                                   className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
//                                   title="Download PDF"
//                                 >
//                                   <Download className="h-4 w-4" />
//                                   <span className="hidden sm:inline">Download</span>
//                                 </button>
//                                 <button
//                                   onClick={() => deletePDF(pdf._id, creation._id)}
//                                   className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
//                                   title="Delete PDF"
//                                 >
//                                   <Trash2 className="h-4 w-4" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center py-8">
//                       <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">No PDFs Generated</h3>
//                       <p className="text-gray-600">No invoice PDFs have been generated for this creation yet.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreationData;



import { backendUrl } from '../App'

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Download, Trash2, FileText, Building, MapPin, Hash, CreditCard, Calendar, Mail } from 'lucide-react';

const CreationData = () => {
  const [creations, setCreations] = useState([]);
  const [expandedCreations, setExpandedCreations] = useState(new Set());
  const [creationPDFs, setCreationPDFs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingPDFs, setLoadingPDFs] = useState(new Set());

  // Base API URL - adjust this to match your backend
  // Update this to your actual API base URL

  // Fetch all creations on component mount
  useEffect(() => {
    fetchAllCreations();
  }, []);

  const fetchAllCreations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/creation/getcr`);
      const data = await response.json();
      
      if (data.status && data.data) {
        setCreations(data.data);
      } else {
        setError('Failed to fetch creations');
      }
    } catch (err) {
      console.error('Error fetching creations:', err);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchCreationPDFs = async (creationId) => {
    if (creationPDFs[creationId]) {
      return; // Already fetched
    }

    try {
      setLoadingPDFs(prev => new Set([...prev, creationId]));
      const response = await fetch(`${backendUrl}/pdf/creation/${creationId}`);
      const data = await response.json();
      
      if (data.status && data.data) {
        setCreationPDFs(prev => ({
          ...prev,
          [creationId]: data.data
        }));
      } else {
        setCreationPDFs(prev => ({
          ...prev,
          [creationId]: []
        }));
      }
    } catch (err) {
      console.error('Error fetching PDFs:', err);
      setCreationPDFs(prev => ({
        ...prev,
        [creationId]: []
      }));
    } finally {
      setLoadingPDFs(prev => {
        const newSet = new Set(prev);
        newSet.delete(creationId);
        return newSet;
      });
    }
  };

  const toggleCreationExpansion = async (creationId) => {
    const newExpanded = new Set(expandedCreations);
    
    if (newExpanded.has(creationId)) {
      newExpanded.delete(creationId);
    } else {
      newExpanded.add(creationId);
      // Fetch PDFs when expanding
      await fetchCreationPDFs(creationId);
    }
    
    setExpandedCreations(newExpanded);
  };

  const downloadPDF = async (pdfId, fileName) => {
    try {
      const response = await fetch(`${backendUrl}/pdf/download/${pdfId}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to download PDF');
      }
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Error downloading PDF');
    }
  };

  const deletePDF = async (pdfId, creationId) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/pdf/delete/${pdfId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.status) {
        // Refresh PDFs for this creation
        setCreationPDFs(prev => ({
          ...prev,
          [creationId]: prev[creationId].filter(pdf => pdf._id !== pdfId)
        }));
        alert('PDF deleted successfully');
      } else {
        alert('Failed to delete PDF');
      }
    } catch (err) {
      console.error('Error deleting PDF:', err);
      alert('Error deleting PDF');
    }
  };

  const deleteCreation = async (creationId) => {
    if (!window.confirm('Are you sure you want to delete this creation? This will also delete all associated PDFs.')) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/creation/remove/${creationId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.status) {
        setCreations(prev => prev.filter(creation => creation._id !== creationId));
        setCreationPDFs(prev => {
          const newPDFs = { ...prev };
          delete newPDFs[creationId];
          return newPDFs;
        });
        setExpandedCreations(prev => {
          const newExpanded = new Set(prev);
          newExpanded.delete(creationId);
          return newExpanded;
        });
        alert('Creation deleted successfully');
      } else {
        alert('Failed to delete creation');
      }
    } catch (err) {
      console.error('Error deleting creation:', err);
      alert('Error deleting creation');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-red-800">
            <h3 className="text-lg font-medium">Error</h3>
            <p className="mt-1">{error}</p>
            <button 
              onClick={fetchAllCreations}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Creation Management</h1>
        <p className="text-gray-600">Manage your creations and their associated PDF invoices</p>
      </div>

      {creations.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Creations Found</h3>
          <p className="text-gray-600">Create your first business profile to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {creations.map((creation) => (
            <div key={creation._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Creation Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleCreationExpansion(creation._id)}
                      className="flex items-center space-x-2 text-left hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      {expandedCreations.has(creation._id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{creation.name}</h2>
                        <p className="text-sm text-gray-600">Click to view PDFs</p>
                      </div>
                    </button>
                  </div>
                  <button
                    onClick={() => deleteCreation(creation._id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
                    title="Delete Creation"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Creation Details */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</p>
                      <p className="text-sm text-gray-900">{creation.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                        <p className="text-sm text-gray-900">{creation.email || 'Not provided'}</p>
                    </div>
                </div>
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">GST No.</p>
                      <p className="text-sm text-gray-900">{creation.gstno}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">PAN No.</p>
                      <p className="text-sm text-gray-900">{creation.panno || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">State</p>
                      <p className="text-sm text-gray-900">{creation.state}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF List (Expandable) */}
              {expandedCreations.has(creation._id) && (
                <div className="p-6">
                  {loadingPDFs.has(creation._id) ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-600">Loading PDFs...</span>
                    </div>
                  ) : creationPDFs[creation._id]?.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Generated PDFs ({creationPDFs[creation._id].length})
                      </h3>
                      <div className="grid gap-4">
                        {creationPDFs[creation._id].map((pdf) => (
                          <div key={pdf._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-6 w-6 text-red-600" />
                                  <div>
                                    <h4 className="font-medium text-gray-900">{pdf.fileName}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                      {pdf.invoiceNumber && (
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                          {pdf.invoiceNumber}
                                        </span>
                                      )}
                                      <span>{formatFileSize(pdf.fileSize)}</span>
                                      <span className="flex items-center">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {formatDate(pdf.createdAt || pdf.generatedAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => downloadPDF(pdf._id, pdf.fileName)}
                                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                                  title="Download PDF"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="hidden sm:inline">Download</span>
                                </button>
                                <button
                                  onClick={() => deletePDF(pdf._id, creation._id)}
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition-colors"
                                  title="Delete PDF"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No PDFs Generated</h3>
                      <p className="text-gray-600">No invoice PDFs have been generated for this creation yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreationData;