import Counter from '../models/counterModel.js';

// Function to get next sequential bill number
const getNextBillNumber = async () => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      'billNumber',
      { $inc: { sequenceValue: 1 } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );
    
    // Format: BILL NO.1, BILL NO.2, etc.
    return `BILL NO.${counter.sequenceValue}`;
  } catch (error) {
    console.error('Error generating bill number:', error);
    // Fallback to timestamp if counter fails
    return `BILL NO.${Date.now()}`;
  }
};

// Function to get current bill number without incrementing
const getCurrentBillNumber = async () => {
  try {
    const counter = await Counter.findById('billNumber');
    if (counter) {
      return counter.sequenceValue;
    }
    return 0;
  } catch (error) {
    console.error('Error getting current bill number:', error);
    return 0;
  }
};

// Function to get the next bill number without incrementing (for preview)
const getNextBillNumberPreview = async () => {
  try {
    const counter = await Counter.findById('billNumber');
    const currentValue = counter ? counter.sequenceValue : 0;
    return `BILL NO.${currentValue + 1}`;
  } catch (error) {
    console.error('Error getting next bill number preview:', error);
    return `BILL NO.1`;
  }
};

// Function to reset bill number (optional - for admin use)
const resetBillNumber = async (startNumber = 0) => {
  try {
    await Counter.findByIdAndUpdate(
      'billNumber',
      { sequenceValue: startNumber },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.error('Error resetting bill number:', error);
    return false;
  }
};

// Function to initialize counter if it doesn't exist
const initializeBillCounter = async () => {
  try {
    const counter = await Counter.findById('billNumber');
    if (!counter) {
      await Counter.create({
        _id: 'billNumber',
        sequenceValue: 0
      });
      console.log('Bill counter initialized');
    }
  } catch (error) {
    console.error('Error initializing bill counter:', error);
  }
};

export {
  getNextBillNumber,
  getCurrentBillNumber,
  getNextBillNumberPreview,
  resetBillNumber,
  initializeBillCounter
};