// // utils/mailSender.js
// import nodemailer from 'nodemailer';

// // Create reusable transporter
// const createTransporter = () => {
//   return nodemailer.createTransporter({
//     host: process.env.MAIL_HOST,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });
// };

// // Send invoice email with PDF attachment
// export const sendInvoiceEmail = async (
//   recipientEmail,
//   recipientName,
//   invoiceNumber,
//   pdfBuffer,
//   fileName,
//   invoiceDetails = {}
// ) => {
//   try {
//     const transporter = createTransporter();

//     const {
//       subtotal = 0,
//       discount = 0,
//       tax = 0,
//       total = 0,
//       invoiceDate = new Date().toLocaleDateString('en-GB'),
//     } = invoiceDetails;

//     // Email HTML template
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Invoice from Swara Fashion</title>
//         <style>
//           body {
//             font-family: 'Arial', sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//           }
//           .container {
//             max-width: 600px;
//             margin: 20px auto;
//             background: #ffffff;
//             border-radius: 10px;
//             overflow: hidden;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           }
//           .header {
//             background: linear-gradient(135deg, #0066CC 0%, #004999 100%);
//             color: #ffffff;
//             padding: 30px 20px;
//             text-align: center;
//           }
//           .header h1 {
//             margin: 0;
//             font-size: 28px;
//             font-weight: bold;
//           }
//           .header p {
//             margin: 10px 0 0;
//             font-size: 14px;
//             opacity: 0.9;
//           }
//           .content {
//             padding: 30px 20px;
//           }
//           .greeting {
//             font-size: 18px;
//             color: #0066CC;
//             margin-bottom: 20px;
//           }
//           .message {
//             font-size: 15px;
//             margin-bottom: 20px;
//             color: #555;
//           }
//           .invoice-details {
//             background: #f8f9fa;
//             border-left: 4px solid #0066CC;
//             padding: 20px;
//             margin: 20px 0;
//             border-radius: 5px;
//           }
//           .invoice-details h3 {
//             margin: 0 0 15px 0;
//             color: #0066CC;
//             font-size: 18px;
//           }
//           .detail-row {
//             display: flex;
//             justify-content: space-between;
//             padding: 8px 0;
//             border-bottom: 1px solid #e0e0e0;
//           }
//           .detail-row:last-child {
//             border-bottom: none;
//           }
//           .detail-label {
//             font-weight: 600;
//             color: #555;
//           }
//           .detail-value {
//             color: #333;
//           }
//           .total-row {
//             background: #e8f4ff;
//             margin-top: 10px;
//             padding: 12px;
//             border-radius: 5px;
//           }
//           .total-row .detail-label,
//           .total-row .detail-value {
//             font-size: 18px;
//             font-weight: bold;
//             color: #0066CC;
//           }
//           .attachment-notice {
//             background: #fff3cd;
//             border: 1px solid #ffc107;
//             padding: 15px;
//             border-radius: 5px;
//             margin: 20px 0;
//             text-align: center;
//           }
//           .attachment-notice strong {
//             color: #856404;
//           }
//           .footer {
//             background: #f8f9fa;
//             padding: 20px;
//             text-align: center;
//             font-size: 13px;
//             color: #666;
//             border-top: 1px solid #e0e0e0;
//           }
//           .company-info {
//             margin: 15px 0;
//             line-height: 1.8;
//           }
//           .company-info strong {
//             color: #0066CC;
//           }
//           .contact-info {
//             margin-top: 15px;
//             padding-top: 15px;
//             border-top: 1px solid #ddd;
//           }
//           .social-links {
//             margin-top: 15px;
//           }
//           .button {
//             display: inline-block;
//             padding: 12px 30px;
//             background: #0066CC;
//             color: #ffffff;
//             text-decoration: none;
//             border-radius: 5px;
//             font-weight: bold;
//             margin: 20px 0;
//           }
//           @media only screen and (max-width: 600px) {
//             .container {
//               margin: 10px;
//             }
//             .content {
//               padding: 20px 15px;
//             }
//             .detail-row {
//               flex-direction: column;
//             }
//             .detail-value {
//               margin-top: 5px;
//               text-align: left;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1>|| श्री गणेशाय नमः ||</h1>
//             <h1>Swara Fashion</h1>
//             <p>Your Invoice is Ready</p>
//           </div>
          
//           <div class="content">
//             <div class="greeting">
//               Dear ${recipientName},
//             </div>
            
//             <div class="message">
//               Thank you for your business! Please find your invoice attached to this email.
//             </div>
            
