import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    let booking; // Declare a single variable for the booking

    try {
        booking = new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
        });
        booking = await booking.save(); // Save the booking and reassign the result
    } catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to create a booking" });
    }

    return res.status(201).json({ booking });
};
