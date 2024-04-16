const express = require("express");
const {
  getBookings,
  getBooking,
  addBooking,
  updateBooking,
  deleteBooking,
  getBookingHistory,
  addBookingHistory,
  updateBookingHistory,
} = require("../controllers/bookings");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/history")
  .get(protect, getBookingHistory)
  .post(protect, authorize("admin", "user"), addBookingHistory);
router
  .route("/history/:id")
  .put(protect, authorize("admin", "user"), updateBookingHistory);

router
  .route("/")
  .get(protect, getBookings)
  .post(protect, authorize("admin", "user"), addBooking);
router
  .route("/:id")
  .get(protect, getBooking)
  .put(protect, authorize("admin", "user"), updateBooking)
  .delete(protect, authorize("admin", "user"), deleteBooking);

module.exports = router;
