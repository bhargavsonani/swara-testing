// import express from "express";
// import { addCreation, deleteCreation, getAllCreation, getSingleCreation } from "../controllers/creationController.js";
// import adminAuth from "../middleware/adminAuth.js";

// const router = express.Router();

// router.post('/create',adminAuth,addCreation);
// router.get('/getcr',getAllCreation);
// router.delete('/remove/:id', deleteCreation);
// router.get('/singleCr/:id',getSingleCreation);



// export default router;


import express from "express";
import {
    addCreation,
    getAllCreation,
    getSingleCreation,
    updateCreation,
    deleteCreation
} from "../controllers/creationController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// ➤ CREATE
router.post("/create", adminAuth, addCreation);

// ➤ GET ALL
router.get("/getcr", getAllCreation);

// ➤ GET SINGLE
router.get("/singleCr/:id", getSingleCreation);

// ➤ UPDATE
router.put("/update/:id", adminAuth, updateCreation);

// ➤ DELETE
router.delete("/remove/:id", adminAuth, deleteCreation);

export default router;