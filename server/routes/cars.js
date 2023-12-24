import express from "express";
import {
    updateCar,
    deleteCar,
    getCar,
    getCars,
    createCar,
    getCarsByType,getCarsWithService,getCarsByOwner
  } from "../controllers/car.js";
  import { verifyAdmin, verifyToken,verifyUser } from "../utils/verifyToken.js";
  const router = express.Router();

//GET ALL
router.get("/",verifyAdmin, getCars);
//GET ALL BY POPULATE
router.get("/service",verifyUser, getCarsWithService);
router.get("/populate", verifyAdmin, getCarsByType);
router.get("/user/:user", verifyUser, getCarsByOwner);
//CREATE
router.post("/:userId",verifyAdmin,createCar);

//UPDATE
router.put("/:id",verifyAdmin, updateCar);
//DELETE
router.delete("/:id/:userId",verifyAdmin, deleteCar);
//GET
router.get("/:id",verifyUser, getCar);



export default router