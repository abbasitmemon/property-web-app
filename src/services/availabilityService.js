import { get, post } from '../api/http';

export const fetchAvailability = async (propertyId) => await get(`/admin/availability/${propertyId}`);
export const createAvailability = async (data) => await post('/admin/availability', data);
