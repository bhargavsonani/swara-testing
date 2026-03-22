


// // controllers/itemController.js
// import Item from '../models/itemModel.js';
// import Creation from '../models/creationModel.js';
// import PDFModel from '../models/pdfModel.js';
// import { generatePDFBuffer } from './pdfController.js'; // Import the helper function

// // Add item with optional PDF generation (matches frontend's addWithCurrentSessionPdf endpoint)
// export const addItemWithCurrentSessionPdf = async (req, res) => {
//   try {
//     const { 
//       creationId, 
//       itemName, 
//       quantity, 
//       rate, 
//       currentSessionItems, 
//       invoiceNumber 
//     } = req.body;

//     if (!creationId || !itemName || !quantity || !rate) {
//       return res.status(400).json({
//         status: false,
//         message: "Creation ID, item name, quantity, and rate are required"
//       });
//     }

//     const creationExists = await Creation.findById(creationId);
//     if (!creationExists) {
//       return res.status(404).json({
//         status: false,
//         message: "Creation not found"
//       });
//     }

//     // Save the new item to database
//     const newItem = new Item({
//       creationId,
//       itemName,
//       quantity,
//       rate,
//     });

//     await newItem.save();

//     let response = {
//       status: true,
//       message: "Item added successfully",
//       data: newItem
//     };

//     // Generate PDF with current session items + the new item
//     try {
//       // Combine current session items with the new item for PDF generation
//       const allItemsForPdf = [
//         ...currentSessionItems.map(item => ({
//           itemName: item.description,
//           quantity: item.quantity,
//           rate: item.rate
//         })),
//         {
//           itemName: itemName,
//           quantity: quantity,
//           rate: rate
//         }
//       ];

//       const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;
      
//       // Generate PDF buffer
//       const pdfBuffer = await generatePDFBuffer(creationExists, allItemsForPdf, finalInvoiceNumber);
      
//       // Create filename
//       const fileName = `invoice-${creationExists.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

//       // Save PDF to database - associate with creation instead of specific item
//       const pdfRecord = new PDFModel({
//         creationId: creationId, // Link to creation instead of specific item
//         itemId: newItem._id, // Keep item reference for backwards compatibility
//         fileName: fileName,
//         fileSize: pdfBuffer.length,
//         mimeType: 'application/pdf',
//         pdfBuffer: pdfBuffer,
//         invoiceNumber: finalInvoiceNumber
//       });

//       await pdfRecord.save();

//       response.pdfGenerated = true;
//       response.pdfId = pdfRecord._id;
//       response.fileName = fileName;
//     } catch (pdfError) {
//       console.error("PDF generation error:", pdfError);
//       response.pdfError = "Item added but PDF generation failed: " + pdfError.message;
//     }

//     res.status(201).json(response);
//   } catch (error) {
//     console.error("Error in addItemWithCurrentSessionPdf:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Regular add item without PDF generation
// export const addItem = async (req, res) => {
//   try {
//     const { creationId, itemName, quantity, rate } = req.body;
    
//     if (!creationId || !itemName || !quantity || !rate) {
//       return res.status(400).json({
//         status: false,
//         message: "Creation ID, item name, quantity, and rate are required"
//       });
//     }

//     const creationExists = await Creation.findById(creationId);
//     if (!creationExists) {
//       return res.status(404).json({
//         status: false,
//         message: "Creation not found"
//       });
//     }

//     const newItem = new Item({
//       creationId,
//       itemName,
//       quantity,
//       rate,
//     });

//     await newItem.save();

//     res.status(201).json({
//       status: true,
//       message: "Item added successfully",
//       data: newItem
//     });

//   } catch (error) {
//     console.error("Error in addItem:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Get all items for a creation
// export const getItemsByCreation = async (req, res) => {
//   try {
//     const { creationId } = req.params;

//     if (!creationId) {
//       return res.status(400).json({
//         status: false,
//         message: "Creation ID is required"
//       });
//     }

//     const items = await Item.find({ creationId }).sort({ createdAt: -1 });

//     res.status(200).json({
//       status: true,
//       message: "Items retrieved successfully",
//       data: items
//     });

//   } catch (error) {
//     console.error("Error in getItemsByCreation:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Delete an item
// export const deleteItem = async (req, res) => {
//   try {
//     const { itemId } = req.params;

//     if (!itemId) {
//       return res.status(400).json({
//         status: false,
//         message: "Item ID is required"
//       });
//     }

//     const deletedItem = await Item.findByIdAndDelete(itemId);
//     if (!deletedItem) {
//       return res.status(404).json({
//         status: false,
//         message: "Item not found"
//       });
//     }

//     res.status(200).json({
//       status: true,
//       message: "Item deleted successfully"
//     });

//   } catch (error) {
//     console.error("Error in deleteItem:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };


// controllers/itemController.js
import Item from '../models/itemModel.js';
import Creation from '../models/creationModel.js';
import PDFModel from '../models/pdfModel.js';
import { generatePDFBuffer } from './pdfController.js'; // Import the helper function