//             <div class="invoice-details">
//               <h3>Invoice Summary</h3>
//               <div class="detail-row">
//                 <span class="detail-label">Invoice Number:</span>
//                 <span class="detail-value">${invoiceNumber}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">Invoice Date:</span>
//                 <span class="detail-value">${invoiceDate}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">Subtotal:</span>
//                 <span class="detail-value">Rs. ${subtotal.toFixed(2)}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">Discount:</span>
//                 <span class="detail-value">- Rs. ${discount.toFixed(2)}</span>
//               </div>
//               <div class="detail-row">
//                 <span class="detail-label">GST (5%):</span>
//                 <span class="detail-value">Rs. ${tax.toFixed(2)}</span>
//               </div>
//               <div class="total-row">
//                 <div class="detail-row">
//                   <span class="detail-label">Total Amount:</span>
//                   <span class="detail-value">Rs. ${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
            
//             <div class="attachment-notice">
//               <strong>📎 PDF Invoice Attached</strong>
//               <p style="margin: 10px 0 0 0;">Please find the detailed invoice PDF attached to this email.</p>
//             </div>
            
//             <div class="message">
//               If you have any questions regarding this invoice, please don't hesitate to contact us.
//             </div>
//           </div>
          
//           <div class="footer">
//             <div class="company-info">
//               <strong>Swara Fashion</strong><br>
//               PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD<br>
//               SURAT, Gujarat, 394107<br>
//               GSTIN: 24CFNPS0464N2ZU
//             </div>
//             <div class="contact-info">
//               <strong>Contact Us:</strong><br>
//               Mobile: 9978809103<br>
//               Email: ${process.env.MAIL_USER}
//             </div>
//             <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
//               <p style="margin: 0; font-size: 12px; color: #999;">
//                 This is an automated email. Please do not reply to this email address.
//               </p>
//               <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">
//                 © ${new Date().getFullYear()} Swara Fashion. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     // Plain text version for email clients that don't support HTML
//     const textContent = `
//       Dear ${recipientName},

//       Thank you for your business! Please find your invoice attached to this email.

//       Invoice Summary:
//       - Invoice Number: ${invoiceNumber}
//       - Invoice Date: ${invoiceDate}
//       - Subtotal: Rs. ${subtotal.toFixed(2)}
//       - Discount: - Rs. ${discount.toFixed(2)}
//       - GST (5%): Rs. ${tax.toFixed(2)}
//       - Total Amount: Rs. ${total.toFixed(2)}

//       PDF Invoice is attached to this email.

//       If you have any questions regarding this invoice, please don't hesitate to contact us.

//       Best regards,
//       Swara Fashion
//       PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD
//       SURAT, Gujarat, 394107
//       Mobile: 9978809103
//       GSTIN: 24CFNPS0464N2ZU
//     `;

//     // Email options
//     const mailOptions = {
//       from: {
//         name: 'Swara Fashion',
//         address: process.env.MAIL_USER,
//       },
//       to: recipientEmail,
//       subject: `Invoice ${invoiceNumber} from Swara Fashion`,
//       text: textContent,
//       html: htmlContent,
//       attachments: [
//         {
//           filename: fileName,
//           content: pdfBuffer,
//           contentType: 'application/pdf',
//         },
//       ],
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);

//     console.log('Email sent successfully:', info.messageId);
//     return {
//       success: true,
//       messageId: info.messageId,
//       message: 'Invoice email sent successfully',
//     };
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return {
//       success: false,
//       error: error.message,
//       message: 'Failed to send invoice email',
//     };
//   }
// };

// // Send notification email (for errors or alerts)
// export const sendNotificationEmail = async (subject, message, recipientEmail = process.env.MAIL_USER) => {
//   try {
//     const transporter = createTransporter();

//     const mailOptions = {
//       from: {
//         name: 'Swara Fashion System',
//         address: process.env.MAIL_USER,
//       },
//       to: recipientEmail,
//       subject: subject,
//       text: message,
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px;">
//           <h2 style="color: #0066CC;">Swara Fashion - Notification</h2>
//           <p>${message}</p>
//           <hr>
//           <p style="color: #666; font-size: 12px;">This is an automated notification from Swara Fashion billing system.</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     return { success: true };
//   } catch (error) {
//     console.error('Error sending notification email:', error);
//     return { success: false, error: error.message };
//   }
// };

// export default { sendInvoiceEmail, sendNotificationEmail };



// utils/mailSender.js
import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
};

/**
 * Send PDF invoice via email
 * @param {string} recipientEmail - Recipient's email address
 * @param {string} recipientName - Recipient's name
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @param {string} fileName - PDF file name
 * @param {Object} invoiceDetails - Invoice details for email body
 * @returns {Promise} - Email sending result
 */
