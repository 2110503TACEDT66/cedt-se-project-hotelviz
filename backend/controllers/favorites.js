const Hotel = require("../models/Hotel");
const User = require("../models/User");

//@desc Get favorite
//@route GET /api/v1/favorites
//@access Public
exports.getFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: user._id,
      count: user.favorite.length,
      favorite: user.favorite,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Favorite" });
  }
};

//@desc Add favorite
//@route POST /api/v1/favorites/:favoriteID
//@access Private
exports.addFavorite = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: `No hotel with the id of ${req.params.id}`,
      });
    }

    const user = await User.findById(req.user.id);

    if (user.favorite.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already favorited this hotel`,
      });
    }
    user.favorite.push(req.params.id);
    await user.save();
    res.status(201).json({
      success: true,
      user: user._id,
      count: user.favorite.length,
      favorite: user.favorite,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Favorite" });
  }
};

//@desc Delete favorite
//@route DELETE /api/v1/favorites/:favoriteID
//@access Private
exports.deleteFavorite = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: `No hotel with the id of ${req.params.id}`,
      });
    }
    const user = await User.findById(req.user.id);
    if (!user.favorite.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: `The hotel with the id of ${req.params.id} is not in user's favorite hotels`,
      });
    }
    user.favorite = user.favorite.filter((e) => e != req.params.id);
    await user.save();
    res.status(201).json({
      success: true,
      user: user._id,
      count: user.favorite.length,
      favorite: user.favorite,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Favorite" });
  }
};
