import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

// Currency formatting function
const formatCurrency = (amount) => {
  return `Rs. ${parseFloat(amount).toFixed(2)}`;
};

// Date formatting function
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

// Main CreateBilling Component
const CreateBilling = ({ token }) => {
  const location = useLocation();
  const { creationId, creationName } = location.state || {};
  const [sendEmailOption, setSendEmailOption] = useState(true); 
  
  const [creationData, setCreationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: ``,
  });
  
  // Current session items (for current billing)
  const [currentSessionItems, setCurrentSessionItems] = useState([]);
  // All historical items (for display/reference)
  const [allHistoricalItems, setAllHistoricalItems] = useState([]);
  const [savedPDFs, setSavedPDFs] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [totalPDFCount, setTotalPDFCount] = useState(0);
  const [showHistoricalItems, setShowHistoricalItems] = useState(false);

  // Manual discount state
  const [discountPercentage, setDiscountPercentage] = useState(5); // Default 5%

  const [newItem, setNewItem] = useState({
    description: '',
    quantity: '',
    rate: '',
    date: new Date().toISOString().split('T')[0] // Default to today's date
  });

  // Function to generate next invoice number based on existing PDFs
  const generateNextInvoiceNumber = (pdfCount) => {
    const nextNumber = pdfCount + 1;
    return `BILL NO.${nextNumber}`;
  };

  // Fetch creation data from API
  useEffect(() => {
    const fetchCreationData = async () => {
      if (!creationId) {
        setError('Creation ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${backendUrl}/creation/singleCr/${creationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status && data.creationdata) {
          setCreationData(data.creationdata);
          // Fetch historical items for reference
          await fetchHistoricalItems(creationId);
          // Fetch total PDF count first, then fallback to creation-specific count
          await fetchTotalPDFCount();
        } else {
          throw new Error(data.message || 'Failed to fetch creation data');
        }
      } catch (error) {
        console.error('Error fetching creation data:', error);
        setError(error.message || 'Failed to fetch creation data');
        toast.error(`Failed to fetch creation data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCreationData();
  }, [creationId, token]);

  // Fetch historical items for reference only
  const fetchHistoricalItems = async (creationId) => {
    try {
      const response = await fetch(`${backendUrl}/items/creation/${creationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status && data.data) {
          const formattedItems = data.data.map(item => ({
            id: item._id,
            _id: item._id,
            description: item.itemName,
            quantity: item.quantity,
            rate: item.rate,
            date: item.date,
            createdAt: item.createdAt
          }));
          setAllHistoricalItems(formattedItems);
        }
      }
    } catch (error) {
      console.error('Error fetching historical items:', error);
    }
  };

  // Fetch total PDF count from backend
  const fetchTotalPDFCount = async () => {
    try {
      const response = await fetch(`${backendUrl}/pdf/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      console.log('Fetching total PDF count from backend...');

      if (response.ok) {
        const data = await response.json();
        console.log('PDF count response:', data);
        
        if (data.status && data.data) {
          setTotalPDFCount(data.data.totalPDFs);
          // Generate next invoice number based on total PDF count
          const nextInvoiceNumber = generateNextInvoiceNumber(data.data.totalPDFs);
          setInvoiceData(prev => ({
            ...prev,
            invoiceNumber: nextInvoiceNumber
          }));
        }
      } else {
        console.error('Failed to fetch total PDF count');
        // Fallback to creation-specific count
        await fetchSavedPDFs(creationId);
      }
    } catch (error) {
      console.error('Error fetching total PDF count:', error);
      // Fallback to creation-specific count
      await fetchSavedPDFs(creationId);
    }
  };

  // Fetch saved PDFs for the creation and set invoice number
  const fetchSavedPDFs = async (creationId) => {
    try {
      const response = await fetch(`${backendUrl}/pdf/creation/${creationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status && data.data) {
          setSavedPDFs(data.data);
          // Only set invoice number if totalPDFCount is not already set
          if (totalPDFCount === 0) {
            // Auto-generate next invoice number based on PDF count
            const nextInvoiceNumber = generateNextInvoiceNumber(data.data.length);
            setInvoiceData(prev => ({
              ...prev,
              invoiceNumber: nextInvoiceNumber
            }));
          }
        } else {
          // If no PDFs exist and totalPDFCount is not set, start with BILL NO.1
          if (totalPDFCount === 0) {
            const nextInvoiceNumber = generateNextInvoiceNumber(0);
            setInvoiceData(prev => ({
              ...prev,
              invoiceNumber: nextInvoiceNumber
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching saved PDFs:', error);
      // If error occurs and totalPDFCount is not set, still set a default invoice number
      if (totalPDFCount === 0) {
        const nextInvoiceNumber = generateNextInvoiceNumber(0);
        setInvoiceData(prev => ({
          ...prev,
          invoiceNumber: nextInvoiceNumber
        }));
      }
    }
  };

  // Add item to current session only (no backend call)
  const addItemToSession = () => {
    const description = newItem.description?.trim();
    const quantity = parseFloat(newItem.quantity);
    const rate = parseFloat(newItem.rate);
    const itemDate = newItem.date;

    if (!description) {
      toast.error('Please enter item description');
      return;
    }
    if (!newItem.quantity || quantity <= 0) {
      toast.error('Please enter a valid quantity greater than 0');
      return;
    }
    if (!newItem.rate || rate <= 0) {
      toast.error('Please enter a valid rate greater than 0');
      return;
    }
    if (!itemDate) {
      toast.error('Please select a date');
      return;
    }

    const itemToAdd = {
      id: Date.now(), // Temporary ID for new session items
      description: description,
      quantity: quantity,
      rate: rate,
      date: itemDate,
      isCurrentSession: true
    };

    setCurrentSessionItems(prevItems => [...prevItems, itemToAdd]);
    setNewItem({
      description: '',
      quantity: '',
      rate: '',
      date: new Date().toISOString().split('T')[0]
    });
    toast.success('Item added to current session!');
  };

  // Generate PDF for current session with email support
  const generatePDFForCurrentSession = async () => {
    if (!currentSessionItems || currentSessionItems.length === 0) {
      toast.error('Please add at least one item to current session before generating PDF');
      return;
    }

    // Check if email exists when sendEmail is enabled
    if (sendEmailOption && !creationData.email) {
      toast.warning('Email will not be sent - No email address found for this creation');
    }

    try {
      setPdfLoading(true);
      
      // Use the most recent item's date as invoice date
      const mostRecentDate = currentSessionItems.length > 0 ? 
        currentSessionItems[currentSessionItems.length - 1].date : 
        new Date().toISOString().split('T')[0];
      
      const response = await fetch(`${backendUrl}/pdf/generateCurrentSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          creationId: creationId,
          invoiceNumber: invoiceData.invoiceNumber,
          currentSessionItems: currentSessionItems,
          discountPercentage: discountPercentage,
          invoiceDate: mostRecentDate,
          sendEmail: sendEmailOption // Include email option
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check email status from headers
      const emailSent = response.headers.get('X-Email-Sent') === 'true';
      const emailError = response.headers.get('X-Email-Error');

      // Get the PDF as blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${creationData.name.replace(/\s+/g, '-')}-${mostRecentDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show appropriate success message based on email status
      if (emailSent) {
        toast.success(`PDF generated and email sent to ${creationData.email}!`);
      } else if (sendEmailOption && emailError && emailError !== 'none') {
        toast.warning(`PDF generated but email failed: ${emailError}`);
      } else {
        toast.success('PDF generated and downloaded successfully!');
      }
      
      // Clear current session items after successful PDF generation
      setCurrentSessionItems([]);
      
      // Refresh total PDF count and saved PDFs list
      await fetchTotalPDFCount();
      await fetchSavedPDFs(creationId);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(`Failed to generate PDF: ${error.message}`);
    } finally {
      setPdfLoading(false);
    }
  };

  // Remove item from current session
  const removeItem = (itemId, index) => {
    setCurrentSessionItems(prevItems => prevItems.filter((_, i) => i !== index));
    toast.success('Item removed from current session!');
  };

  // Download saved PDF
  const downloadSavedPDF = async (pdfId, fileName) => {
    try {
      const response = await fetch(`${backendUrl}/pdf/download/${pdfId}`, {
        method: 'GET',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error(`Failed to download PDF: ${error.message}`);
    }
  };

  // Delete saved PDF
  const deleteSavedPDF = async (pdfId) => {
    if (!window.confirm('Are you sure you want to delete this PDF?')) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/pdf/delete/${pdfId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status) {
        setSavedPDFs(prevPDFs => prevPDFs.filter(pdf => pdf._id !== pdfId));
        toast.success('PDF deleted successfully!');
        
        // Refresh total PDF count after deletion
        await fetchTotalPDFCount();
      } else {
        throw new Error(data.message || 'Failed to delete PDF');
      }
    } catch (error) {
      console.error('Error deleting PDF:', error);
      toast.error(`Failed to delete PDF: ${error.message}`);
    }
  };

  // Handle discount percentage change
  const handleDiscountChange = (e) => {
    const value = e.target.value;
    
    // Allow empty string for clearing the field
    if (value === '') {
      setDiscountPercentage(0);
      return;
    }
    
    // Convert to number and validate
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setDiscountPercentage(numValue);
    }
  };

  // Calculate totals for current session only
  const calculateCurrentSessionTotals = () => {
    if (!currentSessionItems || currentSessionItems.length === 0) {
      return {
        subtotal: 0,
        discount: 0,
        discountedAmount: 0,
        tax: 0,
        total: 0
      };
    }

    const subtotal = currentSessionItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return sum + (quantity * rate);
    }, 0);

    const discount = subtotal * (discountPercentage / 100);
    const discountedAmount = subtotal - discount;
    const tax = discountedAmount * 0.05; // 5% GST on discounted amount
    const total = discountedAmount + tax;

    return {
      subtotal,
      discount,
      discountedAmount,
      tax,
      total
    };
  };

  const currentSessionTotals = calculateCurrentSessionTotals();

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading creation data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!creationData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-lg text-gray-600">No creation data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Bill for {creationData.name}
        </h1>
  
        {/* Invoice Information */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Invoice Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Auto-generated based on existing PDFs"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total PDFs: {totalPDFCount} | Next: {totalPDFCount + 1}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={discountPercentage}
                onChange={handleDiscountChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="5.0"
              />
            </div>
            <div className="flex items-center">
              <div className="text-sm text-gray-600">
                <p>Current discount: <strong>{discountPercentage}%</strong></p>
                <p className="text-xs">Range: 0% - 100%</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Creation Details */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Creation Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Name:</strong> {creationData.name}</p>
              <p><strong>Address:</strong> {creationData.address}</p>
              <p><strong>Email:</strong> {creationData.email || 'Not provided'}</p>
            </div>
            <div>
              <p><strong>GST No:</strong> {creationData.gstno}</p>
              <p><strong>PAN No:</strong> {creationData.panno}</p>
              <p><strong>State:</strong> {creationData.state}</p>
            </div>
          </div>
        </div>
  
        {/* Add New Item */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Add Item to Current Bill</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Item description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newItem.rate}
                onChange={(e) => setNewItem({...newItem, rate: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newItem.date}
                onChange={(e) => setNewItem({...newItem, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addItemToSession}
                disabled={pdfLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Add to Current Bill
              </button>
            </div>
          </div>
        </div>

        {/* Current Session Items */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-green-50">
              <tr>
                <th className="px-4 py-2 border-b text-left">Description</th>
                <th className="px-4 py-2 border-b text-center">Quantity</th>
                <th className="px-4 py-2 border-b text-center">Rate</th>
                <th className="px-4 py-2 border-b text-center">Date</th>
                <th className="px-4 py-2 border-b text-right">Amount</th>
                <th className="px-4 py-2 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSessionItems.length > 0 ? (
                currentSessionItems.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{item.description || ''}</td>
                    <td className="px-4 py-2 border-b text-center">{parseFloat(item.quantity || 0).toFixed(2)}</td>
                    <td className="px-4 py-2 border-b text-center">Rs. {parseFloat(item.rate || 0).toFixed(2)}</td>
                    <td className="px-4 py-2 border-b text-center">
                      {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2 border-b text-right">Rs. {(parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)).toFixed(2)}</td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        onClick={() => removeItem(item.id, index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm transition duration-200"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500 italic">
                    No items in current bill. Use the form above to add items to this invoice.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Current Session Totals Summary */}
        {currentSessionItems.length > 0 && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Current Bill Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {currentSessionTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount ({discountPercentage}%):</span>
                <span>- Rs. {currentSessionTotals.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount after Discount:</span>
                <span>Rs. {currentSessionTotals.discountedAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span>Rs. {currentSessionTotals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total Amount:</span>
                <span>Rs. {currentSessionTotals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
  
        {/* Email Options */}
        {currentSessionItems.length > 0 && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Email Options</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmailOption}
                  onChange={(e) => setSendEmailOption(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Send invoice via email</span>
              </label>
              
              {creationData.email ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-600">Email: <strong>{creationData.email}</strong></span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-600">⚠</span>
                  <span className="text-red-600">No email address available</span>
                </div>
              )}
            </div>
            
            {sendEmailOption && !creationData.email && (
              <p className="text-sm text-amber-600 mt-2 italic">
                * Email cannot be sent - No email address found for this creation. PDF will only be downloaded.
              </p>
            )}
            
            {sendEmailOption && creationData.email && (
              <p className="text-sm text-green-600 mt-2 italic">
                * Invoice will be emailed to the customer after PDF generation
              </p>
            )}
          </div>
        )}

        {/* Generate PDF Button */}
        <div className="text-center mb-6">
          {currentSessionItems.length > 0 ? (
            <button
              onClick={generatePDFForCurrentSession}
              disabled={pdfLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition duration-200"
            >
              {pdfLoading ? 'Generating PDF...' : 'Generate & Download Current Bill PDF'}
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-gray-200 cursor-not-allowed px-8 py-3 rounded-lg font-semibold"
            >
              Add items to current bill to generate PDF
            </button>
          )}
          {currentSessionItems.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Please add at least one item to current bill before generating the PDF
            </p>
          )}
        </div>
  
        {/* Historical Items Toggle */}
        {allHistoricalItems.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setShowHistoricalItems(!showHistoricalItems)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              {showHistoricalItems ? 'Hide' : 'Show'} Historical Items ({allHistoricalItems.length})
            </button>
            
            {showHistoricalItems && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-md font-semibold mb-3 text-gray-700">Historical Items (Reference Only)</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border-b text-left">Description</th>
                        <th className="px-4 py-2 border-b text-center">Quantity</th>
                        <th className="px-4 py-2 border-b text-center">Rate</th>
                        <th className="px-4 py-2 border-b text-right">Amount</th>
                        <th className="px-4 py-2 border-b text-center">Date Added</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allHistoricalItems.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-b">{item.description || ''}</td>
                          <td className="px-4 py-2 border-b text-center">{parseFloat(item.quantity || 0).toFixed(2)}</td>
                          <td className="px-4 py-2 border-b text-center">Rs. {parseFloat(item.rate || 0).toFixed(2)}</td>
                          <td className="px-4 py-2 border-b text-right">Rs. {(parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)).toFixed(2)}</td>
                          <td className="px-4 py-2 border-b text-center text-sm text-gray-500">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-2 italic">
                  * These are historical items from previous bills and are not included in the current bill
                </p>
              </div>
            )}
          </div>
        )}
  
        {/* Saved PDFs Section */}
        {savedPDFs.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Saved PDFs</h2>
            <div className="space-y-2">
              {savedPDFs.map((pdf) => (
                <div key={pdf._id} className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <p className="font-medium">{pdf.fileName}</p>
                    <p className="text-sm text-gray-500">
                      Size: {(pdf.fileSize / 1024).toFixed(2)} KB | 
                      Created: {new Date(pdf.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadSavedPDF(pdf._id, pdf.fileName)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition duration-200"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => deleteSavedPDF(pdf._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBilling;