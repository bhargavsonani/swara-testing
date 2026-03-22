
// // // controllers/pdfController.js
// // import PDFDocument from 'pdfkit';
// // import Item from '../models/itemModel.js';
// // import Creation from '../models/creationModel.js';
// // import PDFModel from '../models/pdfModel.js';

// // // Helper function to convert number to words (Indian system)
// // const numberToWords = (num) => {
// //   const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
// //   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
// //   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

// //   if (num === 0) return 'Zero';
// //   if (num < 10) return ones[num];
// //   if (num < 20) return teens[num - 10];
// //   if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
// //   if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
// //   if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
// //   if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + numberToWords(num % 100000) : '');

// //   return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + numberToWords(num % 10000000) : '');
// // };

// // // Helper function to format currency
// // const formatCurrency = (amount) => {
// //   return ` ${parseFloat(amount).toFixed(2)}`;
// // };

// // // Helper function to get current date in DD/MM/YYYY format
// // const getCurrentDate = () => {
// //   return new Date().toLocaleDateString('en-GB');
// // };

// // // Generate PDF Buffer (exported for use in item controller)
// // export const generatePDFBuffer = async (creationData, items, invoiceNumber) => {
// //   return new Promise((resolve, reject) => {
// //     try {
// //       const doc = new PDFDocument({ size: 'A4', margin: 20 });
// //       const buffers = [];
      
// //       doc.on('data', buffers.push.bind(buffers));
// //       doc.on('end', () => {
// //         const pdfData = Buffer.concat(buffers);
// //         resolve(pdfData);
// //       });

// //       // A4 dimensions and layout constants
// //       const pageWidth = 595.28; // A4 width in points
// //       const pageHeight = 841.89; // A4 height in points
// //       const margin = 20;
// //       const contentWidth = pageWidth - (margin * 2);
      
// //       // Fixed footer height to ensure signature fits on page 1
// //       const footerHeight = 280;
// //       const maxContentHeight = pageHeight - margin - footerHeight - 50;

// //       // Dynamic sizing based on number of items
// //       const itemCount = items.length;
// //       let itemRowHeight, headerSpacing, fontSize;
      
// //       if (itemCount <= 5) {
// //         itemRowHeight = 22;
// //         headerSpacing = 'normal';
// //         fontSize = { regular: 10, small: 9, header: 12 };
// //       } else if (itemCount <= 10) {
// //         itemRowHeight = 18;
// //         headerSpacing = 'compact';
// //         fontSize = { regular: 9, small: 8, header: 11 };
// //       } else if (itemCount <= 15) {
// //         itemRowHeight = 15;
// //         headerSpacing = 'tight';
// //         fontSize = { regular: 8, small: 7, header: 10 };
// //       } else {
// //         itemRowHeight = 12;
// //         headerSpacing = 'minimal';
// //         fontSize = { regular: 7, small: 6, header: 9 };
// //       }

// //       // Calculate totals
// //       const subtotal = items.reduce((sum, item) => {
// //         const quantity = parseFloat(item.quantity) || 0;
// //         const rate = parseFloat(item.rate) || 0;
// //         return sum + (quantity * rate);
// //       }, 0);

// //       const discount = subtotal * 0.05; // 5% discount
// //       const discountedAmount = subtotal - discount;
// //       const tax = discountedAmount * 0.05; // 5% GST
// //       const total = discountedAmount + tax;

// //       let yPosition = margin;

// //       // Center the blessing text at the top
// //       doc.fontSize(fontSize.header + 2).fillColor('black').text('|| shree ganeshay namah ||', 0, yPosition, {
// //         width: pageWidth,
// //         align: 'center'
// //       });
// //       yPosition += (headerSpacing === 'minimal' ? 18 : headerSpacing === 'tight' ? 22 : headerSpacing === 'compact' ? 25 : 30);

// //       // Header Section
// //       doc.fontSize(fontSize.header + 10).fillColor('#0066CC').text('Swara Fashion', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : headerSpacing === 'compact' ? 28 : 32);

// //       const addressSpacing = headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : headerSpacing === 'compact' ? 14 : 16;

// //       doc.fontSize(fontSize.regular + 1).fillColor('black')
// //         .text('PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD, SURAT,', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('Gujarat, 394107', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('Mobile: 9978809103', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('GSTIN: 24CFNPS0464N2ZU', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 16 : headerSpacing === 'tight' ? 20 : headerSpacing === 'compact' ? 24 : 28);

// //       // Header line
// //       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : headerSpacing === 'compact' ? 18 : 20);

// //       // Invoice Header
// //       const invoiceHeaderHeight = headerSpacing === 'minimal' ? 20 : headerSpacing === 'tight' ? 22 : 25;
// //       doc.rect(margin, yPosition, contentWidth, invoiceHeaderHeight).fill('#E8E8E8');
// //       doc.fillColor('black').fontSize(fontSize.header + 1).text('TAX INVOICE - ORIGINAL FOR RECIPIENT', margin + 8, yPosition + 7);
// //       yPosition += invoiceHeaderHeight + 6;

// //       // Invoice Info
// //       doc.fontSize(fontSize.regular + 1)
// //          .text(`Invoice No: ${invoiceNumber}`, margin, yPosition)
// //          .text(`Invoice Date: ${getCurrentDate()}`, pageWidth - 180, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : 18);

// //       doc.text('Challan No: ', margin, yPosition)
// //          .text('Challan Date: ', pageWidth - 180, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 15 : headerSpacing === 'tight' ? 18 : 22);

// //       // Bill To Section
// //       doc.fontSize(fontSize.header + 1).font('Helvetica-Bold').text('BILL TO', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : 15);

// //       const billToSpacing = headerSpacing === 'minimal' ? 8 : headerSpacing === 'tight' ? 10 : 12;

// //       doc.fontSize(fontSize.small + 1).font('Helvetica')
// //          .text(creationData.name, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(creationData.address, margin, yPosition, { width: 350 });
// //       yPosition += billToSpacing * 1.3;
// //       doc.text(`GSTIN: ${creationData.gstno}`, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(`PAN Number: ${creationData.panno}`, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(`State: ${creationData.state}`, margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 16 : 20);

// //       // Items Table Header
// //       const tableTop = yPosition;
// //       const tableHeaderHeight = headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : 28;
// //       doc.rect(margin, tableTop, contentWidth, tableHeaderHeight).fill('#4A90E2');
// //       doc.fillColor('white').fontSize(fontSize.small + 1).font('Helvetica-Bold')
// //          .text('ITEMS', margin + 8, tableTop + 8)
// //          .text('HSN No.', margin + 160, tableTop + 8)
// //          .text('QTY.', margin + 240, tableTop + 8)
// //          .text('RATE', margin + 300, tableTop + 8)
// //          .text('TAX', margin + 380, tableTop + 8)
// //          .text('AMOUNT', margin + 450, tableTop + 8);
      
// //       yPosition = tableTop + tableHeaderHeight;

// //       // Items Table Rows
// //       doc.fillColor('black').font('Helvetica');
// //       items.forEach((item, index) => {
// //         const amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
        
// //         doc.fontSize(fontSize.small + 1)
// //            .text(item.itemName || item.description || '', margin + 8, yPosition + 5, { width: 150 })
// //            .text('9988', margin + 160, yPosition + 5)
// //            .text(parseFloat(item.quantity || 0).toFixed(2), margin + 240, yPosition + 5)
// //            .text(formatCurrency(item.rate || 0), margin + 300, yPosition + 5)
// //            .text('5%', margin + 380, yPosition + 5)
// //            .text(formatCurrency(amount), margin + 450, yPosition + 5);

// //         yPosition += itemRowHeight;
        
// //         // Row separator line
// //         doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
// //       });

// //       // Force footer to start at calculated position to fit on page 1
// //       const footerStartY = pageHeight - margin - footerHeight;
// //       yPosition = Math.max(yPosition + 20, footerStartY - 50);

// //       // BANK DETAILS AND TOTALS SECTION
// //       const bankTotalsY = yPosition+45;
// //       const bankTotalsHeight = 120;
      
// //       // Bank Details Box (Left side)
// //       doc.rect(margin, bankTotalsY, 500, bankTotalsHeight).fill('#F8F8F8').stroke();
// //       doc.fillColor('black').fontSize(fontSize.regular + 1).font('Helvetica-Bold')
// //          .text('BANK DETAILS', margin + 12, bankTotalsY + 12);
      
// //       doc.fontSize(fontSize.small + 1).font('Helvetica')
// //          .text('Bank Name: THE VARACHHA CO. OP BANK LTD.', margin + 12, bankTotalsY + 28)
// //          .text('Account Name: Swara Fashion', margin + 12, bankTotalsY + 44)
// //          .text('Account No: 00730110470924', margin + 12, bankTotalsY + 60)
// //          .text('IFSC Code: VARA0289007', margin + 12, bankTotalsY + 76)
// //          .text('Branch: PUNAGAM', margin + 12, bankTotalsY + 92);

// //       // Totals Section (Right side)
// //       const totalsX = margin + 320;
// //       const totalsWidth = contentWidth - 320;
      
// //       // Totals background
// //       doc.rect(totalsX, bankTotalsY, totalsWidth, bankTotalsHeight).fill('#FAFAFA').stroke();
      
// //       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica');
      
// //       const totalsLeftMargin = totalsX + 12;
// //       const totalsRightMargin = totalsX + totalsWidth - 12;
      
// //       doc.text('SUBTOTAL', totalsLeftMargin, bankTotalsY + 12)
// //          .text(formatCurrency(subtotal), totalsRightMargin - 90, bankTotalsY + 12, { align: 'right', width: 90 });
      
// //       doc.text('DISCOUNT @5%', totalsLeftMargin, bankTotalsY + 28)
// //          .text(`- ${formatCurrency(discount)}`, totalsRightMargin - 90, bankTotalsY + 28, { align: 'right', width: 90 });
      
// //       doc.moveTo(totalsLeftMargin, bankTotalsY + 44).lineTo(totalsRightMargin, bankTotalsY + 44).stroke();
      
// //       doc.text('AMOUNT AFTER DISCOUNT', totalsLeftMargin, bankTotalsY + 50)
// //          .text(formatCurrency(discountedAmount), totalsRightMargin - 90, bankTotalsY + 50, { align: 'right', width: 90 });
      
// //       doc.text('CGST @2.5%', totalsLeftMargin, bankTotalsY + 66)
// //          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 66, { align: 'right', width: 90 });
      
// //       doc.text('SGST @2.5%', totalsLeftMargin, bankTotalsY + 82)
// //          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 82, { align: 'right', width: 90 });
      
// //       doc.moveTo(totalsLeftMargin, bankTotalsY + 98).lineTo(totalsRightMargin, bankTotalsY + 98).stroke();
      
// //       doc.fontSize(fontSize.regular + 1).font('Helvetica-Bold')
// //          .text('TOTAL AMOUNT', totalsLeftMargin, bankTotalsY + 104)
// //          .text(formatCurrency(total), totalsRightMargin - 90, bankTotalsY + 104, { align: 'right', width: 90 });

// //       // AMOUNT IN WORDS SECTION
// //       yPosition = bankTotalsY + bankTotalsHeight + 8;
// //       const amountWordsHeight = 50;
// //       doc.rect(margin, yPosition, contentWidth, amountWordsHeight).fill('#F0F0F0').stroke();
      
// //       const totalWords = numberToWords(Math.floor(total));
// //       const paise = Math.round((total % 1) * 100);
// //       const paiseWords = paise > 0 ? ` and ${numberToWords(paise)} Paise` : '';
      
// //       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica-Bold')
// //          .text('Amount in Words:', margin + 12, yPosition + 8);
// //       doc.font('Helvetica')
// //          .text(`${totalWords} Rupees${paiseWords} Only`, margin + 12, yPosition + 24, { 
// //            width: contentWidth - 24, 
// //            align: 'left' 
// //          });

// //       // SIGNATURE SECTION - Replaced with Code 2 implementation
// //       yPosition += amountWordsHeight + 12;
      
// //       // Top border line
// //       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
      
// //       yPosition += 15;
      
// //       const signatureY = yPosition; // Define signatureY variable
// //       const signatureHeight = 80;
      
// //       doc.fontSize(9).font('Helvetica')
// //          .text('Customer Signature', 80, signatureY + 35)
// //          .text('Authorized Signatory', 400, signatureY + 35);
      
// //       // Signature lines
// //       doc.moveTo(60, signatureY + 30).lineTo(180, signatureY + 30).stroke();
// //       doc.moveTo(380, signatureY + 30).lineTo(500, signatureY + 30).stroke();
      
// //       // Company name under signature
// //       doc.fontSize(8).font('Helvetica-Bold')
// //          .text('SWARA FASHION', 400, signatureY + 45);
         
// //       doc.end();
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // };

// // // Generate PDF for current session items (matches frontend endpoint)
// // export const generateCurrentSession = async (req, res) => {
// //   try {
// //     const { creationId, invoiceNumber, currentSessionItems } = req.body;

// //     if (!creationId || !currentSessionItems || currentSessionItems.length === 0) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID and current session items are required"
// //       });
// //     }

// //     // Fetch creation data
// //     const creationData = await Creation.findById(creationId);
// //     if (!creationData) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "Creation not found"
// //       });
// //     }

// //     // Convert current session items to the format expected by PDF generator
// //     const formattedItems = currentSessionItems.map(item => ({
// //       itemName: item.description || item.itemName,
// //       quantity: item.quantity,
// //       rate: item.rate
// //     }));

// //     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;
    
// //     // Generate PDF buffer
// //     const pdfBuffer = await generatePDFBuffer(creationData, formattedItems, finalInvoiceNumber);

// //     // Create filename
// //     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

// //     // Save PDF to database
// //     const pdfRecord = new PDFModel({
// //       creationId: creationId,
// //       fileName: fileName,
// //       fileSize: pdfBuffer.length,
// //       mimeType: 'application/pdf',
// //       pdfBuffer: pdfBuffer,
// //       invoiceNumber: finalInvoiceNumber
// //     });

// //     await pdfRecord.save();

// //     // Send PDF as response for download
// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${fileName}"`,
// //       'Content-Length': pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in generateCurrentSession:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Generate PDF Controller (legacy - for all items in creation)
// // export const generatePDF = async (req, res) => {
// //   try {
// //     const { creationId, invoiceNumber } = req.body;

// //     if (!creationId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID is required"
// //       });
// //     }

// //     // Fetch creation data
// //     const creationData = await Creation.findById(creationId);
// //     if (!creationData) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "Creation not found"
// //       });
// //     }

// //     // Fetch items for this creation
// //     const items = await Item.find({ creationId });
// //     if (!items || items.length === 0) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "No items found for this creation. Please add items before generating PDF."
// //       });
// //     }

// //     // Generate invoice number if not provided
// //     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;

// //     // Generate PDF buffer
// //     const pdfBuffer = await generatePDFBuffer(creationData, items, finalInvoiceNumber);

// //     // Create filename
// //     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

// //     // Save PDF to database
// //     const pdfRecord = new PDFModel({
// //       creationId: creationId,
// //       itemId: items[0]._id, // Using first item's ID as reference for backwards compatibility
// //       fileName: fileName,
// //       fileSize: pdfBuffer.length,
// //       mimeType: 'application/pdf',
// //       pdfBuffer: pdfBuffer,
// //       invoiceNumber: finalInvoiceNumber
// //     });

// //     await pdfRecord.save();

// //     // Send PDF as response
// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${fileName}"`,
// //       'Content-Length': pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in generatePDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Get saved PDFs for a creation
// // export const getSavedPDFs = async (req, res) => {
// //   try {
// //     const { creationId } = req.params;

// //     if (!creationId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID is required"
// //       });
// //     }

// //     // Find PDFs directly by creationId (new approach) or through items (legacy support)
// //     const directPDFs = await PDFModel.find({ creationId })
// //       .select('fileName fileSize generatedAt createdAt invoiceNumber')
// //       .sort({ createdAt: -1 });

// //     // Also find PDFs linked through items for backwards compatibility
// //     const items = await Item.find({ creationId });
// //     const itemIds = items.map(item => item._id);
    
// //     const itemLinkedPDFs = await PDFModel.find({ 
// //       itemId: { $in: itemIds },
// //       creationId: { $exists: false } // Only get PDFs that don't have direct creationId
// //     })
// //       .select('fileName fileSize generatedAt createdAt invoiceNumber')
// //       .sort({ createdAt: -1 });

// //     // Combine and deduplicate
// //     const allPDFs = [...directPDFs, ...itemLinkedPDFs];
    
// //     res.status(200).json({
// //       status: true,
// //       message: "PDFs retrieved successfully",
// //       data: allPDFs
// //     });

// //   } catch (error) {
// //     console.error("Error in getSavedPDFs:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Download a specific PDF
// // export const downloadPDF = async (req, res) => {
// //   try {
// //     const { pdfId } = req.params;

// //     if (!pdfId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "PDF ID is required"
// //       });
// //     }

// //     const pdfRecord = await PDFModel.findById(pdfId);
// //     if (!pdfRecord) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF not found"
// //       });
// //     }

// //     // Ensure pdfBuffer exists
// //     if (!pdfRecord.pdfBuffer) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF data not found"
// //       });
// //     }

// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${pdfRecord.fileName}"`,
// //       'Content-Length': pdfRecord.fileSize || pdfRecord.pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfRecord.pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in downloadPDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Delete a PDF
// // export const deletePDF = async (req, res) => {
// //   try {
// //     const { pdfId } = req.params;

// //     if (!pdfId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "PDF ID is required"
// //       });
// //     }

// //     const deletedPDF = await PDFModel.findByIdAndDelete(pdfId);
// //     if (!deletedPDF) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF not found"
// //       });
// //     }

// //     res.status(200).json({
// //       status: true,
// //       message: "PDF deleted successfully"
// //     });

// //   } catch (error) {
// //     console.error("Error in deletePDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // --------------------------------------------------------------------------------------------------



// // // controllers/pdfController.js
// // import PDFDocument from 'pdfkit';
// // import Item from '../models/itemModel.js';
// // import Creation from '../models/creationModel.js';
// // import PDFModel from '../models/pdfModel.js';

// // // Helper function to convert number to words (Indian system)
// // const numberToWords = (num) => {
// //   const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
// //   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
// //   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

// //   if (num === 0) return 'Zero';
// //   if (num < 10) return ones[num];
// //   if (num < 20) return teens[num - 10];
// //   if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
// //   if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
// //   if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
// //   if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + numberToWords(num % 100000) : '');

// //   return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + numberToWords(num % 10000000) : '');
// // };

// // // Helper function to format currency
// // const formatCurrency = (amount) => {
// //   return ` ${parseFloat(amount).toFixed(2)}`;
// // };

// // // Helper function to get current date in DD/MM/YYYY format
// // const getCurrentDate = () => {
// //   return new Date().toLocaleDateString('en-GB');
// // };

// // // Generate PDF Buffer (exported for use in item controller)
// // export const generatePDFBuffer = async (creationData, items, invoiceNumber, discountAmount = null, discountPercentage = null) => {
// //   return new Promise((resolve, reject) => {
// //     try {
// //       const doc = new PDFDocument({ size: 'A4', margin: 20 });
// //       const buffers = [];
      
// //       doc.on('data', buffers.push.bind(buffers));
// //       doc.on('end', () => {
// //         const pdfData = Buffer.concat(buffers);
// //         resolve(pdfData);
// //       });

// //       // A4 dimensions and layout constants
// //       const pageWidth = 595.28; // A4 width in points
// //       const pageHeight = 841.89; // A4 height in points
// //       const margin = 20;
// //       const contentWidth = pageWidth - (margin * 2);
      
// //       // Fixed footer height to ensure signature fits on page 1
// //       const footerHeight = 280;
// //       const maxContentHeight = pageHeight - margin - footerHeight - 50;

// //       // Dynamic sizing based on number of items
// //       const itemCount = items.length;
// //       let itemRowHeight, headerSpacing, fontSize;
      
// //       if (itemCount <= 5) {
// //         itemRowHeight = 22;
// //         headerSpacing = 'normal';
// //         fontSize = { regular: 10, small: 9, header: 12 };
// //       } else if (itemCount <= 10) {
// //         itemRowHeight = 18;
// //         headerSpacing = 'compact';
// //         fontSize = { regular: 9, small: 8, header: 11 };
// //       } else if (itemCount <= 15) {
// //         itemRowHeight = 15;
// //         headerSpacing = 'tight';
// //         fontSize = { regular: 8, small: 7, header: 10 };
// //       } else {
// //         itemRowHeight = 12;
// //         headerSpacing = 'minimal';
// //         fontSize = { regular: 7, small: 6, header: 9 };
// //       }

// //       // Calculate totals with manual discount support
// //       const subtotal = items.reduce((sum, item) => {
// //         const quantity = parseFloat(item.quantity) || 0;
// //         const rate = parseFloat(item.rate) || 0;
// //         return sum + (quantity * rate);
// //       }, 0);

// //       // Calculate discount - use manual discount if provided, otherwise default to 5%
// //       let discount = 0;
// //       let discountLabel = '';
      
// //       if (discountAmount !== null && discountAmount !== undefined) {
// //         // Manual discount amount provided
// //         discount = parseFloat(discountAmount) || 0;
// //         const discountPercent = subtotal > 0 ? ((discount / subtotal) * 100).toFixed(1) : 0;
// //         discountLabel = `DISCOUNT (₹${discount.toFixed(2)} - ${discountPercent}%)`;
// //       } else if (discountPercentage !== null && discountPercentage !== undefined) {
// //         // Manual discount percentage provided
// //         const discountPercent = parseFloat(discountPercentage) || 0;
// //         discount = subtotal * (discountPercent / 100);
// //         discountLabel = `DISCOUNT @${discountPercent}%`;
// //       } else {
// //         // Default 5% discount
// //         discount = subtotal * 0.05;
// //         discountLabel = 'DISCOUNT @5%';
// //       }

// //       const discountedAmount = subtotal - discount;
// //       const tax = discountedAmount * 0.05; // 5% GST
// //       const total = discountedAmount + tax;

// //       let yPosition = margin;

// //       // Center the blessing text at the top
// //       doc.fontSize(fontSize.header + 2).fillColor('black').text('|| shree ganeshay namah ||', 0, yPosition, {
// //         width: pageWidth,
// //         align: 'center'
// //       });
// //       yPosition += (headerSpacing === 'minimal' ? 18 : headerSpacing === 'tight' ? 22 : headerSpacing === 'compact' ? 25 : 30);

// //       // Header Section
// //       doc.fontSize(fontSize.header + 10).fillColor('#0066CC').text('Swara Fashion', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : headerSpacing === 'compact' ? 28 : 32);

// //       const addressSpacing = headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : headerSpacing === 'compact' ? 14 : 16;

// //       doc.fontSize(fontSize.regular + 1).fillColor('black')
// //         .text('PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD, SURAT,', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('Gujarat, 394107', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('Mobile: 9978809103', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('GSTIN: 24CFNPS0464N2ZU', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 16 : headerSpacing === 'tight' ? 20 : headerSpacing === 'compact' ? 24 : 28);

// //       // Header line
// //       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : headerSpacing === 'compact' ? 18 : 20);

// //       // Invoice Header
// //       const invoiceHeaderHeight = headerSpacing === 'minimal' ? 20 : headerSpacing === 'tight' ? 22 : 25;
// //       doc.rect(margin, yPosition, contentWidth, invoiceHeaderHeight).fill('#E8E8E8');
// //       doc.fillColor('black').fontSize(fontSize.header + 1).text('TAX INVOICE - ORIGINAL FOR RECIPIENT', margin + 8, yPosition + 7);
// //       yPosition += invoiceHeaderHeight + 6;

// //       // Invoice Info
// //       doc.fontSize(fontSize.regular + 1)
// //          .text(`Invoice No: ${invoiceNumber}`, margin, yPosition)
// //          .text(`Invoice Date: ${getCurrentDate()}`, pageWidth - 180, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : 18);

// //       doc.text('Challan No: ', margin, yPosition)
// //          .text('Challan Date: ', pageWidth - 180, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 15 : headerSpacing === 'tight' ? 18 : 22);

// //       // Bill To Section
// //       doc.fontSize(fontSize.header + 1).font('Helvetica-Bold').text('BILL TO', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : 15);

// //       const billToSpacing = headerSpacing === 'minimal' ? 8 : headerSpacing === 'tight' ? 10 : 12;

// //       doc.fontSize(fontSize.small + 1).font('Helvetica')
// //          .text(creationData.name, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(creationData.address, margin, yPosition, { width: 350 });
// //       yPosition += billToSpacing * 1.3;
// //       doc.text(`GSTIN: ${creationData.gstno}`, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(`PAN Number: ${creationData.panno}`, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(`State: ${creationData.state}`, margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 16 : 20);

// //       // Items Table Header
// //       const tableTop = yPosition;
// //       const tableHeaderHeight = headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : 28;
// //       doc.rect(margin, tableTop, contentWidth, tableHeaderHeight).fill('#4A90E2');
// //       doc.fillColor('white').fontSize(fontSize.small + 1).font('Helvetica-Bold')
// //          .text('ITEMS', margin + 8, tableTop + 8)
// //          .text('HSN No.', margin + 160, tableTop + 8)
// //          .text('QTY.', margin + 240, tableTop + 8)
// //          .text('RATE', margin + 300, tableTop + 8)
// //          .text('TAX', margin + 380, tableTop + 8)
// //          .text('AMOUNT', margin + 450, tableTop + 8);
      
// //       yPosition = tableTop + tableHeaderHeight;

// //       // Items Table Rows
// //       doc.fillColor('black').font('Helvetica');
// //       items.forEach((item, index) => {
// //         const amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
        
// //         doc.fontSize(fontSize.small + 1)
// //            .text(item.itemName || item.description || '', margin + 8, yPosition + 5, { width: 150 })
// //            .text('9988', margin + 160, yPosition + 5)
// //            .text(parseFloat(item.quantity || 0).toFixed(2), margin + 240, yPosition + 5)
// //            .text(formatCurrency(item.rate || 0), margin + 300, yPosition + 5)
// //            .text('5%', margin + 380, yPosition + 5)
// //            .text(formatCurrency(amount), margin + 450, yPosition + 5);

// //         yPosition += itemRowHeight;
        
// //         // Row separator line
// //         doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
// //       });

// //       // Force footer to start at calculated position to fit on page 1
// //       const footerStartY = pageHeight - margin - footerHeight;
// //       yPosition = Math.max(yPosition + 20, footerStartY - 50);

// //       // BANK DETAILS AND TOTALS SECTION
// //       const bankTotalsY = yPosition+45;
// //       const bankTotalsHeight = 120;
      
// //       // Bank Details Box (Left side)
// //       doc.rect(margin, bankTotalsY, 500, bankTotalsHeight).fill('#F8F8F8').stroke();
// //       doc.fillColor('black').fontSize(fontSize.regular + 1).font('Helvetica-Bold')
// //          .text('BANK DETAILS', margin + 12, bankTotalsY + 12);
      
// //       doc.fontSize(fontSize.small + 1).font('Helvetica')
// //          .text('Bank Name: THE VARACHHA CO. OP BANK LTD.', margin + 12, bankTotalsY + 28)
// //          .text('Account Name: Swara Fashion', margin + 12, bankTotalsY + 44)
// //          .text('Account No: 00730110470924', margin + 12, bankTotalsY + 60)
// //          .text('IFSC Code: VARA0289007', margin + 12, bankTotalsY + 76)
// //          .text('Branch: PUNAGAM', margin + 12, bankTotalsY + 92);

// //       // Totals Section (Right side)
// //       const totalsX = margin + 320;
// //       const totalsWidth = contentWidth - 320;
      
// //       // Totals background
// //       doc.rect(totalsX, bankTotalsY, totalsWidth, bankTotalsHeight).fill('#FAFAFA').stroke();
      
// //       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica');
      
// //       const totalsLeftMargin = totalsX + 12;
// //       const totalsRightMargin = totalsX + totalsWidth - 12;
      
// //       doc.text('SUBTOTAL', totalsLeftMargin, bankTotalsY + 12)
// //          .text(formatCurrency(subtotal), totalsRightMargin - 90, bankTotalsY + 12, { align: 'right', width: 90 });
      
// //       // Use dynamic discount label and amount
// //       doc.text(discountLabel, totalsLeftMargin, bankTotalsY + 28)
// //          .text(`- ${formatCurrency(discount)}`, totalsRightMargin - 90, bankTotalsY + 28, { align: 'right', width: 90 });
      
// //       doc.moveTo(totalsLeftMargin, bankTotalsY + 44).lineTo(totalsRightMargin, bankTotalsY + 44).stroke();
      
// //       doc.text('AMOUNT AFTER DISCOUNT', totalsLeftMargin, bankTotalsY + 50)
// //          .text(formatCurrency(discountedAmount), totalsRightMargin - 90, bankTotalsY + 50, { align: 'right', width: 90 });
      
// //       doc.text('CGST @2.5%', totalsLeftMargin, bankTotalsY + 66)
// //          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 66, { align: 'right', width: 90 });
      
// //       doc.text('SGST @2.5%', totalsLeftMargin, bankTotalsY + 82)
// //          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 82, { align: 'right', width: 90 });
      
// //       doc.moveTo(totalsLeftMargin, bankTotalsY + 98).lineTo(totalsRightMargin, bankTotalsY + 98).stroke();
      
// //       doc.fontSize(fontSize.regular + 1).font('Helvetica-Bold')
// //          .text('TOTAL AMOUNT', totalsLeftMargin, bankTotalsY + 104)
// //          .text(formatCurrency(total), totalsRightMargin - 90, bankTotalsY + 104, { align: 'right', width: 90 });

// //       // AMOUNT IN WORDS SECTION
// //       yPosition = bankTotalsY + bankTotalsHeight + 8;
// //       const amountWordsHeight = 50;
// //       doc.rect(margin, yPosition, contentWidth, amountWordsHeight).fill('#F0F0F0').stroke();
      
// //       const totalWords = numberToWords(Math.floor(total));
// //       const paise = Math.round((total % 1) * 100);
// //       const paiseWords = paise > 0 ? ` and ${numberToWords(paise)} Paise` : '';
      
// //       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica-Bold')
// //          .text('Amount in Words:', margin + 12, yPosition + 8);
// //       doc.font('Helvetica')
// //          .text(`${totalWords} Rupees${paiseWords} Only`, margin + 12, yPosition + 24, { 
// //            width: contentWidth - 24, 
// //            align: 'left' 
// //          });

// //       // SIGNATURE SECTION - Replaced with Code 2 implementation
// //       yPosition += amountWordsHeight + 12;
      
// //       // Top border line
// //       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
      
// //       yPosition += 15;
      
// //       const signatureY = yPosition; // Define signatureY variable
// //       const signatureHeight = 80;
      
// //       doc.fontSize(9).font('Helvetica')
// //          .text('Customer Signature', 80, signatureY + 35)
// //          .text('Authorized Signatory', 400, signatureY + 35);
      
// //       // Signature lines
// //       doc.moveTo(60, signatureY + 30).lineTo(180, signatureY + 30).stroke();
// //       doc.moveTo(380, signatureY + 30).lineTo(500, signatureY + 30).stroke();
      
// //       // Company name under signature
// //       doc.fontSize(8).font('Helvetica-Bold')
// //          .text('SWARA FASHION', 400, signatureY + 45);
         
// //       doc.end();
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // };

// // // Generate PDF for current session items (matches frontend endpoint)
// // export const generateCurrentSession = async (req, res) => {
// //   try {
// //     const { creationId, invoiceNumber, currentSessionItems, discountAmount, discountPercentage } = req.body;

// //     if (!creationId || !currentSessionItems || currentSessionItems.length === 0) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID and current session items are required"
// //       });
// //     }

// //     // Fetch creation data
// //     const creationData = await Creation.findById(creationId);
// //     if (!creationData) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "Creation not found"
// //       });
// //     }

// //     // Convert current session items to the format expected by PDF generator
// //     const formattedItems = currentSessionItems.map(item => ({
// //       itemName: item.description || item.itemName,
// //       quantity: item.quantity,
// //       rate: item.rate
// //     }));

// //     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;
    
// //     // Generate PDF buffer with manual discount support
// //     const pdfBuffer = await generatePDFBuffer(creationData, formattedItems, finalInvoiceNumber, discountAmount, discountPercentage);

// //     // Create filename
// //     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

// //     // Save PDF to database
// //     const pdfRecord = new PDFModel({
// //       creationId: creationId,
// //       fileName: fileName,
// //       fileSize: pdfBuffer.length,
// //       mimeType: 'application/pdf',
// //       pdfBuffer: pdfBuffer,
// //       invoiceNumber: finalInvoiceNumber
// //     });

// //     await pdfRecord.save();

// //     // Send PDF as response for download
// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${fileName}"`,
// //       'Content-Length': pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in generateCurrentSession:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Generate PDF Controller (legacy - for all items in creation)
// // export const generatePDF = async (req, res) => {
// //   try {
// //     const { creationId, invoiceNumber, discountAmount, discountPercentage } = req.body;

// //     if (!creationId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID is required"
// //       });
// //     }

// //     // Fetch creation data
// //     const creationData = await Creation.findById(creationId);
// //     if (!creationData) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "Creation not found"
// //       });
// //     }

// //     // Fetch items for this creation
// //     const items = await Item.find({ creationId });
// //     if (!items || items.length === 0) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "No items found for this creation. Please add items before generating PDF."
// //       });
// //     }

// //     // Generate invoice number if not provided
// //     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;

// //     // Generate PDF buffer with manual discount support
// //     const pdfBuffer = await generatePDFBuffer(creationData, items, finalInvoiceNumber, discountAmount, discountPercentage);

// //     // Create filename
// //     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

// //     // Save PDF to database
// //     const pdfRecord = new PDFModel({
// //       creationId: creationId,
// //       itemId: items[0]._id, // Using first item's ID as reference for backwards compatibility
// //       fileName: fileName,
// //       fileSize: pdfBuffer.length,
// //       mimeType: 'application/pdf',
// //       pdfBuffer: pdfBuffer,
// //       invoiceNumber: finalInvoiceNumber
// //     });

// //     await pdfRecord.save();

// //     // Send PDF as response
// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${fileName}"`,
// //       'Content-Length': pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in generatePDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Get saved PDFs for a creation
// // export const getSavedPDFs = async (req, res) => {
// //   try {
// //     const { creationId } = req.params;

// //     if (!creationId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID is required"
// //       });
// //     }

// //     // Find PDFs directly by creationId (new approach) or through items (legacy support)
// //     const directPDFs = await PDFModel.find({ creationId })
// //       .select('fileName fileSize generatedAt createdAt invoiceNumber')
// //       .sort({ createdAt: -1 });

// //     // Also find PDFs linked through items for backwards compatibility
// //     const items = await Item.find({ creationId });
// //     const itemIds = items.map(item => item._id);
    
// //     const itemLinkedPDFs = await PDFModel.find({ 
// //       itemId: { $in: itemIds },
// //       creationId: { $exists: false } // Only get PDFs that don't have direct creationId
// //     })
// //       .select('fileName fileSize generatedAt createdAt invoiceNumber')
// //       .sort({ createdAt: -1 });

// //     // Combine and deduplicate
// //     const allPDFs = [...directPDFs, ...itemLinkedPDFs];
    
// //     res.status(200).json({
// //       status: true,
// //       message: "PDFs retrieved successfully",
// //       data: allPDFs
// //     });

// //   } catch (error) {
// //     console.error("Error in getSavedPDFs:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Download a specific PDF
// // export const downloadPDF = async (req, res) => {
// //   try {
// //     const { pdfId } = req.params;

// //     if (!pdfId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "PDF ID is required"
// //       });
// //     }

// //     const pdfRecord = await PDFModel.findById(pdfId);
// //     if (!pdfRecord) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF not found"
// //       });
// //     }

// //     // Ensure pdfBuffer exists
// //     if (!pdfRecord.pdfBuffer) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF data not found"
// //       });
// //     }

// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${pdfRecord.fileName}"`,
// //       'Content-Length': pdfRecord.fileSize || pdfRecord.pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfRecord.pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in downloadPDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Delete a PDF
// // export const deletePDF = async (req, res) => {
// //   try {
// //     const { pdfId } = req.params;

// //     if (!pdfId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "PDF ID is required"
// //       });
// //     }

// //     const deletedPDF = await PDFModel.findByIdAndDelete(pdfId);
// //     if (!deletedPDF) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF not found"
// //       });
// //     }

// //     res.status(200).json({
// //       status: true,
// //       message: "PDF deleted successfully"
// //     });

// //   } catch (error) {
// //     console.error("Error in deletePDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // --------------------------------------------------------------------------------------------------

// // // controllers/pdfController.js
// // import PDFDocument from 'pdfkit';
// // import Item from '../models/itemModel.js';
// // import Creation from '../models/creationModel.js';
// // import PDFModel from '../models/pdfModel.js';

// // // Helper function to convert number to words (Indian system)
// // const numberToWords = (num) => {
// //   const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
// //   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
// //   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

// //   if (num === 0) return 'Zero';
// //   if (num < 10) return ones[num];
// //   if (num < 20) return teens[num - 10];
// //   if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
// //   if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
// //   if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
// //   if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + numberToWords(num % 100000) : '');

// //   return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + numberToWords(num % 10000000) : '');
// // };

// // // Helper function to format currency
// // const formatCurrency = (amount) => {
// //   return ` ${parseFloat(amount).toFixed(2)}`;
// // };

// // // Helper function to get current date in DD/MM/YYYY format
// // const getCurrentDate = () => {
// //   return new Date().toLocaleDateString('en-GB');
// // };

// // // Generate PDF Buffer (exported for use in item controller)
// // export const generatePDFBuffer = async (creationData, items, invoiceNumber, discountAmount = null, discountPercentage = null) => {
// //   return new Promise((resolve, reject) => {
// //     try {
// //       const doc = new PDFDocument({ size: 'A4', margin: 20 });
// //       const buffers = [];
      
// //       doc.on('data', buffers.push.bind(buffers));
// //       doc.on('end', () => {
// //         const pdfData = Buffer.concat(buffers);
// //         resolve(pdfData);
// //       });

// //       // A4 dimensions and layout constants
// //       const pageWidth = 595.28; // A4 width in points
// //       const pageHeight = 841.89; // A4 height in points
// //       const margin = 20;
// //       const contentWidth = pageWidth - (margin * 2);
      
// //       // Fixed footer height to ensure signature fits on page 1
// //       const footerHeight = 280;
// //       const maxContentHeight = pageHeight - margin - footerHeight - 50;

// //       // Dynamic sizing based on number of items
// //       const itemCount = items.length;
// //       let itemRowHeight, headerSpacing, fontSize;
      
// //       if (itemCount <= 5) {
// //         itemRowHeight = 22;
// //         headerSpacing = 'normal';
// //         fontSize = { regular: 10, small: 9, header: 12 };
// //       } else if (itemCount <= 10) {
// //         itemRowHeight = 18;
// //         headerSpacing = 'compact';
// //         fontSize = { regular: 9, small: 8, header: 11 };
// //       } else if (itemCount <= 15) {
// //         itemRowHeight = 15;
// //         headerSpacing = 'tight';
// //         fontSize = { regular: 8, small: 7, header: 10 };
// //       } else {
// //         itemRowHeight = 12;
// //         headerSpacing = 'minimal';
// //         fontSize = { regular: 7, small: 6, header: 9 };
// //       }

// //       // Calculate totals with manual discount support
// //       const subtotal = items.reduce((sum, item) => {
// //         const quantity = parseFloat(item.quantity) || 0;
// //         const rate = parseFloat(item.rate) || 0;
// //         return sum + (quantity * rate);
// //       }, 0);

// //       // Calculate discount - use manual discount if provided, otherwise default to 5%
// //       let discount = 0;
// //       let discountLabel = '';
      
// //       if (discountAmount !== null && discountAmount !== undefined) {
// //         // Manual discount amount provided
// //         discount = parseFloat(discountAmount) || 0;
// //         const discountPercent = subtotal > 0 ? ((discount / subtotal) * 100).toFixed(1) : 0;
// //         discountLabel = `DISCOUNT (₹${discount.toFixed(2)} - ${discountPercent}%)`;
// //       } else if (discountPercentage !== null && discountPercentage !== undefined) {
// //         // Manual discount percentage provided
// //         const discountPercent = parseFloat(discountPercentage) || 0;
// //         discount = subtotal * (discountPercent / 100);
// //         discountLabel = `DISCOUNT @${discountPercent}%`;
// //       } else {
// //         // Default 5% discount
// //         discount = subtotal * 0.05;
// //         discountLabel = 'DISCOUNT @5%';
// //       }

// //       const discountedAmount = subtotal - discount;
// //       const tax = discountedAmount * 0.05; // 5% GST
// //       const total = discountedAmount + tax;

// //       let yPosition = margin;

// //       // Center the blessing text at the top
// //       doc.fontSize(fontSize.header + 2).fillColor('black').text('|| shree ganeshay namah ||', 0, yPosition, {
// //         width: pageWidth,
// //         align: 'center'
// //       });
// //       yPosition += (headerSpacing === 'minimal' ? 18 : headerSpacing === 'tight' ? 22 : headerSpacing === 'compact' ? 25 : 30);

// //       // Header Section
// //       doc.fontSize(fontSize.header + 10).fillColor('#0066CC').text('Swara Fashion', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : headerSpacing === 'compact' ? 28 : 32);

// //       const addressSpacing = headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : headerSpacing === 'compact' ? 14 : 16;

// //       doc.fontSize(fontSize.regular + 1).fillColor('black')
// //         .text('PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD, SURAT,', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('Gujarat, 394107', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('Mobile: 9978809103', margin, yPosition);
// //       yPosition += addressSpacing;
// //       doc.text('GSTIN: 24CFNPS0464N2ZU', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 16 : headerSpacing === 'tight' ? 20 : headerSpacing === 'compact' ? 24 : 28);

// //       // Header line
// //       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : headerSpacing === 'compact' ? 18 : 20);

// //       // Invoice Header
// //       const invoiceHeaderHeight = headerSpacing === 'minimal' ? 20 : headerSpacing === 'tight' ? 22 : 25;
// //       doc.rect(margin, yPosition, contentWidth, invoiceHeaderHeight).fill('#E8E8E8');
// //       doc.fillColor('black').fontSize(fontSize.header + 1).text('TAX INVOICE - ORIGINAL FOR RECIPIENT', margin + 8, yPosition + 7);
// //       yPosition += invoiceHeaderHeight + 6;

// //       // Invoice Info
// //       doc.fontSize(fontSize.regular + 1)
// //          .text(`Invoice No: ${invoiceNumber}`, margin, yPosition)
// //          .text(`Invoice Date: ${getCurrentDate()}`, pageWidth - 180, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : 18);

// //       doc.text('Challan No: ', margin, yPosition)
// //          .text('Challan Date: ', pageWidth - 180, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 15 : headerSpacing === 'tight' ? 18 : 22);

// //       // Bill To Section
// //       doc.fontSize(fontSize.header + 1).font('Helvetica-Bold').text('BILL TO', margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : 15);

// //       const billToSpacing = headerSpacing === 'minimal' ? 8 : headerSpacing === 'tight' ? 10 : 12;

// //       doc.fontSize(fontSize.small + 1).font('Helvetica')
// //          .text(creationData.name, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(creationData.address, margin, yPosition, { width: 350 });
// //       yPosition += billToSpacing * 1.3;
// //       doc.text(`GSTIN: ${creationData.gstno}`, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(`PAN Number: ${creationData.panno}`, margin, yPosition);
// //       yPosition += billToSpacing;
// //       doc.text(`State: ${creationData.state}`, margin, yPosition);
// //       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 16 : 20);

// //       // Items Table Header
// //       const tableTop = yPosition;
// //       const tableHeaderHeight = headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : 28;
// //       doc.rect(margin, tableTop, contentWidth, tableHeaderHeight).fill('#4A90E2');
// //       doc.fillColor('white').fontSize(fontSize.small + 1).font('Helvetica-Bold')
// //          .text('ITEMS', margin + 8, tableTop + 8)
// //          .text('HSN No.', margin + 160, tableTop + 8)
// //          .text('QTY.', margin + 240, tableTop + 8)
// //          .text('RATE', margin + 300, tableTop + 8)
// //          .text('TAX', margin + 380, tableTop + 8)
// //          .text('AMOUNT', margin + 450, tableTop + 8);
      
// //       yPosition = tableTop + tableHeaderHeight;

// //       // Items Table Rows
// //       doc.fillColor('black').font('Helvetica');
// //       items.forEach((item, index) => {
// //         const amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
        
// //         doc.fontSize(fontSize.small + 1)
// //            .text(item.itemName || item.description || '', margin + 8, yPosition + 5, { width: 150 })
// //            .text('9988', margin + 160, yPosition + 5)
// //            .text(parseFloat(item.quantity || 0).toFixed(2), margin + 240, yPosition + 5)
// //            .text(formatCurrency(item.rate || 0), margin + 300, yPosition + 5)
// //            .text('5%', margin + 380, yPosition + 5)
// //            .text(formatCurrency(amount), margin + 450, yPosition + 5);

// //         yPosition += itemRowHeight;
        
// //         // Row separator line
// //         doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
// //       });

// //       // Force footer to start at calculated position to fit on page 1
// //       const footerStartY = pageHeight - margin - footerHeight;
// //       yPosition = Math.max(yPosition + 20, footerStartY - 50);

// //       // BANK DETAILS AND TOTALS SECTION
// //       const bankTotalsY = yPosition+45;
// //       const bankTotalsHeight = 120;
      
// //       // Bank Details Box (Left side)
// //       doc.rect(margin, bankTotalsY, 500, bankTotalsHeight).fill('#F8F8F8').stroke();
// //       doc.fillColor('black').fontSize(fontSize.regular + 1).font('Helvetica-Bold')
// //          .text('BANK DETAILS', margin + 12, bankTotalsY + 12);
      
// //       doc.fontSize(fontSize.small + 1).font('Helvetica')
// //          .text('Bank Name: THE VARACHHA CO. OP BANK LTD.', margin + 12, bankTotalsY + 28)
// //          .text('Account Name: Swara Fashion', margin + 12, bankTotalsY + 44)
// //          .text('Account No: 00730110470924', margin + 12, bankTotalsY + 60)
// //          .text('IFSC Code: VARA0289007', margin + 12, bankTotalsY + 76)
// //          .text('Branch: PUNAGAM', margin + 12, bankTotalsY + 92);

// //       // Totals Section (Right side)
// //       const totalsX = margin + 320;
// //       const totalsWidth = contentWidth - 320;
      
// //       // Totals background
// //       doc.rect(totalsX, bankTotalsY, totalsWidth, bankTotalsHeight).fill('#FAFAFA').stroke();
      
// //       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica');
      
// //       const totalsLeftMargin = totalsX + 12;
// //       const totalsRightMargin = totalsX + totalsWidth - 12;
      
// //       doc.text('SUBTOTAL', totalsLeftMargin, bankTotalsY + 12)
// //          .text(formatCurrency(subtotal), totalsRightMargin - 90, bankTotalsY + 12, { align: 'right', width: 90 });
      
// //       // Use dynamic discount label and amount
// //       doc.text(discountLabel, totalsLeftMargin, bankTotalsY + 28)
// //          .text(`- ${formatCurrency(discount)}`, totalsRightMargin - 90, bankTotalsY + 28, { align: 'right', width: 90 });
      
// //       doc.moveTo(totalsLeftMargin, bankTotalsY + 44).lineTo(totalsRightMargin, bankTotalsY + 44).stroke();
      
// //       doc.text('AMOUNT AFTER DISCOUNT', totalsLeftMargin, bankTotalsY + 50)
// //          .text(formatCurrency(discountedAmount), totalsRightMargin - 90, bankTotalsY + 50, { align: 'right', width: 90 });
      
// //       doc.text('CGST @2.5%', totalsLeftMargin, bankTotalsY + 66)
// //          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 66, { align: 'right', width: 90 });
      
// //       doc.text('SGST @2.5%', totalsLeftMargin, bankTotalsY + 82)
// //          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 82, { align: 'right', width: 90 });
      
// //       doc.moveTo(totalsLeftMargin, bankTotalsY + 98).lineTo(totalsRightMargin, bankTotalsY + 98).stroke();
      
// //       doc.fontSize(fontSize.regular + 1).font('Helvetica-Bold')
// //          .text('TOTAL AMOUNT', totalsLeftMargin, bankTotalsY + 104)
// //          .text(formatCurrency(total), totalsRightMargin - 90, bankTotalsY + 104, { align: 'right', width: 90 });

// //       // AMOUNT IN WORDS SECTION
// //       yPosition = bankTotalsY + bankTotalsHeight + 8;
// //       const amountWordsHeight = 50;
// //       doc.rect(margin, yPosition, contentWidth, amountWordsHeight).fill('#F0F0F0').stroke();
      
// //       const totalWords = numberToWords(Math.floor(total));
// //       const paise = Math.round((total % 1) * 100);
// //       const paiseWords = paise > 0 ? ` and ${numberToWords(paise)} Paise` : '';
      
// //       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica-Bold')
// //          .text('Amount in Words:', margin + 12, yPosition + 8);
// //       doc.font('Helvetica')
// //          .text(`${totalWords} Rupees${paiseWords} Only`, margin + 12, yPosition + 24, { 
// //            width: contentWidth - 24, 
// //            align: 'left' 
// //          });

// //       // SIGNATURE SECTION - Replaced with Code 2 implementation
// //       yPosition += amountWordsHeight + 12;
      
// //       // Top border line
// //       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
      
// //       yPosition += 15;
      
// //       const signatureY = yPosition; // Define signatureY variable
// //       const signatureHeight = 80;
      
// //       doc.fontSize(9).font('Helvetica')
// //          .text('Customer Signature', 80, signatureY + 35)
// //          .text('Authorized Signatory', 400, signatureY + 35);
      
// //       // Signature lines
// //       doc.moveTo(60, signatureY + 30).lineTo(180, signatureY + 30).stroke();
// //       doc.moveTo(380, signatureY + 30).lineTo(500, signatureY + 30).stroke();
      
// //       // Company name under signature
// //       doc.fontSize(8).font('Helvetica-Bold')
// //          .text('SWARA FASHION', 400, signatureY + 45);
         
// //       doc.end();
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // };

// // // Get total count of PDFs - NEW FUNCTION
// // export const getTotalPDFCount = async (req, res) => {
// //   try {
// //     const totalCount = await PDFModel.countDocuments();
    
// //     res.status(200).json({
// //       status: true,
// //       message: "Total PDF count retrieved successfully",
// //       data: {
// //         totalPDFs: totalCount
// //       }
// //     });

// //   } catch (error) {
// //     console.error("Error in getTotalPDFCount:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Generate PDF for current session items (matches frontend endpoint)
// // export const generateCurrentSession = async (req, res) => {
// //   try {
// //     const { creationId, invoiceNumber, currentSessionItems, discountAmount, discountPercentage } = req.body;

