import api from "./BaseApi";

export const getGallery = async (filters = {}) => {
  const { data } = await api.get("/gallery", { params: filters });
  return data;
};

export const getGalleryCategories = async () => {
  const { data } = await api.get("/gallery/categories");
  return data.data; // ["curtains", "blinds", ...]
};
