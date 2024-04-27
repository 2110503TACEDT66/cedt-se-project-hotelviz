const Coupon = require("../models/Coupon");


exports.getCoupons = async (req, res, next) => {
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

//@desc Get single coupon
//@route GET /api/v1/coupons/:id
//@access Public
exports.getCoupon = async (req, res, next) => {
    try {
      const coupon = await Coupon.findById(req.params.id)
      if (!coupon) {
        return res.status(404).json({
          success: false,
          message: `No coupon with the id of ${req.params.id}`,
        });
      }
      res.status(200).json({
        success: true,
        data: coupon,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Cannot find Coupon" });
    }
  };
  
  //@desc Add coupon
  //@route POST /api/v1/coupons
  //@access Private
  exports.addCoupon = async (req, res, next) => {
    try {
      const { numberOfCoupons, ...couponData } = req.body;
      const coupons = [];
  
      for (let i = 0; i < numberOfCoupons; i++) {
        const coupon = await Coupon.create({ ...couponData});
        coupons.push(coupon);
      }
  
      res.status(201).json({ success: true, data: coupons });
    } catch (error) {
      console.log(error.stack);
      return res.status(400).json({
        success: false,
        message: "The requested body not match the Coupon model",
      });
    }
  };
  
  //@desc Update coupon
  //@route PUT/api/v1/coupons/:id
  //@access Private
  exports.updateCoupon = async (req, res, next) => {
    try {
      let coupon = await Coupon.findById(req.params.id);
      if (!coupon) {
        return res.status(404).json({
          success: false,
          message: `No coupon with the id of ${req.params.id}`,
        });
      }
  
      if (req.user.role !== "admin") {
        return res.status(401).json({
          success: false,
          message: `User ${req.user.id} is not authorized to update this coupon`,
        });
      }
  
      coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        data: coupon,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Cannot update Coupon" });
    }
  };
  
  //@desc Delete coupon
  //@route DELETE /api/v1/coupons/:id
  //@access Private
  exports.deleteCoupon = async (req, res, next) => {
    try {
      const coupon = await Coupon.findById(req.params.id);
      if (!coupon) {
        return res.status(404).json({
          success: false,
          message: `No coupon with the id of ${req.params.id}`,
        });
      }
  
      if (req.user.role !== "admin") {
        return res.status(401).json({
          success: false,
          message: `User ${req.user.id} is not authorized to delete this coupon`,
        });
      }
  
      await coupon.deleteOne();
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Cannot delete Coupon" });
    }
  };