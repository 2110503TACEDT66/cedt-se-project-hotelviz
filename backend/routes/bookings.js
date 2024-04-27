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

/**
* @swagger
* components:
*   schemas:
*     Booking:
*       type: object
*       required:
*         - date
*         - user
*         - hotel
*         - contactEmail
*         - contactName
*         - contactTel
*       properties:
*         date:
*           type: string
*           format: date
*           description: Booking date
*           example: 2024-04-25
*         user:
*           type: string
*           format: uuid
*           description: ID of the booking user
*           example: 660243d64eh8243ed9dafe35
*         hotel:
*           type: string
*           format: uuid
*           description: ID of the booked hotel
*           example: 660255d64df8343ec5dafe29
*         contactEmail:
*           type: string
*           format: email
*           description: Contact email for the booking
*           example: john@example.com
*         contactName:
*           type: string
*           description: Contact name for the booking
*           example: John Doe
*         contactTel:
*           type: string
*           description: Contact telephone number for the booking
*           example: 123-456-7890
*         createdAt:
*           type: string
*           format: date-time
*           description: Date and time when the booking was created
*           example: 2024-04-25T12:00:00Z
*       example:
*         date: 2024-04-25
*         user: 660255d64df8343ed9dafe35
*         hotel: 660255d64df8343ed9dafe35
*         contactEmail: john@example.com
*         contactName: John Doe
*         contactTel: 123-456-7890
*         createdAt: 2024-04-25T12:00:00Z
*/
/**
* @swagger
* tags:
*   name: Bookings
*   description: The bookings managing API
*/
/**
* @swagger
* /bookings:
*   get:
*     summary: Returns the list of all bookings
*     tags: [Bookings]
*     responses:
*       200:
*         description: The list of bookings
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Booking'
*/
/**
* @swagger
* /bookings/{id}:
*   get:
*     summary: Get the booking by id
*     tags: [Bookings]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The booking id
*     responses:
*       200:
*         description: The booking description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Booking'
*       404:
*         description: The booking was not found
*/
/**
* @swagger
* /hotels/{id}/bookings:
*   get:
*     summary: Get the booking by hotel id
*     tags: [Bookings]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The hotel id
*         example: 65df5083dc8452a715f007cd
*     responses:
*       200:
*         description: The booking description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Booking'
*       404:
*         description: The booking was not found
*/
/**
* @swagger
* /hotels/{id}/bookings:
*   post:
*     summary: Create a new booking
*     tags: [Bookings]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The hotel id
*         example: 65df5083dc8452a715f007cd
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               date:
*                 type: string
*                 format: date-time
*                 description: Date and time of the booking
*                 example: 2024-04-25T12:00:00Z
*               contactEmail:
*                 type: string
*                 format: email
*                 description: Contact email address
*                 example: john@example.com
*               contactName:
*                 type: string
*                 description: Contact name
*                 example: John Doe
*               contactTel:
*                 type: string
*                 description: Contact telephone number
*                 example: 123-456-7890
*     responses:
*       201:
*         description: The booking was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Booking'
*       500:
*         description: Some server error
*/
/**
* @swagger
* /bookings/{id}:
*   put:
*     summary: Update the booking by the id
*     tags: [Bookings]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The booking id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Booking'
*     responses:
*       200:
*         description: The booking was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Booking'
*       404:
*         description: The booking was not found
*       500:
*         description: Some error happened
*/
/**
* @swagger
* /bookings/{id}:
*   delete:
*     summary: Remove the booking by id
*     tags: [Bookings]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The booking id
*     responses:
*       200:
*         description: The booking was deleted
*       404:
*         description: The booking was not found
*/

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
