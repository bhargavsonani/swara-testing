

// models/pdfModel.js
import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  creationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creation',
    required: false // Made optional for backwards compatibility
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: false // Made optional since we now link directly to creation
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    default: 'application/pdf'
  },
  pdfBuffer: {
    type: Buffer,
    required: true
  },
  invoiceNumber: {
    type: String,
    required: false
  },
   invoiceDate: {  // Add this new field
        type: Date,
        default: Date.now
    },
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
pdfSchema.index({ creationId: 1 });
pdfSchema.index({ itemId: 1 });

const PDFModel = mongoose.model('PDF', pdfSchema);

export default PDFModel;