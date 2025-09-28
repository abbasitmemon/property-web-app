import { get, post, put, del } from "../api/http";

export const fetchAdminProperties = async (page = 1, filters = {}) =>
  await get("/admin/properties", { page, ...filters });

export const fetchGuestProperties = async (page = 1, filters = {}) =>
  await get("/guest/properties", { page, ...filters });

export const fetchProperty = async (id) => await get(`/admin/properties/${id}`);
export const guestFetchProperty = async (id) =>
  await get(`/guest/properties/${id}`);
export const createProperty = async (data) =>
  await post("/admin/properties", data);

export const updateProperty = async (id, data) =>
  await put(`/admin/properties/${id}`, data);

export const deleteProperty = async (id) =>
  await del(`/admin/properties/${id}`);

export const fetchAvailabilities = async (propertyId) =>
  await get(`/admin/properties/${propertyId}/availability`);

// Create availability
export const createAvailability = async (data) =>
  await post("/admin/availability", data);

// Update availability
export const updateAvailability = async (id, data) =>
  await put(`/admin/availability/${id}`, data);

// Delete availability
export const deleteAvailability = async (id) =>
  await del(`/admin/availability/${id}`);