// Add item with optional PDF generation (matches frontend's addWithCurrentSessionPdf endpoint)
export const addItemWithCurrentSessionPdf = async (req, res) => {
  try {
    const { 
      creationId, 
      itemName, 
      quantity, 
      rate, 
      currentSessionItems, 
      invoiceNumber,
      date // Add date from request body
    } = req.body;

    if (!creationId || !itemName || !quantity || !rate) {
      return res.status(400).json({
        status: false,
        message: "Creation ID, item name, quantity, and rate are required"
      });
    }

    const creationExists = await Creation.findById(creationId);
    if (!creationExists) {
      return res.status(404).json({
        status: false,
        message: "Creation not found"
      });
    }

    // Calculate total amount
    const totalAmount = quantity * rate;

    // Save the new item to database
    const newItem = new Item({
      creationId,
      itemName,
      quantity,
      rate,
      totalAmount,
      date: date ? new Date(date) : new Date() // Use provided date or current date
    });

    await newItem.save();

    let response = {
      status: true,
      message: "Item added successfully",
      data: newItem
    };

    // Generate PDF with current session items + the new item
    try {
      // Combine current session items with the new item for PDF generation
      const allItemsForPdf = [
        ...currentSessionItems.map(item => ({
          itemName: item.description,
          quantity: item.quantity,
          rate: item.rate
        })),
        {
          itemName: itemName,
          quantity: quantity,
          rate: rate
        }
      ];

      const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;
      
      // Generate PDF buffer with invoice date
      const pdfBuffer = await generatePDFBuffer(creationExists, allItemsForPdf, finalInvoiceNumber, null, null, date);
      
      // Create filename
      const fileName = `invoice-${creationExists.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

      // Save PDF to database - associate with creation instead of specific item
      const pdfRecord = new PDFModel({
        creationId: creationId, // Link to creation instead of specific item
        itemId: newItem._id, // Keep item reference for backwards compatibility
        fileName: fileName,
        fileSize: pdfBuffer.length,
        mimeType: 'application/pdf',
        pdfBuffer: pdfBuffer,
        invoiceNumber: finalInvoiceNumber
      });

      await pdfRecord.save();

      response.pdfGenerated = true;
      response.pdfId = pdfRecord._id;
      response.fileName = fileName;
    } catch (pdfError) {
      console.error("PDF generation error:", pdfError);
      response.pdfError = "Item added but PDF generation failed: " + pdfError.message;
    }

    res.status(201).json(response);
  } catch (error) {
    console.error("Error in addItemWithCurrentSessionPdf:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Regular add item without PDF generation
export const addItem = async (req, res) => {
  try {
    const { creationId, itemName, quantity, rate, date } = req.body;
    
    if (!creationId || !itemName || !quantity || !rate) {
      return res.status(400).json({
        status: false,
        message: "Creation ID, item name, quantity, and rate are required"
      });
    }

    const creationExists = await Creation.findById(creationId);
    if (!creationExists) {
      return res.status(404).json({
        status: false,
        message: "Creation not found"
      });
    }

    // Calculate total amount
    const totalAmount = quantity * rate;

    const newItem = new Item({
      creationId,
      itemName,
      quantity,
      rate,
      totalAmount,
      date: date ? new Date(date) : new Date() // Use provided date or current date
    });

    await newItem.save();

    res.status(201).json({
      status: true,
      message: "Item added successfully",
      data: newItem
    });

  } catch (error) {
    console.error("Error in addItem:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Get all items for a creation
export const getItemsByCreation = async (req, res) => {
  try {
    const { creationId } = req.params;

    if (!creationId) {
      return res.status(400).json({
        status: false,
        message: "Creation ID is required"
      });
    }

    const items = await Item.find({ creationId }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Items retrieved successfully",
      data: items
    });

  } catch (error) {
    console.error("Error in getItemsByCreation:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Update an item
export const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { itemName, quantity, rate, date } = req.body;

    if (!itemId) {
      return res.status(400).json({
        status: false,
        message: "Item ID is required"
      });
    }

    const updateData = {};
    if (itemName !== undefined) updateData.itemName = itemName;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (rate !== undefined) updateData.rate = rate;
    if (date !== undefined) updateData.date = new Date(date);

    // Recalculate total amount if quantity or rate is updated
    if (quantity !== undefined || rate !== undefined) {
      const existingItem = await Item.findById(itemId);
      if (!existingItem) {
        return res.status(404).json({
          status: false,
          message: "Item not found"
        });
      }
      
      const newQuantity = quantity !== undefined ? quantity : existingItem.quantity;
      const newRate = rate !== undefined ? rate : existingItem.rate;
      updateData.totalAmount = newQuantity * newRate;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        status: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Item updated successfully",
      data: updatedItem
    });

  } catch (error) {
    console.error("Error in updateItem:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({
        status: false,
        message: "Item ID is required"
      });
    }

    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({
        status: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Item deleted successfully",
      data: deletedItem
    });

  } catch (error) {
    console.error("Error in deleteItem:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};