// //     if (!creationId || !currentSessionItems || currentSessionItems.length === 0) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID and current session items are required"
// //       });
// //     }

// //     // Fetch creation data
// //     const creationData = await Creation.findById(creationId);
// //     if (!creationData) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "Creation not found"
// //       });
// //     }

// //     // Convert current session items to the format expected by PDF generator
// //     const formattedItems = currentSessionItems.map(item => ({
// //       itemName: item.description || item.itemName,
// //       quantity: item.quantity,
// //       rate: item.rate
// //     }));

// //     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;
    
// //     // Generate PDF buffer with manual discount support
// //     const pdfBuffer = await generatePDFBuffer(creationData, formattedItems, finalInvoiceNumber, discountAmount, discountPercentage);

// //     // Create filename
// //     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

// //     // Save PDF to database
// //     const pdfRecord = new PDFModel({
// //       creationId: creationId,
// //       fileName: fileName,
// //       fileSize: pdfBuffer.length,
// //       mimeType: 'application/pdf',
// //       pdfBuffer: pdfBuffer,
// //       invoiceNumber: finalInvoiceNumber
// //     });

// //     await pdfRecord.save();

// //     // Send PDF as response for download
// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${fileName}"`,
// //       'Content-Length': pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in generateCurrentSession:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Generate PDF Controller (legacy - for all items in creation)
// // export const generatePDF = async (req, res) => {
// //   try {
// //     const { creationId, invoiceNumber, discountAmount, discountPercentage } = req.body;

// //     if (!creationId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID is required"
// //       });
// //     }

// //     // Fetch creation data
// //     const creationData = await Creation.findById(creationId);
// //     if (!creationData) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "Creation not found"
// //       });
// //     }

// //     // Fetch items for this creation
// //     const items = await Item.find({ creationId });
// //     if (!items || items.length === 0) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "No items found for this creation. Please add items before generating PDF."
// //       });
// //     }

// //     // Generate invoice number if not provided
// //     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;

// //     // Generate PDF buffer with manual discount support
// //     const pdfBuffer = await generatePDFBuffer(creationData, items, finalInvoiceNumber, discountAmount, discountPercentage);

// //     // Create filename
// //     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

// //     // Save PDF to database
// //     const pdfRecord = new PDFModel({
// //       creationId: creationId,
// //       itemId: items[0]._id, // Using first item's ID as reference for backwards compatibility
// //       fileName: fileName,
// //       fileSize: pdfBuffer.length,
// //       mimeType: 'application/pdf',
// //       pdfBuffer: pdfBuffer,
// //       invoiceNumber: finalInvoiceNumber
// //     });

// //     await pdfRecord.save();

// //     // Send PDF as response
// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${fileName}"`,
// //       'Content-Length': pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in generatePDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Get saved PDFs for a creation
// // export const getSavedPDFs = async (req, res) => {
// //   try {
// //     const { creationId } = req.params;

// //     if (!creationId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "Creation ID is required"
// //       });
// //     }

// //     // Find PDFs directly by creationId (new approach) or through items (legacy support)
// //     const directPDFs = await PDFModel.find({ creationId })
// //       .select('fileName fileSize generatedAt createdAt invoiceNumber')
// //       .sort({ createdAt: -1 });

// //     // Also find PDFs linked through items for backwards compatibility
// //     const items = await Item.find({ creationId });
// //     const itemIds = items.map(item => item._id);
    
// //     const itemLinkedPDFs = await PDFModel.find({ 
// //       itemId: { $in: itemIds },
// //       creationId: { $exists: false } // Only get PDFs that don't have direct creationId
// //     })
// //       .select('fileName fileSize generatedAt createdAt invoiceNumber')
// //       .sort({ createdAt: -1 });

// //     // Combine and deduplicate
// //     const allPDFs = [...directPDFs, ...itemLinkedPDFs];
    
// //     res.status(200).json({
// //       status: true,
// //       message: "PDFs retrieved successfully",
// //       data: allPDFs
// //     });

// //   } catch (error) {
// //     console.error("Error in getSavedPDFs:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Download a specific PDF
// // export const downloadPDF = async (req, res) => {
// //   try {
// //     const { pdfId } = req.params;

// //     if (!pdfId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "PDF ID is required"
// //       });
// //     }

// //     const pdfRecord = await PDFModel.findById(pdfId);
// //     if (!pdfRecord) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF not found"
// //       });
// //     }

// //     // Ensure pdfBuffer exists
// //     if (!pdfRecord.pdfBuffer) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF data not found"
// //       });
// //     }

// //     res.set({
// //       'Content-Type': 'application/pdf',
// //       'Content-Disposition': `attachment; filename="${pdfRecord.fileName}"`,
// //       'Content-Length': pdfRecord.fileSize || pdfRecord.pdfBuffer.length,
// //     });

// //     res.status(200).send(pdfRecord.pdfBuffer);

// //   } catch (error) {
// //     console.error("Error in downloadPDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };

// // // Delete a PDF
// // export const deletePDF = async (req, res) => {
// //   try {
// //     const { pdfId } = req.params;

// //     if (!pdfId) {
// //       return res.status(400).json({
// //         status: false,
// //         message: "PDF ID is required"
// //       });
// //     }

// //     const deletedPDF = await PDFModel.findByIdAndDelete(pdfId);
// //     if (!deletedPDF) {
// //       return res.status(404).json({
// //         status: false,
// //         message: "PDF not found"
// //       });
// //     }

// //     res.status(200).json({
// //       status: true,
// //       message: "PDF deleted successfully"
// //     });

// //   } catch (error) {
// //     console.error("Error in deletePDF:", error);
// //     res.status(500).json({
// //       status: false,
// //       message: "Internal Server Error",
// //       error: error.message
// //     });
// //   }
// // };



// // --------------------------------------------------------------------------------------------------

// // controllers/pdfController.js
// import PDFDocument from 'pdfkit';
// import Item from '../models/itemModel.js';
// import Creation from '../models/creationModel.js';
// import PDFModel from '../models/pdfModel.js';

// // Helper function to convert number to words (Indian system)
// const numberToWords = (num) => {
//   const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//   if (num === 0) return 'Zero';
//   if (num < 10) return ones[num];
//   if (num < 20) return teens[num - 10];
//   if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
//   if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
//   if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
//   if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + numberToWords(num % 100000) : '');

//   return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + numberToWords(num % 10000000) : '');
// };

// // Helper function to format currency
// const formatCurrency = (amount) => {
//   return ` ${parseFloat(amount).toFixed(2)}`;
// };

// // Helper function to format date in DD/MM/YYYY format
// const formatDate = (date) => {
//   if (!date) return new Date().toLocaleDateString('en-GB');
  
//   // If date is a string, parse it
//   const dateObj = typeof date === 'string' ? new Date(date) : date;
  
//   // Check if date is valid
//   if (isNaN(dateObj.getTime())) {
//     return new Date().toLocaleDateString('en-GB');
//   }
  
//   return dateObj.toLocaleDateString('en-GB');
// };

// // Helper function to get current date in DD/MM/YYYY format (kept for backwards compatibility)
// const getCurrentDate = () => {
//   return new Date().toLocaleDateString('en-GB');
// };

// // Generate PDF Buffer (exported for use in item controller)
// export const generatePDFBuffer = async (creationData, items, invoiceNumber, discountAmount = null, discountPercentage = null, invoiceDate = null) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ size: 'A4', margin: 20 });
//       const buffers = [];
      
//       doc.on('data', buffers.push.bind(buffers));
//       doc.on('end', () => {
//         const pdfData = Buffer.concat(buffers);
//         resolve(pdfData);
//       });

//       // A4 dimensions and layout constants
//       const pageWidth = 595.28; // A4 width in points
//       const pageHeight = 841.89; // A4 height in points
//       const margin = 20;
//       const contentWidth = pageWidth - (margin * 2);
      
//       // Fixed footer height to ensure signature fits on page 1
//       const footerHeight = 280;
//       const maxContentHeight = pageHeight - margin - footerHeight - 50;

//       // Dynamic sizing based on number of items
//       const itemCount = items.length;
//       let itemRowHeight, headerSpacing, fontSize;
      
//       if (itemCount <= 5) {
//         itemRowHeight = 22;
//         headerSpacing = 'normal';
//         fontSize = { regular: 10, small: 9, header: 12 };
//       } else if (itemCount <= 10) {
//         itemRowHeight = 18;
//         headerSpacing = 'compact';
//         fontSize = { regular: 9, small: 8, header: 11 };
//       } else if (itemCount <= 15) {
//         itemRowHeight = 15;
//         headerSpacing = 'tight';
//         fontSize = { regular: 8, small: 7, header: 10 };
//       } else {
//         itemRowHeight = 12;
//         headerSpacing = 'minimal';
//         fontSize = { regular: 7, small: 6, header: 9 };
//       }

//       // Calculate totals with manual discount support
//       const subtotal = items.reduce((sum, item) => {
//         const quantity = parseFloat(item.quantity) || 0;
//         const rate = parseFloat(item.rate) || 0;
//         return sum + (quantity * rate);
//       }, 0);

//       // Calculate discount - use manual discount if provided, otherwise default to 5%
//       let discount = 0;
//       let discountLabel = '';
      
//       if (discountAmount !== null && discountAmount !== undefined) {
//         // Manual discount amount provided
//         discount = parseFloat(discountAmount) || 0;
//         const discountPercent = subtotal > 0 ? ((discount / subtotal) * 100).toFixed(1) : 0;
//         discountLabel = `DISCOUNT (₹${discount.toFixed(2)} - ${discountPercent}%)`;
//       } else if (discountPercentage !== null && discountPercentage !== undefined) {
//         // Manual discount percentage provided
//         const discountPercent = parseFloat(discountPercentage) || 0;
//         discount = subtotal * (discountPercent / 100);
//         discountLabel = `DISCOUNT @${discountPercent}%`;
//       } else {
//         // Default 5% discount
//         discount = subtotal * 0.05;
//         discountLabel = 'DISCOUNT @5%';
//       }

//       const discountedAmount = subtotal - discount;
//       const tax = discountedAmount * 0.05; // 5% GST
//       const total = discountedAmount + tax;

//       let yPosition = margin;

//       // Center the blessing text at the top
//       doc.fontSize(fontSize.header + 2).fillColor('black').text('|| shree ganeshay namah ||', 0, yPosition, {
//         width: pageWidth,
//         align: 'center'
//       });
//       yPosition += (headerSpacing === 'minimal' ? 18 : headerSpacing === 'tight' ? 22 : headerSpacing === 'compact' ? 25 : 30);

//       // Header Section
//       doc.fontSize(fontSize.header + 10).fillColor('#0066CC').text('Swara Fashion', margin, yPosition);
//       yPosition += (headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : headerSpacing === 'compact' ? 28 : 32);

//       const addressSpacing = headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : headerSpacing === 'compact' ? 14 : 16;

//       doc.fontSize(fontSize.regular + 1).fillColor('black')
//         .text('PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD, SURAT,', margin, yPosition);
//       yPosition += addressSpacing;
//       doc.text('Gujarat, 394107', margin, yPosition);
//       yPosition += addressSpacing;
//       doc.text('Mobile: 9978809103', margin, yPosition);
//       yPosition += addressSpacing;
//       doc.text('GSTIN: 24CFNPS0464N2ZU', margin, yPosition);
//       yPosition += (headerSpacing === 'minimal' ? 16 : headerSpacing === 'tight' ? 20 : headerSpacing === 'compact' ? 24 : 28);

//       // Header line
//       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
//       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : headerSpacing === 'compact' ? 18 : 20);

//       // Invoice Header
//       const invoiceHeaderHeight = headerSpacing === 'minimal' ? 20 : headerSpacing === 'tight' ? 22 : 25;
//       doc.rect(margin, yPosition, contentWidth, invoiceHeaderHeight).fill('#E8E8E8');
//       doc.fillColor('black').fontSize(fontSize.header + 1).text('TAX INVOICE - ORIGINAL FOR RECIPIENT', margin + 8, yPosition + 7);
//       yPosition += invoiceHeaderHeight + 6;

//       // Invoice Info - Use provided invoice date or current date
//       const displayDate = formatDate(invoiceDate);
      
//       doc.fontSize(fontSize.regular + 1)
//          .text(`Invoice No: ${invoiceNumber}`, margin, yPosition)
//          .text(`Invoice Date: ${displayDate}`, pageWidth - 180, yPosition);
//       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : 18);

//       doc.text('Challan No: ', margin, yPosition)
//          .text('Challan Date: ', pageWidth - 180, yPosition);
//       yPosition += (headerSpacing === 'minimal' ? 15 : headerSpacing === 'tight' ? 18 : 22);

//       // Bill To Section
//       doc.fontSize(fontSize.header + 1).font('Helvetica-Bold').text('BILL TO', margin, yPosition);
//       yPosition += (headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : 15);

//       const billToSpacing = headerSpacing === 'minimal' ? 8 : headerSpacing === 'tight' ? 10 : 12;

