const Coupon = require("../models/Coupon");
const User = require("../models/User");

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
    const coupon = await Coupon.findById(req.params.id);
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
    const { numberOfCoupons, type, ...couponData } = req.body;
    const coupons = [];

    // Check if the coupon type already exists
    const existingCoupon = await Coupon.findOne({ type });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: `Coupon type '${type}' already exists`,
      });
    }

    for (let i = 0; i < numberOfCoupons; i++) {
      const coupon = await Coupon.create({ ...couponData, type });
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
      // Check if the user owns the coupon and the coupon is not already used
      if (coupon.owner==null || req.user.id.toString() !== coupon.owner.toString() || coupon.used) {
        console.log(`${coupon.owner}, ${req.user.id.toString()}, ${coupon.owner.toString()}, ${coupon.used}`);
        return res.status(401).json({
          success: false,
          message: `User ${req.user.id} is not authorized to update this coupon`,
        });
      }

      // Allow users to update only the 'used' field to true
      req.body = { used: true };
      coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        data: coupon,
      });
    } 
    else{
      coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        data: coupon,
      });
    }
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

//@desc Redeem one coupon
//@route POST /api/v1/coupons/redeem/: couponID
//@access Private
exports.redeemCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.couponId);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: `No coupon with the id of ${req.params.couponId}`,
      });
    } else if (coupon.owner != null) {
      return res.status(404).json({
        success: false,
        message: `Coupon with the id of ${req.params.couponId} is already owned`,
      });
    }

    let user;

    if (req.user.role === "admin" && req.body.user != null)
      user = await User.findById(req.body.user);
    else user = await User.findById(req.user.id);

    if (user.coupons.includes(req.params.couponId)) {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${user.id} has already owned this coupon`,
      });
    }

    if (req.user.role === "admin") {
      //free coupon
    } else if (user.point >= coupon.point) {
      user.point -= coupon.point;
    } else {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${user.id} does not have enough point`,
      });
    }

    coupon.owner = user.id;
    await coupon.save();

    user.coupons.push(req.params.couponId);
    await user.save();
    res.status(201).json({
      success: true,
      user: user._id,
      count: user.coupons.length,
      coupons: user.coupons,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot redeem coupon" });
  }
};

//@desc Delete coupons by type
//@route DELETE /api/v1/coupons/type/:couponType
//@access Private
exports.deleteCouponsByType = async (req, res, next) => {
  try {
    const { couponType } = req.params;

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete coupons`,
      });
    }

    // Find and delete coupons with the provided couponType
    const deletedCoupons = await Coupon.deleteMany({ type: couponType });

    if (deletedCoupons.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No coupons found with type ${couponType}`,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: `${deletedCoupons.deletedCount} coupons with type ${couponType} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete coupons" });
  }
};

//@desc Update coupons by type
//@route PUT /api/v1/coupons/type/:couponType
//@access Private
exports.updateCouponsByType = async (req, res, next) => {
  try {
    const { couponType } = req.params;
    const updateData = req.body;

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update coupons`,
      });
    }

    // Find and update coupons with the provided couponType
    const updatedCoupons = await Coupon.updateMany(
      { type: couponType },
      updateData,
      { new: true, runValidators: true }
    );

    if (updatedCoupons.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No coupons found with type ${couponType}`,
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCoupons,
      message: `${updatedCoupons.modifiedCount} coupons with type ${couponType} updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update coupons" });
  }
};