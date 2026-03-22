

// routes/pdfRoutes.js
import express from 'express';
import { 
  generatePDF, 
  generateCurrentSession, 
  getSavedPDFs, 
  downloadPDF, 
  deletePDF, 
  getTotalPDFCount
} from '../controllers/pdfController.js';

const router = express.Router();

// PDF operations
router.post('/generate', generatePDF); // Legacy - generates PDF for all items in creation
router.post('/generateCurrentSession', generateCurrentSession); // New - generates PDF for current session items
router.get('/creation/:creationId', getSavedPDFs);
router.get('/download/:pdfId', downloadPDF);
router.delete('/delete/:pdfId', deletePDF);
router.get('/count', getTotalPDFCount);


router.post('/test-email', async (req, res) => {
  try {
    const { sendTestEmail } = await import('../utils/mailSender.js');
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        status: false,
        message: 'Email address is required'
      });
    }
    
    const result = await sendTestEmail(email);
    res.status(200).json({
      status: true,
      message: 'Test email sent successfully',
      data: result
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

export default router;