//       doc.fontSize(fontSize.small + 1).font('Helvetica')
//          .text(creationData.name, margin, yPosition);
//       yPosition += billToSpacing;
//       doc.text(creationData.address, margin, yPosition, { width: 350 });
//       yPosition += billToSpacing * 1.3;
//       doc.text(`GSTIN: ${creationData.gstno}`, margin, yPosition);
//       yPosition += billToSpacing;
//       doc.text(`PAN Number: ${creationData.panno}`, margin, yPosition);
//       yPosition += billToSpacing;
//       doc.text(`State: ${creationData.state}`, margin, yPosition);
//       yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 16 : 20);

//       // Items Table Header
//       const tableTop = yPosition;
//       const tableHeaderHeight = headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : 28;
//       doc.rect(margin, tableTop, contentWidth, tableHeaderHeight).fill('#4A90E2');
//       doc.fillColor('white').fontSize(fontSize.small + 1).font('Helvetica-Bold')
//          .text('ITEMS', margin + 8, tableTop + 8)
//          .text('HSN No.', margin + 160, tableTop + 8)
//          .text('QTY.', margin + 240, tableTop + 8)
//          .text('RATE', margin + 300, tableTop + 8)
//          .text('TAX', margin + 380, tableTop + 8)
//          .text('AMOUNT', margin + 450, tableTop + 8);
      
//       yPosition = tableTop + tableHeaderHeight;

//       // Items Table Rows
//       doc.fillColor('black').font('Helvetica');
//       items.forEach((item, index) => {
//         const amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
        
//         doc.fontSize(fontSize.small + 1)
//            .text(item.itemName || item.description || '', margin + 8, yPosition + 5, { width: 150 })
//            .text('9988', margin + 160, yPosition + 5)
//            .text(parseFloat(item.quantity || 0).toFixed(2), margin + 240, yPosition + 5)
//            .text(formatCurrency(item.rate || 0), margin + 300, yPosition + 5)
//            .text('5%', margin + 380, yPosition + 5)
//            .text(formatCurrency(amount), margin + 450, yPosition + 5);

//         yPosition += itemRowHeight;
        
//         // Row separator line
//         doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
//       });

//       // Force footer to start at calculated position to fit on page 1
//       const footerStartY = pageHeight - margin - footerHeight;
//       yPosition = Math.max(yPosition + 20, footerStartY - 50);

//       // BANK DETAILS AND TOTALS SECTION
//       const bankTotalsY = yPosition+45;
//       const bankTotalsHeight = 120;
      
//       // Bank Details Box (Left side)
//       doc.rect(margin, bankTotalsY, 500, bankTotalsHeight).fill('#F8F8F8').stroke();
//       doc.fillColor('black').fontSize(fontSize.regular + 1).font('Helvetica-Bold')
//          .text('BANK DETAILS', margin + 12, bankTotalsY + 12);
      
//       doc.fontSize(fontSize.small + 1).font('Helvetica')
//          .text('Bank Name: THE VARACHHA CO. OP BANK LTD.', margin + 12, bankTotalsY + 28)
//          .text('Account Name: Swara Fashion', margin + 12, bankTotalsY + 44)
//          .text('Account No: 00730110470924', margin + 12, bankTotalsY + 60)
//          .text('IFSC Code: VARA0289007', margin + 12, bankTotalsY + 76)
//          .text('Branch: PUNAGAM', margin + 12, bankTotalsY + 92);

//       // Totals Section (Right side)
//       const totalsX = margin + 320;
//       const totalsWidth = contentWidth - 320;
      
//       // Totals background
//       doc.rect(totalsX, bankTotalsY, totalsWidth, bankTotalsHeight).fill('#FAFAFA').stroke();
      
//       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica');
      
//       const totalsLeftMargin = totalsX + 12;
//       const totalsRightMargin = totalsX + totalsWidth - 12;
      
//       doc.text('SUBTOTAL', totalsLeftMargin, bankTotalsY + 12)
//          .text(formatCurrency(subtotal), totalsRightMargin - 90, bankTotalsY + 12, { align: 'right', width: 90 });
      
//       // Use dynamic discount label and amount
//       doc.text(discountLabel, totalsLeftMargin, bankTotalsY + 28)
//          .text(`- ${formatCurrency(discount)}`, totalsRightMargin - 90, bankTotalsY + 28, { align: 'right', width: 90 });
      
//       doc.moveTo(totalsLeftMargin, bankTotalsY + 44).lineTo(totalsRightMargin, bankTotalsY + 44).stroke();
      
//       doc.text('AMOUNT AFTER DISCOUNT', totalsLeftMargin, bankTotalsY + 50)
//          .text(formatCurrency(discountedAmount), totalsRightMargin - 90, bankTotalsY + 50, { align: 'right', width: 90 });
      
//       doc.text('CGST @2.5%', totalsLeftMargin, bankTotalsY + 66)
//          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 66, { align: 'right', width: 90 });
      
//       doc.text('SGST @2.5%', totalsLeftMargin, bankTotalsY + 82)
//          .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 82, { align: 'right', width: 90 });
      
//       doc.moveTo(totalsLeftMargin, bankTotalsY + 98).lineTo(totalsRightMargin, bankTotalsY + 98).stroke();
      
//       doc.fontSize(fontSize.regular + 1).font('Helvetica-Bold')
//          .text('TOTAL AMOUNT', totalsLeftMargin, bankTotalsY + 104)
//          .text(formatCurrency(total), totalsRightMargin - 90, bankTotalsY + 104, { align: 'right', width: 90 });

//       // AMOUNT IN WORDS SECTION
//       yPosition = bankTotalsY + bankTotalsHeight + 8;
//       const amountWordsHeight = 50;
//       doc.rect(margin, yPosition, contentWidth, amountWordsHeight).fill('#F0F0F0').stroke();
      
//       const totalWords = numberToWords(Math.floor(total));
//       const paise = Math.round((total % 1) * 100);
//       const paiseWords = paise > 0 ? ` and ${numberToWords(paise)} Paise` : '';
      
//       doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica-Bold')
//          .text('Amount in Words:', margin + 12, yPosition + 8);
//       doc.font('Helvetica')
//          .text(`${totalWords} Rupees${paiseWords} Only`, margin + 12, yPosition + 24, { 
//            width: contentWidth - 24, 
//            align: 'left' 
//          });

//       // SIGNATURE SECTION - Replaced with Code 2 implementation
//       yPosition += amountWordsHeight + 12;
      
//       // Top border line
//       doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
      
//       yPosition += 15;
      
//       const signatureY = yPosition; // Define signatureY variable
//       const signatureHeight = 80;
      
//       doc.fontSize(9).font('Helvetica')
//          .text('Customer Signature', 80, signatureY + 35)
//          .text('Authorized Signatory', 400, signatureY + 35);
      
//       // Signature lines
//       doc.moveTo(60, signatureY + 30).lineTo(180, signatureY + 30).stroke();
//       doc.moveTo(380, signatureY + 30).lineTo(500, signatureY + 30).stroke();
      
//       // Company name under signature
//       doc.fontSize(8).font('Helvetica-Bold')
//          .text('SWARA FASHION', 400, signatureY + 45);
         
//       doc.end();
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// // Get total count of PDFs - NEW FUNCTION
// export const getTotalPDFCount = async (req, res) => {
//   try {
//     const totalCount = await PDFModel.countDocuments();
    
//     res.status(200).json({
//       status: true,
//       message: "Total PDF count retrieved successfully",
//       data: {
//         totalPDFs: totalCount
//       }
//     });

//   } catch (error) {
//     console.error("Error in getTotalPDFCount:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Generate PDF for current session items (matches frontend endpoint)
// export const generateCurrentSession = async (req, res) => {
//   try {
//     const { creationId, invoiceNumber, currentSessionItems, discountAmount, discountPercentage, invoiceDate } = req.body;

//     if (!creationId || !currentSessionItems || currentSessionItems.length === 0) {
//       return res.status(400).json({
//         status: false,
//         message: "Creation ID and current session items are required"
//       });
//     }

//     // Fetch creation data
//     const creationData = await Creation.findById(creationId);
//     if (!creationData) {
//       return res.status(404).json({
//         status: false,
//         message: "Creation not found"
//       });
//     }

//     // Convert current session items to the format expected by PDF generator
//     const formattedItems = currentSessionItems.map(item => ({
//       itemName: item.description || item.itemName,
//       quantity: item.quantity,
//       rate: item.rate
//     }));

//     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;
    
//     // Generate PDF buffer with manual discount support and invoice date
//     const pdfBuffer = await generatePDFBuffer(creationData, formattedItems, finalInvoiceNumber, discountAmount, discountPercentage, invoiceDate);

//     // Create filename with date
//     const dateForFilename = invoiceDate ? formatDate(invoiceDate).replace(/\//g, '-') : new Date().toISOString().split('T')[0];
//     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${dateForFilename}.pdf`;

//     // Save PDF to database
//     const pdfRecord = new PDFModel({
//       creationId: creationId,
//       fileName: fileName,
//       fileSize: pdfBuffer.length,
//       mimeType: 'application/pdf',
//       pdfBuffer: pdfBuffer,
//       invoiceNumber: finalInvoiceNumber,
//       invoiceDate: invoiceDate ? new Date(invoiceDate) : new Date()
//     });

//     await pdfRecord.save();

//     // Send PDF as response for download
//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename="${fileName}"`,
//       'Content-Length': pdfBuffer.length,
//     });

//     res.status(200).send(pdfBuffer);

//   } catch (error) {
//     console.error("Error in generateCurrentSession:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Generate PDF Controller (legacy - for all items in creation)
// export const generatePDF = async (req, res) => {
//   try {
//     const { creationId, invoiceNumber, discountAmount, discountPercentage, invoiceDate } = req.body;

//     if (!creationId) {
//       return res.status(400).json({
//         status: false,
//         message: "Creation ID is required"
//       });
//     }

//     // Fetch creation data
//     const creationData = await Creation.findById(creationId);
//     if (!creationData) {
//       return res.status(404).json({
//         status: false,
//         message: "Creation not found"
//       });
//     }

//     // Fetch items for this creation
//     const items = await Item.find({ creationId }).sort({ date: -1, createdAt: -1 });
//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         status: false,
//         message: "No items found for this creation. Please add items before generating PDF."
//       });
//     }

//     // Generate invoice number if not provided
//     const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;

//     // Use the most recent item's date as invoice date if not provided
//     const finalInvoiceDate = invoiceDate || (items[0].date ? items[0].date : new Date());

//     // Generate PDF buffer with manual discount support and invoice date
//     const pdfBuffer = await generatePDFBuffer(creationData, items, finalInvoiceNumber, discountAmount, discountPercentage, finalInvoiceDate);

//     // Create filename with date
//     const dateForFilename = formatDate(finalInvoiceDate).replace(/\//g, '-');
//     const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${dateForFilename}.pdf`;

//     // Save PDF to database
//     const pdfRecord = new PDFModel({
//       creationId: creationId,
//       itemId: items[0]._id, // Using first item's ID as reference for backwards compatibility
//       fileName: fileName,
//       fileSize: pdfBuffer.length,
//       mimeType: 'application/pdf',
//       pdfBuffer: pdfBuffer,
//       invoiceNumber: finalInvoiceNumber,
//       invoiceDate: new Date(finalInvoiceDate)
//     });

//     await pdfRecord.save();

//     // Send PDF as response
//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename="${fileName}"`,
//       'Content-Length': pdfBuffer.length,
//     });

//     res.status(200).send(pdfBuffer);

//   } catch (error) {
//     console.error("Error in generatePDF:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Get saved PDFs for a creation
// export const getSavedPDFs = async (req, res) => {
//   try {
//     const { creationId } = req.params;

//     if (!creationId) {
//       return res.status(400).json({
//         status: false,
//         message: "Creation ID is required"
//       });
//     }

//     // Find PDFs directly by creationId (new approach) or through items (legacy support)
//     const directPDFs = await PDFModel.find({ creationId })
//       .select('fileName fileSize generatedAt createdAt invoiceNumber invoiceDate')
//       .sort({ invoiceDate: -1, createdAt: -1 });

//     // Also find PDFs linked through items for backwards compatibility
//     const items = await Item.find({ creationId });
//     const itemIds = items.map(item => item._id);
    
//     const itemLinkedPDFs = await PDFModel.find({ 
//       itemId: { $in: itemIds },
//       creationId: { $exists: false } // Only get PDFs that don't have direct creationId
//     })
//       .select('fileName fileSize generatedAt createdAt invoiceNumber invoiceDate')
//       .sort({ invoiceDate: -1, createdAt: -1 });

//     // Combine and deduplicate
//     const allPDFs = [...directPDFs, ...itemLinkedPDFs];
    
//     res.status(200).json({
//       status: true,
//       message: "PDFs retrieved successfully",
//       data: allPDFs
//     });

//   } catch (error) {
//     console.error("Error in getSavedPDFs:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Download a specific PDF
// export const downloadPDF = async (req, res) => {
//   try {
//     const { pdfId } = req.params;

