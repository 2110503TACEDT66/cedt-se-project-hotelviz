const Coupon = require("../models/Coupon");

exports.getCoupons = async (req, res, next) => {
  console.log(1);
  let query;
  //General users can see only their coupons!
  if (req.user.role !== "admin") {
    query = Coupon.find({ user: req.user.id });
  } else {
    //If you are an admin, you can see all!
    query = Coupon.find();
  }
  try {
    const coupons = await query;
    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Coupon" });
  }
};