const express = require("express");
const {
  getCoupons,
  getCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  redeemCoupon,
  deleteCouponsByType,
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
  .put(protect, updateCoupon)
  .delete(protect, authorize("admin"), deleteCoupon);
router.route("/redeem/:couponId").post(protect, redeemCoupon);
router.route("/type/:couponType").delete(protect, authorize("admin"), deleteCouponsByType);


module.exports = router;
