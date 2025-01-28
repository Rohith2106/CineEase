import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;
    let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }

    let booking; // Declare a single variable for the booking

    try {
        booking = new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
        });
        const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
        //booking = await booking.save(); // Save the booking and reassign the result
    } catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to create a booking" });
    }

    return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Bookings.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
  };


  export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Bookings.findByIdAndDelete(id).populate("user movie"); // Use findByIdAndDelete instead
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking); // Remove the booking reference from user
        await booking.movie.bookings.pull(booking); // Remove the booking reference from movie
        await booking.movie.save({ session });
        await booking.user.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while deleting the booking" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });
};