export const sendInvoiceEmail = async (
  recipientEmail,
  recipientName,
  pdfBuffer,
  fileName,
  invoiceDetails = {}
) => {
  try {
    const transporter = createTransporter();

    const {
      invoiceNumber = 'N/A',
      invoiceDate = new Date().toLocaleDateString('en-GB'),
      totalAmount = '0.00',
      itemCount = 0,
    } = invoiceDetails;

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #0066CC;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #0066CC;
            margin: 0;
            font-size: 28px;
          }
          .header p {
            color: #666;
            margin: 5px 0 0 0;
            font-size: 14px;
          }
          .greeting {
            font-size: 16px;
            margin-bottom: 20px;
          }
          .invoice-details {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .invoice-details table {
            width: 100%;
            border-collapse: collapse;
          }
          .invoice-details td {
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .invoice-details td:first-child {
            font-weight: 600;
            color: #555;
            width: 40%;
          }
          .invoice-details td:last-child {
            color: #333;
            text-align: right;
          }
          .invoice-details tr:last-child td {
            border-bottom: none;
          }
          .total-amount {
            background-color: #0066CC;
            color: white !important;
            font-size: 18px;
            font-weight: bold;
            padding: 15px !important;
            border-radius: 5px;
            margin-top: 10px;
          }
          .message {
            margin: 20px 0;
            line-height: 1.8;
            color: #555;
          }
          .attachment-info {
            background-color: #e8f4f8;
            border-left: 4px solid #0066CC;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .attachment-info strong {
            color: #0066CC;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 13px;
          }
          .company-info {
            margin-top: 15px;
            font-size: 12px;
            color: #888;
          }
          .contact-info {
            margin-top: 10px;
          }
          .contact-info a {
            color: #0066CC;
            text-decoration: none;
          }
          @media only screen and (max-width: 600px) {
            body {
              padding: 10px;
            }
            .email-container {
              padding: 20px;
            }
            .header h1 {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🧾 Swara Fashion</h1>
            <p>Tax Invoice</p>
          </div>
          
          <div class="greeting">
            Dear <strong>${recipientName}</strong>,
          </div>
          
          <div class="message">
            <p>Thank you for your business! Please find attached your tax invoice for the recent transaction.</p>
          </div>
          
          <div class="invoice-details">
            <table>
              <tr>
                <td>Invoice Number:</td>
                <td><strong>${invoiceNumber}</strong></td>
              </tr>
              <tr>
                <td>Invoice Date:</td>
                <td>${invoiceDate}</td>
              </tr>
              <tr>
                <td>Number of Items:</td>
                <td>${itemCount}</td>
              </tr>
              <tr>
                <td colspan="2" class="total-amount">
                  <div style="display: flex; justify-content: space-between;">
                    <span>Total Amount:</span>
                    <span>Rs. ${totalAmount}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          
          <div class="attachment-info">
            <strong>📎 Attachment:</strong> Your invoice PDF is attached to this email.
          </div>
          
          <div class="message">
            <p>If you have any questions or concerns regarding this invoice, please don't hesitate to contact us.</p>
            <p>We appreciate your continued trust in our services.</p>
          </div>
          
          <div class="footer">
            <div class="company-info">
              <strong>Swara Fashion</strong><br>
              PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD<br>
              SURAT, Gujarat - 394107<br>
              GSTIN: 24CFNPS0464N2ZU
            </div>
            <div class="contact-info">
              📞 Mobile: <a href="tel:+919978809103">9978809103</a><br>
              📧 Email: <a href="mailto:zestfoodsservice@gmail.com">zestfoodsservice@gmail.com</a>
            </div>
            <p style="margin-top: 15px; font-size: 11px; color: #999;">
              This is an automated email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const textContent = `
Dear ${recipientName},

Thank you for your business! Please find attached your tax invoice for the recent transaction.

Invoice Details:
- Invoice Number: ${invoiceNumber}
- Invoice Date: ${invoiceDate}
- Number of Items: ${itemCount}
- Total Amount: Rs. ${totalAmount}

If you have any questions or concerns regarding this invoice, please don't hesitate to contact us.

Best regards,
Swara Fashion
PLOT NO 355 ANJANI IND ESTATE-2 BHARTHANA KOSAD
SURAT, Gujarat - 394107
Mobile: 9978809103
GSTIN: 24CFNPS0464N2ZU
    `;

    // Mail options
    const mailOptions = {
      from: {
        name: 'Swara Fashion',
        address: process.env.MAIL_USER,
      },
      to: recipientEmail,
      subject: `Tax Invoice - ${invoiceNumber} | Swara Fashion`,
      text: textContent,
      html: htmlContent,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      message: 'Invoice sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Send test email to verify configuration
 * @param {string} recipientEmail - Test recipient email
 * @returns {Promise} - Test email result
 */
export const sendTestEmail = async (recipientEmail) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Swara Fashion',
        address: process.env.MAIL_USER,
      },
      to: recipientEmail,
      subject: 'Test Email - Mail Configuration',
      text: 'This is a test email to verify mail configuration.',
      html: '<h3>Mail Configuration Test</h3><p>If you receive this email, your mail configuration is working correctly!</p>',
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
      message: 'Test email sent successfully',
    };
  } catch (error) {
    console.error('Error sending test email:', error);
    throw error;
  }
};