//     if (!pdfId) {
//       return res.status(400).json({
//         status: false,
//         message: "PDF ID is required"
//       });
//     }

//     const pdfRecord = await PDFModel.findById(pdfId);
//     if (!pdfRecord) {
//       return res.status(404).json({
//         status: false,
//         message: "PDF not found"
//       });
//     }

//     // Ensure pdfBuffer exists
//     if (!pdfRecord.pdfBuffer) {
//       return res.status(404).json({
//         status: false,
//         message: "PDF data not found"
//       });
//     }

//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename="${pdfRecord.fileName}"`,
//       'Content-Length': pdfRecord.fileSize || pdfRecord.pdfBuffer.length,
//     });

//     res.status(200).send(pdfRecord.pdfBuffer);

//   } catch (error) {
//     console.error("Error in downloadPDF:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };

// // Delete a PDF
// export const deletePDF = async (req, res) => {
//   try {
//     const { pdfId } = req.params;

//     if (!pdfId) {
//       return res.status(400).json({
//         status: false,
//         message: "PDF ID is required"
//       });
//     }

//     const deletedPDF = await PDFModel.findByIdAndDelete(pdfId);
//     if (!deletedPDF) {
//       return res.status(404).json({
//         status: false,
//         message: "PDF not found"
//       });
//     }

//     res.status(200).json({
//       status: true,
//       message: "PDF deleted successfully"
//     });

//   } catch (error) {
//     console.error("Error in deletePDF:", error);
//     res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };


// controllers/pdfController.js
import PDFDocument from 'pdfkit';
import Item from '../models/itemModel.js';
import Creation from '../models/creationModel.js';
import PDFModel from '../models/pdfModel.js';
import { sendInvoiceEmail } from '../utlils/mailSender.js';

// [Keep all existing helper functions: numberToWords, formatCurrency, formatDate, getCurrentDate]
const numberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
  if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + numberToWords(num % 100) : '');
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
  if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + numberToWords(num % 100000) : '');

  return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + numberToWords(num % 10000000) : '');
};

const formatCurrency = (amount) => {
  return ` ${parseFloat(amount).toFixed(2)}`;
};

const formatDate = (date) => {
  if (!date) return new Date().toLocaleDateString('en-GB');
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    return new Date().toLocaleDateString('en-GB');
  }
  return dateObj.toLocaleDateString('en-GB');
};

