const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// ================================
// NEW — Bookings WITH & WITHOUT Lead
// ================================
router.get("/with-lead", bookingController.getBookingsWithLead);
router.get("/without-lead", bookingController.getBookingsWithoutLead);

// ================================
// Existing CRUD APIs
// ================================

// Create booking
router.post("/", bookingController.createBooking);

// Get all bookings
router.get("/", bookingController.getBookings);

// Get single booking
router.get("/:id", bookingController.getBooking);

// Update booking
router.put("/:id", bookingController.updateBooking);

// Delete booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
