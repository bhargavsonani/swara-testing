// import creation from "../models/creationModel.js";


// // export const addCreation = async (req, res) => {
// //     try {
// //         const { name, address, gstno, panno, state } = req.body; // Fixed: removed () from req.body
        
// //         if (!name || !address || !gstno || !panno || !state) {
// //             return res.status(400).json({ // Added return statement
// //                 status: false, 
// //                 message: "All fields are required" // Fixed typo
// //             });
// //         }

// //         const cr = new creation({ name, address, gstno, panno, state });
// //         await cr.save();
        
// //         res.status(200).json({
// //             status: true,
// //             message: "Creation added successfully" // Fixed typo
// //         });
        
// //     } catch (error) {
// //         console.error("Error in addCreation:", error); // Added error logging
// //         res.status(500).json({
// //             status: false,
// //             message: "Internal Server Error" // Fixed: changed semicolon to comma
// //         });
// //     }
// // };

// export const addCreation = async (req, res) => {
//     try {
//         const { name, address, email, gstno, panno, state } = req.body;
        
//         if (!name || !address || !gstno || !state) {
//             return res.status(400).json({
//                 status: false, 
//                 message: "Name, address, GST number, and state are required"
//             });
//         }

//         // Validate email only if provided
//         if (email) {
//             const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             if (!emailRegex.test(email)) {
//                 return res.status(400).json({
//                     status: false,
//                     message: "Please provide a valid email address"
//                 });
//             }
//         }

//         const cr = new creation({ name, address, email, gstno, panno, state });
//         await cr.save();
        
//         res.status(200).json({
//             status: true,
//             message: "Creation added successfully"
//         });
        
//     } catch (error) {
//         console.error("Error in addCreation:", error);
        
//         if (error.code === 11000) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Email already exists"
//             });
//         }
        
//         res.status(500).json({
//             status: false,
//             message: "Internal Server Error"
//         });
//     }
// };

// export const getAllCreation = async (req, res) => {
//     try {
//         const data = await creation.find();
//         res.status(200).json({
//             status: true,
//             message: "Data fetched successfully",
//             data: data
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: "Failed to fetch data",
//             error: error.message
//         });
//     }
// };

// // In your creationController.js
// export const deleteCreation = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await creation.findByIdAndDelete(id);
//         res.status(200).json({
//             status: true,
//             message: "Creation deleted successfully"
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: "Failed to delete creation",
//             error: error.message
//         });
//     }
// };


// export const getSingleCreation = async (req,res) =>{
//     try {
//         const { id } = req.params;
//         const creationdata = await creation.findById(id);
//         res.status(200).json({
//             status: true,
//             message: "Creation featched successfully",
//             creationdata
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: "Failed to fetch creation",
//             error: error.message
//         });
//     }
// }



import creation from "../models/creationModel.js";

// ➤ ADD CREATION
export const addCreation = async (req, res) => {
    try {
        const { name, address, email, gstno, panno, state } = req.body;

        if (!name || !address || !gstno || !state) {
            return res.status(400).json({
                status: false,
                message: "Name, address, GST number, and state are required"
            });
        }

        // Email validation (optional)
        if (email) {
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    status: false,
                    message: "Please provide a valid email address"
                });
            }
        }

        const newCreation = await creation.create({
            name,
            address,
            email,
            gstno,
            panno,
            state
        });

        res.status(201).json({
            status: true,
            message: "Creation added successfully",
            data: newCreation
        });

    } catch (error) {
        console.error("Error in addCreation:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                status: false,
                message: "Duplicate field value entered"
            });
        }

        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};


// ➤ GET ALL CREATIONS
export const getAllCreation = async (req, res) => {
    try {
        const data = await creation.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            message: "Data fetched successfully",
            count: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to fetch data",
            error: error.message
        });
    }
};


// ➤ GET SINGLE CREATION
export const getSingleCreation = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await creation.findById(id);

        if (!data) {
            return res.status(404).json({
                status: false,
                message: "Creation not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Creation fetched successfully",
            data
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to fetch creation",
            error: error.message
        });
    }
};


// ➤ UPDATE CREATION
export const updateCreation = async (req, res) => {
    try {
        const { id } = req.params;

        // Email validation (only if present)
        if (req.body.email) {
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(req.body.email)) {
                return res.status(400).json({
                    status: false,
                    message: "Please provide a valid email address"
                });
            }
        }

        const updated = await creation.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                status: false,
                message: "Creation not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Creation updated successfully",
            data: updated
        });

    } catch (error) {
        console.error("Error in updateCreation:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                status: false,
                message: "Duplicate field value"
            });
        }

        res.status(500).json({
            status: false,
            message: "Failed to update creation",
            error: error.message
        });
    }
};


// ➤ DELETE CREATION
export const deleteCreation = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await creation.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                status: false,
                message: "Creation not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Creation deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete creation",
            error: error.message
        });
    }
};