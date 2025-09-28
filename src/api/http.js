import API from './axios';

export const get = async (url, params = {}) => (await API.get(url, { params })).data;
export const post = async (url, data = {}) => (await API.post(url, data)).data;
export const put = async (url, data = {}) => (await API.put(url, data)).data;
export const patch = async (url, data = {}) => (await API.patch(url, data)).data;
export const del = async (url) => (await API.delete(url)).data;
