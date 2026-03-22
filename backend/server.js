    import express from 'express';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import mongoose from "mongoose";
    import userRouter from './routes/userRoute.js';
    import creationRouter from './routes/creationRoute.js';
    import itemRouter from './routes/itemRoute.js';
    import pdfRoute from './routes/pdfRoutes.js';
    
    dotenv.config();
    const app = express();
    const port = process.env.PORT || 3001;
    const MONGO_URI = process.env.MONGO_URI;
    
    // Prevent unhandled MongoDB connection errors from crashing the server process.
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });


    // middleware
    app.use(cors());
    app.use(express.json());

    app.use('/admin',userRouter);
    app.use('/creation',creationRouter);
    app.use('/items', itemRouter); 
    app.use('/pdf',pdfRoute);


    try{
        await mongoose.connect(MONGO_URI,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, 
        });
        
        console.log("MongoDB connected successfully!");
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
    }

    app.get('/',(req,res)=>{
        res.send('API is running...');
    });




    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
