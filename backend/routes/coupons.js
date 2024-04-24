const express = require("express");
const {
  getCoupons,
  getCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/coupons");

const router = express.Router({ mergeParams: true });

const { semiprotect, protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getCoupons)
  .post(protect, authorize("admin"), addCoupon);
router
  .route("/:id")
  .get(semiprotect, getCoupon)
  .put(protect, authorize("admin"), updateCoupon)
  .delete(protect, authorize("admin"), deleteCoupon);

module.exports = router;
