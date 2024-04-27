const express = require("express");
const {
  getCoupons,
  getCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  redeemCoupon,
} = require("../controllers/coupons");

const router = express.Router({ mergeParams: true });

const { semiprotect, protect, authorize } = require("../middleware/auth");

/**
* @swagger
* components:
*   schemas:
*     Coupon:
*       type: object
*       required:
*         - type
*         - discount
*         - point
*         - expiredDate
*       properties:
*         type:
*           type: string
*           description: Type of coupon
*           example: NewYearDiscount
*         discount:
*           type: number
*           description: Discount amount
*           example: 200
*         tiers:
*           type: array
*           description: Tiers eligible for the coupon
*           items:
*             type: string
*           example: ["platinum", "gold"]
*         point:
*           type: number
*           description: Required points for the coupon
*           example: 100
*         owner:
*           type: string
*           format: uuid
*           description: ID of the coupon owner
*           example: 660255d64df8343ed9dafe35
*         used:
*           type: boolean
*           description: Indicates whether the coupon has been used
*           example: false
*         expiredDate:
*           type: string
*           format: date
*           description: Expiry date of the coupon
*           example: 2024-04-25T00:00:00Z
*         createdAt:
*           type: string
*           format: date-time
*           description: Date and time when the coupon was created
*           example: 2024-04-25T12:00:00Z
*       example:
*         type: NewYearDiscount
*         discount: 200
*         tiers: ["platinum", "gold"]
*         point: 100
*         owner: 660255d64df8343ed9dafe35
*         used: false
*         expiredDate: 2024-04-25T00:00:00Z
*         createdAt: 2024-04-25T12:00:00Z
*/
/**
* @swagger
* tags:
*   name: Coupons
*   description: The coupons managing API
*/
/**
* @swagger
* /coupons:
*   get:
*     summary: Returns the list of all coupons
*     tags: [Coupons]
*     responses:
*       200:
*         description: The list of coupons
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Coupon'
*/
/**
* @swagger
* /coupons/{id}:
*   get:
*     summary: Get the coupon by id
*     tags: [Coupons]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The coupon id
*     responses:
*       200:
*         description: The coupon description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       404:
*         description: The coupon was not found
*/
/**
* @swagger
* /coupons:
*   post:
*     summary: Add new coupons
*     tags: [Coupons]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - numberOfCoupons
*               - type
*               - discount
*               - tiers
*               - point
*               - expiredDate
*             properties:
*               numberOfCoupons:
*                 type: number
*                 description: Total amount of new coupons
*                 example: 2
*               type:
*                 type: string
*                 description: Type of coupon
*                 example: NewYearDiscount
*               discount:
*                 type: number
*                 description: Discount amount
*                 example: 200
*               tiers:
*                 type: array
*                 description: Tiers eligible for the coupon
*                 items:
*                   type: string
*                 example: ["platinum", "gold"]
*               point:
*                 type: number
*                 description: Required points for the coupon
*                 example: 100
*               expiredDate:
*                 type: string
*                 format: date
*                 description: Expiry date of the coupon
*                 example: 2024-04-25T00:00:00Z
*     responses:
*       201:
*         description: Coupon added successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       400:
*         description: Bad request, required fields are missing or invalid
*       500:
*         description: Server error
*/
/**
* @swagger
* /coupons/{id}:
*   put:
*     summary: Update the coupon by the id
*     tags: [Coupons]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The coupon id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Coupon'
*     responses:
*       200:
*         description: The coupon was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       404:
*         description: The coupon was not found
*       500:
*         description: Some error happened
*/
/**
* @swagger
* /coupons/{id}:
*   delete:
*     summary: Remove the coupon by id
*     tags: [Coupons]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The coupon id
*     responses:
*       200:
*         description: The coupon was deleted
*       404:
*         description: The coupon was not found
*/
/**
* @swagger
* /coupons/redeem/{id}:
*   post:
*     summary: Redeem a coupon
*     tags: [Coupons]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The coupon id
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: string
*                 format: uuid
*                 description: ID of the booking user
*                 example: 660299f6faaee7fef743468a
*     responses:
*       201:
*         description: The coupon was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Coupon'
*       500:
*         description: Some server error
*/

router
  .route("/")
  .get(protect, getCoupons)
  .post(protect, authorize("admin"), addCoupon);
router
  .route("/:id")
  .get(semiprotect, getCoupon)
  .put(protect, authorize("admin"), updateCoupon)
  .delete(protect, authorize("admin"), deleteCoupon);
router.route("/redeem/:couponId").post(protect, redeemCoupon);

module.exports = router;