// [Keep the entire generatePDFBuffer function as is - no changes needed]
export const generatePDFBuffer = async (creationData, items, invoiceNumber, discountAmount = null, discountPercentage = null, invoiceDate = null) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 20 });
      const buffers = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      const footerHeight = 280;
      const maxContentHeight = pageHeight - margin - footerHeight - 50;

      const itemCount = items.length;
      let itemRowHeight, headerSpacing, fontSize;
      
      if (itemCount <= 5) {
        itemRowHeight = 22;
        headerSpacing = 'normal';
        fontSize = { regular: 10, small: 9, header: 12 };
      } else if (itemCount <= 10) {
        itemRowHeight = 18;
        headerSpacing = 'compact';
        fontSize = { regular: 9, small: 8, header: 11 };
      } else if (itemCount <= 15) {
        itemRowHeight = 15;
        headerSpacing = 'tight';
        fontSize = { regular: 8, small: 7, header: 10 };
      } else {
        itemRowHeight = 12;
        headerSpacing = 'minimal';
        fontSize = { regular: 7, small: 6, header: 9 };
      }

      const subtotal = items.reduce((sum, item) => {
        const quantity = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        return sum + (quantity * rate);
      }, 0);

      let discount = 0;
      let discountLabel = '';
      
      if (discountAmount !== null && discountAmount !== undefined) {
        discount = parseFloat(discountAmount) || 0;
        const discountPercent = subtotal > 0 ? ((discount / subtotal) * 100).toFixed(1) : 0;
        discountLabel = `DISCOUNT (₹${discount.toFixed(2)} - ${discountPercent}%)`;
      } else if (discountPercentage !== null && discountPercentage !== undefined) {
        const discountPercent = parseFloat(discountPercentage) || 0;
        discount = subtotal * (discountPercent / 100);
        discountLabel = `DISCOUNT @${discountPercent}%`;
      } else {
        discount = subtotal * 0.05;
        discountLabel = 'DISCOUNT @5%';
      }

      const discountedAmount = subtotal - discount;
      const tax = discountedAmount * 0.05;
      const total = discountedAmount + tax;

      let yPosition = margin;

      doc.fontSize(fontSize.header + 2).fillColor('black').text('|| shree ganeshay namah ||', 0, yPosition, {
        width: pageWidth,
        align: 'center'
      });
      yPosition += (headerSpacing === 'minimal' ? 18 : headerSpacing === 'tight' ? 22 : headerSpacing === 'compact' ? 25 : 30);

      doc.fontSize(fontSize.header + 10).fillColor('#0066CC').text('Swara Fashion', margin, yPosition);
      yPosition += (headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : headerSpacing === 'compact' ? 28 : 32);

      const addressSpacing = headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : headerSpacing === 'compact' ? 14 : 16;

      doc.fontSize(fontSize.regular + 1).fillColor('black')
        .text('PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD, SURAT,', margin, yPosition);
      yPosition += addressSpacing;
      doc.text('Gujarat, 394107', margin, yPosition);
      yPosition += addressSpacing;
      doc.text('Mobile: 9978809103', margin, yPosition);
      yPosition += addressSpacing;
      doc.text('GSTIN: 24CFNPS0464N2ZU', margin, yPosition);
      yPosition += (headerSpacing === 'minimal' ? 16 : headerSpacing === 'tight' ? 20 : headerSpacing === 'compact' ? 24 : 28);

      doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
      yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : headerSpacing === 'compact' ? 18 : 20);

      const invoiceHeaderHeight = headerSpacing === 'minimal' ? 20 : headerSpacing === 'tight' ? 22 : 25;
      doc.rect(margin, yPosition, contentWidth, invoiceHeaderHeight).fill('#E8E8E8');
      doc.fillColor('black').fontSize(fontSize.header + 1).text('TAX INVOICE - ORIGINAL FOR RECIPIENT', margin + 8, yPosition + 7);
      yPosition += invoiceHeaderHeight + 6;

      const displayDate = formatDate(invoiceDate);
      
      doc.fontSize(fontSize.regular + 1)
         .text(`Invoice No: ${invoiceNumber}`, margin, yPosition)
         .text(`Invoice Date: ${displayDate}`, pageWidth - 180, yPosition);
      yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 15 : 18);

      doc.text('Challan No: ', margin, yPosition)
         .text('Challan Date: ', pageWidth - 180, yPosition);
      yPosition += (headerSpacing === 'minimal' ? 15 : headerSpacing === 'tight' ? 18 : 22);

      doc.fontSize(fontSize.header + 1).font('Helvetica-Bold').text('BILL TO', margin, yPosition);
      yPosition += (headerSpacing === 'minimal' ? 10 : headerSpacing === 'tight' ? 12 : 15);

      const billToSpacing = headerSpacing === 'minimal' ? 8 : headerSpacing === 'tight' ? 10 : 12;

      doc.fontSize(fontSize.small + 1).font('Helvetica')
         .text(creationData.name, margin, yPosition);
      yPosition += billToSpacing;
      doc.text(creationData.address, margin, yPosition, { width: 350 });
      yPosition += billToSpacing * 1.3;
      doc.text(`GSTIN: ${creationData.gstno}`, margin, yPosition);
      yPosition += billToSpacing;
      doc.text(`PAN Number: ${creationData.panno}`, margin, yPosition);
      yPosition += billToSpacing;
      doc.text(`State: ${creationData.state}`, margin, yPosition);
      yPosition += (headerSpacing === 'minimal' ? 12 : headerSpacing === 'tight' ? 16 : 20);

      const tableTop = yPosition;
      const tableHeaderHeight = headerSpacing === 'minimal' ? 22 : headerSpacing === 'tight' ? 25 : 28;
      doc.rect(margin, tableTop, contentWidth, tableHeaderHeight).fill('#4A90E2');
      doc.fillColor('white').fontSize(fontSize.small + 1).font('Helvetica-Bold')
         .text('ITEMS', margin + 8, tableTop + 8)
         .text('HSN No.', margin + 160, tableTop + 8)
         .text('QTY.', margin + 240, tableTop + 8)
         .text('RATE', margin + 300, tableTop + 8)
         .text('TAX', margin + 380, tableTop + 8)
         .text('AMOUNT', margin + 450, tableTop + 8);
      
      yPosition = tableTop + tableHeaderHeight;

      doc.fillColor('black').font('Helvetica');
      items.forEach((item, index) => {
        const amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
        
        doc.fontSize(fontSize.small + 1)
           .text(item.itemName || item.description || '', margin + 8, yPosition + 5, { width: 150 })
           .text('9988', margin + 160, yPosition + 5)
           .text(parseFloat(item.quantity || 0).toFixed(2), margin + 240, yPosition + 5)
           .text(formatCurrency(item.rate || 0), margin + 300, yPosition + 5)
           .text('5%', margin + 380, yPosition + 5)
           .text(formatCurrency(amount), margin + 450, yPosition + 5);

        yPosition += itemRowHeight;
        doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
      });

      const footerStartY = pageHeight - margin - footerHeight;
      yPosition = Math.max(yPosition + 20, footerStartY - 50);

      const bankTotalsY = yPosition+45;
      const bankTotalsHeight = 120;
      
      doc.rect(margin, bankTotalsY, 500, bankTotalsHeight).fill('#F8F8F8').stroke();
      doc.fillColor('black').fontSize(fontSize.regular + 1).font('Helvetica-Bold')
         .text('BANK DETAILS', margin + 12, bankTotalsY + 12);
      
      doc.fontSize(fontSize.small + 1).font('Helvetica')
         .text('Bank Name: THE VARACHHA CO. OP BANK LTD.', margin + 12, bankTotalsY + 28)
         .text('Account Name: Swara Fashion', margin + 12, bankTotalsY + 44)
         .text('Account No: 00730110470924', margin + 12, bankTotalsY + 60)
         .text('IFSC Code: VARA0289007', margin + 12, bankTotalsY + 76)
         .text('Branch: PUNAGAM', margin + 12, bankTotalsY + 92);

      const totalsX = margin + 320;
      const totalsWidth = contentWidth - 320;
      
      doc.rect(totalsX, bankTotalsY, totalsWidth, bankTotalsHeight).fill('#FAFAFA').stroke();
      
      doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica');
      
      const totalsLeftMargin = totalsX + 12;
      const totalsRightMargin = totalsX + totalsWidth - 12;
      
      doc.text('SUBTOTAL', totalsLeftMargin, bankTotalsY + 12)
         .text(formatCurrency(subtotal), totalsRightMargin - 90, bankTotalsY + 12, { align: 'right', width: 90 });
      
      doc.text(discountLabel, totalsLeftMargin, bankTotalsY + 28)
         .text(`- ${formatCurrency(discount)}`, totalsRightMargin - 90, bankTotalsY + 28, { align: 'right', width: 90 });
      
      doc.moveTo(totalsLeftMargin, bankTotalsY + 44).lineTo(totalsRightMargin, bankTotalsY + 44).stroke();
      
      doc.text('AMOUNT AFTER DISCOUNT', totalsLeftMargin, bankTotalsY + 50)
         .text(formatCurrency(discountedAmount), totalsRightMargin - 90, bankTotalsY + 50, { align: 'right', width: 90 });
      
      doc.text('CGST @2.5%', totalsLeftMargin, bankTotalsY + 66)
         .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 66, { align: 'right', width: 90 });
      
      doc.text('SGST @2.5%', totalsLeftMargin, bankTotalsY + 82)
         .text(formatCurrency(tax/2), totalsRightMargin - 90, bankTotalsY + 82, { align: 'right', width: 90 });
      
      doc.moveTo(totalsLeftMargin, bankTotalsY + 98).lineTo(totalsRightMargin, bankTotalsY + 98).stroke();
      
      doc.fontSize(fontSize.regular + 1).font('Helvetica-Bold')
         .text('TOTAL AMOUNT', totalsLeftMargin, bankTotalsY + 104)
         .text(formatCurrency(total), totalsRightMargin - 90, bankTotalsY + 104, { align: 'right', width: 90 });

      yPosition = bankTotalsY + bankTotalsHeight + 8;
      const amountWordsHeight = 50;
      doc.rect(margin, yPosition, contentWidth, amountWordsHeight).fill('#F0F0F0').stroke();
      
      const totalWords = numberToWords(Math.floor(total));
      const paise = Math.round((total % 1) * 100);
      const paiseWords = paise > 0 ? ` and ${numberToWords(paise)} Paise` : '';
      
      doc.fillColor('black').fontSize(fontSize.small + 1).font('Helvetica-Bold')
         .text('Amount in Words:', margin + 12, yPosition + 8);
      doc.font('Helvetica')
         .text(`${totalWords} Rupees${paiseWords} Only`, margin + 12, yPosition + 24, { 
           width: contentWidth - 24, 
           align: 'left' 
         });

      yPosition += amountWordsHeight + 12;
      
      doc.moveTo(margin, yPosition).lineTo(pageWidth - margin, yPosition).stroke();
      
      yPosition += 15;
      
      const signatureY = yPosition;
      const signatureHeight = 80;
      
      doc.fontSize(9).font('Helvetica')
         .text('Customer Signature', 80, signatureY + 35)
         .text('Authorized Signatory', 400, signatureY + 35);
      
      doc.moveTo(60, signatureY + 30).lineTo(180, signatureY + 30).stroke();
      doc.moveTo(380, signatureY + 30).lineTo(500, signatureY + 30).stroke();
      
      doc.fontSize(8).font('Helvetica-Bold')
         .text('SWARA FASHION', 400, signatureY + 45);
         
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// Get total count of PDFs
export const getTotalPDFCount = async (req, res) => {
  try {
    const totalCount = await PDFModel.countDocuments();
    
    res.status(200).json({
      status: true,
      message: "Total PDF count retrieved successfully",
      data: {
        totalPDFs: totalCount
      }
    });

  } catch (error) {
    console.error("Error in getTotalPDFCount:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};


export const generateCurrentSession = async (req, res) => {
  try {
    const { creationId, invoiceNumber, currentSessionItems, discountAmount, discountPercentage, invoiceDate, sendEmail } = req.body;

    if (!creationId || !currentSessionItems || currentSessionItems.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Creation ID and current session items are required"
      });
    }

    // Fetch creation data
    const creationData = await Creation.findById(creationId);
    if (!creationData) {
      return res.status(404).json({
        status: false,
        message: "Creation not found"
      });
    }

    // Convert current session items to the format expected by PDF generator
    const formattedItems = currentSessionItems.map(item => ({
      itemName: item.description || item.itemName,
      quantity: item.quantity,
      rate: item.rate
    }));

    const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;
    
    // Calculate totals (SAME calculation as in PDF)
    const subtotal = formattedItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return sum + (quantity * rate);
    }, 0);

    let discount = 0;
    if (discountAmount !== null && discountAmount !== undefined) {
      discount = parseFloat(discountAmount) || 0;
    } else if (discountPercentage !== null && discountPercentage !== undefined) {
      const discountPercent = parseFloat(discountPercentage) || 0;
      discount = subtotal * (discountPercent / 100);
    } else {
      discount = subtotal * 0.05;
    }

    const discountedAmount = subtotal - discount;
    const tax = discountedAmount * 0.05;
    const totalAmount = discountedAmount + tax;
    
    // Generate PDF buffer
    const pdfBuffer = await generatePDFBuffer(
      creationData, 
      formattedItems, 
      finalInvoiceNumber, 
      discountAmount, 
      discountPercentage, 
      invoiceDate
    );

    // Create filename with date
    const dateForFilename = invoiceDate ? formatDate(invoiceDate).replace(/\//g, '-') : new Date().toISOString().split('T')[0];
    const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${dateForFilename}.pdf`;

    // Save PDF to database
    const pdfRecord = new PDFModel({
      creationId: creationId,
      fileName: fileName,
      fileSize: pdfBuffer.length,
      mimeType: 'application/pdf',
      pdfBuffer: pdfBuffer,
      invoiceNumber: finalInvoiceNumber,
      invoiceDate: invoiceDate ? new Date(invoiceDate) : new Date()
    });

    await pdfRecord.save();

    // Send email if requested and email exists
    let emailResult = {
      sent: false,
      error: null
    };

    if (sendEmail === true) {
      if (!creationData.email) {
        emailResult.error = 'No email address found';
        console.log('Email not sent - No email address found for creation');
      } else {
        try {
          const displayDate = formatDate(invoiceDate);
          
          const emailResponse = await sendInvoiceEmail(
            creationData.email,
            creationData.name,
            pdfBuffer,
            fileName,
            {
              invoiceNumber: finalInvoiceNumber,
              invoiceDate: displayDate,
              totalAmount: totalAmount.toFixed(2),
              itemCount: formattedItems.length
            }
          );
          
          if (emailResponse.success) {
            emailResult.sent = true;
            console.log(`Invoice email sent successfully to ${creationData.email}`);
          } else {
            emailResult.error = 'Email sending failed';
          }
        } catch (emailErr) {
          console.error('Error sending invoice email:', emailErr);
          emailResult.error = emailErr.message || 'Unknown email error';
        }
      }
    }

    // Return JSON response with email status and PDF data
    res.status(200).json({
      status: true,
      message: "PDF generated successfully",
      data: {
        fileName: fileName,
        fileSize: pdfBuffer.length,
        pdfBase64: pdfBuffer.toString('base64'),
        email: {
          sent: emailResult.sent,
          error: emailResult.error,
          recipient: creationData.email || null
        }
      }
    });

  } catch (error) {
    console.error("Error in generateCurrentSession:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

export const generatePDF = async (req, res) => {
  try {
    const { creationId, invoiceNumber, discountAmount, discountPercentage, invoiceDate, sendEmail } = req.body;

    if (!creationId) {
      return res.status(400).json({
        status: false,
        message: "Creation ID is required"
      });
    }

    // Fetch creation data
    const creationData = await Creation.findById(creationId);
    if (!creationData) {
      return res.status(404).json({
        status: false,
        message: "Creation not found"
      });
    }

    // Fetch items for this creation
    const items = await Item.find({ creationId }).sort({ date: -1, createdAt: -1 });
    if (!items || items.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No items found for this creation. Please add items before generating PDF."
      });
    }

    // Generate invoice number if not provided
    const finalInvoiceNumber = invoiceNumber || `BILL NO.${Date.now()}`;

    // Use the most recent item's date as invoice date if not provided
    const finalInvoiceDate = invoiceDate || (items[0].date ? items[0].date : new Date());

    // Calculate totals (SAME calculation as in PDF)
    const subtotal = items.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return sum + (quantity * rate);
    }, 0);

    let discount = 0;
    if (discountAmount !== null && discountAmount !== undefined) {
      discount = parseFloat(discountAmount) || 0;
    } else if (discountPercentage !== null && discountPercentage !== undefined) {
      const discountPercent = parseFloat(discountPercentage) || 0;
      discount = subtotal * (discountPercent / 100);
    } else {
      discount = subtotal * 0.05;
    }

    const discountedAmount = subtotal - discount;
    const tax = discountedAmount * 0.05;
    const totalAmount = discountedAmount + tax;

    // Generate PDF buffer
    const pdfBuffer = await generatePDFBuffer(
      creationData, 
      items, 
      finalInvoiceNumber, 
      discountAmount, 
      discountPercentage, 
      finalInvoiceDate
    );

    // Create filename with date
    const dateForFilename = formatDate(finalInvoiceDate).replace(/\//g, '-');
    const fileName = `invoice-${creationData.name.replace(/\s+/g, '-')}-${dateForFilename}.pdf`;

    // Save PDF to database
    const pdfRecord = new PDFModel({
      creationId: creationId,
      itemId: items[0]._id,
      fileName: fileName,
      fileSize: pdfBuffer.length,
      mimeType: 'application/pdf',
      pdfBuffer: pdfBuffer,
      invoiceNumber: finalInvoiceNumber,
      invoiceDate: new Date(finalInvoiceDate)
    });

    await pdfRecord.save();

    // Send email if requested and email exists
    let emailResult = {
      sent: false,
      error: null
    };

    if (sendEmail === true) {
      if (!creationData.email) {
        emailResult.error = 'No email address found';
        console.log('Email not sent - No email address found for creation');
      } else {
        try {
          const displayDate = formatDate(finalInvoiceDate);
          
          const emailResponse = await sendInvoiceEmail(
            creationData.email,
            creationData.name,
            pdfBuffer,
            fileName,
            {
              invoiceNumber: finalInvoiceNumber,
              invoiceDate: displayDate,
              totalAmount: totalAmount.toFixed(2),
              itemCount: items.length
            }
          );

          if (emailResponse.success) {
            emailResult.sent = true;
            console.log(`Invoice email sent successfully to ${creationData.email}`);
          } else {
            emailResult.error = 'Email sending failed';
          }
        } catch (emailErr) {
          console.error('Error sending invoice email:', emailErr);
          emailResult.error = emailErr.message || 'Unknown email error';
        }
      }
    }

    // Return JSON response with email status and PDF data
    res.status(200).json({
      status: true,
      message: "PDF generated successfully",
      data: {
        fileName: fileName,
        fileSize: pdfBuffer.length,
        pdfBase64: pdfBuffer.toString('base64'),
        email: {
          sent: emailResult.sent,
          error: emailResult.error,
          recipient: creationData.email || null
        }
      }
    });

  } catch (error) {
    console.error("Error in generatePDF:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};


export const getSavedPDFs = async (req, res) => {
  try {
    const { creationId } = req.params;

    if (!creationId) {
      return res.status(400).json({
        status: false,
        message: "Creation ID is required"
      });
    }

    const directPDFs = await PDFModel.find({ creationId })
      .select('fileName fileSize generatedAt createdAt invoiceNumber invoiceDate')
      .sort({ invoiceDate: -1, createdAt: -1 });

    const items = await Item.find({ creationId });
    const itemIds = items.map(item => item._id);
    
    const itemLinkedPDFs = await PDFModel.find({ 
      itemId: { $in: itemIds },
      creationId: { $exists: false }
    })
      .select('fileName fileSize generatedAt createdAt invoiceNumber invoiceDate')
      .sort({ invoiceDate: -1, createdAt: -1 });

    const allPDFs = [...directPDFs, ...itemLinkedPDFs];
    
    res.status(200).json({
      status: true,
      message: "PDFs retrieved successfully",
      data: allPDFs
    });

  } catch (error) {
    console.error("Error in getSavedPDFs:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
export const downloadPDF = async (req, res) => {
  try {
    const { pdfId } = req.params;

    if (!pdfId) {
      return res.status(400).json({
        status: false,
        message: "PDF ID is required"
      });
    }

    const pdfRecord = await PDFModel.findById(pdfId);
    if (!pdfRecord) {
      return res.status(404).json({
        status: false,
        message: "PDF not found"
      });
    }

    if (!pdfRecord.pdfBuffer) {
      return res.status(404).json({
        status: false,
        message: "PDF data not found"
      });
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdfRecord.fileName}"`,
      'Content-Length': pdfRecord.fileSize || pdfRecord.pdfBuffer.length,
    });

    res.status(200).send(pdfRecord.pdfBuffer);

  } catch (error) {
    console.error("Error in downloadPDF:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
export const deletePDF = async (req, res) => {
  try {
    const { pdfId } = req.params;

    if (!pdfId) {
      return res.status(400).json({
        status: false,
        message: "PDF ID is required"
      });
    }

    const deletedPDF = await PDFModel.findByIdAndDelete(pdfId);
    if (!deletedPDF) {
      return res.status(404).json({
        status: false,
        message: "PDF not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "PDF deleted successfully"
    });

  } catch (error) {
    console.error("Error in deletePDF:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Resend email for existing PDF
export const resendPDFEmail = async (req, res) => {
  try {
    const { pdfId } = req.params;

    if (!pdfId) {
      return res.status(400).json({
        status: false,
        message: "PDF ID is required"
      });
    }

    const pdfRecord = await PDFModel.findById(pdfId);
    if (!pdfRecord) {
      return res.status(404).json({
        status: false,
        message: "PDF not found"
      });
    }

    const creationData = await Creation.findById(pdfRecord.creationId);
    if (!creationData) {
      return res.status(404).json({
        status: false,
        message: "Creation not found"
      });
    }

    if (!creationData.email) {
      return res.status(400).json({
        status: false,
        message: "No email address found for this creation"
      });
    }

    const items = await Item.find({ creationId: pdfRecord.creationId });
    
    const subtotal = items.reduce((sum, item) => {
      return sum + (parseFloat(item.quantity) * parseFloat(item.rate));
    }, 0);

    const discount = subtotal * 0.05;
    const discountedAmount = subtotal - discount;
    const tax = discountedAmount * 0.05;
    const total = discountedAmount + tax;

    const emailResult = await sendInvoiceEmail(
      creationData.email,
      creationData.name,
      pdfRecord.pdfBuffer,
      pdfRecord.fileName,
      {
        invoiceNumber: pdfRecord.invoiceNumber,
        invoiceDate: formatDate(pdfRecord.invoiceDate),
        totalAmount: total.toFixed(2),
        itemCount: items.length
      }
    );

    if (emailResult.success) {
      res.status(200).json({
        status: true,
        message: `Invoice email sent successfully to ${creationData.email}`,
        data: {
          email: creationData.email,
          messageId: emailResult.messageId
        }
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Failed to send email",
        error: emailResult.error
      });
    }

  } catch (error) {
    console.error("Error in resendPDFEmail:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};