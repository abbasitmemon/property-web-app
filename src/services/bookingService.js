import { get, post, patch } from "../api/http";

export const createBooking = async (data) =>
  await post("/guest/bookings", data);

export const fetchBookings = async (page = 1) =>
  await get(`/admin/bookings?page=${page}`);

export const fetchBooking = async (id) => await get(`/admin/bookings/${id}`);

export const updateBookingStatus = async (id, data) =>
  await patch(`/admin/bookings/${id}/status`, data);
