const express = require("express");
const {
  addFavorite,
  getFavorite,
  deleteFavorite,
} = require("../controllers/favorites");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getFavorite)
  router
  .route("/:id")
  .post(protect, authorize("admin", "user"), addFavorite)
  .delete(protect, authorize("admin", "user"), deleteFavorite);
module.exports = router;
