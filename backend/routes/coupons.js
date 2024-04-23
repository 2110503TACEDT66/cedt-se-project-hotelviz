const express = require("express");
const {
  getCoupons
} = require("../controllers/coupons");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getCoupons)
// router
//   .route("/:id")
//   .get(protect, getBooking)
//   .put(protect, authorize("admin", "user"), updateBooking)
//   .delete(protect, authorize("admin", "user"), deleteBooking);

module.exports = router;
