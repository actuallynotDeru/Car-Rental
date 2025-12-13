import Booking from "../models/Bookings.js";

export const createBooking = async (req, res) => {
  try {
    const { ownerId, customerId, carId, pickupDate, returnDate, totalPrice } = req.body;

    const bookingData = {
      ownerId,
      customerId,
      carId,
      pickupDate,
      returnDate,
      totalPrice,
      status: "Pending",
    };

    // Add file paths if uploaded
    if (req.files?.paymentProof) {
      bookingData.paymentProof = `/uploads/payments/${req.files.paymentProof[0].filename}`;
    }
    if (req.files?.idPhoto) {
      bookingData.idPhoto = `/uploads/ids/${req.files.idPhoto[0].filename}`;
    }

    const booking = new Booking(bookingData);
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const bookings = await Booking.find({ ownerId })
      .populate("customerId", "fullName email phone")
      .populate("carId", "name carDetails.plateNumber image")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customerId", "fullName email phone")
      .populate("carId", "name carDetails.plateNumber image");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId", "fullName email phone")
      .populate("carId", "name carDetails.plateNumber image");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};