const express = require("express");
const {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  addRating
} = require("../controllers/hotels");

//Include other resource routes
const bookingRouter = require("./bookings");

const router = express.Router();

const { semiprotect, protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:hotelId/bookings/", bookingRouter);

router
  .route("/")
  .get(semiprotect, getHotels)
  .post(protect, authorize("admin"), createHotel);
router
  .route("/:id")
  .get(getHotel)
  .put(protect, authorize("admin"), updateHotel)
  .delete(protect, authorize("admin"), deleteHotel);
router.route("/rating/:id").put(protect, addRating);

module.exports = router;
